import type { Metadata } from "next";
import Link from "next/link";
import { UnspokenChrome } from "../_components/unspoken-chrome";

export const metadata: Metadata = {
  title: "Unspoken Support | FOFENSOFT",
  description:
    "Get help with Unspoken — PIN, backups, privacy, and contact for FOFENSOFT S.R.L.",
};

const faqs = [
  {
    question: "I forgot my PIN.",
    answer: (
      <>
        We can&apos;t recover it. &quot;Forgot PIN?&quot; on the lock screen erases all
        data on the device and starts fresh.
      </>
    ),
  },
  {
    question: "How do I move my conversations to a new phone?",
    answer: (
      <>
        Create a password-protected backup in Settings → Your data, then import
        it on the new phone. Device backups (iCloud/Google) don&apos;t carry your
        conversations over.
      </>
    ),
  },
  {
    question: "Can you read my messages?",
    answer: <>No. Nothing is ever sent to us or anyone else.</>,
  },
  {
    question: "What does Closure do?",
    answer: (
      <>
        It permanently closes a conversation. Your words stay; you can start a
        new conversation with the same person anytime.
      </>
    ),
  },
  {
    question: "How do I delete everything?",
    answer: (
      <>
        Delete conversations in the app, use &quot;Forgot PIN?&quot;, or uninstall the
        app.
      </>
    ),
  },
];

export default function UnspokenSupportPage() {
  return (
    <UnspokenChrome>
      <article className="mx-auto max-w-[45rem]">
        <h1 className="font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          Unspoken Support
        </h1>
        <p className="mt-6 text-lg leading-[1.6] text-ink-secondary">
          Unspoken is a private space for messages you never sent; everything
          stays encrypted on your device.
        </p>

        <section className="mt-12 border-t border-cream-border pt-12">
          <h2 className="font-serif text-2xl tracking-tight text-ink sm:text-3xl">
            Contact
          </h2>
          <p className="mt-4 text-lg leading-[1.6] text-ink-secondary">
            Email{" "}
            <a
              href="mailto:office@fofensoft.com"
              className="text-ink underline decoration-cream-border underline-offset-4 transition-colors hover:text-accent-warm"
            >
              office@fofensoft.com
            </a>
            . We usually reply within a few business days.
          </p>
        </section>

        <section className="mt-12 border-t border-cream-border pt-12">
          <h2 className="font-serif text-2xl tracking-tight text-ink sm:text-3xl">
            FAQ
          </h2>
          <dl className="mt-8 space-y-8">
            {faqs.map((item) => (
              <div key={item.question}>
                <dt className="font-serif text-xl text-ink">{item.question}</dt>
                <dd className="mt-2 text-lg leading-[1.6] text-ink-secondary">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <aside
          className="mt-12 border border-cream-border bg-cream-dark px-6 py-6 sm:px-8 sm:py-8"
          role="note"
        >
          <p className="text-base leading-[1.6] text-ink sm:text-lg">
            If you&apos;re in crisis or thinking about harming yourself, contact
            your local emergency number (112 in the EU) or a crisis helpline in
            your country.
          </p>
        </aside>

        <section className="mt-12 border-t border-cream-border pt-12">
          <h2 className="font-serif text-2xl tracking-tight text-ink sm:text-3xl">
            Legal
          </h2>
          <p className="mt-4 text-lg leading-[1.6] text-ink-secondary">
            <Link
              href="/unspoken/privacy"
              className="text-ink underline decoration-cream-border underline-offset-4 transition-colors hover:text-accent-warm"
            >
              Privacy Policy
            </Link>
            {" · "}
            <Link
              href="/unspoken/terms"
              className="text-ink underline decoration-cream-border underline-offset-4 transition-colors hover:text-accent-warm"
            >
              Terms of Use
            </Link>
          </p>
        </section>
      </article>
    </UnspokenChrome>
  );
}
