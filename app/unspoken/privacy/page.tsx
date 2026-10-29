import type { Metadata } from "next";
import { MarkdownDocument } from "../_components/markdown-document";
import { UnspokenChrome } from "../_components/unspoken-chrome";
import { readUnspokenDoc } from "@/lib/unspoken-docs";

export const metadata: Metadata = {
  title: "Unspoken Privacy Policy | FOFENSOFT",
  description:
    "Unspoken does not collect, receive, or share your data. Everything stays on your device, encrypted.",
};

export default async function UnspokenPrivacyPage() {
  const source = await readUnspokenDoc("privacy-policy.md");

  return (
    <UnspokenChrome>
      <MarkdownDocument source={source} />
    </UnspokenChrome>
  );
}
