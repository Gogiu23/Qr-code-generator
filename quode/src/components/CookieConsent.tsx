"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getUi } from "@/lib/i18n/ui";

const CONSENT_KEY = "qr-studio-cookie-consent";
const CONSENT_EVENT = "qr-studio-consent-changed";
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

type Consent = "granted" | "denied" | null;

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Consent {
  const stored = window.localStorage.getItem(CONSENT_KEY);
  return stored === "granted" || stored === "denied" ? stored : null;
}

// Durante el render en el servidor no hay banner: se muestra recién tras hidratar en el cliente.
function getServerSnapshot(): Consent {
  return "denied";
}

function setConsent(value: "granted" | "denied") {
  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

function loadAdSenseScript() {
  if (!ADSENSE_CLIENT_ID) return;
  if (document.querySelector(`script[data-adsense="true"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
  script.crossOrigin = "anonymous";
  script.dataset.adsense = "true";
  document.head.appendChild(script);
}

export default function CookieConsent() {
  const decision = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { locale } = useLocale();
  const t = getUi(locale);

  useEffect(() => {
    if (decision === "granted") loadAdSenseScript();
  }, [decision]);

  if (decision !== null || !ADSENSE_CLIENT_ID) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-[#333333] text-white text-xs sm:text-sm px-4 py-3 flex flex-col sm:flex-row items-center gap-3 justify-between print:hidden">
      <p className="text-white/80">
        {t.cookie.text}{" "}
        <Link href="/privacidad" className="underline hover:text-white">
          {t.cookie.policyLink}
        </Link>
        .
      </p>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setConsent("denied")}
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 font-semibold transition"
        >
          {t.cookie.reject}
        </button>
        <button
          onClick={() => setConsent("granted")}
          className="px-3 py-1.5 rounded-lg bg-[#FCE38A] text-[#333333] hover:bg-[#FCE38A]/90 font-semibold transition"
        >
          {t.cookie.accept}
        </button>
      </div>
    </div>
  );
}
