import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Minimal mdast shape; enough for the transforms below.
type MdNode = {
  type: string;
  value?: string;
  depth?: number;
  start?: number | null;
  url?: string;
  children?: MdNode[];
  data?: { hProperties?: Record<string, unknown> };
};

/** "13. DO WE COLLECT INFORMATION FROM MINORS?" → "13-do-we-collect-information-from-minors" */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function textOf(node: MdNode): string {
  if (node.type === "text" || node.type === "inlineCode") return node.value ?? "";
  if (node.type === "break") return " ";
  return (node.children ?? []).map(textOf).join("");
}

function sectionNumber(text: string) {
  const m = /^(\d+)\.\s/.exec(text.trim());
  return m ? Number(m[1]) : null;
}

/** All `##` headings with their generated anchor ids, in document order. */
export function headingAnchors(tree: MdNode) {
  const used = new Map<string, number>();
  const out: { node: MdNode; text: string; id: string }[] = [];
  for (const node of tree.children ?? []) {
    if (node.type !== "heading" || node.depth !== 2) continue;
    const text = textOf(node);
    let id = slugify(text);
    const n = used.get(id) ?? 0;
    used.set(id, n + 1);
    if (n > 0) id = `${id}-${n + 1}`;
    out.push({ node, text, id });
  }
  return out;
}

/** Turns single newlines inside paragraphs into line breaks, so line-per-item
 * passages in the source render one item per line, exactly as written. */
function hardBreaks(node: MdNode) {
  if (!node.children) return;
  const next: MdNode[] = [];
  for (const child of node.children) {
    if (child.type === "text" && child.value?.includes("\n")) {
      child.value.split(/\r?\n/).forEach((part, i) => {
        if (i > 0) next.push({ type: "break" });
        if (part) next.push({ type: "text", value: part });
      });
    } else {
      if (child.type !== "code" && child.type !== "inlineCode") hardBreaks(child);
      next.push(child);
    }
  }
  node.children = next;
}

/** Gives every `##` an id, and links each table-of-contents entry to the
 * heading with the same section number. */
function remarkLegal() {
  return (tree: MdNode) => {
    const anchors = headingAnchors(tree);
    const idByNumber = new Map<number, string>();
    for (const a of anchors) {
      a.node.data = { ...a.node.data, hProperties: { id: a.id } };
      const n = sectionNumber(a.text);
      if (n !== null && !idByNumber.has(n)) idByNumber.set(n, a.id);
    }

    const children = tree.children ?? [];
    const tocIndex = children.findIndex(
      (c) =>
        c.type === "heading" &&
        c.depth === 2 &&
        textOf(c).trim().toUpperCase() === "TABLE OF CONTENTS",
    );
    const toc = tocIndex === -1 ? undefined : children[tocIndex + 1];
    if (toc?.type === "list") {
      toc.data = { ...toc.data, hProperties: { className: "he-toc" } };
      for (const item of toc.children ?? []) {
        // "- 1. TITLE" parses as a bullet holding an ordered list starting at 1.
        const inner = item.children?.[0];
        let label: string;
        let n: number | null;
        if (inner?.type === "list" && typeof inner.start === "number") {
          n = inner.start;
          label = `${inner.start}. ${textOf(inner)}`;
        } else {
          label = textOf(item);
          n = sectionNumber(label);
        }
        const id = n === null ? undefined : idByNumber.get(n);
        if (!id) {
          throw new Error(`Table of contents entry has no matching section: "${label}"`);
        }
        item.children = [
          {
            type: "paragraph",
            children: [{ type: "link", url: `#${id}`, children: [{ type: "text", value: label }] }],
          },
        ];
      }
    }

    hardBreaks(tree);
  };
}

function makeComponents(aliasesById: Record<string, string[]>): Components {
  return {
    h1: ({ children }) => <h1 className="he-h1">{children}</h1>,
    h2: ({ id, children }) => (
      <h2 id={id} className="he-h2">
        {(id ? aliasesById[id] ?? [] : []).map((alias) => (
          <span key={alias} id={alias} className="he-alias" aria-hidden />
        ))}
        {children}
      </h2>
    ),
    h3: ({ id, children }) => (
      <h3 id={id} className="he-h3">
        {children}
      </h3>
    ),
    a: ({ href, children }) => {
      const external = href?.startsWith("http");
      return (
        <a href={href} {...(external ? { rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  };
}

export function LegalDocument({
  source,
  aliases = {},
  strictAliases = true,
}: {
  source: string;
  /** Extra anchor ids per section number, e.g. { 13: ["children"] }. */
  aliases?: Record<number, string[]>;
  /** Fail the build if an alias's section is missing (off for archived texts). */
  strictAliases?: boolean;
}) {
  // Resolve section-number aliases to heading ids using the same slugging.
  const aliasesById: Record<string, string[]> = {};
  for (const line of source.split(/\r?\n/)) {
    const m = /^##\s+(.*)$/.exec(line);
    if (!m) continue;
    const n = sectionNumber(m[1]);
    if (n !== null && aliases[n]) aliasesById[slugify(m[1])] = aliases[n];
  }
  for (const [n, ids] of Object.entries(aliases)) {
    if (strictAliases && !Object.values(aliasesById).includes(ids)) {
      throw new Error(`Alias ${ids.join(", ")} points to missing section ${n}`);
    }
  }

  return (
    <article className="he-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkLegal]}
        components={makeComponents(aliasesById)}
      >
        {source}
      </ReactMarkdown>
    </article>
  );
}
