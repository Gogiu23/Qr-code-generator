import type { Metadata } from "next";

export const SITE_URL = "https://qrtuo.com";
export const SITE_NAME = "QR Studio";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description?: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
