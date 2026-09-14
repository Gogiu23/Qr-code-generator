import { Locale } from "@/lib/i18n/locale";
import { Block } from "@/lib/i18n/articleBlocks";

export interface HistoriaContent {
  title: string;
  updated: string;
  intro: string;
  blocks: Block[];
  ctaText: string;
  barcodeCaption: string;
  qrCaption: string;
}

export const HISTORIA_CONTENT: Record<Locale, HistoriaContent> = {
  es: {
    title: "La historia del código de barras y el código QR",
    updated: "15/09/2026",
    intro:
      "Hoy escaneamos códigos sin pensarlo: en el súper, en un menú de restaurante, para pagar un café. Pero detrás de esas cuadrículas de puntos negros hay dos historias separadas por casi 50 años, un dibujo hecho con los dedos en la arena de una playa y un ingeniero japonés que se inspiró en un juego de mesa milenario para resolver un problema de una fábrica de autopartes.",
    barcodeCaption: "Código de barras (1974)",
    qrCaption: "Código QR (1994)",
    blocks: [
      { type: "h2", text: "El código de barras: nació en una playa (1948–1974)" },
      {
        type: "p",
        text:
          "La historia arranca en 1948, cuando el dueño de una cadena de supermercados le pidió a la Universidad Drexel, en Filadelfia, un sistema para leer automáticamente el precio de los productos en la caja. Dos estudiantes de posgrado, **Norman Joseph Woodland** y **Bernard Silver**, se pusieron a investigar cómo resolverlo.",
      },
      {
        type: "p",
        text:
          "Según cuenta la leyenda (y el propio Woodland la confirmó varias veces), la idea final se le ocurrió sentado en una playa de Miami Beach a principios de 1949. Ya conocía el código Morse y empezó a jugar en la arena: hundió cuatro dedos y los fue arrastrando, extendiendo los puntos y rayas del Morse hacia abajo, en forma de líneas. El resultado fue un patrón de círculos concéntricos —un “ojo de buey”— que codificaba información en el ancho y espaciado de las líneas. Woodland y Silver patentaron la idea en 1952, pero la tecnología de la época (sin láseres ni computadoras baratas) no permitía leerlo de forma práctica.",
      },
      {
        type: "p",
        text:
          "Hubo que esperar casi 25 años. RCA probó el código circular de Woodland en un supermercado Kroger de Cincinnati en 1972, pero la tinta se corría al imprimirlo en las rotativas y el sistema fallaba. Fue **George Laurer**, ingeniero de IBM (empresa que había contratado a Woodland), quien rediseñó el símbolo como una serie de líneas verticales rectangulares en lugar de círculos: nació el **UPC (Universal Product Code)**, mucho más resistente a errores de impresión.",
      },
      {
        type: "p",
        text:
          "El 26 de junio de 1974, en un supermercado Marsh de Troy, Ohio, se escaneó por primera vez un código de barras real en una venta: un paquete de diez chicles Wrigley’s Juicy Fruit. Ese paquete se conserva hoy en el Instituto Smithsoniano.",
      },
      { type: "h2", text: "El código QR: cuando Toyota necesitó ir más rápido (1994)" },
      {
        type: "p",
        text:
          "Veinte años después, el código de barras clásico ya mostraba sus límites: solo podía guardar unos 20 caracteres y había que escanearlo varias veces para leer toda la información de una pieza. Ese era justamente el problema de **Denso Wave**, una empresa del grupo Toyota que fabricaba componentes de autos y necesitaba rastrear cada pieza en la línea de producción.",
      },
      {
        type: "p",
        text:
          "En 1994, un equipo liderado por el ingeniero **Masahiro Hara** se puso a diseñar un código que pudiera leerse mucho más rápido y guardar mucha más información. Para resolver un problema clave —que el escáner supiera reconocer el código sin importar desde qué ángulo lo mirara— Hara se inspiró en algo bastante inesperado: el **Go**, el milenario juego de mesa japonés de fichas blancas y negras. De ahí surgieron los tres cuadrados grandes que ves en las esquinas de todo código QR (los “patrones de posición”): le permiten al lector ubicar el código al instante, esté derecho, inclinado o boca abajo.",
      },
      {
        type: "p",
        text:
          "El nombre **QR** viene de “Quick Response” (respuesta rápida), justamente por la velocidad de lectura. A diferencia del código de barras, un QR puede guardar más de 4.000 caracteres alfanuméricos y tiene corrección de errores integrada: aunque se dañe o se tape hasta un 30% del código (por ejemplo, con un logo en el centro, como los que podés agregar en [QR Studio](/)), sigue siendo legible.",
      },
      {
        type: "p",
        text:
          "La decisión que más aceleró su adopción mundial fue otra: Denso Wave, aunque registró la patente, decidió no ejercer sus derechos sobre la tecnología básica y la liberó para que cualquiera pudiera usarla sin pagar licencia. El código QR se volvió estándar ISO en el año 2000 y, gracias a esa apertura, cualquier empresa —incluida esta— puede generar códigos QR libremente.",
      },
      { type: "h2", text: "De la fábrica a tu bolsillo" },
      {
        type: "p",
        text:
          "Durante casi 15 años el QR se usó sobre todo en Japón: fábricas, y después revistas y publicidad, ya que los celulares japoneses venían con lector de QR integrado desde principios de los 2000, mucho antes que el resto del mundo. El gran salto global llegó recién con la pandemia de COVID-19 en 2020, cuando de la noche a la mañana los QR se convirtieron en la forma estándar de ver un menú sin tocar un papel, registrar una entrada o pagar sin contacto. Hoy conviven ambos códigos: el de barras sigue siendo el rey de los supermercados, y el QR domina todo lo que necesita más información, un diseño personalizado o un puente directo hacia internet.",
      },
    ],
    ctaText: "¿Querés crear tu propio código QR personalizado?",
  },
  en: {
    title: "The history of the barcode and the QR code",
    updated: "09/15/2026",
    intro:
      "Today we scan codes without a second thought: at the supermarket, on a restaurant menu, to pay for coffee. But behind those grids of black dots lie two stories separated by almost 50 years — a drawing made with fingers in beach sand, and a Japanese engineer who drew inspiration from an ancient board game to solve a car-parts factory problem.",
    barcodeCaption: "Barcode (1974)",
    qrCaption: "QR code (1994)",
    blocks: [
      { type: "h2", text: "The barcode: born on a beach (1948–1974)" },
      {
        type: "p",
        text:
          "The story starts in 1948, when the owner of a supermarket chain asked Drexel University, in Philadelphia, for a system to automatically read product prices at checkout. Two graduate students, **Norman Joseph Woodland** and **Bernard Silver**, set out to figure out how to do it.",
      },
      {
        type: "p",
        text:
          "As the story goes (and Woodland himself confirmed it several times), the final idea came to him while sitting on a Miami Beach shore in early 1949. He already knew Morse code, and started playing in the sand: he dragged four fingers through it, extending Morse's dots and dashes downward into lines. The result was a pattern of concentric circles — a “bullseye” — that encoded information in the width and spacing of the lines. Woodland and Silver patented the idea in 1952, but the technology of the time (no lasers, no cheap computers) made it impractical to actually read.",
      },
      {
        type: "p",
        text:
          "It took almost 25 years. RCA tested Woodland's circular code at a Kroger supermarket in Cincinnati in 1972, but the ink smeared on the printing presses and the system kept failing. It was **George Laurer**, an IBM engineer (the company that had hired Woodland), who redesigned the symbol as a series of vertical rectangular lines instead of circles: the **UPC (Universal Product Code)** was born, far more resistant to printing errors.",
      },
      {
        type: "p",
        text:
          "On June 26, 1974, at a Marsh supermarket in Troy, Ohio, a real barcode was scanned for the first time during an actual sale: a 10-pack of Wrigley's Juicy Fruit gum. That very pack is now preserved at the Smithsonian Institution.",
      },
      { type: "h2", text: "The QR code: when Toyota needed to move faster (1994)" },
      {
        type: "p",
        text:
          "Twenty years later, the classic barcode was already showing its limits: it could only hold about 20 characters, and a part often needed several scans to read all its information. That was exactly the problem facing **Denso Wave**, a Toyota Group company that manufactured auto parts and needed to track every piece on the production line.",
      },
      {
        type: "p",
        text:
          "In 1994, a team led by engineer **Masahiro Hara** set out to design a code that could be read much faster and hold far more data. To solve a key problem — getting the scanner to recognize the code no matter what angle it was viewed from — Hara drew inspiration from something rather unexpected: **Go**, the ancient Japanese board game played with black and white stones. That's where the three large squares you see in the corners of every QR code came from (the “position detection patterns”): they let the reader instantly locate the code, whether it's upright, tilted, or upside down.",
      },
      {
        type: "p",
        text:
          "The name **QR** comes from “Quick Response,” a nod to its reading speed. Unlike a barcode, a QR code can store more than 4,000 alphanumeric characters and has built-in error correction: even if up to 30% of the code is damaged or covered (for example, by a logo in the center, like the ones you can add in [QR Studio](/)), it still stays readable.",
      },
      {
        type: "p",
        text:
          "The decision that did the most to speed up its worldwide adoption was a different one: although Denso Wave held the patent, it chose not to enforce its rights over the core technology and released it for anyone to use royalty-free. The QR code became an ISO standard in 2000, and thanks to that openness, any company — including this one — can generate QR codes freely.",
      },
      { type: "h2", text: "From the factory floor to your pocket" },
      {
        type: "p",
        text:
          "For almost 15 years the QR code was used mostly in Japan: factories first, then magazines and advertising, since Japanese phones came with a built-in QR reader from the early 2000s — well before the rest of the world. The real global leap only came with the COVID-19 pandemic in 2020, when almost overnight QR codes became the standard way to view a menu without touching paper, check in to an event, or pay contactless. Today both codes coexist: barcodes still rule supermarkets, while QR codes dominate anything that needs more data, a custom design, or a direct bridge to the internet.",
      },
    ],
    ctaText: "Want to create your own custom QR code?",
  },
  it: {
    title: "La storia del codice a barre e del codice QR",
    updated: "15/09/2026",
    intro:
      "Oggi scansioniamo codici senza pensarci: al supermercato, su un menu al ristorante, per pagare un caffè. Ma dietro quelle griglie di puntini neri ci sono due storie separate da quasi 50 anni, un disegno fatto con le dita nella sabbia di una spiaggia e un ingegnere giapponese che si è ispirato a un gioco da tavolo millenario per risolvere un problema in una fabbrica di componenti auto.",
    barcodeCaption: "Codice a barre (1974)",
    qrCaption: "Codice QR (1994)",
    blocks: [
      { type: "h2", text: "Il codice a barre: nato su una spiaggia (1948–1974)" },
      {
        type: "p",
        text:
          "La storia inizia nel 1948, quando il proprietario di una catena di supermercati chiese all'Università Drexel, a Filadelfia, un sistema per leggere automaticamente il prezzo dei prodotti alla cassa. Due studenti di dottorato, **Norman Joseph Woodland** e **Bernard Silver**, iniziarono a studiare come risolverlo.",
      },
      {
        type: "p",
        text:
          "Come racconta la leggenda (e lo stesso Woodland lo confermò più volte), l'idea finale gli venne seduto su una spiaggia di Miami Beach all'inizio del 1949. Conosceva già il codice Morse e iniziò a giocare nella sabbia: affondò quattro dita e le trascinò, estendendo i punti e le linee del Morse verso il basso, sotto forma di linee. Il risultato fu un motivo di cerchi concentrici — un “occhio di bue” — che codificava le informazioni nella larghezza e nella spaziatura delle linee. Woodland e Silver brevettarono l'idea nel 1952, ma la tecnologia dell'epoca (senza laser né computer economici) non permetteva di leggerlo in modo pratico.",
      },
      {
        type: "p",
        text:
          "Bisognò aspettare quasi 25 anni. RCA testò il codice circolare di Woodland in un supermercato Kroger di Cincinnati nel 1972, ma l'inchiostro sbavava durante la stampa rotativa e il sistema continuava a fallire. Fu **George Laurer**, ingegnere IBM (l'azienda che aveva assunto Woodland), a ridisegnare il simbolo come una serie di linee verticali rettangolari al posto dei cerchi: nacque l'**UPC (Universal Product Code)**, molto più resistente agli errori di stampa.",
      },
      {
        type: "p",
        text:
          "Il 26 giugno 1974, in un supermercato Marsh di Troy, Ohio, venne scansionato per la prima volta un vero codice a barre durante una vendita: un pacchetto da dieci chewing gum Wrigley's Juicy Fruit. Quel pacchetto è oggi conservato allo Smithsonian Institution.",
      },
      { type: "h2", text: "Il codice QR: quando Toyota dovette accelerare (1994)" },
      {
        type: "p",
        text:
          "Vent'anni dopo, il codice a barre classico mostrava già i suoi limiti: poteva contenere solo circa 20 caratteri e spesso serviva scansionarlo più volte per leggere tutte le informazioni di un pezzo. Era proprio il problema di **Denso Wave**, un'azienda del gruppo Toyota che produceva componenti auto e doveva tracciare ogni pezzo sulla linea di produzione.",
      },
      {
        type: "p",
        text:
          "Nel 1994, un team guidato dall'ingegnere **Masahiro Hara** iniziò a progettare un codice che si potesse leggere molto più velocemente e contenesse molte più informazioni. Per risolvere un problema chiave — far sì che lo scanner riconoscesse il codice indipendentemente dall'angolazione — Hara si ispirò a qualcosa di piuttosto inaspettato: il **Go**, l'antico gioco da tavolo giapponese con pedine bianche e nere. Da lì nacquero i tre grandi quadrati che si vedono agli angoli di ogni codice QR (i “pattern di posizionamento”): permettono al lettore di individuare il codice all'istante, sia esso dritto, inclinato o capovolto.",
      },
      {
        type: "p",
        text:
          "Il nome **QR** deriva da “Quick Response” (risposta rapida), proprio per la velocità di lettura. A differenza del codice a barre, un QR può contenere oltre 4.000 caratteri alfanumerici e ha una correzione d'errore integrata: anche se viene danneggiato o coperto fino al 30% del codice (per esempio con un logo al centro, come quelli che puoi aggiungere in [QR Studio](/)), resta comunque leggibile.",
      },
      {
        type: "p",
        text:
          "La decisione che più accelerò la sua adozione mondiale fu un'altra: Denso Wave, pur avendo registrato il brevetto, decise di non far valere i propri diritti sulla tecnologia di base e la rilasciò affinché chiunque potesse usarla senza pagare licenze. Il codice QR divenne uno standard ISO nel 2000 e, grazie a quell'apertura, qualsiasi azienda — inclusa questa — può generare codici QR liberamente.",
      },
      { type: "h2", text: "Dalla fabbrica alla tua tasca" },
      {
        type: "p",
        text:
          "Per quasi 15 anni il QR fu usato soprattutto in Giappone: prima nelle fabbriche, poi su riviste e pubblicità, dato che i cellulari giapponesi avevano un lettore QR integrato già dai primi anni 2000, molto prima del resto del mondo. Il vero salto globale arrivò solo con la pandemia di COVID-19 nel 2020, quando da un giorno all'altro i QR divennero il modo standard per vedere un menu senza toccare la carta, registrarsi a un evento o pagare senza contatto. Oggi i due codici convivono: quello a barre resta il re dei supermercati, mentre il QR domina tutto ciò che richiede più informazioni, un design personalizzato o un collegamento diretto a internet.",
      },
    ],
    ctaText: "Vuoi creare il tuo codice QR personalizzato?",
  },
};
