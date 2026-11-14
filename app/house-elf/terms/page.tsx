import {
  CurrentLegalPage,
  currentMetadata,
  legalViewport,
} from "../_components/legal-pages";

export const metadata = currentMetadata("terms");
export const viewport = legalViewport;

export default function HouseElfTermsPage() {
  return <CurrentLegalPage kind="terms" />;
}
