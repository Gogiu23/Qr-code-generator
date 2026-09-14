import { Locale } from "@/lib/i18n/locale";
import { Block } from "@/lib/i18n/articleBlocks";

export interface HowItWorksPostContent {
  title: string;
  updated: string;
  intro: string;
  anatomyHeading: string;
  anatomyIntro: string;
  diagramItems: string[];
  detailedList: string[];
  blocks: Block[];
  ctaText: string;
}

export const HOW_IT_WORKS_POST_CONTENT: Record<Locale, HowItWorksPostContent> = {
  es: {
    title: "Cómo funciona un código QR y cómo lo lee tu celular",
    updated: "15/09/2026",
    intro:
      "Apuntás la cámara, ves un cuadradito por medio segundo y el celular ya te muestra el link. Parece magia, pero es geometría, matemática y un poco de redundancia bien pensada. Así es un código QR por dentro y así es como se decodifica.",
    anatomyHeading: "La anatomía de un QR",
    anatomyIntro:
      "Un código QR es una grilla cuadrada de casilleros blancos y negros llamados **módulos**. Dentro de esa grilla hay zonas con un rol fijo, siempre en la misma posición relativa:",
    diagramItems: [
      "**Patrones de posición**: los tres cuadrados grandes en las esquinas.",
      "**Patrón de temporización**: la línea punteada que cruza el centro.",
      "**Zona de datos**: el resto de los módulos, con la información codificada.",
      "**Zona de silencio**: el margen blanco alrededor de todo el código.",
    ],
    detailedList: [
      "**Patrones de posición** (los tres cuadrados grandes en tres de las cuatro esquinas): le permiten al lector encontrar el código en la imagen al instante y calcular su tamaño y rotación, sin importar si la foto está inclinada.",
      "**Patrones de temporización**: dos líneas punteadas que conectan los patrones de posición y le indican al lector el tamaño exacto de cada módulo, para contar la grilla con precisión.",
      "**Patrón de alineación** (en códigos más grandes): un cuadrado más chico que ayuda a corregir distorsiones cuando la foto no quedó perfectamente plana.",
      "**Información de formato**: una franja angosta cerca de los patrones de posición que le dice al lector qué nivel de [corrección de errores](/blog/correccion-de-errores-en-qr) y qué máscara se usó.",
      "**Zona de datos**: el resto de la grilla, donde vive la información real codificada en binario, más los bloques de corrección de errores.",
      "**Zona de silencio (quiet zone)**: el margen blanco alrededor de todo el código. No es decorativo: sin ese margen, el lector puede confundir el borde del QR con el fondo de la imagen y no reconocerlo.",
    ],
    blocks: [
      { type: "h2", text: "De tus datos a la grilla" },
      {
        type: "p",
        text:
          "Cuando generás un QR, el texto, la URL o los datos de WiFi se convierten primero a binario y se agrupan según su tipo de contenido (numérico, alfanumérico, texto libre). A eso se le suma la información de corrección de errores, calculada con un algoritmo llamado **Reed–Solomon** (el mismo tipo de matemática que se usa para que un CD rayado siga sonando bien). Todo ese conjunto de bits se acomoda en la grilla siguiendo un patrón en zigzag, y por último se le aplica una de ocho “máscaras” posibles: un patrón que mezcla los módulos para evitar zonas demasiado uniformes de blanco o negro, que son más difíciles de leer para una cámara.",
      },
      { type: "h2", text: "Cómo lo decodifica la cámara" },
      { type: "p", text: "Cuando apuntás el celular, el proceso ocurre en unos pocos cuadros de video:" },
      {
        type: "ol",
        items: [
          "El software busca en la imagen los tres patrones de posición característicos (proporción de franjas 1:1:3:1:1), que son muy poco comunes en fotos “normales”, por eso se detectan rápido.",
          "Con esos tres puntos calcula la orientación, el tamaño y la perspectiva del código, y corrige la distorsión si la foto no fue tomada de frente.",
          "Usa los patrones de temporización para trazar la grilla exacta y “muestrea” cada módulo, leyéndolo como 0 (blanco) o 1 (negro).",
          "Quita la máscara aplicada al generar el código (esa información está en la zona de formato) para recuperar los datos originales.",
          "Aplica la corrección de errores Reed–Solomon: si algunos módulos no se leyeron bien (por suciedad, un logo, una rotura), los reconstruye matemáticamente a partir de la redundancia guardada.",
          "Convierte los bits resultantes de nuevo a texto y actúa según el tipo de dato: abre el navegador si es una URL, ofrece conectarte si es WiFi, muestra el texto si es texto plano.",
        ],
      },
      { type: "h2", text: "Por qué a veces no lee" },
      {
        type: "p",
        text:
          "Casi siempre es alguno de estos motivos: poco contraste entre los colores elegidos, el margen blanco recortado o muy chico, el código demasiado pequeño para la distancia a la que se escanea, o un logo demasiado grande para el nivel de corrección de errores configurado.",
      },
    ],
    ctaText: "Ahora que sabés cómo funciona, ¡probá crear uno!",
  },
  en: {
    title: "How a QR code works and how your phone reads it",
    updated: "09/15/2026",
    intro:
      "You point the camera, see a little square for half a second, and your phone already shows you the link. It feels like magic, but it's geometry, math, and some well-thought-out redundancy. Here's what a QR code looks like on the inside and how it gets decoded.",
    anatomyHeading: "The anatomy of a QR code",
    anatomyIntro:
      "A QR code is a square grid of black and white cells called **modules**. Within that grid there are zones with a fixed role, always in the same relative position:",
    diagramItems: [
      "**Position patterns**: the three large squares in the corners.",
      "**Timing pattern**: the dashed line crossing the center.",
      "**Data area**: the rest of the modules, holding the encoded information.",
      "**Quiet zone**: the white margin around the entire code.",
    ],
    detailedList: [
      "**Position patterns** (the three large squares in three of the four corners): they let the reader instantly find the code in the image and calculate its size and rotation, no matter how tilted the photo is.",
      "**Timing patterns**: two dashed lines connecting the position patterns, telling the reader the exact size of each module so it can count the grid precisely.",
      "**Alignment pattern** (in larger codes): a smaller square that helps correct distortion when the photo wasn't taken perfectly flat.",
      "**Format information**: a narrow strip near the position patterns telling the reader which [error correction](/blog/correccion-de-errores-en-qr) level and which mask were used.",
      "**Data area**: the rest of the grid, where the actual information lives, encoded in binary, plus the error-correction blocks.",
      "**Quiet zone**: the white margin around the entire code. It's not decorative — without that margin, the reader can confuse the QR code's edge with the background of the image and fail to recognize it.",
    ],
    blocks: [
      { type: "h2", text: "From your data to the grid" },
      {
        type: "p",
        text:
          "When you generate a QR code, the text, URL, or WiFi data is first converted to binary and grouped according to its content type (numeric, alphanumeric, free text). On top of that comes the error-correction information, calculated with an algorithm called **Reed–Solomon** (the same kind of math used to keep a scratched CD playing fine). All those bits get arranged in the grid following a zigzag pattern, and finally one of eight possible “masks” is applied: a pattern that mixes up the modules to avoid overly uniform white or black areas, which are harder for a camera to read.",
      },
      { type: "h2", text: "How the camera decodes it" },
      { type: "p", text: "When you point your phone at it, the process happens in just a few video frames:" },
      {
        type: "ol",
        items: [
          "The software scans the image for the three characteristic position patterns (a 1:1:3:1:1 stripe ratio), which are quite rare in “normal” photos, so they're detected fast.",
          "Using those three points, it calculates the code's orientation, size, and perspective, correcting for distortion if the photo wasn't taken head-on.",
          "It uses the timing patterns to trace the exact grid and “samples” each module, reading it as 0 (white) or 1 (black).",
          "It removes the mask applied when the code was generated (that info lives in the format zone) to recover the original data.",
          "It applies Reed–Solomon error correction: if some modules weren't read correctly (due to dirt, a logo, a tear), it mathematically rebuilds them from the stored redundancy.",
          "It converts the resulting bits back into text and acts based on the data type: opens the browser for a URL, offers to connect for WiFi, shows the text for plain text.",
        ],
      },
      { type: "h2", text: "Why it sometimes won't scan" },
      {
        type: "p",
        text:
          "It's almost always one of these reasons: too little contrast between the chosen colors, a cropped or too-thin white margin, a code too small for the scanning distance, or a logo too large for the configured error-correction level.",
      },
    ],
    ctaText: "Now that you know how it works, try making one!",
  },
  it: {
    title: "Come funziona un codice QR e come lo legge il tuo telefono",
    updated: "15/09/2026",
    intro:
      "Punti la fotocamera, vedi un quadratino per mezzo secondo e il telefono ti mostra già il link. Sembra magia, ma è geometria, matematica e un po' di ridondanza ben studiata. Ecco com'è fatto un codice QR all'interno e come viene decodificato.",
    anatomyHeading: "L'anatomia di un QR",
    anatomyIntro:
      "Un codice QR è una griglia quadrata di caselle bianche e nere chiamate **moduli**. All'interno di quella griglia ci sono zone con un ruolo fisso, sempre nella stessa posizione relativa:",
    diagramItems: [
      "**Pattern di posizionamento**: i tre grandi quadrati agli angoli.",
      "**Pattern di temporizzazione**: la linea tratteggiata che attraversa il centro.",
      "**Zona dati**: il resto dei moduli, con l'informazione codificata.",
      "**Zona di silenzio**: il margine bianco attorno a tutto il codice.",
    ],
    detailedList: [
      "**Pattern di posizionamento** (i tre grandi quadrati in tre dei quattro angoli): permettono al lettore di trovare istantaneamente il codice nell'immagine e di calcolarne dimensione e rotazione, indipendentemente da quanto sia inclinata la foto.",
      "**Pattern di temporizzazione**: due linee tratteggiate che collegano i pattern di posizionamento e indicano al lettore la dimensione esatta di ogni modulo, per contare la griglia con precisione.",
      "**Pattern di allineamento** (nei codici più grandi): un quadrato più piccolo che aiuta a correggere le distorsioni quando la foto non è stata scattata perfettamente piatta.",
      "**Informazioni di formato**: una fascia stretta vicino ai pattern di posizionamento che indica al lettore quale livello di [correzione d'errore](/blog/correccion-de-errores-en-qr) e quale maschera sono stati usati.",
      "**Zona dati**: il resto della griglia, dove risiede l'informazione reale codificata in binario, più i blocchi di correzione d'errore.",
      "**Zona di silenzio (quiet zone)**: il margine bianco attorno a tutto il codice. Non è decorativo: senza quel margine, il lettore può confondere il bordo del QR con lo sfondo dell'immagine e non riconoscerlo.",
    ],
    blocks: [
      { type: "h2", text: "Dai tuoi dati alla griglia" },
      {
        type: "p",
        text:
          "Quando generi un QR, il testo, l'URL o i dati WiFi vengono prima convertiti in binario e raggruppati in base al tipo di contenuto (numerico, alfanumerico, testo libero). A questo si aggiungono le informazioni di correzione d'errore, calcolate con un algoritmo chiamato **Reed–Solomon** (lo stesso tipo di matematica usata per far suonare bene un CD graffiato). Tutto questo insieme di bit viene sistemato nella griglia seguendo un pattern a zigzag, e infine viene applicata una delle otto possibili “maschere”: un pattern che mescola i moduli per evitare zone troppo uniformi di bianco o nero, più difficili da leggere per una fotocamera.",
      },
      { type: "h2", text: "Come lo decodifica la fotocamera" },
      { type: "p", text: "Quando punti il telefono, il processo avviene in pochi fotogrammi:" },
      {
        type: "ol",
        items: [
          "Il software cerca nell'immagine i tre pattern di posizionamento caratteristici (proporzione di fasce 1:1:3:1:1), molto rari nelle foto “normali”, per questo vengono rilevati velocemente.",
          "Con quei tre punti calcola l'orientamento, la dimensione e la prospettiva del codice, correggendo la distorsione se la foto non è stata scattata frontalmente.",
          "Usa i pattern di temporizzazione per tracciare la griglia esatta e “campiona” ogni modulo, leggendolo come 0 (bianco) o 1 (nero).",
          "Rimuove la maschera applicata al momento della generazione del codice (quell'informazione si trova nella zona di formato) per recuperare i dati originali.",
          "Applica la correzione d'errore Reed–Solomon: se alcuni moduli non sono stati letti correttamente (per sporco, un logo, una rottura), li ricostruisce matematicamente a partire dalla ridondanza salvata.",
          "Converte i bit risultanti di nuovo in testo e agisce in base al tipo di dato: apre il browser se è un URL, offre di connettersi se è WiFi, mostra il testo se è testo semplice.",
        ],
      },
      { type: "h2", text: "Perché a volte non si legge" },
      {
        type: "p",
        text:
          "Quasi sempre è per uno di questi motivi: poco contrasto tra i colori scelti, il margine bianco ritagliato o troppo piccolo, il codice troppo piccolo per la distanza di scansione, o un logo troppo grande per il livello di correzione d'errore configurato.",
      },
    ],
    ctaText: "Ora che sai come funziona, provane a creare uno!",
  },
};
