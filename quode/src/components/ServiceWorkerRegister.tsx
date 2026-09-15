"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    // Solo en producción: en dev, cachear /_next/static/* choca con Turbopack
    // (los chunks no son inmutables entre builds) y sirve JS viejo.
    if (process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
      return;
    }

    // Si quedó un service worker de una sesión anterior (de cuando se probó
    // la PWA en local), lo desregistramos y limpiamos su caché para que deje
    // de servir chunks viejos.
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => regs.forEach((reg) => reg.unregister()))
      .catch(() => {});
    if (typeof caches !== "undefined") {
      caches
        .keys()
        .then((names) => names.forEach((name) => caches.delete(name)))
        .catch(() => {});
    }
  }, []);

  return null;
}
