import type { Metadata } from "next";
import TerminosArticle from "./TerminosArticle";

export const metadata: Metadata = {
  title: "Términos de Uso — QR Studio",
};

export default function TerminosPage() {
  return <TerminosArticle />;
}
