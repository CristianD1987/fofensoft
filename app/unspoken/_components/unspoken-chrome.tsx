import Link from "next/link";
import type { ReactNode } from "react";

export function UnspokenChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-cream-border bg-cream/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <Link
            href="/"
            className="font-serif text-lg tracking-tight text-ink transition-colors hover:text-accent-warm"
          >
            FOFENSOFT
          </Link>
          <Link
            href="/unspoken"
            className="text-sm text-ink-secondary transition-colors hover:text-ink"
          >
            Unspoken
          </Link>
        </div>
      </header>

      <main className="px-6 pt-32 pb-16 lg:px-8 lg:pt-40 lg:pb-20">
        {children}
      </main>

      <footer className="border-t border-cream-border bg-cream-dark px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-[45rem]">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-secondary">
            <Link
              href="/unspoken/privacy"
              className="transition-colors hover:text-ink"
            >
              Privacy Policy
            </Link>
            <Link
              href="/unspoken/terms"
              className="transition-colors hover:text-ink"
            >
              Terms of Use
            </Link>
            <Link
              href="/unspoken/support"
              className="transition-colors hover:text-ink"
            >
              Support
            </Link>
          </nav>
          <div className="mt-8 flex max-w-6xl flex-col gap-4 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 FOFENSOFT S.R.L.</p>
            <p className="sm:text-right">
              CUI RO47274231 · J23/8314/2022 · Sos. Bucuresti Nord Nr. 10B,
              Voluntari, Ilfov, Romania
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
