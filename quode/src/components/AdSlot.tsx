"use client";

import { useEffect, useRef } from "react";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

interface AdSlotProps {
  /** ID del bloque de anuncio creado en la consola de AdSense (data-ad-slot). */
  slot: string;
  className?: string;
  format?: string;
}

/**
 * Bloque de anuncio de AdSense. No renderiza nada hasta que:
 * 1) NEXT_PUBLIC_ADSENSE_CLIENT_ID esté configurado, y
 * 2) el usuario haya aceptado cookies (ver CookieConsent).
 */
export default function AdSlot({ slot, className, format = "auto" }: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID) return;
    if (window.localStorage.getItem("qr-studio-cookie-consent") !== "granted") return;
    if (pushed.current) return;

    try {
      (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle =
        (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || [];
      (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // El script de AdSense puede no estar listo todavía; se reintenta en el próximo render.
    }
  });

  if (!ADSENSE_CLIENT_ID) return null;

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle block ${className ?? ""}`}
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
