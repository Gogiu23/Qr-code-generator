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
    <div style={divRanges.mainDiv}>
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
      <div style={divRanges.input}>
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

const divRanges = {
  mainDiv: {
    // border: "2px solid black",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "space-around",
  },
  input: {
    width: "100%",
    height: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "space-around",
    // border: "2px solid red",
  },
};
