import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { Suspense } from "react";
import VerifyCard from "./verify-card";

// Self-hosted at build time by next/font: no request to Google at runtime.
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Confirm you're a parent or guardian | House Elf",
  description: "House Elf parental confirmation.",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
  openGraph: null,
  twitter: null,
};

export const viewport: Viewport = {
  themeColor: "#021C24",
};

const privacyPolicyUrl =
  "https://app.termly.io/policy-viewer/policy.html?policyUUID=be76427f-7bd1-43db-bd56-da0e4f348642";

export default function HouseElfVerifyPage() {
  return (
    <div className={`${nunito.className} he-page`}>
      <style>{`
        html, body { background: #021C24; }
        .he-page {
          min-height: 100vh;
          min-height: 100dvh;
          background: #021C24;
          color: #F2FDFF;
          font-family: ${nunito.style.fontFamily}, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
          -webkit-text-size-adjust: 100%;
        }
        .he-page :focus-visible {
          outline: 3px solid #F0C46A;
          outline-offset: 3px;
          border-radius: 6px;
        }
        .he-page a { color: #F2FDFF; text-decoration: underline; text-underline-offset: 3px; }
        .he-btn {
          display: flex; align-items: center; justify-content: center;
          width: 100%; min-height: 56px; padding: 14px 20px;
          border: 0; border-radius: 16px;
          background: #F0C46A; color: #03262F;
          font: inherit; font-size: 1.0625rem; font-weight: 800;
          cursor: pointer; touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          transition: filter 120ms ease, transform 120ms ease;
        }
        .he-btn:hover:not(:disabled) { filter: brightness(1.06); }
        .he-btn:active:not(:disabled) { transform: scale(0.99); }
        .he-btn:disabled { opacity: 0.75; cursor: progress; }
        .he-btn:focus-visible { outline-offset: 4px; border-radius: 16px; }
        .he-page a.he-btn { color: #03262F; text-decoration: none; }
        .he-page a.he-link {
          display: flex; align-items: center; justify-content: center;
          min-height: 48px; padding: 8px 16px;
          color: #F0C46A; font-weight: 800; font-size: 1.0625rem;
          text-decoration: underline; text-underline-offset: 4px;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>

      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[480px] flex-col px-4 pt-8 pb-10">
        <header className="flex justify-center">
          <p
            className="text-2xl font-extrabold tracking-tight"
            style={{ color: "#F0C46A" }}
          >
            House Elf
          </p>
        </header>

        <main className="mt-8 flex-1">
          <Suspense fallback={<CardShell />}>
            <VerifyCard />
          </Suspense>
        </main>

        <footer
          className="mt-10 text-center text-sm leading-relaxed"
          style={{ color: "#8FC3D4" }}
        >
          House Elf is an app by FOFENSOFT S.R.L. ·{" "}
          <a href="mailto:office@fofensoft.com">office@fofensoft.com</a> ·{" "}
          <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
        </footer>
      </div>
    </div>
  );
}

function CardShell() {
  return (
    <div
      className="min-h-[320px] rounded-3xl border"
      style={{ background: "#0A3440", borderColor: "#1B4D5B" }}
      aria-hidden
    />
  );
}
