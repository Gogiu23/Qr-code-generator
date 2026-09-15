"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Models, Query, ID, Permission, Role } from "appwrite";
import {
  account,
  tablesDB,
  storage,
  APPWRITE_DATABASE_ID,
  APPWRITE_TABLE_ID,
  APPWRITE_AVATARS_BUCKET_ID,
} from "@/lib/appwriteClient";
import { QRDesignRecord, AppwriteQRRow } from "@/types/qr";
import { UserPrefs } from "@/types/user";
import Navbar from "@/components/Navbar";
import AvatarCircle from "@/components/AvatarCircle";
import QRThumbnail from "@/components/QRThumbnail";
import AccountSettings from "./AccountSettings";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getUi } from "@/lib/i18n/ui";
import { ArrowLeft, Camera, Trash2, Loader2 } from "lucide-react";

const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

export default function ProfilePage() {
  const { locale } = useLocale();
  const t = getUi(locale);
  const router = useRouter();

  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [checking, setChecking] = useState(true);
  const [designs, setDesigns] = useState<QRDesignRecord[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchDesigns = async (userId: string) => {
    try {
      const response = await tablesDB.listRows<AppwriteQRRow>({
        databaseId: APPWRITE_DATABASE_ID,
        tableId: APPWRITE_TABLE_ID,
        queries: [Query.equal("user_id", userId), Query.orderDesc("$createdAt")],
      });
      setDesigns(
        response.rows.map((row) => ({
          $id: row.$id,
          user_id: row.user_id,
          title: row.title,
          content: row.content,
          options: JSON.parse(row.options),
          created_at: row.$createdAt,
        })),
      );
    } catch (err) {
      console.error("Error al obtener diseños:", err);
    }
  };

  useEffect(() => {
    account
      .get()
      .then((u) => {
        setUser(u);
        setChecking(false);
        fetchDesigns(u.$id);
      })
      .catch(() => {
        setChecking(false);
        router.replace("/");
      });
  }, [router]);

  const handleDeleteDesign = async (id?: string) => {
    if (!id || !user) return;
    await tablesDB.deleteRow({
      databaseId: APPWRITE_DATABASE_ID,
      tableId: APPWRITE_TABLE_ID,
      rowId: id,
    });
    fetchDesigns(user.$id);
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
    } catch {
      // La sesión ya puede estar vencida del lado del servidor.
    }
    router.push("/");
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !user) return;

    setUploadError("");
    if (file.size > MAX_AVATAR_BYTES) {
      setUploadError(t.profile.genericError);
      return;
    }

    setUploading(true);
    try {
      const oldFileId = (user.prefs as UserPrefs | undefined)?.avatarFileId;

      const uploaded = await storage.createFile({
        bucketId: APPWRITE_AVATARS_BUCKET_ID,
        fileId: ID.unique(),
        file,
        permissions: [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ],
      });

      const updatedUser = await account.updatePrefs<UserPrefs>({
        avatarFileId: uploaded.$id,
      });
      setUser(updatedUser);

      if (oldFileId) {
        storage
          .deleteFile({ bucketId: APPWRITE_AVATARS_BUCKET_ID, fileId: oldFileId })
          .catch(() => {});
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : t.profile.genericError);
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!user) return;
    const oldFileId = (user.prefs as UserPrefs | undefined)?.avatarFileId;
    if (!oldFileId) return;

    setUploadError("");
    setUploading(true);
    try {
      const updatedUser = await account.updatePrefs<UserPrefs>({ avatarFileId: "" });
      setUser(updatedUser);
      storage
        .deleteFile({ bucketId: APPWRITE_AVATARS_BUCKET_ID, fileId: oldFileId })
        .catch(() => {});
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : t.profile.genericError);
    } finally {
      setUploading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-page flex flex-col font-sans pb-10">
      <Navbar user={user} onOpenAuth={() => {}} onLogout={handleLogout} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-6 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/70 hover:text-ink mb-4 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t.profile.back}
        </Link>

        <h1 className="text-xl font-bold text-ink mb-4">{t.profile.title}</h1>

        <div className="bg-surface rounded-2xl p-5 shadow-sm border border-ink/10 flex flex-col sm:flex-row gap-6 mb-5">
          <div className="flex flex-col items-center shrink-0 sm:w-40">
            <div className="relative">
              <AvatarCircle user={user} size={112} />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-chrome transition disabled:opacity-60"
                title={t.profile.changePhoto}
              >
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Camera className="w-4 h-4" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>
            {(user.prefs as UserPrefs | undefined)?.avatarFileId && (
              <button
                onClick={handleRemovePhoto}
                disabled={uploading}
                className="mt-2 text-[11px] font-semibold text-ink/50 hover:text-red-600 transition disabled:opacity-60"
              >
                {t.profile.removePhoto}
              </button>
            )}
            {uploadError && (
              <p className="mt-2 text-[11px] font-semibold text-red-600 text-center">
                {uploadError}
              </p>
            )}
            <p className="mt-3 text-sm font-bold text-ink text-center truncate max-w-full">
              {user.name || user.email}
            </p>
            <p className="mt-1 text-xs text-ink/60 text-center">
              {t.profile.totalQr.replace("{count}", String(designs.length))}
            </p>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink/40 mb-3">
              {t.profile.historyTitle}
            </p>
            {designs.length === 0 ? (
              <p className="text-sm text-ink/60">{t.profile.historyEmpty}</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {designs.map((d) => (
                  <div
                    key={d.$id}
                    className="bg-page/60 rounded-xl p-2.5 border border-secondary/40 flex flex-col items-center gap-1.5"
                  >
                    <QRThumbnail content={d.content} options={d.options} />
                    <p className="text-[11px] font-semibold text-ink truncate max-w-full">
                      {d.title}
                    </p>
                    <button
                      onClick={() => handleDeleteDesign(d.$id)}
                      className="text-[10px] flex items-center gap-1 text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 className="w-3 h-3" />
                      {t.profile.deleteTitle}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <AccountSettings onUserUpdate={setUser} />
      </main>
    </div>
  );
}
