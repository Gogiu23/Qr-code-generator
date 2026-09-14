import { Locale } from "@/lib/i18n/locale";
import { Block } from "@/lib/i18n/articleBlocks";

export interface ErrorCorrectionPostContent {
  title: string;
  updated: string;
  intro: string;
  levelsHeading: string;
  levelsList: string[];
  levels: { letter: string; percent: string; cover: number }[];
  recoverableLabel: string;
  blocks: Block[];
  ctaText: string;
}

export const ERROR_CORRECTION_POST_CONTENT: Record<Locale, ErrorCorrectionPostContent> = {
  es: {
    title: "Niveles de corrección de errores en un QR: L, M, Q y H explicados",
    updated: "15/09/2026",
    intro:
      "Una de las razones por las que el código QR reemplazó al código de barras clásico es que puede seguir leyéndose aunque esté parcialmente dañado, sucio o tapado por un logo. Eso lo logra gracias a la **corrección de errores**, un sistema que guarda información redundante dentro del propio código. El estándar QR define cuatro niveles de corrección, cada uno con una sigla: L, M, Q y H.",
    levelsHeading: "Qué significa cada nivel",
    levelsList: [
      "**L (Low)**: recupera hasta ~7% del código dañado. Es el nivel con menos redundancia, lo que da el código más “liviano” (menos módulos necesarios) para la misma cantidad de datos.",
      "**M (Medium)**: recupera hasta ~15%. Es el nivel por defecto que usan la mayoría de los generadores de QR cuando no se especifica nada.",
      "**Q (Quartile)**: recupera hasta ~25%. Buen equilibrio para códigos que se van a imprimir y manipular, o que llevan un logo pequeño encima.",
      "**H (High)**: recupera hasta ~30%, el máximo posible. Es el que más redundancia agrega y, por lo tanto, el que genera el código más denso para el mismo contenido.",
    ],
    levels: [
      { letter: "L", percent: "~7%", cover: 0.03 },
      { letter: "M", percent: "~15%", cover: 0.1 },
      { letter: "Q", percent: "~25%", cover: 0.2 },
      { letter: "H", percent: "~30%", cover: 0.27 },
    ],
    recoverableLabel: "recuperable",
    blocks: [
      {
        type: "p",
        text:
          "QR Studio genera los códigos con nivel **Q (~25%)** por defecto, un punto intermedio pensado justamente para que puedas superponer un logo central (como el que se sube en la pestaña Contenido) sin que el código deje de leerse.",
      },
      { type: "h2", text: "El trade-off: redundancia vs. densidad" },
      {
        type: "p",
        text:
          "Más corrección de errores no es gratis: para guardar la misma cantidad de datos con más redundancia, el QR necesita más módulos (más “puntitos”), lo que lo hace levemente más denso y, en códigos con poco contenido, puede notarse un patrón más recargado. Por eso no conviene usar siempre el nivel más alto “por las dudas” — tiene sentido elegir el nivel según el uso real que le vas a dar al código.",
      },
      { type: "h2", text: "Cuándo conviene cada nivel" },
      {
        type: "p",
        text:
          "**L o M** alcanzan de sobra para un QR que se va a mostrar en una pantalla digital (una web, un cartel LED) donde no hay riesgo de suciedad, roturas ni logos superpuestos. **Q** es la opción más segura para materiales impresos de uso diario — menús, folletos, cajas — y es imprescindible si el QR lleva un logo en el centro, porque esa zona tapada necesita esa redundancia extra para poder reconstruirse. **H** se reserva para escenarios exigentes: etiquetas industriales que se rayan, códigos expuestos a la intemperie, o cuando el logo ocupa una porción grande del diseño.",
      },
    ],
    ctaText: "Probá tu QR con logo y comprobá que siga leyendo bien.",
  },
  en: {
    title: "Error correction levels in a QR code: L, M, Q, and H explained",
    updated: "09/15/2026",
    intro:
      "One reason the QR code replaced the classic barcode is that it can still be read even when partially damaged, dirty, or covered by a logo. It pulls that off thanks to **error correction**, a system that stores redundant information inside the code itself. The QR standard defines four correction levels, each with a letter: L, M, Q, and H.",
    levelsHeading: "What each level means",
    levelsList: [
      "**L (Low)**: recovers up to ~7% of a damaged code. It's the level with the least redundancy, which makes the code “lighter” (fewer modules needed) for the same amount of data.",
      "**M (Medium)**: recovers up to ~15%. It's the default level most QR generators use when nothing else is specified.",
      "**Q (Quartile)**: recovers up to ~25%. A good balance for codes that will be printed and handled, or that carry a small logo on top.",
      "**H (High)**: recovers up to ~30%, the maximum possible. It adds the most redundancy and, as a result, produces the densest code for the same content.",
    ],
    levels: [
      { letter: "L", percent: "~7%", cover: 0.03 },
      { letter: "M", percent: "~15%", cover: 0.1 },
      { letter: "Q", percent: "~25%", cover: 0.2 },
      { letter: "H", percent: "~30%", cover: 0.27 },
    ],
    recoverableLabel: "recoverable",
    blocks: [
      {
        type: "p",
        text:
          "QR Studio generates codes with **Q (~25%)** correction by default, a middle-ground level chosen precisely so you can overlay a center logo (like the one you upload in the Content tab) without the code becoming unreadable.",
      },
      { type: "h2", text: "The trade-off: redundancy vs. density" },
      {
        type: "p",
        text:
          "More error correction isn't free: to store the same amount of data with more redundancy, the QR code needs more modules (more “dots”), which makes it slightly denser — and on codes with little content, that can result in a busier-looking pattern. That's why it doesn't make sense to always use the highest level “just in case” — it's worth picking the level based on the actual use you'll give the code.",
      },
      { type: "h2", text: "When each level makes sense" },
      {
        type: "p",
        text:
          "**L or M** are more than enough for a QR code that will be shown on a digital screen (a website, an LED sign) where there's no risk of dirt, tears, or overlapping logos. **Q** is the safest choice for everyday printed materials — menus, flyers, boxes — and is essential if the QR code carries a logo in the center, since that covered area needs that extra redundancy to be reconstructed. **H** is reserved for demanding scenarios: industrial labels that get scratched, codes exposed to the outdoors, or when the logo covers a large portion of the design.",
      },
    ],
    ctaText: "Try your QR code with a logo and check it still scans well.",
  },
  it: {
    title: "Livelli di correzione d'errore in un QR: L, M, Q e H spiegati",
    updated: "15/09/2026",
    intro:
      "Uno dei motivi per cui il codice QR ha sostituito il classico codice a barre è che può continuare a essere letto anche se parzialmente danneggiato, sporco o coperto da un logo. Questo è possibile grazie alla **correzione d'errore**, un sistema che salva informazioni ridondanti all'interno del codice stesso. Lo standard QR definisce quattro livelli di correzione, ciascuno con una sigla: L, M, Q e H.",
    levelsHeading: "Cosa significa ogni livello",
    levelsList: [
      "**L (Low)**: recupera fino a ~7% del codice danneggiato. È il livello con meno ridondanza, il che rende il codice più “leggero” (meno moduli necessari) per la stessa quantità di dati.",
      "**M (Medium)**: recupera fino a ~15%. È il livello predefinito usato dalla maggior parte dei generatori di QR quando non viene specificato nulla.",
      "**Q (Quartile)**: recupera fino a ~25%. Buon equilibrio per codici che verranno stampati e maneggiati, o che portano un piccolo logo sopra.",
      "**H (High)**: recupera fino a ~30%, il massimo possibile. È quello che aggiunge più ridondanza e, di conseguenza, genera il codice più denso per lo stesso contenuto.",
    ],
    levels: [
      { letter: "L", percent: "~7%", cover: 0.03 },
      { letter: "M", percent: "~15%", cover: 0.1 },
      { letter: "Q", percent: "~25%", cover: 0.2 },
      { letter: "H", percent: "~30%", cover: 0.27 },
    ],
    recoverableLabel: "recuperabile",
    blocks: [
      {
        type: "p",
        text:
          "QR Studio genera i codici con livello **Q (~25%)** di default, un punto intermedio pensato proprio per permetterti di sovrapporre un logo centrale (come quello che carichi nella scheda Contenuto) senza che il codice smetta di essere leggibile.",
      },
      { type: "h2", text: "Il compromesso: ridondanza vs. densità" },
      {
        type: "p",
        text:
          "Più correzione d'errore non è gratis: per salvare la stessa quantità di dati con più ridondanza, il QR ha bisogno di più moduli (più “puntini”), il che lo rende leggermente più denso e, nei codici con poco contenuto, può risultare in un motivo più affollato. Per questo non conviene usare sempre il livello più alto “per sicurezza” — ha senso scegliere il livello in base all'uso reale che darai al codice.",
      },
      { type: "h2", text: "Quando conviene ogni livello" },
      {
        type: "p",
        text:
          "**L o M** bastano ampiamente per un QR che verrà mostrato su uno schermo digitale (un sito, un'insegna LED) dove non c'è rischio di sporco, rotture o loghi sovrapposti. **Q** è l'opzione più sicura per materiali stampati di uso quotidiano — menu, volantini, scatole — ed è indispensabile se il QR porta un logo al centro, perché quella zona coperta ha bisogno di quella ridondanza extra per essere ricostruita. **H** è riservato a scenari impegnativi: etichette industriali che si graffiano, codici esposti alle intemperie, o quando il logo occupa una porzione ampia del design.",
      },
    ],
    ctaText: "Prova il tuo QR con logo e verifica che si legga ancora bene.",
  },
};
