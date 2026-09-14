export type Locale = "es" | "en" | "it";

export const DEFAULT_LOCALE: Locale = "es";

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "it", label: "ITA" },
];

export function isLocale(value: string | null): value is Locale {
  return value === "es" || value === "en" || value === "it";
}
