"use client";
import styles from "./Main.module.css";
import QrCodeClient from "./QrCodeCLient";
import { useCallback, useState } from "react";
import Data from "./form/Data";
import Dots from "./form/Dots";
import Corner from "./form/Corner";
import Background from "./form/Background";
import Logo from "./form/Image";
import Qr from "./form/Qr";
import Navbar from "./Navbar";

export enum Tab {
  DATA = "DATA",
  DOTS = "DOTS",
  CORNER = "CORNER",
  BACKGROUND = "BACKGROUND",
  IMAGE = "IMAGE",
  QR = "QR",
}
export default function Main() {
  const [url, setUrl] = useState<string>("");
  const [width, setWidth] = useState<number>(200);
  const [height, setHeight] = useState<number>(200);
  const [margin, setMargin] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<Tab | undefined>(undefined);
  const [isActive, setIsActive] = useState<boolean>(false);

  const openDiv = (Tab: Tab) => {
    setActiveTab(Tab);
    if (activeTab === Tab) {
      setActiveTab(undefined);
      setIsActive(false);
    } else {
      setActiveTab(Tab);
      setIsActive(true);
    }
    console.log(Tab);
  };

  return (
    <div className={styles.contentMain}>
      <Navbar />
      <div className={styles.divMain}>
        <div className={styles.form}>
          <Data
            tab={Tab.DATA}
            activeTab={activeTab}
            open={() => openDiv(Tab.DATA)}
            url={url}
            width={width}
            height={height}
            margin={margin}
            setUrl={setUrl}
            setWidth={setWidth}
            setHeight={setHeight}
            setMargin={setMargin}
          />
          <Dots
            tab={Tab.DOTS}
            activeTab={activeTab}
            open={() => openDiv(Tab.DOTS)}
          />
          <Corner
            tab={Tab.CORNER}
            activeTab={activeTab}
            open={() => openDiv(Tab.CORNER)}
          />
          <Background
            tab={Tab.BACKGROUND}
            activeTab={activeTab}
            open={() => openDiv(Tab.BACKGROUND)}
          />
          <Logo
            tab={Tab.IMAGE}
            activeTab={activeTab}
            open={() => openDiv(Tab.IMAGE)}
          />
          <Qr tab={Tab.QR} activeTab={activeTab} open={() => openDiv(Tab.QR)} />
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
