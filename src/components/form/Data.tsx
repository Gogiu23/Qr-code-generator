"use client";
import Url from "../url";
import Image from "next/image";
import styles from "./Data.module.css";
import { memo, useState } from "react";

interface DataProps {
  url: string;
  setUrl: (url: string) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setMargin: (margin: number) => void;
  width: number;
  height: number;
  margin: number;
}

function Data({
  url,
  setUrl,
  setWidth,
  setHeight,
  setMargin,
  width,
  height,
  margin,
}: DataProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.bookDiv}>
      <div
        className={styles.bookTitle}
        onClick={handleOpenClick}
        aria-expanded={isOpen}
      >
        <div className={`${styles.divImage} ${styles.divData}`}></div>
        <p className={styles.p}>Data</p>
        <Image
          src="/images/bookRemind.png"
          alt="image book title"
          width={100}
          height={100}
          priority
          className={`${styles.image} ${isOpen ? styles.rotateImage : ""}`}
        />
      </div>
      <div
        className={`${styles.content} ${isOpen ? styles.open : styles.close}`}
      >
        <Url
          url={url}
          setUrl={setUrl}
          setWidth={setWidth}
          setHeight={setHeight}
          setMargin={setMargin}
          width={width}
          height={height}
          margin={margin}
        />
      </div>
    </div>
  );
}

export default memo(Data);
