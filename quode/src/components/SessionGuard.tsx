"use client";
import { useEffect, useRef } from "react";
import { account } from "@/lib/appwriteClient";

const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;
const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"] as const;

export default function SessionGuard() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const logoutIfInactive = async () => {
      try {
        // Si no hay sesión activa, no hacemos nada (evita recargar la
        // página a visitantes anónimos que solo están leyendo el sitio).
        await account.get();
      } catch {
        return;
      }
      try {
        await account.deleteSession("current");
      } catch {
        // La sesión ya puede estar vencida del lado del servidor.
      }
      window.location.reload();
    };

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(logoutIfInactive, INACTIVITY_TIMEOUT_MS);
    };

    ACTIVITY_EVENTS.forEach((event) =>
      window.addEventListener(event, resetTimer, { passive: true }),
    );
    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  return null;
}
