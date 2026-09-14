import type { Metadata } from "next";
import PrivacidadArticle from "./PrivacidadArticle";

export const metadata: Metadata = {
  title: "Política de Privacidad — QR Studio",
};

export default function PrivacidadPage() {
  return <PrivacidadArticle />;
}
