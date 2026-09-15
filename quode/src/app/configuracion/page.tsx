import { pageMetadata } from "@/lib/seo";
import SettingsPage from "./SettingsPage";

export const metadata = {
  ...pageMetadata({ title: "Configuración — QR Studio", path: "/configuracion" }),
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SettingsPage />;
}
