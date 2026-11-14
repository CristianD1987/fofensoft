# House Elf legal documents

One file per published version: `privacy/<YYYY-MM-DD>.md` and `terms/<YYYY-MM-DD>.md`.

- The file name must equal the document's `Last updated` date; the build fails otherwise.
- The newest file is the current version, served at `/house-elf/privacy` and `/house-elf/terms`.
- Every file is also served permanently at `/house-elf/<doc>/<YYYY-MM-DD>` (noindex, with an "archived version" notice). The app records which version each user accepted, so **never edit or delete a published file**. To publish a change, add a new dated file.
- The build fails if any file contains `[REVIEW`.
