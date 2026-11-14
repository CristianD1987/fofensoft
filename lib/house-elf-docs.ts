import { readFile } from "node:fs/promises";
import path from "node:path";

// Copies of the House Elf legal documents. The source of truth lives in the
// House Elf app repo (docs/legal/); copy them here unchanged when they change.
const docsDir = path.join(process.cwd(), "docs", "house-elf");

const REVIEW_MARKER = "[REVIEW";

/**
 * Reads a House Elf legal document. Throws (failing `next build`) if the text
 * still contains a "[REVIEW" marker, so an unreviewed draft can never ship.
 */
export async function readHouseElfDoc(filename: string) {
  const source = await readFile(path.join(docsDir, filename), "utf8");
  const index = source.indexOf(REVIEW_MARKER);
  if (index !== -1) {
    const line = source.slice(0, index).split("\n").length;
    throw new Error(
      `docs/house-elf/${filename} still contains "${REVIEW_MARKER}" (line ${line}). ` +
        "Resolve every review marker before building or publishing.",
    );
  }
  return source;
}
