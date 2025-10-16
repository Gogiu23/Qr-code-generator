import { Suspense } from "react";
import Loading from "./loading";
import { headers } from "next/headers";
import Main from "@/components/Main";
import MainMobile from "@/components/mobile/MainMobile";
import Navbar from "@/components/Navbar";

function isMobileUA(userAgent: string) {
  return Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
    ),
  );
}

export default async function Page() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = isMobileUA(userAgent);

  return (
    <Suspense fallback={<Loading />}>
      {isMobile ? (
        <MainMobile />
      ) : (
        <div>
          <Navbar />
          <Main />
        </div>
      )}
    </Suspense>
  );
}
