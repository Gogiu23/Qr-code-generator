import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/historia", priority: 0.6, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blog/wifi-wpa-wep-o-ninguna", priority: 0.6, changeFrequency: "yearly" },
  { path: "/blog/que-tipo-de-qr-elegir", priority: 0.6, changeFrequency: "yearly" },
  { path: "/blog/correccion-de-errores-en-qr", priority: 0.6, changeFrequency: "yearly" },
  { path: "/blog/como-funciona-un-codigo-qr", priority: 0.6, changeFrequency: "yearly" },
  { path: "/blog/png-svg-pdf-o-jpeg-que-formato-elegir", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacidad", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terminos", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
