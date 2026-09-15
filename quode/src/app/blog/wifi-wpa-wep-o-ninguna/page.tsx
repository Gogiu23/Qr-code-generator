import { pageMetadata } from "@/lib/seo";
import WifiPost from "./WifiPost";

export const metadata = pageMetadata({
  title: "WPA, WEP o ninguna: qué seguridad elegir para tu QR de WiFi — QR Studio",
  description:
    "La diferencia entre WPA, WEP y una red abierta, y cómo saber cuál elegir para que tu código QR de WiFi conecte a la primera.",
  path: "/blog/wifi-wpa-wep-o-ninguna",
});

export default function WifiSecurityPost() {
  return <WifiPost />;
}
