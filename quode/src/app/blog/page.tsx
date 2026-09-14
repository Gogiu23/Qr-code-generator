import type { Metadata } from "next";
import BlogIndex from "./BlogIndex";

export const metadata: Metadata = {
  title: "Blog — QR Studio",
  description:
    "Guías prácticas sobre códigos QR: seguridad WiFi, tipos de contenido, corrección de errores y cómo funcionan por dentro.",
};

export default function BlogIndexPage() {
  return <BlogIndex />;
}
