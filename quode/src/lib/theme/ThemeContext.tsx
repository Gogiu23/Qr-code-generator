"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, ReactNode } from "react";
import { DEFAULT_THEME, ThemeSettings, isThemeSettings, applyThemeToDocument } from "./theme";

const STORAGE_KEY = "qr-studio-theme";
const THEME_EVENT = "qr-studio-theme-changed";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

// useSyncExternalStore necesita que getSnapshot devuelva la MISMA referencia
// mientras los datos no cambien (la compara con Object.is). JSON.parse crea
// un objeto nuevo en cada llamada, así que cacheamos el último resultado
// junto al string crudo del que salió, y solo reparseamos si ese string cambió.
let cachedRaw: string | null = null;
let cachedSnapshot: ThemeSettings = DEFAULT_THEME;

function getSnapshot(): ThemeSettings {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedSnapshot;

  cachedRaw = raw;
  if (!raw) {
    cachedSnapshot = DEFAULT_THEME;
    return cachedSnapshot;
  }
  try {
    const parsed = JSON.parse(raw);
    cachedSnapshot = isThemeSettings(parsed) ? parsed : DEFAULT_THEME;
  } catch {
    cachedSnapshot = DEFAULT_THEME;
  }
  return cachedSnapshot;
}

// Durante el render en el servidor siempre se usa el tema por defecto.
function getServerSnapshot(): ThemeSettings {
  return DEFAULT_THEME;
}

function setStoredTheme(next: ThemeSettings) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(THEME_EVENT));
}

interface ThemeContextValue {
  theme: ThemeSettings;
  setTheme: (theme: ThemeSettings) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setStoredTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
