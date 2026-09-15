"use client";
import Link from "next/link";
import { ArrowLeft, QrCode } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getUi } from "@/lib/i18n/ui";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface LegalHeaderProps {
  /** Ruta activa a resaltar en el nav (ej. "/historia"). Si no matchea ningún link, ninguno se resalta. */
  active?: string;
}

export default function LegalHeader({ active }: LegalHeaderProps) {
  const { locale } = useLocale();
  const t = getUi(locale);

  const NAV_LINKS = [
    { href: "/", label: t.nav.inicio },
    { href: "/historia", label: t.nav.historia },
    { href: "/blog", label: t.nav.blog },
  ];

  return (
    <header className="bg-chrome text-white px-4 py-3 flex items-center justify-between gap-4 border-b-4 border-secondary print:hidden">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
          <QrCode className="w-5 h-5 text-accent" />
          QR Studio
        </Link>
        <nav className="hidden sm:flex items-center gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-semibold transition ${
                active === link.href ? "text-accent" : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <LanguageSwitcher />
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-semibold bg-surface/10 hover:bg-surface/20 px-3 py-1.5 rounded-lg transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t.nav.volver}
        </Link>
      </div>
    </header>
  );
}
