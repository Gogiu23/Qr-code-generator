import { Locale } from "@/lib/i18n/locale";
import { Block } from "@/lib/i18n/articleBlocks";

export interface FormatsPostContent {
  title: string;
  updated: string;
  intro: string;
  formats: string[];
  blocks: Block[];
  ctaText: string;
}

export const FORMATS_POST_CONTENT: Record<Locale, FormatsPostContent> = {
  es: {
    title: "PNG, SVG, PDF o JPEG: qué formato elegir para tu código QR",
    updated: "15/09/2026",
    intro:
      "En QR Studio podés descargar cada código en cuatro formatos: PNG, SVG, PDF y JPEG. No es una elección al azar — cada uno se comporta distinto al imprimirlo, escalarlo o subirlo a otro sistema, y elegir mal puede terminar en un QR pixelado, con un fondo que debería ser transparente y no lo es, o directamente rechazado por la plataforma donde lo querés usar. Esta guía te ayuda a elegir según el uso que le vas a dar.",
    formats: ["PNG", "SVG", "PDF", "JPEG"],
    blocks: [
      { type: "h2", text: "PNG: el formato para casi todo" },
      {
        type: "p",
        text:
          "PNG es una imagen de **mapa de bits** (una grilla fija de píxeles) sin pérdida de calidad y con soporte real para **transparencia**. Es la opción por defecto para prácticamente cualquier uso digital: subirlo a una web, compartirlo por redes o WhatsApp, pegarlo en un documento o imprimirlo en un tamaño razonable (una hoja, un cartel de mesa). Si activaste la opción de [fondo transparente](/) en QR Studio, el PNG es el único formato raster que realmente la conserva al abrirlo. Su límite: al ser una grilla de píxeles fija, si lo agrandás mucho más allá de su tamaño original (pensá en un afiche gigante) empieza a verse borroso o “escalonado”.",
      },
      { type: "h2", text: "SVG: para imprimir grande sin perder nitidez" },
      {
        type: "p",
        text:
          "SVG es un formato **vectorial**: en vez de guardar píxeles, guarda las formas geométricas exactas de cada módulo del QR como fórmulas matemáticas. Eso significa que se puede agrandar a cualquier tamaño —de una tarjeta a un cartel de vía pública— sin perder ni un ápice de nitidez, porque no hay píxeles que se noten. Es la elección correcta para carteles grandes, vinilos, gráfica vehicular o cualquier impresión a gran escala, y también es el formato que preferís si necesitás abrir el QR en un programa de diseño (Illustrator, Figma, Inkscape) para editarlo o combinarlo con otro arte. El único costo: no todas las plataformas web o redes sociales aceptan SVG como imagen de perfil o adjunto, así que para uso puramente digital casual conviene PNG.",
      },
      { type: "h2", text: "PDF: el que piden las imprentas" },
      {
        type: "p",
        text:
          "El PDF no es tanto un formato de imagen como un formato de **documento listo para imprimir**, con un tamaño de página definido. Muchas imprentas y talleres gráficos directamente piden el archivo en PDF porque así lo insertan sin sorpresas en su flujo de impresión, y porque es un formato universal que se abre igual en cualquier computadora sin depender de un programa de diseño. Si vas a mandar tu QR a imprimir en un lugar externo (una gráfica, una imprenta de folletos), pedí PDF salvo que te indiquen lo contrario.",
      },
      { type: "h2", text: "JPEG: el que casi nunca conviene para un QR" },
      {
        type: "p",
        text:
          "JPEG usa **compresión con pérdida**: para aligerar el archivo, descarta información y difumina levemente los bordes definidos, algo pensado para fotografías (donde el ojo no lo nota) pero que es justo lo contrario de lo que necesita un QR, cuyos bordes cuadrados y nítidos son los que el lector usa para reconocer cada módulo. En compresiones agresivas o tamaños chicos, eso puede bajar la tasa de lectura. Sumale que JPEG no soporta transparencia: si tenías el fondo transparente activado, en JPEG se va a rellenar de blanco. Usalo solo si un sistema puntual te obliga a subir específicamente un .jpg (algunos formularios o CMS viejos no aceptan otra cosa) y, en ese caso, revisá el QR escaneándolo antes de publicarlo.",
      },
      { type: "h2", text: "Guía rápida según el uso" },
      {
        type: "ul",
        items: [
          "**Web, redes sociales, WhatsApp, documentos:** PNG.",
          "**Carteles grandes, vinilos, gráfica vehicular, edición en un programa de diseño:** SVG.",
          "**Enviar a una imprenta o taller gráfico:** PDF.",
          "**Un sistema que solo acepta .jpg:** JPEG, como último recurso.",
        ],
      },
      {
        type: "p",
        text:
          "Y si además el QR lleva un logo superpuesto, conviene revisar también la [corrección de errores](/blog/correccion-de-errores-en-qr) para asegurarte de que siga leyéndose bien sin importar el formato en el que lo descargues.",
      },
    ],
    ctaText: "Generá tu QR y probá los cuatro formatos de descarga.",
  },
  en: {
    title: "PNG, SVG, PDF, or JPEG: which format to choose for your QR code",
    updated: "09/15/2026",
    intro:
      "In QR Studio you can download each code in four formats: PNG, SVG, PDF, and JPEG. It's not a random choice — each one behaves differently when printed, scaled, or uploaded to another system, and picking the wrong one can end up in a pixelated QR code, a background that should be transparent but isn't, or the file being flat-out rejected by the platform you want to use it on. This guide helps you choose based on how you'll use it.",
    formats: ["PNG", "SVG", "PDF", "JPEG"],
    blocks: [
      { type: "h2", text: "PNG: the format for almost everything" },
      {
        type: "p",
        text:
          "PNG is a **bitmap** image (a fixed grid of pixels) with no quality loss and real support for **transparency**. It's the default choice for virtually any digital use: uploading to a website, sharing on social media or WhatsApp, pasting into a document, or printing at a reasonable size (a sheet of paper, a table tent). If you turned on the [transparent background](/) option in QR Studio, PNG is the only raster format that actually preserves it when opened. Its limit: since it's a fixed pixel grid, if you enlarge it well beyond its original size (think a giant poster) it starts to look blurry or “stair-stepped.”",
      },
      { type: "h2", text: "SVG: for large prints without losing sharpness" },
      {
        type: "p",
        text:
          "SVG is a **vector** format: instead of storing pixels, it stores the exact geometric shapes of each QR module as mathematical formulas. That means it can be scaled to any size — from a business card to a billboard — without losing an ounce of sharpness, because there are no pixels to notice. It's the right choice for large signage, vinyl banners, vehicle graphics, or any large-scale printing, and it's also the format you'll want if you need to open the QR code in a design program (Illustrator, Figma, Inkscape) to edit it or combine it with other artwork. The only downside: not every web platform or social network accepts SVG as a profile picture or attachment, so for purely casual digital use, PNG is better.",
      },
      { type: "h2", text: "PDF: the one print shops ask for" },
      {
        type: "p",
        text:
          "PDF isn't so much an image format as a **print-ready document** format, with a defined page size. Many print shops and graphic studios directly request the file as a PDF because that's how they insert it into their printing workflow without surprises, and because it's a universal format that opens the same way on any computer without needing a design program. If you're sending your QR code to an outside print shop (a graphics shop, a flyer printer), ask for PDF unless told otherwise.",
      },
      { type: "h2", text: "JPEG: the one that almost never suits a QR code" },
      {
        type: "p",
        text:
          "JPEG uses **lossy compression**: to make the file lighter, it discards information and slightly blurs sharp edges — something designed for photographs (where the eye doesn't notice) but exactly the opposite of what a QR code needs, since its crisp square edges are what the reader uses to recognize each module. Under aggressive compression or small sizes, that can lower the scan success rate. On top of that, JPEG doesn't support transparency: if you had the transparent background turned on, it'll get filled in white in JPEG. Only use it if some specific system forces you to upload a .jpg file (some old forms or CMS platforms don't accept anything else), and in that case, test-scan the QR code before publishing it.",
      },
      { type: "h2", text: "Quick guide by use case" },
      {
        type: "ul",
        items: [
          "**Web, social media, WhatsApp, documents:** PNG.",
          "**Large signage, vinyl banners, vehicle graphics, editing in a design program:** SVG.",
          "**Sending to a print shop or graphics studio:** PDF.",
          "**A system that only accepts .jpg:** JPEG, as a last resort.",
        ],
      },
      {
        type: "p",
        text:
          "And if the QR code also carries a logo on top, it's worth checking the [error correction](/blog/correccion-de-errores-en-qr) level too, to make sure it keeps scanning well no matter which format you download it in.",
      },
    ],
    ctaText: "Generate your QR code and try all four download formats.",
  },
  it: {
    title: "PNG, SVG, PDF o JPEG: quale formato scegliere per il tuo codice QR",
    updated: "15/09/2026",
    intro:
      "Su QR Studio puoi scaricare ogni codice in quattro formati: PNG, SVG, PDF e JPEG. Non è una scelta casuale — ognuno si comporta in modo diverso quando viene stampato, ridimensionato o caricato su un altro sistema, e scegliere male può portare a un QR pixelato, con uno sfondo che dovrebbe essere trasparente e non lo è, o direttamente rifiutato dalla piattaforma su cui vuoi usarlo. Questa guida ti aiuta a scegliere in base all'uso che ne farai.",
    formats: ["PNG", "SVG", "PDF", "JPEG"],
    blocks: [
      { type: "h2", text: "PNG: il formato per quasi tutto" },
      {
        type: "p",
        text:
          "PNG è un'immagine **raster** (una griglia fissa di pixel) senza perdita di qualità e con supporto reale per la **trasparenza**. È la scelta predefinita per praticamente qualsiasi uso digitale: caricarlo su un sito, condividerlo sui social o su WhatsApp, incollarlo in un documento o stamparlo in una dimensione ragionevole (un foglio, un cartellino da tavolo). Se hai attivato l'opzione [sfondo trasparente](/) su QR Studio, il PNG è l'unico formato raster che la mantiene davvero quando viene aperto. Il suo limite: essendo una griglia di pixel fissa, se lo ingrandisci molto oltre la sua dimensione originale (pensa a un manifesto gigante) inizia a sembrare sfocato o “a scalini”.",
      },
      { type: "h2", text: "SVG: per stampe grandi senza perdere nitidezza" },
      {
        type: "p",
        text:
          "SVG è un formato **vettoriale**: invece di salvare pixel, salva le forme geometriche esatte di ogni modulo del QR come formule matematiche. Questo significa che può essere ingrandito a qualsiasi dimensione — da un biglietto da visita a un cartellone pubblicitario — senza perdere un briciolo di nitidezza, perché non ci sono pixel da notare. È la scelta giusta per cartelli grandi, vinili, grafica per veicoli o qualsiasi stampa su larga scala, ed è anche il formato da preferire se devi aprire il QR in un programma di grafica (Illustrator, Figma, Inkscape) per modificarlo o combinarlo con altra grafica. L'unico limite: non tutte le piattaforme web o i social network accettano SVG come immagine del profilo o allegato, quindi per un uso puramente digitale occasionale conviene il PNG.",
      },
      { type: "h2", text: "PDF: quello richiesto dalle tipografie" },
      {
        type: "p",
        text:
          "Il PDF non è tanto un formato immagine quanto un formato di **documento pronto per la stampa**, con una dimensione di pagina definita. Molte tipografie e centri grafici richiedono direttamente il file in PDF perché così lo inseriscono senza sorprese nel loro flusso di stampa, e perché è un formato universale che si apre allo stesso modo su qualsiasi computer senza bisogno di un programma di grafica. Se devi mandare il tuo QR a stampare presso un fornitore esterno (una tipografia, una stamperia di volantini), chiedi il PDF salvo indicazioni diverse.",
      },
      { type: "h2", text: "JPEG: quello che quasi mai conviene per un QR" },
      {
        type: "p",
        text:
          "JPEG usa una **compressione con perdita**: per alleggerire il file, scarta informazioni e sfuma leggermente i bordi netti, qualcosa pensato per le fotografie (dove l'occhio non lo nota) ma esattamente l'opposto di ciò di cui ha bisogno un QR, i cui bordi quadrati e nitidi sono ciò che il lettore usa per riconoscere ogni modulo. Con compressioni aggressive o dimensioni piccole, questo può abbassare il tasso di lettura. In più, JPEG non supporta la trasparenza: se avevi attivato lo sfondo trasparente, in JPEG verrà riempito di bianco. Usalo solo se un sistema specifico ti obbliga a caricare proprio un .jpg (alcuni moduli o CMS datati non accettano altro) e, in quel caso, verifica il QR scansionandolo prima di pubblicarlo.",
      },
      { type: "h2", text: "Guida rapida per uso" },
      {
        type: "ul",
        items: [
          "**Web, social media, WhatsApp, documenti:** PNG.",
          "**Cartelli grandi, vinili, grafica per veicoli, modifica in un programma di grafica:** SVG.",
          "**Invio a una tipografia o centro grafico:** PDF.",
          "**Un sistema che accetta solo .jpg:** JPEG, come ultima risorsa.",
        ],
      },
      {
        type: "p",
        text:
          "E se il QR porta anche un logo sovrapposto, conviene controllare anche il livello di [correzione d'errore](/blog/correccion-de-errores-en-qr) per assicurarti che continui a leggersi bene indipendentemente dal formato in cui lo scarichi.",
      },
    ],
    ctaText: "Genera il tuo QR e prova tutti e quattro i formati di download.",
  },
};
