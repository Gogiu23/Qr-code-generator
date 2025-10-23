"use client";
import Image from "next/image";
import { CornerDotType, CornerSquareType } from "qr-code-styling";
import styles from "./Data.module.css";
import dotStyle from "./Dots.module.css";
import { memo, useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";

function Corner() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setCornerType, setCornerSquareType } = useGlobalContext();

  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCornerType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCornerType(e.target.value as CornerDotType);
  };
  const handleCornerTypeSquare = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCornerSquareType(e.target.value as CornerSquareType);
  };
  return (
    <div className={styles.bookDiv}>
      <div className={styles.bookTitle} onClick={() => handleOpenClick()}>
        <div className={`${styles.divImage} ${styles.divCorner}`}></div>
        <p className={styles.p}>Corners</p>
        <Image
          src="/images/bookRemind.png"
          alt="image book title"
          width={100}
          height={100}
          className={`${styles.image} ${isOpen ? styles.rotateImage : ""}`}
        />
      </div>
      <div
        className={`${styles.content} ${isOpen ? styles.open : styles.close}`}
      >
        {/* Empieza aqui el contenido dentro de los puntos*/}
        <fieldset className={dotStyle.fieldsets}>
          <legend className={dotStyle.legend}>Corner Shape Dots</legend>
          <select
            name="type"
            id="type id"
            className={dotStyle.select}
            onChange={handleCornerType}
          >
            {" "}
            <option value="classy">Classy</option>
            <option value="dot">Dot</option>
            <option value="dots">Dots</option>
            <option value="square">Square</option>
            <option value="rounded">Rounded</option>
            <option value="extra-rounded">Extra-rounded</option>
            <option value="classy-rounded">Classy-rounded</option>
          </select>
        </fieldset>
        {/* segundo contenido de las esquinas */}
        <fieldset className={dotStyle.fieldsets}>
          <legend className={dotStyle.legend}>Corner Shape Square</legend>
          <select
            name="type"
            id="type id"
            className={dotStyle.select}
            onChange={handleCornerTypeSquare}
          >
            {" "}
            <option value="classy">Classy</option>
            <option value="dot">Dot</option>
            <option value="dots">Dots</option>
            <option value="square">Square</option>
            <option value="rounded">Rounded</option>
            <option value="extra-rounded">Extra-rounded</option>
            <option value="classy-rounded">Classy-rounded</option>
          </select>
        </fieldset>
      </div>
    </div>
  );
}

export default memo(Corner);
