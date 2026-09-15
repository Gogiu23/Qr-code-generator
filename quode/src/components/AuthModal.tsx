"use client";
import { useState } from "react";
import { account } from "@/lib/appwriteClient";
import { ID } from "appwrite";
import { X, Mail, Lock, Loader2 } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getUi } from "@/lib/i18n/ui";

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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { locale } = useLocale();
  const t = getUi(locale);

  if (!isOpen) return null;

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
    setConfirmPassword("");
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (isSignUp && password !== confirmPassword) {
      setErrorMsg(t.auth.passwordMismatch);
      return;
    }

    setLoading(true);
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
      setErrorMsg(err instanceof Error ? err.message : t.auth.genericError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-chrome/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-page w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 border border-primary/20 text-ink">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-ink">
            {isSignUp ? t.auth.createAccount : t.auth.login}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-primary/10 text-ink"
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
            <label className="block text-xs font-semibold text-ink mb-1">
              {t.auth.email}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-primary/60" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full pl-9 pr-3 py-2 text-sm bg-surface border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1">
              {t.auth.password}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-primary/60" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm bg-surface border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-ink mb-1">
                {t.auth.confirmPassword}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-primary/60" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-surface border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-chrome text-white font-bold py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 shadow-md"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSignUp ? t.auth.submitSignUp : t.auth.submitLogin}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-ink/80">
          {isSignUp ? t.auth.haveAccount : t.auth.noAccount}
          <button
            type="button"
            onClick={toggleMode}
            className="font-bold text-primary underline ml-1"
          >
            {isSignUp ? t.auth.loginLink : t.auth.signupLink}
          </button>
        </div>
      </div>
    </div>
  );
}
