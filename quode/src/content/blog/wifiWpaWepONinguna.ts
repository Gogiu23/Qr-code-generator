import { Locale } from "@/lib/i18n/locale";
import { Block } from "@/lib/i18n/articleBlocks";

export interface WifiPostContent {
  title: string;
  updated: string;
  intro: string;
  cards: { label: string; caption: string }[];
  blocks: Block[];
  ctaText: string;
}

export const WIFI_POST_CONTENT: Record<Locale, WifiPostContent> = {
  es: {
    title: "WPA, WEP o ninguna: qué seguridad elegir para tu QR de WiFi",
    updated: "15/09/2026",
    intro:
      "Cuando generás un código QR de WiFi en QR Studio, además del nombre de red (SSID) y la contraseña te pedimos elegir un tipo de seguridad: **WPA**, **WEP** o **Ninguna**. Ese dato no es cosmético: si no coincide con la configuración real de tu router, el celular que escanea el código va a intentar conectarse y va a fallar. Acá va la diferencia entre los tres.",
    cards: [
      { label: "WPA", caption: "Cifrado fuerte, la más común hoy" },
      { label: "WEP", caption: "Cifrado viejo y roto, evitala" },
      { label: "Ninguna", caption: "Red abierta, sin contraseña" },
    ],
    blocks: [
      { type: "h2", text: "WPA (y WPA2 / WPA3)" },
      {
        type: "p",
        text:
          "**WPA** (Wi-Fi Protected Access) es el estándar de seguridad que usa prácticamente cualquier router hogareño u oficina desde hace más de una década. Cifra el tráfico de la red y exige contraseña para conectarse. Sus versiones más nuevas, **WPA2** y **WPA3**, son más fuertes todavía, pero a fines prácticos del código QR da igual: la opción “WPA” en QR Studio le dice al celular “esta red pide contraseña con cifrado moderno”, y funciona igual con WPA, WPA2 o WPA3. Si no sabés qué versión exacta tiene tu router pero sabés que pide contraseña al conectarte normalmente, elegí **WPA**: es la opción correcta en el 95% de los casos hoy en día.",
      },
      { type: "h2", text: "WEP" },
      {
        type: "p",
        text:
          "**WEP** (Wired Equivalent Privacy) es el estándar de seguridad más viejo, de 1997. También pide contraseña, pero su cifrado está roto desde hace años: existen herramientas que lo descifran en minutos. Prácticamente ningún router se vende hoy configurado en WEP, salvo equipos muy antiguos que nunca se reconfiguraron. Elegí esta opción solo si estás totalmente seguro de que tu router usa específicamente WEP (lo vas a ver así en el panel de configuración del router); si tenés dudas, probá WPA primero.",
      },
      { type: "h2", text: "Ninguna (red abierta)" },
      {
        type: "p",
        text:
          "Elegí **Ninguna** cuando la red WiFi no pide ninguna contraseña para conectarse, algo típico de redes de invitados en cafeterías, aeropuertos o algunos eventos. El código QR simplemente le indica al celular el nombre de la red y que se puede unir sin autenticación. Ojo: “sin contraseña” no siempre significa “sin ningún tipo de portal” — algunas redes abiertas igual piden aceptar términos o loguearse en una página web después de conectar; eso el QR no lo puede resolver, solo hace la parte de unirse a la red.",
      },
      { type: "h2", text: "¿Cómo sé cuál elegir?" },
      {
        type: "p",
        text:
          "Fijate en el panel de administración de tu router (usualmente en una IP como 192.168.0.1 o 192.168.1.1) en la sección de WiFi/Seguridad: ahí figura literalmente “WPA2-PSK”, “WPA3”, “WEP” o “Abierta”. Si no tenés acceso al router pero sí la contraseña, otra pista simple: si la red te pide contraseña al conectarte a mano, probá **WPA** (funciona en la enorme mayoría de los casos); si no pide nada, usá **Ninguna**. Si el código QR no conecta con la opción elegida, es casi siempre por esto: la seguridad indicada no coincide con la real del router.",
      },
    ],
    ctaText: "¿Listo para generar tu QR de WiFi?",
  },
  en: {
    title: "WPA, WEP, or none: which security to pick for your WiFi QR code",
    updated: "09/15/2026",
    intro:
      "When you generate a WiFi QR code in QR Studio, besides the network name (SSID) and password, we ask you to pick a security type: **WPA**, **WEP**, or **None**. That's not a cosmetic detail: if it doesn't match your router's actual settings, the phone scanning the code will try to connect and fail. Here's the difference between the three.",
    cards: [
      { label: "WPA", caption: "Strong encryption, the most common today" },
      { label: "WEP", caption: "Old, broken encryption — avoid it" },
      { label: "None", caption: "Open network, no password" },
    ],
    blocks: [
      { type: "h2", text: "WPA (and WPA2 / WPA3)" },
      {
        type: "p",
        text:
          "**WPA** (Wi-Fi Protected Access) is the security standard used by virtually every home or office router for over a decade now. It encrypts network traffic and requires a password to connect. Its newer versions, **WPA2** and **WPA3**, are even stronger, but for QR-code purposes it doesn't matter which: the “WPA” option in QR Studio tells the phone “this network needs a password with modern encryption,” and it works the same with WPA, WPA2, or WPA3. If you don't know exactly which version your router uses but you know it normally asks for a password, pick **WPA** — it's the right choice in 95% of cases today.",
      },
      { type: "h2", text: "WEP" },
      {
        type: "p",
        text:
          "**WEP** (Wired Equivalent Privacy) is the oldest security standard, from 1997. It also requires a password, but its encryption has been broken for years — tools exist that crack it in minutes. Practically no router ships configured with WEP today, except very old equipment that was never reconfigured. Only pick this option if you're completely sure your router specifically uses WEP (you'll see it spelled out in the router's settings panel); if in doubt, try WPA first.",
      },
      { type: "h2", text: "None (open network)" },
      {
        type: "p",
        text:
          "Pick **None** when the WiFi network doesn't require any password to connect, which is typical of guest networks in cafés, airports, or some events. The QR code simply tells the phone the network's name and that it can join without authentication. One catch: “no password” doesn't always mean “no portal at all” — some open networks still require accepting terms or logging in through a webpage after connecting; the QR code can't handle that part, it only handles joining the network.",
      },
      { type: "h2", text: "How do I know which one to pick?" },
      {
        type: "p",
        text:
          "Check your router's admin panel (usually at an IP like 192.168.0.1 or 192.168.1.1) under the WiFi/Security section: it will literally say “WPA2-PSK,” “WPA3,” “WEP,” or “Open.” If you don't have router access but you do have the password, here's a simpler clue: if the network asks for a password when you connect manually, try **WPA** (it works in the vast majority of cases); if it doesn't ask for anything, use **None**. If the QR code doesn't connect with the option you picked, it's almost always because the listed security doesn't match the router's actual setting.",
      },
    ],
    ctaText: "Ready to generate your WiFi QR code?",
  },
  it: {
    title: "WPA, WEP o nessuna: quale sicurezza scegliere per il tuo QR WiFi",
    updated: "15/09/2026",
    intro:
      "Quando generi un codice QR WiFi su QR Studio, oltre al nome della rete (SSID) e alla password ti chiediamo di scegliere un tipo di sicurezza: **WPA**, **WEP** o **Nessuna**. Non è un dettaglio estetico: se non corrisponde alla configurazione reale del tuo router, il telefono che scansiona il codice proverà a connettersi e fallirà. Ecco la differenza tra i tre.",
    cards: [
      { label: "WPA", caption: "Crittografia forte, la più comune oggi" },
      { label: "WEP", caption: "Crittografia vecchia e violata, evitala" },
      { label: "Nessuna", caption: "Rete aperta, senza password" },
    ],
    blocks: [
      { type: "h2", text: "WPA (e WPA2 / WPA3)" },
      {
        type: "p",
        text:
          "**WPA** (Wi-Fi Protected Access) è lo standard di sicurezza usato praticamente da qualsiasi router domestico o d'ufficio da oltre un decennio. Cifra il traffico di rete e richiede una password per connettersi. Le versioni più recenti, **WPA2** e **WPA3**, sono ancora più forti, ma ai fini pratici del codice QR non fa differenza: l'opzione “WPA” su QR Studio dice al telefono “questa rete richiede una password con crittografia moderna”, e funziona allo stesso modo con WPA, WPA2 o WPA3. Se non sai esattamente quale versione usa il tuo router ma sai che di solito chiede una password, scegli **WPA**: è l'opzione corretta nel 95% dei casi oggi.",
      },
      { type: "h2", text: "WEP" },
      {
        type: "p",
        text:
          "**WEP** (Wired Equivalent Privacy) è lo standard di sicurezza più vecchio, del 1997. Richiede anch'esso una password, ma la sua crittografia è violata da anni: esistono strumenti che la decifrano in pochi minuti. Praticamente nessun router viene venduto oggi configurato in WEP, salvo apparecchi molto datati mai riconfigurati. Scegli questa opzione solo se sei assolutamente certo che il tuo router usi specificamente WEP (lo vedrai indicato così nel pannello di configurazione); in caso di dubbio, prova prima WPA.",
      },
      { type: "h2", text: "Nessuna (rete aperta)" },
      {
        type: "p",
        text:
          "Scegli **Nessuna** quando la rete WiFi non richiede alcuna password per connettersi, tipico delle reti ospiti in bar, aeroporti o alcuni eventi. Il codice QR indica semplicemente al telefono il nome della rete e che ci si può collegare senza autenticazione. Attenzione: “senza password” non significa sempre “senza alcun tipo di portale” — alcune reti aperte richiedono comunque di accettare termini o effettuare il login su una pagina web dopo la connessione; questa parte il QR non può gestirla, gestisce solo l'ingresso nella rete.",
      },
      { type: "h2", text: "Come faccio a sapere quale scegliere?" },
      {
        type: "p",
        text:
          "Controlla il pannello di amministrazione del tuo router (di solito su un IP come 192.168.0.1 o 192.168.1.1) nella sezione WiFi/Sicurezza: lì troverai scritto letteralmente “WPA2-PSK”, “WPA3”, “WEP” o “Aperta”. Se non hai accesso al router ma conosci la password, un altro indizio semplice: se la rete richiede una password quando ti connetti manualmente, prova **WPA** (funziona nella stragrande maggioranza dei casi); se non richiede nulla, usa **Nessuna**. Se il codice QR non si connette con l'opzione scelta, quasi sempre è per questo motivo: la sicurezza indicata non corrisponde a quella reale del router.",
      },
    ],
    ctaText: "Pronto a generare il tuo QR WiFi?",
  },
};
