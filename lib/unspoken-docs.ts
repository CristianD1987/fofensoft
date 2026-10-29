import { readFile } from "node:fs/promises";
import path from "node:path";

const docsDir = path.join(process.cwd(), "docs", "unspoken");

export async function readUnspokenDoc(filename: string) {
  return readFile(path.join(docsDir, filename), "utf8");
}
