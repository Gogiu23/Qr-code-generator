const THEME_INIT_SCRIPT = `(function () {
  try {
    var raw = localStorage.getItem("qr-studio-theme");
    if (!raw) return;
    var t = JSON.parse(raw);
    var root = document.documentElement;
    if (t.mode === "dark") root.setAttribute("data-theme", "dark");
    if (t.palette) root.setAttribute("data-palette", t.palette);
    var scales = { sm: 0.9, md: 1, lg: 1.15, xl: 1.3 };
    if (t.fontScale && scales[t.fontScale]) {
      root.style.setProperty("--font-scale", String(scales[t.fontScale]));
    }
    if (t.palette === "custom" && t.custom) {
      if (t.custom.primary) root.style.setProperty("--color-primary", t.custom.primary);
      if (t.custom.secondary) root.style.setProperty("--color-secondary", t.custom.secondary);
      if (t.custom.accent) root.style.setProperty("--color-accent", t.custom.accent);
    }
  } catch (e) {}
})();`;

// Se renderiza como primer hijo de <body> y corre antes de que se pinte el
// resto de la página, para que el tema guardado se aplique sin parpadeo
// (un frame en claro antes de pasar a oscuro, por ejemplo).
export default function ThemeInitScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
