"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Models } from "appwrite";
import { account } from "@/lib/appwriteClient";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import { useTheme } from "@/lib/theme/ThemeContext";
import { PALETTE_PREVIEWS, PaletteId, FontScale, FONT_SCALE_VALUES } from "@/lib/theme/theme";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getUi } from "@/lib/i18n/ui";
import { ArrowLeft, Moon, Sun } from "lucide-react";

const PALETTE_IDS: PaletteId[] = ["pastel", "oceano", "atardecer", "custom"];
const FONT_SCALES: FontScale[] = ["sm", "md", "lg", "xl"];

export default function SettingsPage() {
  const { locale } = useLocale();
  const t = getUi(locale);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    account
      .get()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
    } catch {
      // La sesión ya puede estar vencida del lado del servidor.
    }
    setUser(null);
    router.refresh();
  };

  const toggleDarkMode = () => {
    setTheme({ ...theme, mode: theme.mode === "dark" ? "light" : "dark" });
  };

  const selectPalette = (palette: PaletteId) => {
    setTheme({ ...theme, palette });
  };

  const setCustomColor = (key: "primary" | "secondary" | "accent", value: string) => {
    setTheme({ ...theme, palette: "custom", custom: { ...theme.custom, [key]: value } });
  };

  const selectFontScale = (fontScale: FontScale) => {
    setTheme({ ...theme, fontScale });
  };

  const fontSizeLabels: Record<FontScale, string> = {
    sm: t.settings.fontSizeSm,
    md: t.settings.fontSizeMd,
    lg: t.settings.fontSizeLg,
    xl: t.settings.fontSizeXl,
  };

  const paletteLabels: Record<PaletteId, string> = {
    pastel: t.settings.palettePastel,
    oceano: t.settings.paletteOceano,
    atardecer: t.settings.paletteAtardecer,
    custom: t.settings.paletteCustom,
  };

  return (
    <div className="min-h-screen bg-page flex flex-col font-sans pb-10">
      <Navbar user={user} onOpenAuth={() => setAuthModalOpen(true)} onLogout={handleLogout} />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 pt-6 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/70 hover:text-ink mb-4 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t.settings.back}
        </Link>

        <h1 className="text-xl font-bold text-ink mb-1">{t.settings.title}</h1>
        <p className="text-xs text-ink/50 mb-5">{t.settings.syncedNote}</p>

        <div className="bg-surface rounded-2xl p-5 shadow-sm border border-ink/10 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {theme.mode === "dark" ? (
              <Moon className="w-4 h-4 text-primary" />
            ) : (
              <Sun className="w-4 h-4 text-primary" />
            )}
            <span className="text-sm font-bold text-ink">{t.settings.darkModeTitle}</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative w-12 h-7 rounded-full transition ${
              theme.mode === "dark" ? "bg-primary" : "bg-ink/20"
            }`}
          >
            <span
              className={`absolute top-1 w-5 h-5 rounded-full bg-surface shadow transition-all ${
                theme.mode === "dark" ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        <div className="bg-surface rounded-2xl p-5 shadow-sm border border-ink/10 mb-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink/40 mb-3">
            {t.settings.paletteTitle}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {PALETTE_IDS.map((id) => {
              const colors = id === "custom" ? theme.custom : PALETTE_PREVIEWS[id];
              const active = theme.palette === id;
              return (
                <button
                  key={id}
                  onClick={() => selectPalette(id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition ${
                    active ? "border-primary bg-page" : "border-ink/10 hover:border-ink/20"
                  }`}
                >
                  <div className="flex gap-1">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: colors.primary }}
                    />
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: colors.secondary }}
                    />
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: colors.accent }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-ink">{paletteLabels[id]}</span>
                </button>
              );
            })}
          </div>

          {theme.palette === "custom" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-ink/10">
              <label className="flex items-center justify-between gap-2 text-xs font-semibold text-ink">
                {t.settings.customPrimary}
                <input
                  type="color"
                  value={theme.custom.primary}
                  onChange={(e) => setCustomColor("primary", e.target.value)}
                  className="w-9 h-9 rounded-lg border border-ink/10 cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between gap-2 text-xs font-semibold text-ink">
                {t.settings.customSecondary}
                <input
                  type="color"
                  value={theme.custom.secondary}
                  onChange={(e) => setCustomColor("secondary", e.target.value)}
                  className="w-9 h-9 rounded-lg border border-ink/10 cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between gap-2 text-xs font-semibold text-ink">
                {t.settings.customAccent}
                <input
                  type="color"
                  value={theme.custom.accent}
                  onChange={(e) => setCustomColor("accent", e.target.value)}
                  className="w-9 h-9 rounded-lg border border-ink/10 cursor-pointer"
                />
              </label>
            </div>
          )}
        </div>

        <div className="bg-surface rounded-2xl p-5 shadow-sm border border-ink/10">
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink/40 mb-3">
            {t.settings.fontSizeTitle}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {FONT_SCALES.map((scale) => (
              <button
                key={scale}
                onClick={() => selectFontScale(scale)}
                className={`py-2.5 rounded-xl border-2 font-bold text-ink transition ${
                  theme.fontScale === scale
                    ? "border-primary bg-page"
                    : "border-ink/10 hover:border-ink/20"
                }`}
                style={{ fontSize: `${FONT_SCALE_VALUES[scale] * 0.75}rem` }}
              >
                Aa
              </button>
            ))}
          </div>
          <div className="flex mt-1.5 px-0.5">
            {FONT_SCALES.map((scale) => (
              <span key={scale} className="text-[10px] text-ink/50 flex-1 text-center">
                {fontSizeLabels[scale]}
              </span>
            ))}
          </div>
        </div>
      </main>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={() => account.get().then(setUser)}
      />
    </div>
  );
}
