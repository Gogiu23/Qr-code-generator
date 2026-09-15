"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import {
  account,
  tablesDB,
  APPWRITE_DATABASE_ID,
  APPWRITE_TABLE_ID,
} from "@/lib/appwriteClient";
import { Models, Query, ID, Permission, Role } from "appwrite";
import { useQRCode, QR_BG_RADIUS } from "@/hooks/useQRCode";
import { buildQRContent } from "@/lib/qrContent";
import {
  QROptions,
  DotStyle,
  CornerSquareStyle,
  BgShape,
  ContentType,
  ContentFields,
  WifiEncryption,
  ExtensionType,
  QRDesignRecord,
  AppwriteQRRow,
} from "@/types/qr";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import SavedModal from "@/components/SavedModal";
import {
  Download,
  Printer,
  Save,
  FolderOpen,
  Image as ImageIcon,
  Sparkles,
  Sliders,
  Link2,
  Type,
  Phone,
  Mail,
  Wifi,
  ChevronDown,
  Pencil,
  Share2,
  MessageCircle,
} from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getUi } from "@/lib/i18n/ui";

const CONTENT_TYPE_ICONS: Record<ContentType, typeof Link2> = {
  url: Link2,
  text: Type,
  phone: Phone,
  email: Mail,
  wifi: Wifi,
};

const CONTENT_TYPES: ContentType[] = ["url", "text", "phone", "email", "wifi"];

const DOWNLOAD_FORMATS: ExtensionType[] = ["png", "svg", "pdf", "jpeg"];

