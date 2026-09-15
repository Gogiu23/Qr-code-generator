import { Locale } from "@/lib/i18n/locale";

export interface BlogIndexPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

export interface BlogIndexContent {
  heading: string;
  intro: string;
  posts: BlogIndexPost[];
}

const SLUGS = [
  "png-svg-pdf-o-jpeg-que-formato-elegir",
  "wifi-wpa-wep-o-ninguna",
  "que-tipo-de-qr-elegir",
  "correccion-de-errores-en-qr",
  "como-funciona-un-codigo-qr",
] as const;

export const BLOG_INDEX_CONTENT: Record<Locale, BlogIndexContent> = {
  es: {
    heading: "Blog",
    intro:
      "Guías cortas y prácticas sobre códigos QR: cómo elegirlos, configurarlos y entender qué pasa por dentro cuando los escaneás.",
    posts: [
      {
        slug: SLUGS[0],
        title: "PNG, SVG, PDF o JPEG: qué formato elegir para tu código QR",
        excerpt:
          "Las diferencias reales entre los cuatro formatos de descarga y cómo elegir el correcto según dónde vas a usar tu QR.",
        date: "15/09/2026",
      },
      {
        slug: SLUGS[1],
        title: "WPA, WEP o ninguna: qué seguridad elegir para tu QR de WiFi",
        excerpt:
          "La diferencia entre WPA, WEP y una red abierta, y cómo saber cuál elegir para que tu código QR conecte a la primera.",
        date: "15/09/2026",
      },
      {
        slug: SLUGS[2],
        title: "URL, texto, teléfono, email o WiFi: qué tipo de QR conviene en cada caso",
        excerpt:
          "Guía rápida para elegir el tipo de contenido correcto según lo que querés lograr con tu código QR.",
        date: "15/09/2026",
      },
      {
        slug: SLUGS[3],
        title: "Niveles de corrección de errores en un QR: L, M, Q y H explicados",
        excerpt:
          "Qué significa cada nivel de corrección de errores, cuándo conviene cada uno y por qué importa si vas a poner un logo.",
        date: "15/09/2026",
      },
      {
        slug: SLUGS[4],
        title: "Cómo funciona un código QR y cómo lo lee tu celular",
        excerpt:
          "Un recorrido por la anatomía de un QR y el proceso que sigue una cámara para decodificarlo en milisegundos.",
        date: "15/09/2026",
      },
    ],
  },
  en: {
    heading: "Blog",
    intro:
      "Short, practical guides on QR codes: how to choose them, configure them, and understand what happens under the hood when you scan them.",
    posts: [
      {
        slug: SLUGS[0],
        title: "PNG, SVG, PDF, or JPEG: which format to choose for your QR code",
        excerpt:
          "The real differences between the four download formats and how to pick the right one for where you'll use your QR code.",
        date: "09/15/2026",
      },
      {
        slug: SLUGS[1],
        title: "WPA, WEP, or none: which security to pick for your WiFi QR code",
        excerpt:
          "The difference between WPA, WEP, and an open network, and how to know which one to pick so your QR code connects on the first try.",
        date: "09/15/2026",
      },
      {
        slug: SLUGS[2],
        title: "URL, text, phone, email, or WiFi: which QR type fits each case",
        excerpt:
          "A quick guide to choosing the right content type based on what you're trying to achieve with your QR code.",
        date: "09/15/2026",
      },
      {
        slug: SLUGS[3],
        title: "Error correction levels in a QR code: L, M, Q, and H explained",
        excerpt:
          "What each error-correction level means, when to use each one, and why it matters if you're adding a logo.",
        date: "09/15/2026",
      },
      {
        slug: SLUGS[4],
        title: "How a QR code works and how your phone reads it",
        excerpt:
          "A walkthrough of a QR code's anatomy and the process a camera follows to decode it in milliseconds.",
        date: "09/15/2026",
      },
    ],
  },
  it: {
    heading: "Blog",
    intro:
      "Guide brevi e pratiche sui codici QR: come sceglierli, configurarli e capire cosa succede dietro le quinte quando li scansioni.",
    posts: [
      {
        slug: SLUGS[0],
        title: "PNG, SVG, PDF o JPEG: quale formato scegliere per il tuo codice QR",
        excerpt:
          "Le differenze reali tra i quattro formati di download e come scegliere quello giusto in base a dove userai il tuo QR.",
        date: "15/09/2026",
      },
      {
        slug: SLUGS[1],
        title: "WPA, WEP o nessuna: quale sicurezza scegliere per il tuo QR WiFi",
        excerpt:
          "La differenza tra WPA, WEP e una rete aperta, e come sapere quale scegliere perché il tuo QR si connetta al primo tentativo.",
        date: "15/09/2026",
      },
      {
        slug: SLUGS[2],
        title: "URL, testo, telefono, email o WiFi: quale tipo di QR conviene in ogni caso",
        excerpt:
          "Guida rapida per scegliere il tipo di contenuto giusto in base a cosa vuoi ottenere con il tuo codice QR.",
        date: "15/09/2026",
      },
      {
        slug: SLUGS[3],
        title: "Livelli di correzione d'errore in un QR: L, M, Q e H spiegati",
        excerpt:
          "Cosa significa ogni livello di correzione d'errore, quando conviene ciascuno e perché è importante se aggiungi un logo.",
        date: "15/09/2026",
      },
      {
        slug: SLUGS[4],
        title: "Come funziona un codice QR e come lo legge il tuo telefono",
        excerpt:
          "Un percorso nell'anatomia di un QR e nel processo che una fotocamera segue per decodificarlo in millisecondi.",
        date: "15/09/2026",
      },
    ],
  },
};
