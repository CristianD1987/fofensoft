import type { Metadata } from "next";
import Link from "next/link";
import { UnspokenChrome } from "./_components/unspoken-chrome";

export const metadata: Metadata = {
  title: "Unspoken | FOFENSOFT",
  description:
    "Privacy policy, terms of use, and support for Unspoken — a private space for messages you never sent.",
};

const links = [
  {
    href: "/unspoken/privacy",
    title: "Privacy Policy",
    description: "How Unspoken handles your data — everything stays on your device.",
  },
  {
    href: "/unspoken/terms",
    title: "Terms of Use",
    description: "The rules for using the Unspoken app.",
  },
  {
    href: "/unspoken/support",
    title: "Support",
    description: "Contact us, FAQs, and help with backups, PIN, and more.",
  },
];

export default function UnspokenIndexPage() {
  return (
    <UnspokenChrome>
      <div className="mx-auto max-w-[45rem]">
        <p className="eyebrow">Unspoken</p>
        <h1 className="font-serif mt-4 text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          Unspoken
        </h1>
        <p className="mt-6 text-lg leading-[1.6] text-ink-secondary">
          Unspoken is a private space for messages you never sent. Everything
          stays encrypted on your device. Find legal information and support
          below.
        </p>
        <ul className="mt-12 space-y-6">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group block border border-cream-border bg-cream p-6 transition-colors hover:border-accent-warm/40 sm:p-8"
              >
                <h2 className="font-serif text-2xl text-ink transition-colors group-hover:text-accent-warm">
                  {item.title}
                </h2>
                <p className="mt-2 text-base leading-[1.6] text-ink-secondary">
                  {item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </UnspokenChrome>
  );
}
