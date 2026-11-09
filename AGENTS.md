# Website article instructions

These instructions apply to Markdown articles in `fun-stuff/` and changes to their shared layout.
Read `_config.yml`, `_layouts/fun-article.html`, and a nearby article before editing.
Prefix shell commands with `rtk`, as required by `/Users/xiaoboyu/.codex/RTK.md`.

## Rendering pipeline

The site builds Markdown through Jekyll and Kramdown before the browser runs MathJax.
`_layouts/fun-article.html` supplies the page structure, styles, and MathJax configuration.
Use this layout rather than adding another MathJax script to an article.
Write for the site's actual renderer; a GitHub Markdown preview or a server pointed at raw `.md` files is not a rendering check.

## Article structure

Put articles in `fun-stuff/<category>/<lowercase-hyphenated-slug>.md`.
The existing categories are `economics`, `logics`, `mathematics`, and `physics`; new categories are supported automatically.
Start the file with YAML front matter:

```yaml
---
layout: fun-article
title: "Article Title: A Clear Subtitle"
description: "A short description of the article."
group: Economics
subtitle: "A short explanation of the question or mechanism."
lead: "An approachable opening question or example."
permalink: /fun-stuff/economics/article-slug.html
published: false
---
```

- Match the permalink and group to the article's category; use `Economics`, `Logics`, `Mathematics`, or `Physics` for existing groups, or a consistent display name for a new group.
- Give distinct groups distinct URL slugs (for example, `Computer Science` becomes `computer-science`) so their homepage tab IDs remain unique.
- Quote metadata containing colons or other YAML punctuation. Keep metadata plain text; put equations and Markdown formatting in the body.
- The layout supplies the title as an `h1`; start body sections with `##`.
- Use blank lines between paragraphs and around headings, lists, tables, and display equations.
- Keep source line breaks logical, normally after each sentence. Do not hard-wrap prose to a fixed column width.
- Preserve established notation. Keep primitives and useful shorthand; avoid unnecessary aliases for short expressions.
- Preserve an existing article's publication status unless the task changes it. New drafts use `published: false` until publication is authorized.

## Math delimiters and TeX

In these Markdown files, use **double dollar signs for both inline and display math**.
Kramdown converts inline math to `\(...\)` and display math to `\[...\]` in the generated HTML, which MathJax then typesets.
Do not substitute single-dollar delimiters or raw `\(...\)` / `\[...\]` in ordinary Markdown source; Markdown processing can treat them differently.

Inline math stays within its prose paragraph:

```markdown
Trade is efficient when $$v>c$$, and its gain is $$v-c$$.
```

A display equation has its delimiters on separate lines, with a blank line before and after the block:

```markdown
The expected gain is

$$
\int_0^1\int_0^v(v-c)\,dc\,dv=\frac16.
$$

This is the available surplus.
```

Use one outer math block around an `aligned` or `cases` environment:

```markdown
$$
\begin{aligned}
U_B(v)&=U_B(0)+\int_0^v x\,dx\\
&=U_B(0)+\frac{v^2}{2}.
\end{aligned}
$$

$$
q(v,c)=\begin{cases}
1,&v>c,\\
0,&v\leq c.
\end{cases}
$$
```

- Write literal TeX in the `.md` file: one backslash for commands, two for equation row breaks. Extra escaping belongs only to a programming language string used to create the file.
- Balance braces and `\begin` / `\end` pairs. Visible set braces require both `\{` and `\}`; for example, `$$\theta\mid\{\text{seller accepts}\}\sim U[0,p]$$`.
- Use `\text{...}` for words inside equations, and `\mid` for conditioning.
- Keep math out of backticks, code fences, and four-space-indented code blocks in the article itself. Those forms are only for showing source code, as in this guide.
- Use the commands supported by the shared MathJax configuration. Do not assume LaTeX packages, document environments, custom theorem environments, or manuscript macros are available.
- Break long derivations at meaningful steps with `aligned`. The layout allows wide display equations to scroll, but ordinary equations should fit the reading column where practical.
- Write monetary amounts as words, such as “40 dollars,” to avoid accidental math delimiters.
- Jekyll processes Liquid even inside code fences. If an article must show literal Liquid template syntax, protect that passage with Liquid's `raw` block.

## Tables, collapsible proofs, and figures

