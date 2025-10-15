"use client";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import Loading from "./loading";
import { useEffect, useState } from "react";
import MainMobile from "@/components/mobile/MainMobile";

export default function Home() {
  const [load, setLoad] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  //chequear si es movil o ordenador
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // retardar la carga para obtener mejores prestaciones
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, []);

  if (load) {
    return <Loading />;
  } else if (isMobile) {
    return <MainMobile />;
  } else {
    return (
      <div>
        <Navbar />
        <Main />
      </div>
    );
  }
}
