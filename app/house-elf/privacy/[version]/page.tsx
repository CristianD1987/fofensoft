import {
  ArchiveLegalPage,
  archiveMetadata,
  legalViewport,
  versionParams,
} from "../../_components/legal-pages";

type Props = { params: Promise<{ version: string }> };

// Only published versions exist; anything else is a 404.
export const dynamicParams = false;
export const viewport = legalViewport;

export function generateStaticParams() {
  return versionParams("privacy");
}

export async function generateMetadata({ params }: Props) {
  const { version } = await params;
  return archiveMetadata("privacy", version);
}

export default async function HouseElfPrivacyVersionPage({ params }: Props) {
  const { version } = await params;
  return <ArchiveLegalPage kind="privacy" version={version} />;
}
