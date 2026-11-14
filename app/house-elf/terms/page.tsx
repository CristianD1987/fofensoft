import type { Metadata, Viewport } from "next";
import { HouseElfLegalChrome, TERMS_URL } from "../_components/legal-chrome";
import { LegalDocument } from "../_components/legal-document";
import { readHouseElfDoc } from "@/lib/house-elf-docs";

const title = "House Elf Terms of Use";
const description =
  "The terms that govern use of the House Elf app and House Elf Premium, provided by FOFENSOFT S.R.L.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: TERMS_URL },
  openGraph: { title, description, url: TERMS_URL, type: "article", siteName: "FOFENSOFT" },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6FAFB" },
    { media: "(prefers-color-scheme: dark)", color: "#021C24" },
  ],
};

export default async function HouseElfTermsPage() {
  const source = await readHouseElfDoc("terms-of-use.md");
  return (
    <HouseElfLegalChrome>
      <LegalDocument source={source} />
    </HouseElfLegalChrome>
  );
}
