"use client";
import { useState } from "react";
import styles from "./url.module.css";
import { FaSearch } from "react-icons/fa";

interface UrlProps {
  setUrl: (url: string) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setMargin: (margin: number) => void;
  url: string;
  width: number;
  height: number;
  margin: number;
}

export default function Url({
  url,
  setUrl,
  setWidth,
  setHeight,
  setMargin,
  width,
  height,
  margin,
}: UrlProps) {
  const [size, setSize] = useState<number>(600);

  const urlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const getSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberSize = Number(e.target.value);
    setSize(numberSize);
    setHeight(numberSize / 2);
    setWidth(numberSize / 2);
  };

  const min = 100;
  const max = 1000;
  const percent = ((size - min) / (max - min)) * 100;
  const minMarg = 0;
  const maxMarg = 50;
  const percentMarg = ((margin - minMarg) / (maxMarg - minMarg)) * 100;

  const handleSliderChange =
    (setter: (val: number) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(event.target.value));
    };
  return (
    <div className={styles.mainDiv}>
      <label htmlFor="web">
        URL
        <div className={styles.divInput}>
          <input
            value={url}
            type="url"
            placeholder="Inserta la direccion web"
            onChange={urlChange}
            className={styles.inputUrl}
          />
          <FaSearch className={styles.icon} />
        </div>
      </label>
      <div className={styles.input}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Size</legend>
          <div className={styles.size}>
            <span className={styles.span} style={{ left: `calc(${percent}%)` }}>
              {size}
            </span>
            <input
              className={styles.rangeInput}
              value={size}
              type="range"
              min={100}
              max={1000}
              onChange={getSize}
            />
          </div>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Margin</legend>
          <div className={styles.margin}>
            <span className={styles.span} style={{ left: `${percentMarg}%` }}>
              {margin}
            </span>
            <input
              className={styles.rangeInput}
              value={margin}
              type="range"
              min={0}
              max={50}
              onChange={handleSliderChange(setMargin)}
            />
          </div>
        </fieldset>
      </div>
    </div>
  );
}
