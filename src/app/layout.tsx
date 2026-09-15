import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import SessionGuard from "@/components/SessionGuard";
import ThemeInitScript from "@/components/ThemeInitScript";
import AccountThemeSync from "@/components/AccountThemeSync";
import { ThemeProvider } from "@/lib/theme/ThemeContext";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import "./globals.css";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "QR Studio — Generador de Códigos QR Gratis";
const DESCRIPTION =
  "Creá códigos QR personalizados con tus colores, forma de puntos y logo, y descargalos en PNG, SVG, PDF o JPEG. Gratis y sin registro.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "generador de qr",
    "código qr gratis",
    "crear código qr",
    "qr personalizado",
    "qr con logo",
    "descargar qr png svg pdf",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  verification: {
    google: "_5_xFjWX8E_LN90p3PjkmulkVMb25tN1GOSrRtyRhc0",
  },
};

export const viewport: Viewport = {
  themeColor: "#333333",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeInitScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {ADSENSE_CLIENT_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
        <ServiceWorkerRegister />
        <SessionGuard />
        <ThemeProvider>
          <AccountThemeSync />
          <LocaleProvider>
            {children}
            <Footer />
            <CookieConsent />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
