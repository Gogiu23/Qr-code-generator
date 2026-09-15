import { pageMetadata } from "@/lib/seo";
import PrivacidadArticle from "./PrivacidadArticle";

export const metadata = pageMetadata({
  title: "Política de Privacidad — QR Studio",
  description: "Cómo QR Studio trata tus datos, cookies y publicidad personalizada.",
  path: "/privacidad",
});

export default function PrivacidadPage() {
  return <PrivacidadArticle />;
}
