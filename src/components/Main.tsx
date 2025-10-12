"use client";
import styles from "./Main.module.css";
import QrCodeClient from "./QrCodeCLient";
import React, { useState } from "react";
import Url from "./url";
import Color from "./Color";

export default function Main() {
  const [hex, setHex] = useState<string>("#fff");
  const [color, setColor] = useState<string>("#333");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  return (
    <div className={styles.divMain}>
      <div className={styles.form}>
        <fieldset className={styles.fieldsetForm}>
          <legend style={view.legend}>Datos</legend>
          <Url url={url} setUrl={setUrl} />
          <Color
            hex={hex}
            setHex={setHex}
            setColor={setColor}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
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
