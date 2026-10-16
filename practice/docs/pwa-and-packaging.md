# Installation, offline use, and future packaging

## Student experience

Finpath is an installable web app with a standalone window, violet launch theme, stable app identity, and original chart-and-coin icons. From Settings, open **Take Finpath with you**. On desktop, **Install & offline** is also in the sidebar.

- **iPhone/iPad:** open the published HTTPS page in Safari, then Share → Add to Home Screen. If offered, leave Open as Web App enabled.
- **Android:** open it in Chrome and choose Install app / Add to Home screen from the menu, or use the in-app install button when the browser offers it.
- Choose **Save all lessons offline** while connected. Wait for **Ready for offline practice** before disconnecting. The entire current course, app shell, and math assets take approximately 0.8 MB uncompressed. No question answering or student progress is transmitted.

The manifest uses relative `id`, `start_url`, and `scope`, all `./`, with `display: standalone`. This preserves a stable identity at `/practice/` and also works under a nested deployment path. iOS metadata and a 180px Apple touch icon complement regular 192/512px icons and a separate 512px maskable icon. No portrait lock is imposed. Viewport and CSS safe-area insets accommodate device cutouts and the home indicator.

The installation flow follows [MDN's PWA installability guidance](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable) and [WebKit's home-screen web app support](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/). The in-page installation prompt is offered only when the browser provides it; iOS has a manual Share-menu flow.

