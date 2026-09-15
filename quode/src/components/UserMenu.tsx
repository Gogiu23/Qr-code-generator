"use client";
import { useEffect, useRef, useState } from "react";
import { Models } from "appwrite";
import { LogOut, User as UserIcon, Settings } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getUi } from "@/lib/i18n/ui";
import AvatarCircle from "@/components/AvatarCircle";

interface UserMenuProps {
  user: Models.User<Models.Preferences>;
  onLogout: () => void;
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const t = getUi(locale);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        title={user.email}
        className="rounded-full hover:brightness-95 transition"
      >
        <AvatarCircle user={user} size={32} />
      </button>

      {open && (
        <div className="absolute z-30 top-full right-0 mt-2 w-52 bg-surface rounded-xl border border-ink/10 shadow-lg overflow-hidden text-left">
          <p className="px-3 py-2.5 text-xs font-semibold text-ink truncate border-b border-ink/10">
            {user.email}
          </p>

          <Link
            href="/perfil"
            onClick={() => setOpen(false)}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-ink hover:bg-page transition"
          >
            <UserIcon className="w-3.5 h-3.5" />
            {t.nav.profile}
          </Link>

          <Link
            href="/configuracion"
            onClick={() => setOpen(false)}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-ink hover:bg-page transition"
          >
            <Settings className="w-3.5 h-3.5" />
            {t.nav.settings}
          </Link>

          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-primary hover:bg-page transition border-t border-ink/10"
          >
            <LogOut className="w-3.5 h-3.5" />
            {t.nav.logout}
          </button>
        </div>
      )}
    </div>
  );
}
