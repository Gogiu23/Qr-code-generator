"use client";
import { Models } from "appwrite";
import { LogIn, QrCode } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getUi } from "@/lib/i18n/ui";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import UserMenu from "@/components/UserMenu";

interface NavbarProps {
  user: Models.User<Models.Preferences> | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export default function Navbar({ user, onOpenAuth, onLogout }: NavbarProps) {
  const pathname = usePathname();
  const { locale } = useLocale();
  const t = getUi(locale);

  const NAV_LINKS = [
    { href: "/", label: t.nav.inicio },
    { href: "/historia", label: t.nav.historia },
    { href: "/blog", label: t.nav.blog },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLink = (link: (typeof NAV_LINKS)[number]) => (
    <Link
      key={link.href}
      href={link.href}
      className={`text-xs font-semibold transition ${
        isActive(link.href) ? "text-accent" : "text-white/70 hover:text-white"
      }`}
    >
      {link.label}
    </Link>
  );

  return (
    <header className="bg-chrome text-white print:hidden">
      <div className="px-4 py-3 flex items-center justify-between gap-4 border-b-4 border-secondary">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-lg shrink-0">
            <QrCode className="w-5 h-5 text-accent" />
            QR Studio
          </div>
          <nav className="hidden sm:flex items-center gap-5">
            {NAV_LINKS.map(navLink)}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {user ? (
            <UserMenu user={user} onLogout={onLogout} />
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 text-xs font-semibold bg-accent text-ink hover:bg-accent/90 px-3 py-1.5 rounded-lg transition"
            >
              <LogIn className="w-3.5 h-3.5" />
              {t.nav.login}
            </button>
          )}
        </div>
      </div>
      <nav className="sm:hidden flex items-center gap-5 px-4 py-2 bg-chrome">
        {NAV_LINKS.map(navLink)}
      </nav>
    </header>
  );
}
