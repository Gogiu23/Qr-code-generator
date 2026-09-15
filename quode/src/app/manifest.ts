import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Generador de Códigos QR Gratis`,
    short_name: SITE_NAME,
    description:
      "Creá códigos QR personalizados con tus colores, forma de puntos y logo, y descargalos listos para usar.",
    start_url: "/",
    display: "standalone",
    background_color: "#EAFFD0",
    theme_color: "#333333",
    icons: [
      { src: "/icons/icon-192", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
