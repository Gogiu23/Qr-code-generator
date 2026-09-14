"use client";

import { useLocale } from "@/lib/i18n/LocaleContext";
import { LOCALES } from "@/lib/i18n/locale";

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div className={`flex items-center gap-1 ${className ?? ""}`}>
      {LOCALES.map((l) => (
        <button
          key={l.code}
          onClick={() => setLocale(l.code)}
          aria-current={locale === l.code}
          className={`text-[11px] font-bold px-1.5 py-0.5 rounded transition ${
            locale === l.code
              ? "text-[#FCE38A]"
              : "text-white/50 hover:text-white"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
