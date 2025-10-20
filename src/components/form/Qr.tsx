"use client";
import Image from "next/image";
import styles from "./Data.module.css";
import { memo, useState } from "react";

function Qr() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className={styles.bookDiv}>
      <div className={styles.bookTitle} onClick={() => handleOpenClick()}>
        <div className={`${styles.divImage} ${styles.divQr}`}></div>
        <p className={styles.p}>Qr settings</p>
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
      ></div>
    </div>
  );
}

export default memo(Qr);
