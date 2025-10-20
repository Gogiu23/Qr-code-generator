"use client";
import Image from "next/image";
import styles from "./Data.module.css";
import { memo, useState } from "react";

function Background() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className={styles.bookDiv}>
      <div className={styles.bookTitle} onClick={() => handleOpenClick()}>
        <div className={`${styles.divImage} ${styles.divImgBackground}`}></div>
        <p className={styles.p}>Background</p>
        <Image
          src="/images/bookRemind.png"
          alt="image book title"
          width={100}
          height={100}
          className={`${styles.image} ${isOpen ? styles.rotateImage : ""}`}
          priority
        />
      </div>
      <div
        className={`${styles.content} ${isOpen ? styles.open : styles.close}`}
      ></div>
    </div>
  );
}

export default memo(Background);
