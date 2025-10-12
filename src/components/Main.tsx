"use client";
import styles from "./Main.module.css";
import { FaSearch } from "react-icons/fa";
import QrCodeClient from "./QrCodeCLient";
import { Chrome } from "@uiw/react-color";
import React, { useState } from "react";
import { GithubPlacement } from "@uiw/react-color-github";
import Button from "./ui/Button";

export default function Main() {
  const [url, setUrl] = useState<string>("");
  const [hex, setHex] = useState<string>("#fff");
  const [color, setColor] = useState<string>("#333");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const urlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handlePickerColor = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.divMain}>
      <div className={styles.form}>
        <fieldset className={styles.fieldsetForm}>
          <legend style={view.legend}>Datos</legend>
          <label htmlFor="web">
            URL
            <div className={styles.divInput}>
              <input
                value={url}
                type="url"
                placeholder="Inserta la direccion web"
                onChange={urlChange}
              />
              <FaSearch className={styles.icon} />
            </div>
          </label>
          <label htmlFor="color">
            <Button
              title="Button Color"
              onClick={handlePickerColor}
              variant="dark"
            >
              Pick a color
            </Button>
            {isOpen ? (
              <Chrome
                color={hex}
                style={view.color}
                showAlpha={false}
                placement={GithubPlacement.TopLeft}
                onChange={(color) => {
                  setHex(color.hex);
                  setColor(color.hex);
                }}
              />
            ) : (
              <></>
            )}
          </label>
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
  color: {
    borderRadius: "10px",
  },
};
