"use client";
import { useEffect, useRef } from "react";
import { account } from "@/lib/appwriteClient";
import { useTheme } from "@/lib/theme/ThemeContext";
import { isThemeSettings } from "@/lib/theme/theme";
import { UserPrefs } from "@/types/user";

// Sincroniza el tema (modo oscuro, paleta, tamaño de letra) con la cuenta de
// Appwrite cuando hay sesión, para que siga al usuario entre dispositivos.
// Sin sesión, el tema sigue funcionando igual, solo que queda únicamente en
// este navegador (localStorage, vía ThemeContext).
export default function AccountThemeSync() {
  const { theme, setTheme } = useTheme();
  const readyRef = useRef(false);

  useEffect(() => {
    account
      .get<UserPrefs>()
      .then((u) => {
        const raw = u.prefs?.theme;
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (isThemeSettings(parsed)) setTheme(parsed);
          } catch {
            // preferencia guardada corrupta, ignorar
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        readyRef.current = true;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!readyRef.current) return;
    account.updatePrefs<UserPrefs>({ theme: JSON.stringify(theme) }).catch(() => {});
  }, [theme]);

  return null;
}
