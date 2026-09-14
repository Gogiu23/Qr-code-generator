import type { Metadata } from "next";
import HowItWorksPost from "./HowItWorksPost";

export const metadata: Metadata = {
  title: "Cómo funciona un código QR y cómo lo lee tu celular — QR Studio",
  description:
    "Un recorrido por la anatomía de un QR y el proceso que sigue una cámara para decodificarlo en milisegundos.",
};

export default function HowQrWorksPage() {
  return <HowItWorksPost />;
}
