import type { Metadata } from "next";
import Link from "next/link";
import { HouseElfLegalChrome } from "../_components/legal-chrome";
import { legalViewport } from "../_components/legal-pages";

const title = "House Elf Support";
const description =
  "Get help with the House Elf app: contact, account deletion, subscriptions, and privacy requests.";
const url = "https://www.fofensoft.com/house-elf/support";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "article", siteName: "FOFENSOFT" },
  twitter: { card: "summary", title, description },
};
export const viewport = legalViewport;

export default function HouseElfSupportPage() {
  return (
    <HouseElfLegalChrome>
      <article className="he-prose">
        <h1 className="he-h1">House Elf Support</h1>

        <h2 id="contact" className="he-h2">Contact</h2>
        <p>
          Questions, problems or feedback? Email us at{" "}
          <a href="mailto:contact@fofensoft.com">contact@fofensoft.com</a>, we
          usually reply within 2 business days.
        </p>

        <h2 id="delete-account" className="he-h2">Account deletion</h2>
        <p>
          Delete your account anytime in the app:{" "}
          <strong>Profile → Account → Delete account</strong>. Or{" "}
          <a href="mailto:contact@fofensoft.com">email us</a> and we’ll do it
          for you.
        </p>

        <h2 id="subscriptions" className="he-h2">Subscriptions</h2>
        <p>
          House Elf Premium is managed by Apple or Google. To cancel, use{" "}
          <strong>Profile → Membership → Manage subscription</strong> in the
          app, or your App Store / Google Play subscription settings.
        </p>

        <h2 id="privacy" className="he-h2">Privacy requests</h2>
        <p>
          To access, correct or delete your personal data, see{" "}
          <Link href="/house-elf/privacy#rights">your privacy rights</Link> in
          our Privacy Policy.
        </p>

        <h2 id="legal" className="he-h2">Legal</h2>
        <ul>
          <li>
            <Link href="/house-elf/terms">Terms of Use</Link>
          </li>
          <li>
            <Link href="/house-elf/privacy">Privacy Policy</Link>
          </li>
        </ul>
      </article>
    </HouseElfLegalChrome>
  );
}