Use ordinary Markdown tables with blank lines around them.
Use `\mid`, `\lvert`, and `\rvert` inside table equations instead of literal pipe characters that can split Markdown cells:

```markdown
| Event | Conditional probability |
| --- | --- |
| $$E$$ | $$\Pr(E\mid C)$$ |
```

The layout makes tables directly inside the article horizontally scrollable.
If a table is nested inside another element, ensure its wrapper also provides scrolling, using the existing `.table-wrap` class when needed.
Check that the rightmost columns remain reachable on a phone.

Enable Kramdown explicitly when putting Markdown and equations inside an HTML disclosure:

```markdown
<details markdown="1">
<summary>Technical note: the envelope argument</summary>

Here is the additional calculation:

$$
U_B'(v)=v.
$$

</details>
```

Use the shared figure styles and descriptive alt text:

```html
<figure class="math-figure">
  <img src="/img/others/article-diagram.svg" alt="Describe the diagram and its main comparison.">
  <figcaption>Explain what the reader should notice.</figcaption>
</figure>
```

Check diagram labels at phone width.
For a wide comparison, use a stacked mobile version selected by `<picture>` and `<source media="(max-width: 600px)">`, as in `myerson-satterthwaite.md`.
Close `</picture>` before `<figcaption>`.
Keep SVG sources valid XML and remove trailing whitespace from generated assets.

## Links and publication

Link to generated article URLs, for example `/fun-stuff/economics/aumann-agreement.html`, rather than source `.md` paths.
Use root-relative asset paths such as `/img/others/article-diagram.svg` so links work from nested article URLs.
On publication, set `published: true` and check cross-links between companion articles.
Jekyll generates the homepage tabs and article lists through `_includes/fun-stuff-index.html` at build time, using pages with `layout: fun-article`, a nonempty `group`, and `published` other than `false`.
The link text comes from `title`, and its target comes from the generated page URL (`permalink` when supplied).
Do not add article links or categories manually to `index.html`.
Articles are sorted alphabetically by title within each group.
`fun_stuff_group_order` in `_config.yml` sets the preferred tab order; additional groups appear alphabetically afterward, and groups without published articles are omitted.
Drafts remain absent from the homepage even in a local build using `--unpublished`.
Keep this instruction file excluded from the generated site through `_config.yml`.

## Rendering checks

1. Build with a GitHub Pages-compatible Jekyll environment and the site's configured plugins. There is currently no repository Gemfile; do not assume `bundle exec` is configured or change the site's parser to make a preview work.
2. Use the actual article layout and Kramdown settings. To preview drafts with a configured Jekyll executable, run `rtk proxy jekyll build --destination /tmp/site-article-preview --unpublished`, then serve that output with `rtk proxy python3 -m http.server 8000 --bind 127.0.0.1 --directory /tmp/site-article-preview`. Choose a different temporary destination if it is already in use. The `--unpublished` flag is for local preview only.
3. Avoid hand-assembling HTML by string replacement. A previous Ruby preview using `sub!(pattern, rendered_html)` silently collapsed TeX row-break backslashes. Use Jekyll's renderer; if a diagnostic script must insert rendered text, use a literal-preserving block such as `sub!(pattern) { rendered_html }`.
4. Open the generated `.html` page at desktop and phone sizes, approximately 1280 and 390 pixels wide. Wait for MathJax's startup promise and fonts before judging the result or taking screenshots.
5. Check for visible TeX, `mjx-merror` / `[data-mjx-error]`, unexpected display math in prose, missing equation rows, and broken `cases` layouts. A successful build or a matching count of equations does not establish correct rendering.
6. Inspect representative proofs, tables, diagrams, and the article's beginning and end. Expand every edited disclosure. Verify horizontal scrolling reaches the ends of wide tables and equations without making the entire page overflow.
7. Verify images load and article, companion, homepage, and navigation links work. If navigation changed, check the category tabs with both mouse and keyboard.
8. Run `rtk proxy git diff --check`; after staging, run `rtk proxy git diff --cached --check` so newly added articles and SVGs are included. Inspect failures before committing. Stage only task-owned changes and use the repository's `Codex: ` commit convention.
9. When publication is part of the task, verify the GitHub Pages deployment succeeds and recheck the live article URLs. State any rendering checks that could not actually be completed.
