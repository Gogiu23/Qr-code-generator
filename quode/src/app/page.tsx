"use client";
import { useState, useEffect } from "react";
import {
  account,
  tablesDB,
  APPWRITE_DATABASE_ID,
  APPWRITE_TABLE_ID,
} from "@/lib/appwriteClient";
import { Models, Query, ID, Permission, Role } from "appwrite";
import { useQRCode, QR_BG_RADIUS } from "@/hooks/useQRCode";
import {
  QROptions,
  DotStyle,
  CornerSquareStyle,
  BgShape,
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
} from "lucide-react";

export default function Home() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [savedModalOpen, setSavedModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "style">("content");

  // Estado del QR
  const [title, setTitle] = useState("Mi QR");
  const [content, setContent] = useState("https://mi-enlace.com");
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
    dotStyle: "rounded",
    cornerSquareStyle: "extra-rounded",
    bgShape: "square",
    logoUrl: "",
  });

  const { ref: qrRef, download } = useQRCode(content, options);

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
          text: "¡Diseño actualizado exitosamente en Appwrite!",
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
          text: "¡Diseño guardado en Appwrite Cloud!",
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setSaveMessage({ type: "error", text: "Error al guardar: " + message });
    } finally {
      setTimeout(() => setSaveMessage(null), 4000);
    }
  };

  const handleLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const handlePrint = () => {
    window.print();
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
    <div className="min-h-screen bg-[#EAFFD0] flex flex-col font-sans pb-10">
      <Navbar
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-md mx-auto sm:max-w-5xl w-full px-4 pt-4 space-y-4">
        {saveMessage && (
          <div
            className={`text-sm font-semibold px-4 py-2.5 rounded-xl print:hidden ${
              saveMessage.type === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {saveMessage.text}
          </div>
        )}
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-[#F38181]/15 flex flex-col items-center print:shadow-none print:border-none print:p-0">
          <div className="text-center mb-3 print:hidden">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-center font-bold text-lg text-[#333333] border-b border-transparent hover:border-[#F38181]/30 focus:border-[#F38181] focus:outline-none bg-transparent"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#95E1D3]/25 border border-[#95E1D3]/50 flex items-center justify-center min-h-[290px] w-full max-w-[290px] print:bg-white print:p-0">
            <div
              ref={qrRef}
              className="qr-container shadow-sm print:shadow-none overflow-hidden"
              style={{
                borderRadius: options.bgShape === "rounded" ? QR_BG_RADIUS : 0,
              }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full mt-4 print:hidden">
            <button
              onClick={() => download("png", title)}
              className="flex items-center justify-center gap-1.5 bg-[#F38181] hover:bg-[#333333] text-white py-2 px-3 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-[#FCE38A]" />
              Descargar
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-1.5 bg-[#333333] hover:bg-[#F38181] text-white py-2 px-3 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <Printer className="w-3.5 h-3.5 text-[#FCE38A]" />
              Imprimir
            </button>
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-1.5 bg-[#FCE38A] hover:bg-[#FCE38A]/90 text-[#333333] py-2 px-3 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              Guardar
            </button>
            <button
              onClick={() => {
                if (!user) setAuthModalOpen(true);
                else {
                  fetchDesigns();
                  setSavedModalOpen(true);
                }
              }}
              className="flex items-center justify-center gap-1.5 bg-white border border-[#95E1D3] text-[#333333] hover:bg-[#95E1D3]/20 py-2 px-3 rounded-xl text-xs font-bold transition"
            >
              <FolderOpen className="w-3.5 h-3.5 text-[#95E1D3]" />
              Mis QR
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-lg border border-[#F38181]/15 print:hidden">
          <div className="flex border-b border-[#F38181]/15 mb-4">
            <button
              onClick={() => setActiveTab("content")}
              className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${
                activeTab === "content"
                  ? "border-[#F38181] text-[#F38181]"
                  : "border-transparent text-[#333333]/60"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Contenido
            </button>
            <button
              onClick={() => setActiveTab("style")}
              className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${
                activeTab === "style"
                  ? "border-[#F38181] text-[#F38181]"
                  : "border-transparent text-[#333333]/60"
              }`}
            >
              <Sliders className="w-4 h-4" />
              Personalización
            </button>
          </div>

          {activeTab === "content" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#333333] mb-1">
                  URL o Texto del QR
                </label>
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="https://tu-sitio-web.com"
                  className="w-full p-2.5 text-sm bg-[#EAFFD0] border border-[#F38181]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F38181] text-[#333333]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#333333] mb-1">
                  Logo Central (Opcional)
                </label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 border border-dashed border-[#F38181]/40 bg-[#EAFFD0] hover:bg-[#D9FFC0] p-3 rounded-xl cursor-pointer text-xs font-semibold text-[#F38181] transition">
                    <ImageIcon className="w-4 h-4" />
                    Subir Imagen
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
                      Quitar
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "style" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#333333] mb-1">
                    Color Puntos
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
                    <span className="text-xs font-mono font-bold text-[#333333]">
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
                      className="accent-[#F38181] w-3.5 h-3.5 cursor-pointer"
                    />
                    <span className="text-[11px] font-bold text-[#333333]">
                      Degradado
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
                      <span className="text-xs font-mono font-bold text-[#333333]">
                        {options.dotsColor2}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#333333] mb-1">
                    Color Fondo
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={options.bgColor}
                      onChange={(e) =>
                        setOptions({ ...options, bgColor: e.target.value })
                      }
                      className="w-9 h-9 rounded-lg border-0 cursor-pointer"
                    />
                    <span className="text-xs font-mono font-bold text-[#333333]">
                      {options.bgColor}
                    </span>
                  </div>
                  <label className="flex items-center gap-1.5 mt-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.bgGradient}
                      onChange={(e) =>
                        setOptions({
                          ...options,
                          bgGradient: e.target.checked,
                        })
                      }
                      className="accent-[#F38181] w-3.5 h-3.5 cursor-pointer"
                    />
                    <span className="text-[11px] font-bold text-[#333333]">
                      Degradado
                    </span>
                  </label>
                  {options.bgGradient && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <input
                        type="color"
                        value={options.bgColor2}
                        onChange={(e) =>
                          setOptions({ ...options, bgColor2: e.target.value })
                        }
                        className="w-9 h-9 rounded-lg border-0 cursor-pointer"
                      />
                      <span className="text-xs font-mono font-bold text-[#333333]">
                        {options.bgColor2}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#333333] mb-1">
                  Bordes del Fondo
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["square", "rounded"] as BgShape[]).map((shape) => (
                    <button
                      key={shape}
                      type="button"
                      onClick={() => setOptions({ ...options, bgShape: shape })}
                      className={`p-2 text-xs rounded-xl border font-semibold transition ${
                        options.bgShape === shape
                          ? "bg-[#F38181] text-white border-[#F38181]"
                          : "bg-[#EAFFD0] text-[#333333] border-[#F38181]/20"
                      }`}
                    >
                      {shape === "square" ? "Cuadrado" : "Redondeado"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#333333] mb-1">
                  Estilo de Puntos
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
                          ? "bg-[#F38181] text-white border-[#F38181]"
                          : "bg-[#EAFFD0] text-[#333333] border-[#F38181]/20"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#333333] mb-1">
                  Marco de Esquinas
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
                          ? "bg-[#F38181] text-white border-[#F38181]"
                          : "bg-[#EAFFD0] text-[#333333] border-[#F38181]/20"
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
          setContent(design.content);
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
