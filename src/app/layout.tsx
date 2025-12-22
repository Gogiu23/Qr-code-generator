import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { GlobalProvider } from "@/context/GlobalContext";
import { GlobalCornersProvider } from "@/context/GlobalCornersFunctions";

const robotoSans = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qr Generator",
  description: "Generate Qr fast as blast",
  openGraph: {
    siteName: "Quode",
    url: "https://quode.netlify.app",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/ac6060b2-d301-4f0f-9c97-3ef27dcbd991.png?token=CZNmjDOVVzx5mdK5MmjiotayEyDQTmOs6a6-fA9fn5Y&height=1024&width=1024&expires=33296550843",
        width: 200,
        height: 200,
      },
    ],
    locale: "en_EN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qr Generator",
    description: "Generate Qr fast as blast",
    images: [
      "https://opengraph.b-cdn.net/production/images/ac6060b2-d301-4f0f-9c97-3ef27dcbd991.png?token=CZNmjDOVVzx5mdK5MmjiotayEyDQTmOs6a6-fA9fn5Y&height=1024&width=1024&expires=33296550843",
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#134686",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoSans.variable}  antialiased`}>
        <GlobalProvider>
          <GlobalCornersProvider>{children}</GlobalCornersProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