export default function Home() {
  const { locale } = useLocale();
  const t = getUi(locale);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [savedModalOpen, setSavedModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "style">("content");
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const downloadMenuRef = useRef<HTMLDivElement>(null);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!downloadMenuOpen && !shareMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        downloadMenuRef.current &&
        !downloadMenuRef.current.contains(e.target as Node)
      ) {
        setDownloadMenuOpen(false);
      }
      if (
        shareMenuRef.current &&
        !shareMenuRef.current.contains(e.target as Node)
      ) {
        setShareMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [downloadMenuOpen, shareMenuOpen]);

  // Estado del QR
  const [titleOverride, setTitleOverride] = useState<string | null>(null);
  const title = titleOverride ?? t.home.defaultTitle;
  const setTitle = (value: string) => setTitleOverride(value);
  const [contentType, setContentType] = useState<ContentType>("url");
  const [contentFields, setContentFields] = useState<ContentFields>({
    url: "https://mi-enlace.com",
    text: "",
    phone: "",
    email: "",
    wifiSsid: "",
    wifiPassword: "",
    wifiEncryption: "WPA",
  });
  const setContentField = <K extends keyof ContentFields>(
    key: K,
    value: ContentFields[K],
  ) => {
    setContentFields((prev) => ({ ...prev, [key]: value }));
  };
  const content = useMemo(
    () => buildQRContent(contentType, contentFields),
    [contentType, contentFields],
  );
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [savedDesigns, setSavedDesigns] = useState<QRDesignRecord[]>([]);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [options, setOptions] = useState<QROptions>({
    dotsColor: "#333333",
    dotsColor2: "#F38181",
    dotsGradient: false,
    bgColor: "#FFFFFF",
    bgColor2: "#95E1D3",
    bgGradient: false,
    bgTransparent: false,
    dotStyle: "rounded",
    cornerSquareStyle: "extra-rounded",
    bgShape: "square",
    logoUrl: "",
    logoSize: 0.4,
  });

  const { ref: qrRef, download, share } = useQRCode(content, options);

  const checkUser = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    account
      .get()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const fetchDesigns = async () => {
    if (!user) return;
    try {
      const response = await tablesDB.listRows<AppwriteQRRow>({
        databaseId: APPWRITE_DATABASE_ID,
        tableId: APPWRITE_TABLE_ID,
        queries: [
          Query.equal("user_id", user.$id),
          Query.orderDesc("$createdAt"),
        ],
      });

      const parsed: QRDesignRecord[] = response.rows.map((row) => ({
        $id: row.$id,
        user_id: row.user_id,
        title: row.title,
        content: row.content,
        options: JSON.parse(row.options),
        created_at: row.$createdAt,
      }));

      setSavedDesigns(parsed);
    } catch (err) {
      console.error("Error al obtener diseños:", err);
    }
  };

  const handleSave = async () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    const payload = {
      user_id: user.$id,
      title,
      content,
      options: JSON.stringify(options),
    };

    try {
      if (currentId) {
        await tablesDB.updateRow({
          databaseId: APPWRITE_DATABASE_ID,
          tableId: APPWRITE_TABLE_ID,
          rowId: currentId,
          data: payload,
        });
        setSaveMessage({
          type: "success",
          text: t.home.messages.updateSuccess,
        });
      } else {
        const row = await tablesDB.createRow({
          databaseId: APPWRITE_DATABASE_ID,
          tableId: APPWRITE_TABLE_ID,
          rowId: ID.unique(),
          data: payload,
          permissions: [
            Permission.read(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
          ],
        });
        setCurrentId(row.$id);
        setSaveMessage({
          type: "success",
          text: t.home.messages.saveSuccess,
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setSaveMessage({
        type: "error",
        text: t.home.messages.saveErrorPrefix + message,
      });
    } finally {
      setTimeout(() => setSaveMessage(null), 4000);
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
    } catch {
      // La sesión ya puede estar vencida del lado del servidor; igual
      // limpiamos el estado local para reflejar que el usuario está deslogueado.
    }
    setUser(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const result = await share(title, t.home.shareText);
    if (result === "unsupported") setShareMenuOpen((v) => !v);
  };

  const handleShareFallback = (channel: "whatsapp" | "email") => {
    download("png", title);
    const message = t.home.shareFallbackMessage;
    if (channel === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    } else {
      window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(message)}`;
    }
    setShareMenuOpen(false);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOptions((prev) => ({ ...prev, logoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-page flex flex-col font-sans pb-10">
      <Navbar
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-md mx-auto sm:max-w-5xl w-full px-4 pt-4 pb-4">
        <div className="text-center mb-6 print:hidden">
          <h1 className="text-xl sm:text-2xl font-bold text-ink">
            {t.home.heroTitle}
          </h1>
          <p className="text-sm text-ink/70 mt-1 max-w-lg mx-auto">
            {t.home.heroSubtitle}
          </p>
        </div>
        {saveMessage && (
          <div
            className={`mb-4 text-sm font-semibold px-4 py-2.5 rounded-xl print:hidden ${
              saveMessage.type === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {saveMessage.text}
          </div>
        )}
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-[1fr_360px] lg:gap-5 lg:items-start">
        <div className="bg-surface rounded-2xl p-5 shadow-sm border border-ink/10 flex flex-col items-center print:shadow-none print:border-none print:p-0 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-4">
          <div className="text-center mb-3 print:hidden">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink/40 mb-1">
              {t.home.preview}
            </p>
            <div
              onClick={() => titleInputRef.current?.focus()}
              className="inline-flex items-center gap-1.5 cursor-text group"
            >
              <input
                ref={titleInputRef}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-center font-bold text-lg text-ink border-b border-transparent hover:border-primary/30 focus:border-primary focus:outline-none bg-transparent"
              />
              <Pencil className="w-3.5 h-3.5 text-ink/30 group-hover:text-primary transition shrink-0" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-secondary/25 border border-secondary/50 flex items-center justify-center min-h-[290px] w-full max-w-[290px] print:bg-surface print:p-0">
            <div
              ref={qrRef}
              className="qr-container shadow-sm print:shadow-none overflow-hidden"
              style={{
                borderRadius: options.bgShape === "rounded" ? QR_BG_RADIUS : 0,
              }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2 w-full mt-4 print:hidden">
            <div className="relative" ref={downloadMenuRef}>
              <button
                onClick={() => setDownloadMenuOpen((v) => !v)}
                className="w-full flex items-center justify-center gap-1.5 bg-primary hover:bg-chrome text-white py-2 px-3 rounded-xl text-xs font-bold transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-accent" />
                {t.home.download}
                <ChevronDown className="w-3 h-3" />
              </button>
              {downloadMenuOpen && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-surface rounded-xl border border-ink/10 shadow-lg overflow-hidden">
                  {DOWNLOAD_FORMATS.map((ext) => (
                    <button
                      key={ext}
                      onClick={() => {
                        download(ext, title);
                        setDownloadMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-ink hover:bg-page transition"
                    >
                      {ext.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-1.5 bg-chrome hover:bg-primary text-white py-2 px-3 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <Printer className="w-3.5 h-3.5 text-accent" />
              {t.home.print}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-1.5 bg-accent hover:bg-accent/90 text-ink py-2 px-3 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              {t.home.save}
            </button>
            <button
              onClick={() => {
                if (!user) setAuthModalOpen(true);
                else {
                  fetchDesigns();
                  setSavedModalOpen(true);
                }
              }}
              className="flex items-center justify-center gap-1.5 bg-surface border border-secondary text-ink hover:bg-secondary/20 py-2 px-3 rounded-xl text-xs font-bold transition"
            >
              <FolderOpen className="w-3.5 h-3.5 text-secondary" />
              {t.home.myQr}
            </button>
            <div className="relative col-span-2 sm:col-span-4 lg:col-span-2" ref={shareMenuRef}>
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-1.5 bg-secondary hover:bg-secondary/80 text-ink py-2 px-3 rounded-xl text-xs font-bold transition shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                {t.home.share}
              </button>
              {shareMenuOpen && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-surface rounded-xl border border-ink/10 shadow-lg overflow-hidden">
                  <button
                    onClick={() => handleShareFallback("whatsapp")}
                    className="w-full flex items-center gap-2 text-left px-3 py-2 text-xs font-semibold text-ink hover:bg-page transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-secondary" />
                    {t.home.shareWhatsapp}
                  </button>
                  <button
                    onClick={() => handleShareFallback("email")}
                    className="w-full flex items-center gap-2 text-left px-3 py-2 text-xs font-semibold text-ink hover:bg-page transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-secondary" />
                    {t.home.shareEmail}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-2xl p-5 shadow-sm border border-ink/10 print:hidden lg:col-start-1 lg:row-start-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink/40 mb-3">
            {t.home.personalize}
          </p>
          <div className="flex border-b border-primary/15 mb-4">
            <button
              onClick={() => setActiveTab("content")}
              className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${
                activeTab === "content"
                  ? "border-primary text-primary"
                  : "border-transparent text-ink/60"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {t.home.tabContent}
            </button>
            <button
              onClick={() => setActiveTab("style")}
              className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${
                activeTab === "style"
                  ? "border-primary text-primary"
                  : "border-transparent text-ink/60"
              }`}
            >
              <Sliders className="w-4 h-4" />
              {t.home.tabStyle}
            </button>
          </div>

          {activeTab === "content" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-2">
                  {t.home.contentTypeLabel}
                </label>
                <div className="flex flex-wrap gap-2">
                  {CONTENT_TYPES.map((type) => {
                    const Icon = CONTENT_TYPE_ICONS[type];
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setContentType(type)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                          contentType === type
                            ? "bg-primary text-white border-primary"
                            : "bg-page text-ink border-primary/20"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {t.home.types[type]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {contentType === "url" && (
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    {t.home.fields.url}
                  </label>
                  <input
                    type="url"
                    value={contentFields.url}
                    onChange={(e) => setContentField("url", e.target.value)}
                    placeholder={t.home.fields.urlPlaceholder}
                    className="w-full p-2.5 text-sm bg-page border border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-ink"
                  />
                </div>
              )}

              {contentType === "text" && (
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    {t.home.fields.text}
                  </label>
                  <textarea
                    value={contentFields.text}
                    onChange={(e) => setContentField("text", e.target.value)}
                    placeholder={t.home.fields.textPlaceholder}
                    rows={3}
                    className="w-full p-2.5 text-sm bg-page border border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-ink resize-none"
                  />
                </div>
              )}

              {contentType === "phone" && (
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    {t.home.fields.phone}
                  </label>
                  <input
                    type="tel"
                    value={contentFields.phone}
                    onChange={(e) => setContentField("phone", e.target.value)}
                    placeholder={t.home.fields.phonePlaceholder}
                    className="w-full p-2.5 text-sm bg-page border border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-ink"
                  />
                </div>
              )}

              {contentType === "email" && (
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    {t.home.fields.email}
                  </label>
                  <input
                    type="email"
                    value={contentFields.email}
                    onChange={(e) => setContentField("email", e.target.value)}
                    placeholder={t.home.fields.emailPlaceholder}
                    className="w-full p-2.5 text-sm bg-page border border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-ink"
                  />
                </div>
              )}

              {contentType === "wifi" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">
                      {t.home.fields.ssid}
                    </label>
                    <input
                      type="text"
                      value={contentFields.wifiSsid}
                      onChange={(e) => setContentField("wifiSsid", e.target.value)}
                      placeholder={t.home.fields.ssidPlaceholder}
                      className="w-full p-2.5 text-sm bg-page border border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-ink"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">
                      {t.home.fields.security}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["WPA", "WEP", "nopass"] as WifiEncryption[]).map(
                        (enc) => (
                          <button
                            key={enc}
                            type="button"
                            onClick={() => setContentField("wifiEncryption", enc)}
                            className={`p-2 text-xs rounded-xl border font-semibold transition ${
                              contentFields.wifiEncryption === enc
                                ? "bg-primary text-white border-primary"
                                : "bg-page text-ink border-primary/20"
                            }`}
                          >
                            {enc === "nopass" ? t.home.fields.none : enc}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                  {contentFields.wifiEncryption !== "nopass" && (
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        {t.home.fields.password}
                      </label>
                      <input
                        type="text"
                        value={contentFields.wifiPassword}
                        onChange={(e) =>
                          setContentField("wifiPassword", e.target.value)
                        }
                        placeholder={t.home.fields.passwordPlaceholder}
                        className="w-full p-2.5 text-sm bg-page border border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-ink"
                      />
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  {t.home.fields.logo}
                </label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 border border-dashed border-primary/40 bg-page hover:bg-page/70 p-3 rounded-xl cursor-pointer text-xs font-semibold text-primary transition">
                    <ImageIcon className="w-4 h-4" />
                    {t.home.fields.uploadImage}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  {options.logoUrl && (
                    <button
                      onClick={() =>
                        setOptions((prev) => ({ ...prev, logoUrl: "" }))
                      }
                      className="text-xs text-red-600 underline font-semibold px-2"
                    >
                      {t.home.fields.remove}
                    </button>
                  )}
                </div>
                {options.logoUrl && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-ink">
                        {t.home.fields.logoSize}
                      </label>
                      <span className="text-xs font-mono font-bold text-ink">
                        {Math.round((options.logoSize ?? 0.4) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.1}
                      max={0.6}
                      step={0.05}
                      value={options.logoSize ?? 0.4}
                      onChange={(e) =>
                        setOptions((prev) => ({
                          ...prev,
                          logoSize: Number(e.target.value),
                        }))
                      }
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "style" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    {t.home.style.dotsColor}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={options.dotsColor}
                      onChange={(e) =>
                        setOptions({ ...options, dotsColor: e.target.value })
                      }
                      className="w-9 h-9 rounded-lg border-0 cursor-pointer"
                    />
                    <span className="text-xs font-mono font-bold text-ink">
                      {options.dotsColor}
                    </span>
                  </div>
                  <label className="flex items-center gap-1.5 mt-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.dotsGradient}
                      onChange={(e) =>
                        setOptions({
                          ...options,
                          dotsGradient: e.target.checked,
                        })
                      }
                      className="accent-primary w-3.5 h-3.5 cursor-pointer"
                    />
                    <span className="text-[11px] font-bold text-ink">
                      {t.home.style.gradient}
                    </span>
                  </label>
                  {options.dotsGradient && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <input
                        type="color"
                        value={options.dotsColor2}
                        onChange={(e) =>
                          setOptions({
                            ...options,
                            dotsColor2: e.target.value,
                          })
                        }
                        className="w-9 h-9 rounded-lg border-0 cursor-pointer"
                      />
                      <span className="text-xs font-mono font-bold text-ink">
                        {options.dotsColor2}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">
                    {t.home.style.bgColor}
                  </label>
                  {!options.bgTransparent && (
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={options.bgColor}
                        onChange={(e) =>
                          setOptions({ ...options, bgColor: e.target.value })
                        }
                        className="w-9 h-9 rounded-lg border-0 cursor-pointer"
                      />
                      <span className="text-xs font-mono font-bold text-ink">
                        {options.bgColor}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-4 mt-2">
                    <label
                      className={`flex items-center gap-1.5 select-none ${
                        options.bgTransparent
                          ? "opacity-40 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={options.bgGradient}
                        disabled={options.bgTransparent}
                        onChange={(e) =>
                          setOptions({
                            ...options,
                            bgGradient: e.target.checked,
                          })
                        }
                        className="accent-primary w-3.5 h-3.5 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <span className="text-[11px] font-bold text-ink">
                        {t.home.style.gradient}
                      </span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={options.bgTransparent}
                        onChange={(e) =>
                          setOptions({
                            ...options,
                            bgTransparent: e.target.checked,
                          })
                        }
                        className="accent-primary w-3.5 h-3.5 cursor-pointer"
                      />
                      <span className="text-[11px] font-bold text-ink">
                        {t.home.style.transparentBg}
                      </span>
                    </label>
                  </div>
                  {options.bgGradient && !options.bgTransparent && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <input
                        type="color"
                        value={options.bgColor2}
                        onChange={(e) =>
                          setOptions({ ...options, bgColor2: e.target.value })
                        }
                        className="w-9 h-9 rounded-lg border-0 cursor-pointer"
                      />
                      <span className="text-xs font-mono font-bold text-ink">
                        {options.bgColor2}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  {t.home.style.bgShape}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["square", "rounded"] as BgShape[]).map((shape) => (
                    <button
                      key={shape}
                      type="button"
                      onClick={() => setOptions({ ...options, bgShape: shape })}
                      className={`p-2 text-xs rounded-xl border font-semibold transition ${
                        options.bgShape === shape
                          ? "bg-primary text-white border-primary"
                          : "bg-page text-ink border-primary/20"
                      }`}
                    >
                      {shape === "square" ? t.home.style.square : t.home.style.rounded}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  {t.home.style.dotStyle}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      "rounded",
                      "dots",
                      "classy",
                      "square",
                      "extra-rounded",
                    ] as DotStyle[]
                  ).map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() =>
                        setOptions({ ...options, dotStyle: style })
                      }
                      className={`p-2 text-xs rounded-xl border capitalize font-semibold transition ${
                        options.dotStyle === style
                          ? "bg-primary text-white border-primary"
                          : "bg-page text-ink border-primary/20"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  {t.home.style.cornerStyle}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    ["extra-rounded", "square", "dot"] as CornerSquareStyle[]
                  ).map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() =>
                        setOptions({ ...options, cornerSquareStyle: style })
                      }
                      className={`p-2 text-xs rounded-xl border capitalize font-semibold transition ${
                        options.cornerSquareStyle === style
                          ? "bg-primary text-white border-primary"
                          : "bg-page text-ink border-primary/20"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </main>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={checkUser}
      />
      <SavedModal
        isOpen={savedModalOpen}
        onClose={() => setSavedModalOpen(false)}
        designs={savedDesigns}
        onSelect={(design) => {
          setTitle(design.title);
          setContentType("text");
          setContentField("text", design.content);
          setOptions(design.options);
          setCurrentId(design.$id || null);
        }}
        onDelete={async (id) => {
          await tablesDB.deleteRow({
            databaseId: APPWRITE_DATABASE_ID,
            tableId: APPWRITE_TABLE_ID,
            rowId: id,
          });
          fetchDesigns();
        }}
      />
    </div>
  );
}
