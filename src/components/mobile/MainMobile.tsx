"use client";
import { useState } from "react";
import QrCodeClient from "../QrCodeCLient";
import Data from "../form/Data";
import Dots from "../form/Dots";
import Corner from "../form/Corner";
import Background from "../form/Background";
import Logo from "../form/Image";
import Qr from "../form/Qr";
import Navbar from "../Navbar";

import stylesCss from "./mainMovile.module.css";
export default function MainMobile() {
  const [url, setUrl] = useState<string>("");
  const [width, setWidth] = useState<number>(200);
  const [height, setHeight] = useState<number>(200);
  const [margin, setMargin] = useState<number>(10);
  return (
    <div className={stylesCss.main}>
      <Navbar />
      <Data
        url={url}
        width={width}
        height={height}
        margin={margin}
        setUrl={setUrl}
        setWidth={setWidth}
        setHeight={setHeight}
        setMargin={setMargin}
      />
      <Dots />
      <Corner />
      <Background />
      <Logo />
      <Qr />
      <QrCodeClient url={url} width={width} height={height} margin={margin} />
    </div>
  );
}
