import {
  CurrentLegalPage,
  currentMetadata,
  legalViewport,
} from "../_components/legal-pages";

export const metadata = currentMetadata("privacy");
export const viewport = legalViewport;

export default function HouseElfPrivacyPage() {
  return <CurrentLegalPage kind="privacy" />;
}
