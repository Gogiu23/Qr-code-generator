import { pageMetadata } from "@/lib/seo";
import ErrorCorrectionPost from "./ErrorCorrectionPost";

export const metadata = pageMetadata({
  title: "Niveles de corrección de errores en un QR: L, M, Q y H explicados — QR Studio",
  description:
    "Qué significa cada nivel de corrección de errores en un código QR, cuándo conviene cada uno y por qué importa si vas a poner un logo.",
  path: "/blog/correccion-de-errores-en-qr",
});

export default function ErrorCorrectionPage() {
  return <ErrorCorrectionPost />;
}
