import { Nunito } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";

// Self-hosted at build time by next/font: no request to Google at runtime.
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const PRIVACY_URL = "https://www.fofensoft.com/house-elf/privacy";
export const TERMS_URL = "https://www.fofensoft.com/house-elf/terms";
export const SUPPORT_URL = "https://www.fofensoft.com/house-elf/support";

// Same palette as /house-elf/verify (dark), plus a light counterpart.
const styles = `
  :root {
    color-scheme: light dark;
    --he-bg: #F6FAFB;
    --he-text: #0B2830;
    --he-body: #1F3E46;
    --he-muted: #45656E;
    --he-gold: #7A5200;
    --he-link: #0A5A6E;
    --he-border: #CFE1E6;
    --he-focus: #B07A12;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --he-bg: #021C24;
      --he-text: #F2FDFF;
      --he-body: #DCEFF4;
      --he-muted: #8FC3D4;
      --he-gold: #F0C46A;
      --he-link: #F0C46A;
      --he-border: #1B4D5B;
      --he-focus: #F0C46A;
    }
  }
  html, body { background: var(--he-bg); }
  .grain-overlay { display: none; }
  .he-legal {
    min-height: 100vh;
    min-height: 100dvh;
    background: var(--he-bg);
    color: var(--he-body);
    font-family: var(--he-font), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    -webkit-text-size-adjust: 100%;
  }
  .he-legal :focus-visible { outline: 3px solid var(--he-focus); outline-offset: 3px; border-radius: 4px; }
  .he-legal a { color: var(--he-link); text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
  .he-legal a:hover { text-decoration-thickness: 2px; }
  .he-brand { color: var(--he-gold); font-weight: 800; font-size: 1.5rem; letter-spacing: -0.01em; text-decoration: none !important; }

  .he-prose { font-size: 1.0625rem; line-height: 1.7; overflow-wrap: anywhere; }
  .he-prose [id] { scroll-margin-top: 1.25rem; }
  .he-prose .he-h1 { color: var(--he-text); font-size: 1.875rem; line-height: 1.2; font-weight: 800; letter-spacing: -0.01em; }
  .he-prose .he-h2 {
    color: var(--he-text); font-size: 1.1875rem; line-height: 1.35; font-weight: 800;
    letter-spacing: 0.01em; margin-top: 2.75rem; padding-top: 2rem; border-top: 1px solid var(--he-border);
  }
  .he-prose .he-h3 { color: var(--he-text); font-size: 1.0625rem; font-weight: 800; margin-top: 1.75rem; }
  .he-prose .he-alias { display: block; height: 0; }
  .he-prose p { margin-top: 1rem; }
  .he-prose .he-h1 + p { margin-top: 0.5rem; color: var(--he-muted); font-weight: 600; }
  .he-prose strong { color: var(--he-text); font-weight: 800; }
  .he-prose ul, .he-prose ol { margin-top: 1rem; padding-left: 1.5rem; }
  .he-prose ul { list-style: disc; }
  .he-prose ol { list-style: decimal; }
  .he-prose li { margin-top: 0.5rem; padding-left: 0.25rem; }
  .he-prose li > p { margin-top: 0; }
  .he-prose ul.he-toc { list-style: none; padding-left: 0; }
  .he-prose ul.he-toc li { margin-top: 0; padding-left: 0; }
  .he-prose ul.he-toc a { display: block; padding: 0.5rem 0; line-height: 1.4; }
  .he-archive-note {
    margin-bottom: 1.75rem; padding: 0.875rem 1rem;
    border: 1px solid var(--he-border); border-left: 4px solid var(--he-gold); border-radius: 10px;
    color: var(--he-text); font-weight: 600; line-height: 1.5;
  }
  .he-versions { margin-top: 2.75rem; padding-top: 2rem; border-top: 1px solid var(--he-border); line-height: 1.7; }
  .he-versions h2 { color: var(--he-text); font-size: 1.1875rem; font-weight: 800; scroll-margin-top: 1.25rem; }
  .he-versions ul { margin-top: 0.5rem; }
  .he-versions a { display: inline-block; padding: 0.375rem 0; }
  @media (min-width: 640px) {
    .he-prose { font-size: 1.125rem; }
    .he-prose .he-h1 { font-size: 2.25rem; }
    .he-prose .he-h2 { font-size: 1.375rem; }
    .he-prose ul.he-toc a { padding: 0.3rem 0; }
  }
`;

export function HouseElfLegalChrome({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${nunito.className} he-legal`}
      style={{ ["--he-font" as string]: nunito.style.fontFamily }}
    >
      <style>{styles}</style>
      <div className="mx-auto w-full max-w-[45rem] px-4 pt-8 pb-10 sm:px-6">
        <header className="flex justify-center">
          <p className="he-brand">House Elf</p>
        </header>

        <main className="mt-8">{children}</main>

        <footer
          className="mt-14 border-t pt-6 text-center text-sm leading-relaxed"
          style={{ color: "var(--he-muted)", borderColor: "var(--he-border)" }}
        >
          House Elf is an app by FOFENSOFT S.R.L. ·{" "}
          <a href="mailto:office@fofensoft.com">office@fofensoft.com</a> ·{" "}
          <Link href="/house-elf/privacy">Privacy Policy</Link> ·{" "}
          <Link href="/house-elf/terms">Terms of Use</Link> ·{" "}
          <Link href="/house-elf/support">Support</Link>
        </footer>
      </div>
    </div>
  );
}
