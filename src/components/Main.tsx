"use client";
import styles from "./Main.module.css";
import QrCodeClient from "./QrCodeCLient";
import React, { useEffect, useState } from "react";
import Data from "./form/Data";
import Dots from "./form/Dots";
import Corner from "./form/Corner";
import Background from "./form/Background";
import Logo from "./form/Image";
import Qr from "./form/Qr";
import Navbar from "./Navbar";
import Loading from "@/app/loading";

export enum Tab {
  DATA = "DATA",
  DOTS = "DOTS",
  CORNER = "CORNER",
  BACKGROUND = "BACKGROUND",
  IMAGE = "IMAGE",
  QR = "QR",
}
export default function Main() {
  const [color, setColor] = useState<string>("#333");
  const [url, setUrl] = useState<string>("");
  const [width, setWidth] = useState<number>(200);
  const [height, setHeight] = useState<number>(200);
  const [margin, setMargin] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<Tab | undefined>(undefined);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(false);

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

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(true);
    }, 3000);
  }, []);

  if (!isLoad) {
    return <Loading />;
  } else {
    return (
      <div className={styles.contentMain}>
        <Navbar />
        <div className={styles.divMain}>
          <div className={styles.form}>
            <fieldset className={styles.fieldsetForm}>
              <legend style={view.legend}>Settings</legend>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div className={isActive ? styles.backdrop : ""}></div>
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
                <Qr
                  tab={Tab.QR}
                  activeTab={activeTab}
                  open={() => openDiv(Tab.QR)}
                />
              </div>
            </fieldset>
          </div>
          <div className={styles.preview}>
            <fieldset className={styles.fieldsetPreview}>
              <legend style={view.legend}>Preview</legend>
              <QrCodeClient
                url={url}
                color={color}
                width={width}
                height={height}
                margin={margin}
              />
            </fieldset>
          </div>
        </div>
      </div>
    );
  }
}

const view = {
  legend: {
    padding: "0 10px 0 10px",
  },
};
