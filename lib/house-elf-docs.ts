import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

/**
 * House Elf legal documents, one immutable file per published version:
 *   content/house-elf/<doc>/<YYYY-MM-DD>.md
 * The file name is the version's "Last updated" date. The newest file is the
 * current version. Published files must never be edited: the app records
 * which version each user accepted, and /house-elf/<doc>/<date> serves it.
 */
export type HouseElfDocKind = "privacy" | "terms";

export type HouseElfDocVersion = {
  /** YYYY-MM-DD, from the file name. */
  version: string;
  /** "November 14, 2026", as written in the "Last updated" line. */
  label: string;
  source: string;
};

const contentDir = path.join(process.cwd(), "content", "house-elf");
const VERSION_FILE = /^(\d{4}-\d{2}-\d{2})\.md$/;
const REVIEW_MARKER = "[REVIEW";
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function fail(file: string, message: string): never {
  throw new Error(`content/house-elf/${file}: ${message}`);
}

function checkVersion(file: string, version: string, source: string) {
  const index = source.indexOf(REVIEW_MARKER);
  if (index !== -1) {
    const line = source.slice(0, index).split("\n").length;
    fail(
      file,
      `still contains "${REVIEW_MARKER}" (line ${line}). Resolve every review marker before building or publishing.`,
    );
  }

  const m = /^Last updated (\w+) (\d{1,2}), (\d{4})\s*$/m.exec(source);
  if (!m) fail(file, 'has no "Last updated <Month> <D>, <YYYY>" line.');
  const month = MONTHS.indexOf(m[1]) + 1;
  if (month === 0) fail(file, `unknown month "${m[1]}" in the "Last updated" line.`);
  const date = `${m[3]}-${String(month).padStart(2, "0")}-${m[2].padStart(2, "0")}`;
  if (date !== version) {
    fail(file, `file name says ${version} but its "Last updated" line says ${date}.`);
  }
  return `${m[1]} ${Number(m[2])}, ${m[3]}`;
}

/** All published versions of a document, newest first. Fails the build on any
 * malformed file. */
export async function listHouseElfVersions(
  kind: HouseElfDocKind,
): Promise<HouseElfDocVersion[]> {
  const dir = path.join(contentDir, kind);
  const files = (await readdir(dir)).filter((f) => f.endsWith(".md"));
  const versions: HouseElfDocVersion[] = [];
  for (const file of files) {
    const m = VERSION_FILE.exec(file);
    if (!m) fail(`${kind}/${file}`, "file name must be YYYY-MM-DD.md.");
    const source = await readFile(path.join(dir, file), "utf8");
    const label = checkVersion(`${kind}/${file}`, m[1], source);
    versions.push({ version: m[1], label, source });
  }
  if (versions.length === 0) fail(kind, "no versions found.");
  return versions.sort((a, b) => (a.version < b.version ? 1 : -1));
}
