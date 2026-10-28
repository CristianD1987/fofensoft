import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delete your House Elf account | Fofensoft",
  description:
    "How to delete your House Elf account and data. House Elf is developed by Fofensoft (FOFENSOFT S.R.L.).",
};

const deletionMailto =
  "mailto:office@fofensoft.com?subject=House%20Elf%20account%20deletion%20request&body=Account%20email%3A%20%0AHouse%20name%3A%20%0AWhat%20to%20delete%20(whole%20account%20or%20a%20specific%20child%20profile)%3A%20";

const privacyPolicyUrl =
  "https://app.termly.io/policy-viewer/policy.html?policyUUID=be76427f-7bd1-43db-bd56-da0e4f348642";

export default function DeleteHouseElfAccount() {
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
        </div>
      </header>

      <main className="px-6 pt-32 pb-24 lg:px-8 lg:pt-40 lg:pb-32">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Delete your House Elf account
          </h1>
          <p className="mt-6 text-sm text-ink-muted">
            Last updated: October 28, 2026
          </p>
          <p className="mt-8 text-lg leading-relaxed text-ink-secondary">
            House Elf is a family chores app developed by Fofensoft (FOFENSOFT
            S.R.L.) and available on Google Play and the App Store. This page
            explains how to delete your House Elf account and what happens to
            your data.
          </p>

          <section className="mt-16 border-t border-cream-border pt-16">
            <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
              Delete your account in the app
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
              Account deletion is available to parent accounts. It is immediate
              and cannot be undone.
            </p>
            <ol className="mt-6 list-decimal space-y-3 pl-6 text-lg leading-relaxed text-ink-secondary">
              <li>Open House Elf and sign in with your parent account.</li>
              <li>Go to the Profile tab.</li>
              <li>Under Account, tap Delete account.</li>
              <li>
                Press and hold the Hold to delete button, then confirm with
                Face ID, your fingerprint, or your device passcode.
              </li>
            </ol>
            <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
              Deleting your account does not cancel your subscription. To stop
              being charged, cancel your subscription in Google Play (Payments
              &amp; subscriptions) or in your Apple ID settings.
            </p>
          </section>

          <section className="mt-16 border-t border-cream-border pt-16">
            <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
              Request deletion by email
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
              If you can no longer access the app, or you want us to delete a
              single child&apos;s profile without deleting your whole house,
              email us at{" "}
              <a
                href={deletionMailto}
                className="text-ink underline decoration-cream-border underline-offset-4 transition-colors hover:text-accent-warm"
              >
                office@fofensoft.com
              </a>.
            </p>
            <ul className="mt-6 list-disc space-y-3 pl-6 text-lg leading-relaxed text-ink-secondary">
              <li>
                Send the email from the address you use for your House Elf
                account.
              </li>
              <li>
                Include your house name. If you signed in with Apple and chose
                Hide My Email, also include your display name in the app so we
                can find your account.
              </li>
              <li>
                Tell us whether you want the whole account deleted or only a
                specific child&apos;s profile.
              </li>
            </ul>
            <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
              We may ask you to confirm your identity before deleting anything.
              We complete deletion requests within 30 days and confirm by
              email.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
              Children cannot delete accounts from the app. A parent can delete
              a child&apos;s data by deleting the house, or by emailing us.
            </p>
          </section>

          <section className="mt-16 border-t border-cream-border pt-16">
            <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
              What gets deleted
            </h2>
            <h3 className="font-serif mt-10 text-2xl text-ink">
              If you created the house
            </h3>
            <ul className="mt-6 list-disc space-y-3 pl-6 text-lg leading-relaxed text-ink-secondary">
              <li>Your account and sign-in</li>
              <li>
                Your house and every member profile in it, including
                children&apos;s profiles and co-parent accounts
              </li>
              <li>
                Chores, quests, rewards, wallets, reviews, reputation, messages
                and notifications
              </li>
              <li>Avatars, portraits and house images</li>
              <li>Photo consent records</li>
              <li>
                Your analytics profile and subscription customer profile held
                by our service providers
              </li>
            </ul>
            <h3 className="font-serif mt-10 text-2xl text-ink">
              If you joined someone else&apos;s house as a co-parent
            </h3>
            <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
              Your sign-in, your avatar images and the quests you created are
              deleted. The house and its other members are not affected. Your
              display name may remain in the house&apos;s history, visible to
              remaining members. Email us if you want it removed as well.
            </p>
          </section>

          <section className="mt-16 border-t border-cream-border pt-16">
            <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
              What we keep, and for how long
            </h2>
            <ul className="mt-6 list-disc space-y-3 pl-6 text-lg leading-relaxed text-ink-secondary">
              <li>
                Purchase and subscription records: kept for as long as tax and
                accounting law requires.
              </li>
              <li>Technical notification delivery logs: deleted after 90 days.</li>
              <li>
                Database backups: overwritten on a rolling basis and fully
                removed within 30 days.
              </li>
              <li>
                Photos used to create avatars are never stored by House Elf.
                They are sent to our image-generation provider only to create
                the avatar.
              </li>
              <li>
                Some service providers (crash reporting and install
                attribution) may keep limited pseudonymous technical data under
                their own retention periods.
              </li>
            </ul>
          </section>

          <section className="mt-16 border-t border-cream-border pt-16">
            <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
              Contact
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
              FOFENSOFT S.R.L., developer of House Elf. Email{" "}
              <a
                href="mailto:office@fofensoft.com"
                className="text-ink underline decoration-cream-border underline-offset-4 transition-colors hover:text-accent-warm"
              >
                office@fofensoft.com
              </a>. Privacy questions:{" "}
              <a
                href="mailto:privacy@fofensoft.com"
                className="text-ink underline decoration-cream-border underline-offset-4 transition-colors hover:text-accent-warm"
              >
                privacy@fofensoft.com
              </a>. Read our{" "}
              <a
                href={privacyPolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline decoration-cream-border underline-offset-4 transition-colors hover:text-accent-warm"
              >
                Privacy Policy
              </a>.
            </p>
          </section>
        </article>
      </main>

      <footer className="border-t border-cream-border bg-cream-dark px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 FOFENSOFT S.R.L.</p>
          <p className="sm:text-right">
            CUI RO47274231 · J23/8314/2022 · Sos. Bucuresti Nord Nr. 10B,
            Voluntari, Ilfov, Romania
          </p>
        </div>
      </footer>
    </>
  );
}
