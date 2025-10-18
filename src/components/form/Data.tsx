"use client";
import Url from "../url";
import Image from "next/image";
import styles from "./Data.module.css";
import { Tab } from "../Main";
import { memo } from "react";

interface DataProps {
  tab: Tab;
  activeTab: Tab | undefined;
  open: (tab: Tab) => void;
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
  tab,
  activeTab,
  open,
  url,
  setUrl,
  setWidth,
  setHeight,
  setMargin,
  width,
  height,
  margin,
}: DataProps) {
  const isActive = activeTab === tab;

  return (
    <div id={tab} className={styles.bookDiv}>
      <div className={styles.bookTitle} onClick={() => open(tab)}>
        <div className={styles.divImage}></div>
        <div className={styles.divBackground}></div>
        {tab}
        <Image
          src="/images/bookRemind.png"
          alt="image book title"
          width={100}
          height={100}
          priority
          className={`${styles.image} ${isActive ? styles.rotateImage : ""}`}
        />
      </div>
      <div
        className={`${styles.content} ${isActive ? styles.open : styles.close}`}
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
