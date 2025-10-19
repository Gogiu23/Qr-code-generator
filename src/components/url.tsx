"use client";
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
  const urlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

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
          />
          <FaSearch className={styles.icon} />
        </div>
      </label>
      <div className={styles.input}>
        <label htmlFor="width">
          Width {width}
          <input
            className={styles.rangeInput}
            value={width}
            type="range"
            min={100}
            max={500}
            onChange={handleSliderChange(setWidth)}
          />
        </label>
        <label htmlFor="height">
          Height {height}
          <input
            className={styles.rangeInput}
            value={height}
            type="range"
            min={100}
            max={500}
            onChange={handleSliderChange(setHeight)}
          />
        </label>
        <label htmlFor="margin">
          Margin {margin}
          <input
            className={styles.rangeInput}
            value={margin}
            type="range"
            min={0}
            max={50}
            onChange={handleSliderChange(setMargin)}
          />
        </label>
      </div>
    </div>
  );
}
