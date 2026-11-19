import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { Archivo_Black, Inter } from "next/font/google";
import Link from "next/link";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Self-hosted at build time by next/font: no requests to Google from the browser.
const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bb-display",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-bb-text" });

export const metadata: Metadata = {
  title: "Black Box — Privacy Policy",
  description: "Privacy policy for Black Box, a mobile game by Fofensoft.",
  robots: { index: true, follow: true },
};

// Game palette.
const BG = "#FAF7F0";
const TEXT = "#111111";
const ACCENT = "#FF5A36";
const MUTED = "#6B6862";

async function readPolicy() {
  const source = await readFile(
    path.join(process.cwd(), "content", "blackbox", "privacy.md"),
    "utf8",
  );
  return (
    source
      .replace(/\r\n?/g, "\n")
      // The editorial HTML comment is not part of the published text.
      .replace(/<!--[\s\S]*?-->\s*/g, "")
      // Keep "**Effective date:** …" / "**Developer:** …" / "**Contact:** …" on separate lines.
      .replace(/^(\*\*[^*\n]+:\*\*.*)\n(?=\*\*[^*\n]+:\*\*)/gm, "$1\\\n")
  );
}

const components: Components = {
  h1: ({ children }) => (
    <h1
      className="text-[2rem] leading-tight sm:text-[2.5rem]"
      style={{ fontFamily: "var(--font-bb-display), system-ui, sans-serif" }}
    >
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 text-xl font-bold leading-snug sm:text-2xl">
      {children}
    </h2>
  ),
  p: ({ children }) => <p className="mt-4">{children}</p>,
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6">{children}</ul>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="break-words underline underline-offset-2"
      style={{ color: ACCENT }}
    >
      {children}
    </a>
  ),
};

export default async function BlackBoxPrivacyPage() {
  const source = await readPolicy();

  return (
    <div
      className={`${archivoBlack.variable} ${inter.variable} flex min-h-screen flex-col`}
      style={{
        backgroundColor: BG,
        color: TEXT,
        fontFamily:
          "var(--font-bb-text), system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <header className="px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-[70ch]">
          <Link
            href="/"
            className="text-sm font-semibold tracking-wide"
            style={{ color: MUTED }}
          >
            FOFENSOFT
          </Link>
        </div>
      </header>

      <main className="flex-1 px-4 pt-6 pb-16 sm:px-6">
        <article className="mx-auto max-w-[70ch] text-base leading-[1.65] sm:text-[1.0625rem]">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {source}
          </ReactMarkdown>
        </article>
      </main>

      <footer className="px-4 py-8 text-sm sm:px-6" style={{ color: MUTED }}>
        <div className="mx-auto max-w-[70ch]">
          <p>© 2026 FOFENSOFT S.R.L.</p>
        </div>
      </footer>
    </div>
  );
}
