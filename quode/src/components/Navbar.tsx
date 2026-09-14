"use client";
import { Models } from "appwrite";
import { LogIn, LogOut, QrCode } from "lucide-react";

interface NavbarProps {
  user: Models.User<Models.Preferences> | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export default function Navbar({ user, onOpenAuth, onLogout }: NavbarProps) {
  return (
    <header className="bg-[#333333] text-white px-4 py-3 flex items-center justify-between border-b-4 border-[#95E1D3] print:hidden">
      <div className="flex items-center gap-2 font-bold text-lg">
        <QrCode className="w-5 h-5 text-[#FCE38A]" />
        QR Studio
      </div>
      {user ? (
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          {user.email}
        </button>
      ) : (
        <button
          onClick={onOpenAuth}
          className="flex items-center gap-1.5 text-xs font-semibold bg-[#FCE38A] text-[#333333] hover:bg-[#FCE38A]/90 px-3 py-1.5 rounded-lg transition"
        >
          <LogIn className="w-3.5 h-3.5" />
          Iniciar sesión
        </button>
      )}
    </header>
  );
}
