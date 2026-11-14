import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HouseElfLegalChrome } from "./legal-chrome";
import { LegalDocument } from "./legal-document";
import {
  listHouseElfVersions,
  type HouseElfDocKind,
} from "@/lib/house-elf-docs";

const SITE = "https://www.fofensoft.com";

const DOCS: Record<
  HouseElfDocKind,
  { title: string; description: string; aliases?: Record<number, string[]> }
> = {
  privacy: {
    title: "House Elf Privacy Policy",
    description:
      "How FOFENSOFT S.R.L. collects, uses, and protects personal information in the House Elf app, including children's information.",
    aliases: { 10: ["rights"], 13: ["children"], 16: ["contact"] },
  },
  terms: {
    title: "House Elf Terms of Use",
    description:
      "The terms that govern use of the House Elf app and House Elf Premium, provided by FOFENSOFT S.R.L.",
  },
};

const currentPath = (kind: HouseElfDocKind) => `/house-elf/${kind}`;
const versionPath = (kind: HouseElfDocKind, version: string) =>
  `/house-elf/${kind}/${version}`;

export const legalViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6FAFB" },
    { media: "(prefers-color-scheme: dark)", color: "#021C24" },
  ],
};

// ---- Current version: /house-elf/<kind> ------------------------------------

export function currentMetadata(kind: HouseElfDocKind): Metadata {
  const { title, description } = DOCS[kind];
  const url = SITE + currentPath(kind);
  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", siteName: "FOFENSOFT" },
    twitter: { card: "summary", title, description },
  };
}

export async function CurrentLegalPage({ kind }: { kind: HouseElfDocKind }) {
  const versions = await listHouseElfVersions(kind);
  const current = versions[0];
  return (
    <HouseElfLegalChrome>
      <LegalDocument source={current.source} aliases={DOCS[kind].aliases} />
      <section aria-labelledby="previous-versions" className="he-versions">
        <h2 id="previous-versions">Previous versions</h2>
        <ul>
          {versions.map((v) => (
            <li key={v.version}>
              <Link href={versionPath(kind, v.version)}>{v.label}</Link>
            </li>
          ))}
        </ul>
      </section>
    </HouseElfLegalChrome>
  );
}

// ---- Archived version: /house-elf/<kind>/<YYYY-MM-DD> ----------------------

export async function versionParams(kind: HouseElfDocKind) {
  const versions = await listHouseElfVersions(kind);
  return versions.map((v) => ({ version: v.version }));
}

async function findVersion(kind: HouseElfDocKind, version: string) {
  const versions = await listHouseElfVersions(kind);
  return versions.find((v) => v.version === version);
}

export async function archiveMetadata(
  kind: HouseElfDocKind,
  version: string,
): Promise<Metadata> {
  const v = await findVersion(kind, version);
  if (!v) return {};
  const title = `${DOCS[kind].title} (${v.label})`;
  const url = SITE + versionPath(kind, version);
  return {
    title,
    description: `Archived version of the ${DOCS[kind].title}, last updated ${v.label}.`,
    robots: { index: false },
    alternates: { canonical: url },
    openGraph: { title, url, type: "article", siteName: "FOFENSOFT" },
    twitter: { card: "summary", title },
  };
}

export async function ArchiveLegalPage({
  kind,
  version,
}: {
  kind: HouseElfDocKind;
  version: string;
}) {
  const v = await findVersion(kind, version);
  if (!v) notFound();
  return (
    <HouseElfLegalChrome>
      <p role="note" className="he-archive-note">
        This is an archived version ({v.label}). The current version is{" "}
        <Link href={currentPath(kind)}>here</Link>.
      </p>
      <LegalDocument
        source={v.source}
        aliases={DOCS[kind].aliases}
        strictAliases={false}
      />
    </HouseElfLegalChrome>
  );
}
