import { pageMetadata } from "@/lib/seo";
import FormatsPost from "./FormatsPost";

export const metadata = pageMetadata({
  title: "PNG, SVG, PDF o JPEG: qué formato elegir para tu código QR — QR Studio",
  description:
    "Las diferencias reales entre los cuatro formatos de descarga y cómo elegir el correcto según dónde vas a usar tu código QR.",
  path: "/blog/png-svg-pdf-o-jpeg-que-formato-elegir",
});

export default function FormatsPage() {
  return <FormatsPost />;
}
