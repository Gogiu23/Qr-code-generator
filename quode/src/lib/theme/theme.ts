export type ThemeMode = "light" | "dark";
export type PaletteId = "pastel" | "oceano" | "atardecer" | "custom";
export type FontScale = "sm" | "md" | "lg" | "xl";

export interface CustomColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface ThemeSettings {
  mode: ThemeMode;
  palette: PaletteId;
  custom: CustomColors;
  fontScale: FontScale;
}

export const DEFAULT_CUSTOM_COLORS: CustomColors = {
  primary: "#F38181",
  secondary: "#95E1D3",
  accent: "#FCE38A",
};

export const DEFAULT_THEME: ThemeSettings = {
  mode: "light",
  palette: "pastel",
  custom: DEFAULT_CUSTOM_COLORS,
  fontScale: "md",
};

export const PALETTE_PREVIEWS: Record<Exclude<PaletteId, "custom">, CustomColors> = {
  pastel: { primary: "#F38181", secondary: "#95E1D3", accent: "#FCE38A" },
  oceano: { primary: "#3A8DD0", secondary: "#1C6E63", accent: "#E8C27A" },
  atardecer: { primary: "#E0653F", secondary: "#7A5FB0", accent: "#F2C14E" },
};

export const PALETTE_IDS: PaletteId[] = ["pastel", "oceano", "atardecer", "custom"];
export const FONT_SCALES: FontScale[] = ["sm", "md", "lg", "xl"];

export const FONT_SCALE_VALUES: Record<FontScale, number> = {
  sm: 0.9,
  md: 1,
  lg: 1.15,
  xl: 1.3,
};

export function isThemeSettings(value: unknown): value is ThemeSettings {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  const custom = v.custom as Partial<CustomColors> | undefined;
  return (
    (v.mode === "light" || v.mode === "dark") &&
    typeof v.palette === "string" &&
    PALETTE_IDS.includes(v.palette as PaletteId) &&
    typeof v.fontScale === "string" &&
    FONT_SCALES.includes(v.fontScale as FontScale) &&
    !!custom &&
    typeof custom.primary === "string" &&
    typeof custom.secondary === "string" &&
    typeof custom.accent === "string"
  );
}

export function applyThemeToDocument(theme: ThemeSettings) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme.mode);
  root.setAttribute("data-palette", theme.palette);
  root.style.setProperty("--font-scale", String(FONT_SCALE_VALUES[theme.fontScale]));

  if (theme.palette === "custom") {
    root.style.setProperty("--color-primary", theme.custom.primary);
    root.style.setProperty("--color-secondary", theme.custom.secondary);
    root.style.setProperty("--color-accent", theme.custom.accent);
  } else {
    root.style.removeProperty("--color-primary");
    root.style.removeProperty("--color-secondary");
    root.style.removeProperty("--color-accent");
  }
}
