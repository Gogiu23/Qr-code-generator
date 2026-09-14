"use client";
import { useState } from "react";
import { account } from "@/lib/appwriteClient";
import { ID } from "appwrite";
import { X, Mail, Lock, Loader2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
}: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      if (isSignUp) {
        await account.create(ID.unique(), email, password);
        await account.createEmailPasswordSession(email, password);
      } else {
        await account.createEmailPasswordSession(email, password);
      }
      onAuthSuccess();
      onClose();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Error en la autenticación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#333333]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#EAFFD0] w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 border border-[#F38181]/20 text-[#333333]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-[#333333]">
            {isSignUp ? "Crear Cuenta" : "Iniciar Sesión"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#F38181]/10 text-[#333333]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="bg-red-100 border border-red-300 text-red-700 text-xs p-3 rounded-lg mb-4">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#333333] mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-[#F38181]/60" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#F38181]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F38181]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#333333] mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-[#F38181]/60" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#F38181]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F38181]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F38181] hover:bg-[#333333] text-white font-bold py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 shadow-md"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSignUp ? "Registrarse" : "Entrar"}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-[#333333]/80">
          {isSignUp ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-bold text-[#F38181] underline ml-1"
          >
            {isSignUp ? "Inicia sesión" : "Regístrate gratis"}
          </button>
        </div>
      </div>
    </div>
  );
}
