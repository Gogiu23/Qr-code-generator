import type { Metadata } from "next";
import HistoriaArticle from "./HistoriaArticle";

export const metadata: Metadata = {
  title: "Historia del código QR y el código de barras — QR Studio",
  description:
    "De una playa en Miami a las fábricas de Toyota: la historia real de cómo nacieron el código de barras y el código QR.",
};

export default function HistoriaPage() {
  return <HistoriaArticle />;
}
