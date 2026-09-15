import { pageMetadata } from "@/lib/seo";
import TerminosArticle from "./TerminosArticle";

export const metadata = pageMetadata({
  title: "Términos de Uso — QR Studio",
  description: "Condiciones de uso del generador de códigos QR de QR Studio.",
  path: "/terminos",
});

export default function TerminosPage() {
  return <TerminosArticle />;
}
