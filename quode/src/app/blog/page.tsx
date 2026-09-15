import { pageMetadata } from "@/lib/seo";
import BlogIndex from "./BlogIndex";

export const metadata = pageMetadata({
  title: "Blog — QR Studio",
  description:
    "Guías prácticas sobre códigos QR: seguridad WiFi, tipos de contenido, corrección de errores y cómo funcionan por dentro.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return <BlogIndex />;
}
