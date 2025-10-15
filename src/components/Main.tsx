"use client";
import styles from "./Main.module.css";
import QrCodeClient from "./QrCodeCLient";
import React, { act, useRef, useState } from "react";
import Url from "./url";
import Color from "./Color";
import Image from "next/image";
import Data from "./form/Data";
import Dots from "./form/Dots";
import Corner from "./form/Corner";
import Background from "./form/Background";
import Logo from "./form/Image";
import Qr from "./form/Qr";

export enum Tab {
  DATA = "DATA",
  DOTS = "DOTS",
  CORNER = "CORNER",
  BACKGROUND = "BACKGROUND",
  IMAGE = "IMAGE",
  QR = "QR",
}
export default function Main() {
  const [hex, setHex] = useState<string>("#fff");
  const [color, setColor] = useState<string>("#333");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [activeTab, setActiveTab] = useState<Tab | undefined>(undefined);

  const openDiv = (Tab: Tab) => {
    setActiveTab(Tab);
    if (activeTab === Tab) {
      setActiveTab(undefined);
    } else {
      setActiveTab(Tab);
    }
    console.log(Tab);
  };

  return (
    <div className={styles.divMain}>
      <div className={styles.form}>
        <fieldset className={styles.fieldsetForm}>
          <legend style={view.legend}>Settings</legend>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              width: "100%",
              height: "100%",
              // border: "3px solid blue",
            }}
          >
            <Data
              tab={Tab.DATA}
              activeTab={activeTab}
              open={() => openDiv(Tab.DATA)}
              url={url}
              setUrl={setUrl}
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
            <Qr
              tab={Tab.QR}
              activeTab={activeTab}
              open={() => openDiv(Tab.QR)}
            />
          </div>
          {/* <Color */}
          {/*   hex={hex} */}
          {/*   setHex={setHex} */}
          {/*   setColor={setColor} */}
          {/*   isOpen={isOpen} */}
          {/*   setIsOpen={setIsOpen} */}
          {/* /> */}
        </fieldset>
      </div>
      <div className={styles.preview}>
        <fieldset className={styles.fieldsetPreview}>
          <legend style={view.legend}>Preview</legend>
          <QrCodeClient url={url} color={color} />
        </fieldset>
      </div>
    </div>
  );
}

const view = {
  legend: {
    padding: "0 10px 0 10px",
  },
};
