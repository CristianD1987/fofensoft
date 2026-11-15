# House Elf legal pages

How the House Elf Privacy Policy and Terms of Use are hosted on this site. Follow these rules in every session that touches them.

House Elf is a mobile app by FOFENSOFT S.R.L. Its legal texts are hosted here, not on Termly.

## Routes

| URL | What it serves | Source |
| --- | --- | --- |
| `https://www.fofensoft.com/house-elf/privacy` | Current Privacy Policy (indexable) | [app/house-elf/privacy/page.tsx](../app/house-elf/privacy/page.tsx) |
| `https://www.fofensoft.com/house-elf/terms` | Current Terms of Use (indexable) | [app/house-elf/terms/page.tsx](../app/house-elf/terms/page.tsx) |
| `/house-elf/privacy/<YYYY-MM-DD>` | Archived Privacy Policy version (`noindex`) | [app/house-elf/privacy/[version]/page.tsx](../app/house-elf/privacy/%5Bversion%5D/page.tsx) |
| `/house-elf/terms/<YYYY-MM-DD>` | Archived Terms of Use version (`noindex`) | [app/house-elf/terms/[version]/page.tsx](../app/house-elf/terms/%5Bversion%5D/page.tsx) |
| `/house-elf/privacy-policy` | 308 → `/house-elf/privacy` | `redirects()` in [next.config.ts](../next.config.ts) |
| `/house-elf/terms-of-use` | 308 → `/house-elf/terms` | `redirects()` in [next.config.ts](../next.config.ts) |
| `https://www.fofensoft.com/house-elf/support` | Support page (static, indexable); linked from every House Elf footer | [app/house-elf/support/page.tsx](../app/house-elf/support/page.tsx) |
| `/house-elf/verify` | Parental verification page; its footer links to the two current URLs above | [app/house-elf/verify/page.tsx](../app/house-elf/verify/page.tsx) |

First published versions: `2026-11-14` for both documents.

## Source of truth

The legal text is owned by the House Elf app repo (`docs/legal/privacy-policy.md`, `docs/legal/terms-of-use.md`). This site only renders what it is given.

**Never rewrite, shorten, reformat or "improve" legal text here.** Copy the file you receive verbatim.

## Files and code

- **Content:** `content/house-elf/<doc>/<YYYY-MM-DD>.md`, where `<doc>` is `privacy` or `terms`. One file per published version. See also [content/house-elf/README.md](../content/house-elf/README.md).
- **Loader:** [lib/house-elf-docs.ts](../lib/house-elf-docs.ts). `listHouseElfVersions(kind)` reads every file, newest first, and **fails the build** if:
  - a file name is not `YYYY-MM-DD.md`;
  - the file has no `Last updated <Month> <D>, <YYYY>` line, or that date differs from the file name;
  - the file contains `[REVIEW`.
- **Pages:** [app/house-elf/_components/legal-pages.tsx](../app/house-elf/_components/legal-pages.tsx) holds the titles, descriptions, metadata, the current page (`CurrentLegalPage`) and the archive page (`ArchiveLegalPage`). The route files above are thin wrappers. Archive routes use `generateStaticParams` with `dynamicParams = false`, so only published versions exist; any other date is a 404.
- **Markdown rendering:** [app/house-elf/_components/legal-document.tsx](../app/house-elf/_components/legal-document.tsx) (`react-markdown` + `remark-gfm` + a custom `remarkLegal` plugin). It adds the heading ids, links the table of contents to its sections, and keeps line breaks as written.
- **Layout and styles:** [app/house-elf/_components/legal-chrome.tsx](../app/house-elf/_components/legal-chrome.tsx) (`HouseElfLegalChrome`): header, footer, Nunito font (self-hosted by `next/font`), and the light and dark palette.

## Versions

- A version is the publication date `YYYY-MM-DD`, the same date as the text's "Last updated" line. The loader enforces this.
- Every published version is kept forever at `/house-elf/<doc>/<YYYY-MM-DD>`.
- Each version is its own file. **A published file must never be edited or deleted.** The app records which version each user accepted and links to these exact URLs.
- The current pages (`/house-elf/privacy`, `/house-elf/terms`) render the newest file. Their canonical URL is the unversioned one. They end with a "Previous versions" list, newest first, linking to the archive URLs.
- Archive pages start with the note "This is an archived version (<date>). The current version is here.", where "here" links to the current page. They are `noindex`. Their canonical URL is their own dated URL.

## Publishing a new version

Do this when the app owner sends an updated file.

1. **Refuse to publish if the file contains `[REVIEW`.** Tell the owner; do not remove the markers yourself. (The build would fail anyway.)
2. Check the file's "Last updated" date. Save it verbatim as a new file `content/house-elf/<doc>/<YYYY-MM-DD>.md` with that date. Because it is the newest file, it becomes the current version automatically. **Leave all older files untouched.**
3. If the privacy policy's section numbering changed, check that the aliases still point to the right sections (see "Anchors" below). The build fails if an alias's section number is missing from the current version.
4. Run `npm run build`, then confirm the new archive URL (`/house-elf/<doc>/<YYYY-MM-DD>`) renders, and that the current page shows the new text with the new date in "Previous versions".
5. Report the new archive URL to the owner. On the same day, the app side updates its server table `public.legal_documents`. This site does not touch that table, but the date in it must match the "Last updated" line.

The app announces material changes to users 30 days in advance (in-app and by email). This site does not handle that. It only publishes on the date it is told.

## Page rules

- Static pages: no cookies, no analytics, no third-party scripts, no forms. They must be readable with JavaScript turned off.
- Same visual language as `/house-elf/verify` (same palette, Nunito, "House Elf" wordmark). Readable long-form layout, mobile first, light and dark mode via `prefers-color-scheme`.
- Email addresses render as `mailto:` links. The source has bare addresses (for example `privacy@fofensoft.com`); `remark-gfm` turns them into `mailto:` links automatically. Do not edit the text to add links.
- Current pages are indexable, with a proper `<title>` and an absolute canonical URL on the www host. The apex domain redirects to www.

### Anchors

- Every `##` heading gets a stable id: the heading text, slugified. For example, `## 13. DO WE COLLECT INFORMATION FROM MINORS?` → `#13-do-we-collect-information-from-minors`. Repeated headings get `-2`, `-3`, and so on.
- The privacy page also has short aliases, set in `DOCS.privacy.aliases` in `legal-pages.tsx` and keyed by section number:
  - `#rights` → section 10 (the app links to `/house-elf/privacy#rights`)
  - `#children` → section 13
  - `#contact` → section 16
- If a new version renumbers these sections, update the alias map so the aliases still point to the same subjects. On archive pages, a missing alias section does not fail the build (`strictAliases={false}`), so old versions keep building.
