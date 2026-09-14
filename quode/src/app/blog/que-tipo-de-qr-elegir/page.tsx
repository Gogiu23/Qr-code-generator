import type { Metadata } from "next";
import QrTypesPost from "./QrTypesPost";

export const metadata: Metadata = {
  title:
    "URL, texto, teléfono, email o WiFi: qué tipo de QR conviene en cada caso — QR Studio",
  description:
    "Guía rápida para elegir el tipo de contenido correcto según lo que querés lograr con tu código QR.",
};

export default function QrTypesPage() {
  return <QrTypesPost />;
}
