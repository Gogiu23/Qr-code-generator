import { Locale } from "@/lib/i18n/locale";
import { Block } from "@/lib/i18n/articleBlocks";

export interface PrivacidadContent {
  title: string;
  updated: string;
  intro: string;
  blocks: Block[];
}

export const PRIVACIDAD_CONTENT: Record<Locale, PrivacidadContent> = {
  es: {
    title: "Política de Privacidad",
    updated: "14/09/2026",
    intro:
      "Este sitio (**QR Studio**) es operado por Giulian Dominici, en adelante “el titular”. Contacto: [giuliandominici@gmail.com](mailto:giuliandominici@gmail.com).",
    blocks: [
      { type: "h2", text: "1. Datos que recopilamos" },
      {
        type: "p",
        text:
          "Si creás una cuenta, almacenamos tu email y los códigos QR que guardés (título, contenido y opciones de diseño) a través de nuestro proveedor de base de datos, Appwrite. No vendemos ni compartimos estos datos con terceros para fines de marketing.",
      },
      { type: "h2", text: "2. Cookies y publicidad" },
      {
        type: "p",
        text:
          "Utilizamos Google AdSense para mostrar anuncios. Google y sus socios publicitarios pueden usar cookies y tecnologías similares para mostrar anuncios basados en tus visitas a este y otros sitios. Podés controlar la personalización de anuncios en [Google Ad Settings](https://myadcenter.google.com/). Al ingresar al sitio te pedimos consentimiento explícito antes de cargar estas cookies; podés aceptar o rechazar, y esa elección se guarda en tu navegador (localStorage).",
      },
      { type: "h2", text: "3. Terceros que procesan datos" },
      {
        type: "ul",
        items: [
          "**Appwrite**: almacenamiento de cuentas y QR guardados.",
          "**Google AdSense**: publicidad (solo con tu consentimiento).",
          "**Netlify**: hosting del sitio.",
        ],
      },
      { type: "h2", text: "4. Tus derechos" },
      {
        type: "p",
        text:
          "Podés pedir acceso, corrección o eliminación de tus datos escribiendo a [giuliandominici@gmail.com](mailto:giuliandominici@gmail.com). También podés eliminar tu cuenta y los QR guardados desde la propia aplicación.",
      },
      { type: "h2", text: "5. Cambios a esta política" },
      {
        type: "p",
        text:
          "Podemos actualizar esta política ocasionalmente. Los cambios se reflejan en la fecha de “última actualización” de esta página.",
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "09/14/2026",
    intro:
      "This site (**QR Studio**) is operated by Giulian Dominici, hereinafter “the owner.” Contact: [giuliandominici@gmail.com](mailto:giuliandominici@gmail.com).",
    blocks: [
      { type: "h2", text: "1. Data we collect" },
      {
        type: "p",
        text:
          "If you create an account, we store your email and the QR codes you save (title, content, and design options) through our database provider, Appwrite. We do not sell or share this data with third parties for marketing purposes.",
      },
      { type: "h2", text: "2. Cookies and advertising" },
      {
        type: "p",
        text:
          "We use Google AdSense to show ads. Google and its advertising partners may use cookies and similar technologies to show ads based on your visits to this and other sites. You can control ad personalization at [Google Ad Settings](https://myadcenter.google.com/). When you enter the site we ask for explicit consent before loading these cookies; you can accept or decline, and that choice is saved in your browser (localStorage).",
      },
      { type: "h2", text: "3. Third parties that process data" },
      {
        type: "ul",
        items: [
          "**Appwrite**: account storage and saved QR codes.",
          "**Google AdSense**: advertising (only with your consent).",
          "**Netlify**: site hosting.",
        ],
      },
      { type: "h2", text: "4. Your rights" },
      {
        type: "p",
        text:
          "You can request access to, correction of, or deletion of your data by writing to [giuliandominici@gmail.com](mailto:giuliandominici@gmail.com). You can also delete your account and saved QR codes from within the app itself.",
      },
      { type: "h2", text: "5. Changes to this policy" },
      {
        type: "p",
        text:
          "We may update this policy from time to time. Changes are reflected in the “last updated” date on this page.",
      },
    ],
  },
  it: {
    title: "Informativa sulla Privacy",
    updated: "14/09/2026",
    intro:
      "Questo sito (**QR Studio**) è gestito da Giulian Dominici, di seguito “il titolare”. Contatto: [giuliandominici@gmail.com](mailto:giuliandominici@gmail.com).",
    blocks: [
      { type: "h2", text: "1. Dati che raccogliamo" },
      {
        type: "p",
        text:
          "Se crei un account, memorizziamo la tua email e i codici QR che salvi (titolo, contenuto e opzioni di design) tramite il nostro fornitore di database, Appwrite. Non vendiamo né condividiamo questi dati con terzi per finalità di marketing.",
      },
      { type: "h2", text: "2. Cookie e pubblicità" },
      {
        type: "p",
        text:
          "Usiamo Google AdSense per mostrare annunci. Google e i suoi partner pubblicitari possono usare cookie e tecnologie simili per mostrare annunci basati sulle tue visite a questo e ad altri siti. Puoi gestire la personalizzazione degli annunci su [Google Ad Settings](https://myadcenter.google.com/). Quando entri nel sito ti chiediamo un consenso esplicito prima di caricare questi cookie; puoi accettare o rifiutare, e la scelta viene salvata nel tuo browser (localStorage).",
      },
      { type: "h2", text: "3. Terzi che elaborano dati" },
      {
        type: "ul",
        items: [
          "**Appwrite**: archiviazione di account e QR salvati.",
          "**Google AdSense**: pubblicità (solo con il tuo consenso).",
          "**Netlify**: hosting del sito.",
        ],
      },
      { type: "h2", text: "4. I tuoi diritti" },
      {
        type: "p",
        text:
          "Puoi richiedere accesso, correzione o cancellazione dei tuoi dati scrivendo a [giuliandominici@gmail.com](mailto:giuliandominici@gmail.com). Puoi anche eliminare il tuo account e i QR salvati direttamente dall'app.",
      },
      { type: "h2", text: "5. Modifiche a questa informativa" },
      {
        type: "p",
        text:
          "Potremmo aggiornare questa informativa occasionalmente. Le modifiche si riflettono nella data di “ultimo aggiornamento” di questa pagina.",
      },
    ],
  },
};
