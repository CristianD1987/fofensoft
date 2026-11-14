import type { Metadata, Viewport } from "next";
import { HouseElfLegalChrome, PRIVACY_URL } from "../_components/legal-chrome";
import { LegalDocument } from "../_components/legal-document";
import { readHouseElfDoc } from "@/lib/house-elf-docs";

const title = "House Elf Privacy Policy";
const description =
  "How FOFENSOFT S.R.L. collects, uses, and protects personal information in the House Elf app, including children's information.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: PRIVACY_URL },
  openGraph: { title, description, url: PRIVACY_URL, type: "article", siteName: "FOFENSOFT" },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6FAFB" },
    { media: "(prefers-color-scheme: dark)", color: "#021C24" },
  ],
};

export default async function HouseElfPrivacyPage() {
  const source = await readHouseElfDoc("privacy-policy.md");
  return (
    <HouseElfLegalChrome>
      <LegalDocument
        source={source}
        aliases={{ 10: ["rights"], 13: ["children"], 16: ["contact"] }}
      />
    </HouseElfLegalChrome>
  );
}
