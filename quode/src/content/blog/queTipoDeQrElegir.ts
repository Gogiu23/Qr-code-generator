import { Locale } from "@/lib/i18n/locale";
import { Block } from "@/lib/i18n/articleBlocks";

export interface QrTypesPostContent {
  title: string;
  updated: string;
  intro: string;
  types: string[];
  blocks: Block[];
  ctaText: string;
}

export const QR_TYPES_POST_CONTENT: Record<Locale, QrTypesPostContent> = {
  es: {
    title: "URL, texto, teléfono, email o WiFi: qué tipo de QR conviene en cada caso",
    updated: "15/09/2026",
    intro:
      "Un código QR no es más que una forma de guardar datos, pero *qué* datos guarda y cómo los interpreta el celular al escanear cambia por completo lo que pasa después. En QR Studio podés elegir entre cinco tipos de contenido. Esta guía te ayuda a elegir el correcto según lo que necesitás lograr.",
    types: ["URL", "Texto", "Teléfono", "Email", "WiFi"],
    blocks: [
      { type: "h2", text: "URL: cuando querés llevar a un sitio web" },
      {
        type: "p",
        text:
          "Es el uso más común: el QR guarda un link y, al escanearlo, el celular abre directamente esa página en el navegador. Ideal para menús digitales, redes sociales, portfolios, formularios, promociones o cualquier cosa que viva en internet. Tené en cuenta que es un QR **estático**: el destino queda grabado en el propio código, así que si en el futuro cambiás la URL vas a tener que generar (e imprimir) un QR nuevo — no hay forma de “editar” el destino de uno ya impreso.",
      },
      { type: "h2", text: "Texto: cuando el mensaje es el contenido" },
      {
        type: "p",
        text:
          "Acá el celular no abre nada, simplemente muestra el texto tal cual quedó guardado en el QR. Sirve para instrucciones cortas, un mensaje, la ubicación de algo, un código de referencia interno, o cualquier información que quieras que la persona lea directamente sin depender de que tenga internet en ese momento (una URL necesita conexión para abrir la página; un texto no).",
      },
      { type: "h2", text: "Teléfono: para que te llamen con un toque" },
      {
        type: "p",
        text:
          "Genera un QR que, al escanearlo, abre directamente la app de teléfono con tu número ya cargado, listo para llamar. Muy usado en vidrieras, tarjetas, remises, delivery o cualquier cartel donde lo que querés es una llamada inmediata, sin que la persona tenga que anotar o copiar el número a mano.",
      },
      { type: "h2", text: "Email: para un contacto directo" },
      {
        type: "p",
        text:
          "Abre la app de correo del celular con tu dirección ya puesta en el destinatario. Es útil cuando querés que te escriban (consultas, presupuestos, currículums) sin errores de tipeo en la dirección — algo que pasa seguido cuando la gente copia un email a mano desde un cartel o una tarjeta.",
      },
      { type: "h2", text: "WiFi: para conectarse sin escribir nada" },
      {
        type: "p",
        text:
          "El celular reconoce el código, muestra el nombre de la red y ofrece conectar automáticamente, sin que nadie tenga que tipear el SSID ni la contraseña (algo particularmente molesto con contraseñas largas). Perfecto para recepciones de hotel, cafeterías, oficinas o para pegarlo al lado del router en tu casa cuando vienen visitas. Si tenés dudas sobre qué tipo de seguridad elegir ahí, lo vemos en detalle en [este artículo sobre WPA, WEP y redes abiertas](/blog/wifi-wpa-wep-o-ninguna).",
      },
      { type: "h2", text: "Resumen rápido" },
      {
        type: "ul",
        items: [
          "**URL** → llevar a una página web",
          "**Texto** → mostrar un mensaje directo, sin depender de internet",
          "**Teléfono** → que te llamen con un toque",
          "**Email** → que te escriban sin errores de tipeo",
          "**WiFi** → conectar a una red sin escribir nada",
        ],
      },
    ],
    ctaText: "¿Ya sabés qué tipo de QR necesitás?",
  },
  en: {
    title: "URL, text, phone, email, or WiFi: which QR type fits each case",
    updated: "09/15/2026",
    intro:
      "A QR code is nothing more than a way to store data, but *what* data it stores and how the phone interprets it when scanning completely changes what happens next. In QR Studio you can choose between five content types. This guide helps you pick the right one for what you're trying to achieve.",
    types: ["URL", "Text", "Phone", "Email", "WiFi"],
    blocks: [
      { type: "h2", text: "URL: when you want to lead to a website" },
      {
        type: "p",
        text:
          "It's the most common use: the QR code holds a link, and when scanned, the phone opens that page directly in the browser. Ideal for digital menus, social media, portfolios, forms, promotions, or anything that lives online. Keep in mind it's a **static** QR code: the destination is baked into the code itself, so if you change the URL later you'll need to generate (and print) a new QR code — there's no way to “edit” the destination of one already printed.",
      },
      { type: "h2", text: "Text: when the message is the content" },
      {
        type: "p",
        text:
          "Here the phone doesn't open anything — it just displays the text exactly as it was saved in the QR code. Useful for short instructions, a message, a location, an internal reference code, or any information you want people to read directly without depending on them having internet access at that moment (a URL needs a connection to open the page; plain text doesn't).",
      },
      { type: "h2", text: "Phone: so people can call you with one tap" },
      {
        type: "p",
        text:
          "Generates a QR code that, when scanned, opens the phone app directly with your number already loaded, ready to call. Widely used on storefronts, business cards, taxi services, delivery, or any sign where what you want is an immediate call, without the person having to write down or copy the number by hand.",
      },
      { type: "h2", text: "Email: for direct contact" },
      {
        type: "p",
        text:
          "Opens the phone's mail app with your address already filled in as the recipient. Useful when you want people to write to you (inquiries, quotes, résumés) without typos in the address — something that happens often when people copy an email by hand from a sign or a card.",
      },
      { type: "h2", text: "WiFi: to connect without typing anything" },
      {
        type: "p",
        text:
          "The phone recognizes the code, shows the network name, and offers to connect automatically, with no one needing to type the SSID or the password (particularly annoying with long passwords). Perfect for hotel front desks, cafés, offices, or to stick next to the router at home when you have guests over. If you're unsure which security type to pick there, we cover it in detail in [this article about WPA, WEP, and open networks](/blog/wifi-wpa-wep-o-ninguna).",
      },
      { type: "h2", text: "Quick summary" },
      {
        type: "ul",
        items: [
          "**URL** → lead to a web page",
          "**Text** → show a direct message, no internet needed",
          "**Phone** → get called with one tap",
          "**Email** → get written to without typos",
          "**WiFi** → connect to a network without typing anything",
        ],
      },
    ],
    ctaText: "Already know which QR type you need?",
  },
  it: {
    title: "URL, testo, telefono, email o WiFi: quale tipo di QR conviene in ogni caso",
    updated: "15/09/2026",
    intro:
      "Un codice QR non è altro che un modo per salvare dati, ma *quali* dati salva e come li interpreta il telefono in fase di scansione cambia completamente cosa succede dopo. Su QR Studio puoi scegliere tra cinque tipi di contenuto. Questa guida ti aiuta a scegliere quello giusto in base a cosa vuoi ottenere.",
    types: ["URL", "Testo", "Telefono", "Email", "WiFi"],
    blocks: [
      { type: "h2", text: "URL: quando vuoi portare a un sito web" },
      {
        type: "p",
        text:
          "È l'uso più comune: il QR contiene un link e, una volta scansionato, il telefono apre direttamente quella pagina nel browser. Ideale per menu digitali, social media, portfolio, moduli, promozioni o qualsiasi cosa viva online. Tieni presente che è un QR **statico**: la destinazione è incisa nel codice stesso, quindi se in futuro cambi l'URL dovrai generare (e stampare) un nuovo QR — non c'è modo di “modificare” la destinazione di uno già stampato.",
      },
      { type: "h2", text: "Testo: quando il messaggio è il contenuto" },
      {
        type: "p",
        text:
          "Qui il telefono non apre nulla, mostra semplicemente il testo così com'è stato salvato nel QR. Utile per istruzioni brevi, un messaggio, la posizione di qualcosa, un codice di riferimento interno, o qualsiasi informazione che vuoi far leggere direttamente senza dipendere dal fatto che la persona abbia internet in quel momento (un URL richiede una connessione per aprire la pagina; un testo no).",
      },
      { type: "h2", text: "Telefono: per essere chiamato con un tocco" },
      {
        type: "p",
        text:
          "Genera un QR che, una volta scansionato, apre direttamente l'app telefono con il tuo numero già caricato, pronto per chiamare. Molto usato su vetrine, biglietti da visita, taxi, consegne o qualsiasi cartello dove l'obiettivo è una chiamata immediata, senza che la persona debba annotare o copiare il numero a mano.",
      },
      { type: "h2", text: "Email: per un contatto diretto" },
      {
        type: "p",
        text:
          "Apre l'app di posta del telefono con il tuo indirizzo già inserito come destinatario. Utile quando vuoi che ti scrivano (richieste, preventivi, curriculum) senza errori di battitura nell'indirizzo — cosa che capita spesso quando le persone copiano un'email a mano da un cartello o un biglietto.",
      },
      { type: "h2", text: "WiFi: per connettersi senza scrivere nulla" },
      {
        type: "p",
        text:
          "Il telefono riconosce il codice, mostra il nome della rete e offre di connettersi automaticamente, senza che nessuno debba digitare l'SSID o la password (particolarmente fastidioso con password lunghe). Perfetto per reception di hotel, bar, uffici o da attaccare vicino al router di casa quando arrivano ospiti. Se hai dubbi su quale tipo di sicurezza scegliere in quel caso, ne parliamo nel dettaglio in [questo articolo su WPA, WEP e reti aperte](/blog/wifi-wpa-wep-o-ninguna).",
      },
      { type: "h2", text: "Riepilogo rapido" },
      {
        type: "ul",
        items: [
          "**URL** → portare a una pagina web",
          "**Testo** → mostrare un messaggio diretto, senza bisogno di internet",
          "**Telefono** → farti chiamare con un tocco",
          "**Email** → farti scrivere senza errori di battitura",
          "**WiFi** → connettersi a una rete senza scrivere nulla",
        ],
      },
    ],
    ctaText: "Sai già di quale tipo di QR hai bisogno?",
  },
};
