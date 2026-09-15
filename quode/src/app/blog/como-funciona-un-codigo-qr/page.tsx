import { pageMetadata } from "@/lib/seo";
import HowItWorksPost from "./HowItWorksPost";

export const metadata = pageMetadata({
  title: "Cómo funciona un código QR y cómo lo lee tu celular — QR Studio",
  description:
    "Un recorrido por la anatomía de un QR y el proceso que sigue una cámara para decodificarlo en milisegundos.",
  path: "/blog/como-funciona-un-codigo-qr",
});

export default function HowQrWorksPage() {
  return <HowItWorksPost />;
}