Progress remains in the existing localStorage key and schema. Reopening the same installed app restores its saved session. Browsers and installed apps can use different storage containers; do not assume that installing, changing domains, or moving to a native app automatically transfers an older browser's record. Export is available in Settings. Updates do not remove progress, but clearing site data, uninstalling, private browsing cleanup, or browser eviction can remove device-local data. A persistence request after the offline download asks the browser to reduce eviction risk; the browser controls whether to grant it. See [WebKit's storage policy](https://webkit.org/blog/14403/updates-to-storage-policy/).

## Runtime boundaries

| Module                   | Responsibility                                                           |
| ------------------------ | ------------------------------------------------------------------------ |
| `js/logic.js`            | Pure grading, XP, answer history, and session transitions                |
| `js/content.js`          | Course index validation and on-demand question loading                   |
| `js/progress.js`         | Versioned progress and replaceable storage adapter                       |
| `js/engine.js`           | Accessible exercise and navigation UI                                    |
| `js/pwa.js`              | Browser installation, worker registration, and offline download controls |
| `sw.js` + `sw-assets.js` | Verified static resource caches; no progress access                      |

The homepage still avoids lesson and KaTeX downloads. An opened lesson is cached on demand. The explicit offline download adds all remaining lessons and WOFF2 math fonts, including those not yet visited. There is no service-worker dependency in grading or local progress saving, and online practice remains available when workers are unsupported.

## Updating without losing progress

Run these commands after changing runtime files or lesson content:

```sh
npm run content:index
npm run pwa:assets
npm run pwa:check
```

`pwa:assets` generates the tracked `sw-assets.js`, including each resource's SHA-256 digest and a release identity derived from all runtime assets and the worker code. It also updates the HTML entry's release token. The small startup module requests the worker and its asset index with that token, avoiding stale CDN copies after publication, and lets the verified worker serve module imports on first load. Native bundles and browsers without service workers import the same engine directly. There is no student-facing build requirement. Never hand-edit that generated index or deploy it separately from its assets. Regenerate it after formatting runtime files as well.

During installation the worker fetches assets with content-specific query strings, verifies their digests, and builds a new versioned cache. The generated index also embeds the original HTML shell, which the worker verifies against the HTML digest before caching. This keeps Cloudflare-injected HTML scripts out of the offline shell without weakening integrity checks. The online entry script opts out of Rocket Loader using [Cloudflare's documented `data-cfasync="false"` attribute](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/ignore-javascripts/). Missing or mismatched files fail installation and leave the previous worker active. For someone who already downloaded the complete course, the next version refreshes the whole offline package before activation. Otherwise, it refreshes the shell and previously cached lesson/math files.

A new worker waits while an existing app window is open. The install/offline panel shows that an update is ready; close all Finpath windows, allow the browser to finish the handoff, and reopen. There is no forced reload or `skipWaiting` during a quiz. Activation deletes only older caches belonging to this application's path. It never calls localStorage, resets a progress record, or deletes another application's caches. Stable lesson/question IDs remain essential; changing those IDs still requires a deliberate progress migration.

## GitHub Pages behind Cloudflare

The current repository's `CNAME` is `xiaobo-yu.com`. The public homepage responded over HTTPS with both Cloudflare and GitHub headers during this work. `CNAME`, DNS, GitHub Pages settings, and `_config.yml` are unchanged. The app is published at `https://xiaobo-yu.com/practice/`, with no link added to the academic homepage.

All runtime files are ordinary static files without Jekyll front matter. Keep the existing Pages origin and Cloudflare proxy. No Cloudflare Worker, Pages Functions, backend, paid hosting feature, or custom response-header file is required. `sw.js` lives inside `/practice/`, so its default scope requires no `Service-Worker-Allowed` header.

At deployment, publish the app and generated asset index together. If the zone has aggressive cache rules, bypass edge caching for `/practice/sw.js`, `/practice/sw-assets.js`, `/practice/manifest.webmanifest`, and the HTML entry page; alternatively purge those exact URLs after publishing. Preserve query strings in the cache key for static assets, and avoid JS/CSS rewriting under `/practice/`, because the integrity index describes the original bytes. HTML injection is handled by the embedded offline shell, and the app entry script opts out of Rocket Loader. Configure any bypass after conflicting broad cache rules. Cloudflare documents [cache eligibility settings](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/) and [rule ordering](https://developers.cloudflare.com/cache/how-to/cache-rules/order/). These are deployment guidance, not changes made to the account.

The browser's service-worker cache is separate from Cloudflare's edge cache. Purging the CDN does not clear local student progress. Keep the production origin stable: HTTPS, hostname, and port determine the browser storage namespace.

## Future Apple App Store / Google Play packaging

Run `npm run package:native` to produce the ignored `native-www/` directory. It contains the same HTML, quiz engine, content, CSS, icons, and bundled math assets, with no development dependencies or tests. Its runtime marker disables browser installation and service-worker registration. The generated package is tested as a static directory; no native SDK project or store submission is included.

A future [Capacitor wrapper](https://capacitorjs.com/docs/basics/workflow) can use `native-www` as its `webDir`, bundle the content on-device, and retain these ES modules. Choose an owned bundle identifier, add the iOS/Android projects, and handle external links and native lifecycle hooks in the platform layer. The original 1024px opaque icon is supplied as a starting asset for store tooling. Each store's signing, metadata, privacy disclosures, review, and developer-account requirements still apply; this preparation does not guarantee store acceptance.

For native durable storage, hydrate a memory-backed implementation of the existing progress adapter before starting the UI, then persist through the native platform layer. [Capacitor recommends Preferences rather than relying solely on WebView localStorage](https://capacitorjs.com/docs/apis/preferences); a larger history could instead use a native database. Define a one-time import/migration policy if transferring browser saves. Neither native storage nor future cloud synchronization requires changing grading and session logic. Sync and native SDK dependencies are intentionally absent from the static PWA.

## Verification

`npm test` checks icon sizes, install metadata, asset digests, and existing grading/persistence behavior. `npm run test:browser` includes a real Chromium installability check using a normal profile, a full offline download, nested paths, a failed update, a successful waiting/activation cycle, byte-for-byte progress preservation, and unrelated-cache preservation.

For the additional WebKit pass:

```sh
npx playwright install webkit
TEST_WEBKIT=1 npm run test:browser
```

WebKit is exercised with an iPhone viewport for installation guidance, offline downloads, feedback/XP persistence, and math rendering. This is engine emulation on macOS, not a physical-device installation test. For physical-device testing, perform Add to Home Screen / airplane-mode / relaunch checks on an actual iPhone and Android phone at the production HTTPS URL.
