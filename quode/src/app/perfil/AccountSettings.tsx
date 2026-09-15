"use client";
import { useState } from "react";
import { Models } from "appwrite";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwriteClient";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getUi } from "@/lib/i18n/ui";
import { KeyRound, Mail, Trash2, Loader2 } from "lucide-react";

interface AccountSettingsProps {
  onUserUpdate: (user: Models.User<Models.Preferences>) => void;
}

type FormMessage = { type: "success" | "error"; text: string } | null;

const fieldClass =
  "w-full px-3 py-2 text-xs bg-page border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary";
const submitClass =
  "w-full flex items-center justify-center gap-1.5 bg-chrome hover:bg-primary text-white py-2 rounded-lg text-xs font-bold transition disabled:opacity-60";

export default function AccountSettings({ onUserUpdate }: AccountSettingsProps) {
  const { locale } = useLocale();
  const t = getUi(locale);
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<FormMessage>(null);

  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState<FormMessage>(null);

  const [deleteConfirming, setDeleteConfirming] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);
    if (newPassword !== confirmNewPassword) {
      setPasswordMessage({ type: "error", text: t.auth.passwordMismatch });
      return;
    }
    setPasswordLoading(true);
    try {
      await account.updatePassword(newPassword, currentPassword);
      setPasswordMessage({ type: "success", text: t.profile.passwordUpdateSuccess });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setPasswordMessage({
        type: "error",
        text: err instanceof Error ? err.message : t.profile.genericError,
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailMessage(null);
    setEmailLoading(true);
    try {
      const updated = await account.updateEmail(newEmail, emailPassword);
      onUserUpdate(updated);
      setEmailMessage({ type: "success", text: t.profile.emailUpdateSuccess });
      setNewEmail("");
      setEmailPassword("");
    } catch (err) {
      setEmailMessage({
        type: "error",
        text: err instanceof Error ? err.message : t.profile.genericError,
      });
    } finally {
      setEmailLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    setDeleteError("");
    try {
      await account.updateStatus();
      try {
        await account.deleteSession("current");
      } catch {
        // La sesión ya puede estar vencida del lado del servidor.
      }
      router.push("/");
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : t.profile.genericError);
      setDeleteLoading(false);
    }
  };

  return (
    <div className="bg-surface rounded-2xl p-5 shadow-sm border border-ink/10">
      <p className="text-[10px] font-bold uppercase tracking-wider text-ink/40 mb-4">
        {t.profile.accountSettingsTitle}
      </p>

      <div className="grid gap-6 sm:grid-cols-3">
        <form onSubmit={handlePasswordSubmit} className="space-y-2.5">
          <h3 className="flex items-center gap-1.5 text-xs font-bold text-ink">
            <KeyRound className="w-3.5 h-3.5 text-primary" />
            {t.profile.changePasswordTitle}
          </h3>
          <input
            type="password"
            required
            placeholder={t.profile.currentPassword}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={fieldClass}
          />
          <input
            type="password"
            required
            placeholder={t.profile.newPassword}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={fieldClass}
          />
          <input
            type="password"
            required
            placeholder={t.profile.confirmNewPassword}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className={fieldClass}
          />
          {passwordMessage && (
            <p
              className={`text-[11px] font-semibold ${
                passwordMessage.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {passwordMessage.text}
            </p>
          )}
          <button type="submit" disabled={passwordLoading} className={submitClass}>
            {passwordLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {t.profile.updatePasswordButton}
          </button>
        </form>

        <form onSubmit={handleEmailSubmit} className="space-y-2.5">
          <h3 className="flex items-center gap-1.5 text-xs font-bold text-ink">
            <Mail className="w-3.5 h-3.5 text-primary" />
            {t.profile.changeEmailTitle}
          </h3>
          <input
            type="email"
            required
            placeholder={t.profile.newEmail}
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className={fieldClass}
          />
          <input
            type="password"
            required
            placeholder={t.profile.currentPasswordForEmail}
            value={emailPassword}
            onChange={(e) => setEmailPassword(e.target.value)}
            className={fieldClass}
          />
          {emailMessage && (
            <p
              className={`text-[11px] font-semibold ${
                emailMessage.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {emailMessage.text}
            </p>
          )}
          <button type="submit" disabled={emailLoading} className={submitClass}>
            {emailLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {t.profile.updateEmailButton}
          </button>
        </form>

        <div className="space-y-2.5">
          <h3 className="flex items-center gap-1.5 text-xs font-bold text-red-600">
            <Trash2 className="w-3.5 h-3.5" />
            {t.profile.deleteAccountTitle}
          </h3>
          <p className="text-[11px] text-ink/70">{t.profile.deleteAccountWarning}</p>
          {deleteError && <p className="text-[11px] font-semibold text-red-600">{deleteError}</p>}
          {!deleteConfirming ? (
            <button
              onClick={() => setDeleteConfirming(true)}
              className="w-full flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg text-xs font-bold transition border border-red-200"
            >
              {t.profile.deleteAccountButton}
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirming(false)}
                className="flex-1 bg-page text-ink py-2 rounded-lg text-xs font-bold transition"
              >
                {t.profile.deleteAccountCancelButton}
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className="flex-1 flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-xs font-bold transition disabled:opacity-60"
              >
                {deleteLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {t.profile.deleteAccountConfirmButton}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
