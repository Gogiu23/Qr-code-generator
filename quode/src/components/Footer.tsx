"use client";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getUi } from "@/lib/i18n/ui";

export default function Footer() {
  const { locale } = useLocale();
  const t = getUi(locale);

  return (
    <footer className="bg-[#333333] text-white/70 text-xs px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-t-4 border-[#95E1D3] print:hidden">
      <span>© {new Date().getFullYear()} QR Studio</span>
      <div className="flex items-center gap-4">
        <Link href="/historia" className="hover:text-white transition">
          {t.footer.historia}
        </Link>
        <Link href="/blog" className="hover:text-white transition">
          {t.footer.blog}
        </Link>
        <Link href="/privacidad" className="hover:text-white transition">
          {t.footer.privacidad}
        </Link>
        <Link href="/terminos" className="hover:text-white transition">
          {t.footer.terminos}
        </Link>
        <a href="mailto:giuliandominici@gmail.com" className="hover:text-white transition">
          {t.footer.contacto}
        </a>
      </div>
    </footer>
  );
}
