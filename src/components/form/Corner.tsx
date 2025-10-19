"use client";
import Image from "next/image";
import styles from "./Data.module.css";
import { Tab } from "../Main";
import { memo } from "react";

interface DataProps {
  tab: Tab;
  activeTab: Tab | undefined;
  open: (tab: Tab) => void;
}

function Corner({ tab, activeTab, open }: DataProps) {
  const isActive = activeTab === tab;

  return (
    <div id={tab} className={styles.bookDiv}>
      <div className={styles.bookTitle} onClick={() => open(tab)}>
        <div className={`${styles.divImage} ${styles.divCorner}`}></div>
        <div className={styles.divBackground}></div>
        {tab}
        <Image
          src="/images/bookRemind.png"
          alt="image book title"
          width={100}
          height={100}
          className={`${styles.image} ${isActive ? styles.rotateImage : ""}`}
        />
      </div>
      <div
        className={`${styles.content} ${isActive ? styles.open : styles.close}`}
      ></div>
    </div>
  );
}

export default memo(Corner);
