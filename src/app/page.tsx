"use client";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import Loading from "./loading";
import { useEffect, useState } from "react";

export default function Home() {
  const [load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, []);
  if (load) {
    return <Loading />;
  } else {
    return (
      <div>
        <Navbar />
        <Main />
      </div>
    );
  }
}
