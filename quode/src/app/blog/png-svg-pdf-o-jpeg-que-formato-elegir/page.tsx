import type { Metadata } from "next";
import FormatsPost from "./FormatsPost";

export const metadata: Metadata = {
  title: "PNG, SVG, PDF o JPEG: qué formato elegir para tu código QR — QR Studio",
  description:
    "Las diferencias reales entre los cuatro formatos de descarga y cómo elegir el correcto según dónde vas a usar tu código QR.",
};

export default function FormatsPage() {
  return <FormatsPost />;
}
