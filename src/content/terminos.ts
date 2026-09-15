import { Locale } from "@/lib/i18n/locale";
import { Block } from "@/lib/i18n/articleBlocks";

export interface TerminosContent {
  title: string;
  updated: string;
  intro: string;
  blocks: Block[];
}

export const TERMINOS_CONTENT: Record<Locale, TerminosContent> = {
  es: {
    title: "Términos de Uso",
    updated: "14/09/2026",
    intro:
      "Al usar **QR Studio** (el “sitio”), operado por Giulian Dominici, aceptás estos términos. Si no estás de acuerdo, no uses el sitio.",
    blocks: [
      { type: "h2", text: "1. Uso del servicio" },
      {
        type: "p",
        text:
          "QR Studio permite generar y personalizar códigos QR de forma gratuita. Es tu responsabilidad que el contenido de los QR que generés (URLs, texto, etc.) sea lícito. No está permitido usar el sitio para generar QR con fines fraudulentos, de phishing, o que infrinjan derechos de terceros.",
      },
      { type: "h2", text: "2. Cuentas y contenido guardado" },
      {
        type: "p",
        text:
          "Si creás una cuenta, sos responsable de la confidencialidad de tus credenciales. Los QR que guardés se almacenan asociados a tu cuenta y solo vos podés verlos, editarlos o borrarlos.",
      },
      { type: "h2", text: "3. Publicidad" },
      {
        type: "p",
        text:
          "El sitio puede mostrar anuncios de terceros (Google AdSense) para sostener su funcionamiento. Ver la [Política de Privacidad](/privacidad) para más detalle sobre cookies publicitarias.",
      },
      { type: "h2", text: "4. Disponibilidad y garantías" },
      {
        type: "p",
        text:
          "El servicio se ofrece “tal cual”, sin garantías de disponibilidad continua. No nos responsabilizamos por pérdidas derivadas del uso del sitio o de interrupciones del servicio.",
      },
      { type: "h2", text: "5. Contacto" },
      {
        type: "p",
        text:
          "Consultas sobre estos términos: [giuliandominici@gmail.com](mailto:giuliandominici@gmail.com).",
      },
    ],
  },
  en: {
    title: "Terms of Use",
    updated: "09/14/2026",
    intro:
      "By using **QR Studio** (the “site”), operated by Giulian Dominici, you accept these terms. If you don't agree, please don't use the site.",
    blocks: [
      { type: "h2", text: "1. Use of the service" },
      {
        type: "p",
        text:
          "QR Studio lets you generate and customize QR codes for free. It's your responsibility to make sure the content of the QR codes you generate (URLs, text, etc.) is lawful. Using the site to generate QR codes for fraudulent purposes, phishing, or anything that infringes on third-party rights is not allowed.",
      },
      { type: "h2", text: "2. Accounts and saved content" },
      {
        type: "p",
        text:
          "If you create an account, you're responsible for keeping your credentials confidential. The QR codes you save are stored linked to your account, and only you can view, edit, or delete them.",
      },
      { type: "h2", text: "3. Advertising" },
      {
        type: "p",
        text:
          "The site may show third-party ads (Google AdSense) to help sustain its operation. See the [Privacy Policy](/privacidad) for more detail on advertising cookies.",
      },
      { type: "h2", text: "4. Availability and warranties" },
      {
        type: "p",
        text:
          "The service is provided “as is,” with no guarantee of continuous availability. We're not liable for losses arising from use of the site or from service interruptions.",
      },
      { type: "h2", text: "5. Contact" },
      {
        type: "p",
        text:
          "Questions about these terms: [giuliandominici@gmail.com](mailto:giuliandominici@gmail.com).",
      },
    ],
  },
  it: {
    title: "Termini di Utilizzo",
    updated: "14/09/2026",
    intro:
      "Utilizzando **QR Studio** (il “sito”), gestito da Giulian Dominici, accetti questi termini. Se non sei d'accordo, non usare il sito.",
    blocks: [
      { type: "h2", text: "1. Uso del servizio" },
      {
        type: "p",
        text:
          "QR Studio permette di generare e personalizzare codici QR gratuitamente. È tua responsabilità assicurarti che il contenuto dei QR che generi (URL, testo, ecc.) sia lecito. Non è consentito usare il sito per generare QR a scopo fraudolento, di phishing, o che violino i diritti di terzi.",
      },
      { type: "h2", text: "2. Account e contenuti salvati" },
      {
        type: "p",
        text:
          "Se crei un account, sei responsabile della riservatezza delle tue credenziali. I QR che salvi vengono memorizzati associati al tuo account e solo tu puoi visualizzarli, modificarli o eliminarli.",
      },
      { type: "h2", text: "3. Pubblicità" },
      {
        type: "p",
        text:
          "Il sito può mostrare annunci di terzi (Google AdSense) per sostenere il suo funzionamento. Consulta l'[Informativa sulla Privacy](/privacidad) per maggiori dettagli sui cookie pubblicitari.",
      },
      { type: "h2", text: "4. Disponibilità e garanzie" },
      {
        type: "p",
        text:
          "Il servizio è offerto “così com'è”, senza garanzie di disponibilità continua. Non siamo responsabili per perdite derivanti dall'uso del sito o da interruzioni del servizio.",
      },
      { type: "h2", text: "5. Contatto" },
      {
        type: "p",
        text:
          "Domande su questi termini: [giuliandominici@gmail.com](mailto:giuliandominici@gmail.com).",
      },
    ],
  },
};
