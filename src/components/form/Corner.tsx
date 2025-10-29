"use client";
import Image from "next/image";
import { CornerDotType, CornerSquareType } from "qr-code-styling";
import styles from "./Data.module.css";
import dotStyle from "./Dots.module.css";
import { memo, useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { Toggle } from "../ui/ToggleSwitch";

function Corner() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setCornerType, setCornerSquareType } = useGlobalContext();
  const [gradient, setGradient] = useState("left");

  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  };

  //Detectamos el tipo de diseño de los puntos en las esquinas
  const handleCornerType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCornerType(e.target.value as CornerDotType);
  };
  //Detectamos el tipo de diseño en los cuadrado en las esquinas
  const handleCornerTypeSquare = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCornerSquareType(e.target.value as CornerSquareType);
  };
  //Detectamos si es un color linear o gradiente
  const handleGradient = (value: string) => {
    setGradient(value);
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
        <fieldset style={{ flexDirection: "column" }}>
          <legend>Corner Shape Dots</legend>
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
          <div className={styles.generalDiv}>
            <p>Linear</p>
            <Toggle value={gradient} onChangeValue={handleGradient} />
            <p>Gradient</p>
          </div>
          <div>
            {gradient === "left" ? (
              <>
                <input type="color" defaultValue="#317AC2" />
              </>
            ) : (
              <>
                <input type="color" defaultValue="#317AC2" />
                <input type="color" defaultValue="#f2502d" />
              </>
            )}
          </div>
          <div>
            <h1>linear o radial gradient</h1>
          </div>
          <div>
            <h1>valor del gradiente (angulo)</h1>
          </div>
        </fieldset>
        {/* segundo contenido de las esquinas */}
        <fieldset>
          <legend>Corner Shape Square</legend>
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
