# Progress storage and static caching

## Local persistence

`js/logic.js` owns grading and session transitions. It accepts a progress object and has no storage or network dependency. `js/progress.js` owns schema validation, migration, reset, and persistence. `js/engine.js` calls the store after every draft edit, submission, question transition, and session change. The localStorage write is synchronous; closing the tab does not depend on an unload handler or delayed network request.

The storage key is `finpath:corporate-finance`. Its version 2 JSON document contains:

| Field                        | Purpose                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| `version`, `courseId`        | Schema and curriculum identity                                                                            |
| `generation`                 | Random reset marker, not a student identifier                                                             |
| `revision`, `updatedAt`      | Successful local-save sequence and timestamp                                                              |
| `xp`, `lessons`, `questions` | XP, completed lessons, best scores/attempts, and per-question counts                                      |
| `review`                     | IDs of questions currently offered for optional review                                                    |
| `active`, `paused`           | Current session and one unfinished session per other lesson or review                                     |
| `history`                    | Submitted-answer events with answer value, correctness, XP, question/session IDs, position, and timestamp |
| `completedSessions`          | Completion records with session ID, score, XP, lesson, mode, and timestamp                                |
| `legacyTotals`               | Preserved aggregate baseline when upgrading older saves                                                   |

A session stores its question cards, shuffled orders, drafts, submitted feedback, current index, hearts, combo, and earned XP. Switching topics moves the current session into `paused`, keyed by `lesson:<lesson-id>` or `review:review`. Finishing removes the active session and adds its completion record. Completed lessons remain available for new attempts.

Answer event IDs combine a randomly generated session ID and card position. Submitted answers are copied before appending, so later edits cannot change historical answers. Saved feedback prevents a second submission or extra XP after reload. Reset writes a fresh generation and blank progress, then removes the legacy key; it does not touch other websites’ storage.

The old `finpath:corporate-finance:v1` key is read if no current key exists. Migration retains scores, XP, review IDs, and the unfinished attempt, including its feedback. Older aggregate totals become a baseline; historical answer details that v1 never stored cannot be reconstructed. The old raw document remains available until reset. Malformed or unsupported saves are preserved and the app offers export/reset rather than silently overwriting them.

Storage failure is reported visibly. Practice can continue in memory, but it cannot be claimed as saved until a write succeeds. Settings exports the full JSON record. Import is not implemented. Browser storage is specific to an origin and browser profile; clearing site data or private browsing cleanup can remove it.

## Future synchronization boundary

`createProgressStore(adapter)` accepts an adapter with four operations:

```js
read(); // returns raw JSON or null
write(raw); // commits locally before returning; throws on failure
removeLegacy(); // removes only this app's old key
subscribe(listener); // signals an external update; returns an unsubscribe function
```

The supplied adapter uses only localStorage and browser storage events. Another tab’s save triggers a reload to the latest snapshot. This is a simple latest-save policy, not a concurrent-edit merge system.

A future synchronization adapter can preserve this local-first contract and queue background uploads after a successful write. The quiz engine and grading code need no cloud calls. Sync implementation would need its own authentication choice, remote endpoint, retry queue, and explicit conflict policy. Merge answer/completion events by unique event ID within a reset generation; do not add together cumulative XP snapshots. Account for `legacyTotals`, reset generation changes, and competing unfinished drafts. These boundaries prepare for sync; no cloud synchronization or student identification is included now.

## Static delivery and offline behavior

The initial page fetches a lightweight `course.json` index, not question files. `js/content.js` fetches only lessons needed for the selected session and deduplicates concurrent requests. It checks each lesson against the index. A failed request can be retried. KaTeX and its stylesheet are loaded from bundled local files when opening a lesson; its fonts are requested as needed. No CDN or paid service is used.

`sw.js` precaches the application shell, installation metadata/icons, and course index, then caches lesson JSON and math assets after they are requested. The optional **Save all lessons offline** action downloads the complete course and WOFF2 math fonts. Cache-first lookup avoids repeat downloads. It handles only same-origin GETs under `/practice/` (or the corresponding nested deployment path); answers and progress are never placed in resource caches or sent over the network. Cached lessons work offline. An unvisited lesson needs connectivity unless the complete course was saved offline; a failed download leaves existing attempts intact.

Run `npm run pwa:assets` after changing runtime files or lessons. The generated `sw-assets.js` contains per-file digests and a release hash. A new worker verifies a new cache before activation and carries forward previously downloaded lessons, or the entire offline package if one was saved. It waits for previous controlled tabs to close, then deletes older caches only for this app's scope. It never touches localStorage. See [the PWA and packaging guide](pwa-and-packaging.md) for update tests, Cloudflare deployment guidance, and native packaging boundaries.

Service workers require HTTPS or localhost. If unsupported, online static practice and localStorage saving still work. GitHub Pages can serve all files unchanged; no server-side code, database, rewrite rules, build service, API key, or paid plan is required. A browser may evict resource caches, so offline availability is limited to files still present in that browser's cache.
