import { pageMetadata } from "@/lib/seo";
import ProfilePage from "./ProfilePage";

export const metadata = {
  ...pageMetadata({ title: "Mi Perfil — QR Studio", path: "/perfil" }),
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ProfilePage />;
}
