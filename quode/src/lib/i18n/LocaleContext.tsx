"use client";

import { createContext, useContext, useSyncExternalStore, ReactNode } from "react";
import { DEFAULT_LOCALE, Locale, isLocale } from "./locale";

const STORAGE_KEY = "qr-studio-locale";
const LOCALE_EVENT = "qr-studio-locale-changed";

function subscribe(callback: () => void) {
  window.addEventListener(LOCALE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(LOCALE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Locale {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(stored) ? stored : DEFAULT_LOCALE;
}

// Durante el render en el servidor siempre se usa el idioma por defecto.
function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

function setStoredLocale(next: Locale) {
  window.localStorage.setItem(STORAGE_KEY, next);
  window.dispatchEvent(new Event(LOCALE_EVENT));
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <LocaleContext.Provider value={{ locale, setLocale: setStoredLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
