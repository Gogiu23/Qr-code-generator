import { pageMetadata } from "@/lib/seo";
import QrTypesPost from "./QrTypesPost";

export const metadata = pageMetadata({
  title:
    "URL, texto, teléfono, email o WiFi: qué tipo de QR conviene en cada caso — QR Studio",
  description:
    "Guía rápida para elegir el tipo de contenido correcto según lo que querés lograr con tu código QR.",
  path: "/blog/que-tipo-de-qr-elegir",
});

export default function QrTypesPage() {
  return <QrTypesPost />;
}
