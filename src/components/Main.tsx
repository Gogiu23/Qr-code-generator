"use client";
import styles from "./Main.module.css";
import QrCodeClient from "./QrCodeCLient";
import { useState } from "react";
import Data from "./form/Data";
import Dots from "./form/Dots";
import Corner from "./form/Corner";
import Background from "./form/Background";
import Logo from "./form/Image";
import Qr from "./form/Qr";
import Navbar from "./Navbar";

export default function Main() {
  const [url, setUrl] = useState<string>("");
  const [width, setWidth] = useState<number>(200);
  const [height, setHeight] = useState<number>(200);
  const [margin, setMargin] = useState<number>(10);

  return (
    <div className={styles.contentMain}>
      <Navbar />
      <div className={styles.divMain}>
        <div className={styles.form}>
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
        </div>
        <div className={styles.preview}>
          <QrCodeClient
            url={url}
            width={width}
            height={height}
            margin={margin}
          />
        </div>
      </div>
    </div>
  );
}
