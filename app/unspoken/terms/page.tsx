import type { Metadata } from "next";
import { MarkdownDocument } from "../_components/markdown-document";
import { UnspokenChrome } from "../_components/unspoken-chrome";
import { readUnspokenDoc } from "@/lib/unspoken-docs";

export const metadata: Metadata = {
  title: "Unspoken Terms of Use | FOFENSOFT",
  description:
    "Terms of use for the Unspoken app — a private space for messages you never sent.",
};

export default async function UnspokenTermsPage() {
  const source = await readUnspokenDoc("terms.md");

  return (
    <UnspokenChrome>
      <MarkdownDocument source={source} />
    </UnspokenChrome>
  );
}
