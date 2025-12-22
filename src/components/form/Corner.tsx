"use client";
import Image from "next/image";
import { CornerDotType, CornerSquareType } from "qr-code-styling";
import styles from "./Data.module.css";
import dotStyle from "./Dots.module.css";
import { memo, useEffect, useState } from "react";
import { Toggle } from "../ui/ToggleSwitch";
import { useGlobalCornerContext } from "@/context/GlobalCornersFunctions";

function Corner() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    setCornerType,
    setCornerSquareType,
    setHexDots,
    setHexSquare,
    setGradientDots,
  } = useGlobalCornerContext();
  const [gradient, setGradient] = useState<string>("left");
  const [gradientSquare, setGradientSquare] = useState<string>("left");

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

  const handleGradientSquare = (value: string) => {
    setGradientSquare(value);
  };

  //Funcion para detectar el color elegido por el usuario en los puntos
  const handleColor = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    if (value === "left") {
      setHexDots((prev) => ({
        ...prev,
        color1: e.target.value,
      }));
    } else if (value === "first") {
      //asignamos true para gradient
      setGradientDots((prev) => ({
        ...prev,
        gradientDots: true,
      }));
      setHexDots((prev) => ({
        ...prev,
        color1: e.target.value,
      }));
    } else {
      setHexDots((prev) => ({
        ...prev,
        color2: e.target.value,
      }));
    }
  };
  //cambio de color en los cuadrados externos alrededor
  const handleColorSquare = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    if (value === "left") {
      setHexSquare((prev) => ({
        ...prev,
        color1: e.target.value,
      }));
    } else if (value === "first") {
      //gradient square true
      setHexSquare((prev) => ({
        ...prev,
        color1: e.target.value,
      }));
    } else {
      setHexSquare((prev) => ({
        ...prev,
        color2: e.target.value,
      }));
    }
  };

  //cambio de boolean si se activa el gradient o no
  useEffect(() => {
    if (gradientSquare === "left") {
      //gradient square false
      setGradientDots((prev) => ({
        ...prev,
        gradientSquare: false,
      }));
      console.log("gradient square false");
    } else {
      //gradient square false
      setGradientDots((prev) => ({
        ...prev,
        gradientSquare: true,
      }));
      console.log("gradient square true");
    }
    if (gradient === "left") {
      //gradient false
      setGradientDots((prev) => ({
        ...prev,
        gradientDots: false,
      }));
    } else {
      setGradientDots((prev) => ({
        ...prev,
        gradientDots: true,
      }));
    }
  }, [gradientSquare, gradient]);

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
                <input
                  type="color"
                  defaultValue="#317AC2"
                  onChange={(e) => handleColor(e, "left")}
                />
              </>
            ) : (
              <>
                <input
                  type="color"
                  defaultValue="#317AC2"
                  onChange={(e) => handleColor(e, "first")}
                />
                <input
                  type="color"
                  defaultValue="#f2502d"
                  onChange={(e) => handleColor(e, "second")}
                />
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
        <fieldset style={{ flexDirection: "column" }}>
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
          <div className={styles.generalDiv}>
            <p>Linear</p>
            <Toggle
              value={gradientSquare}
              onChangeValue={handleGradientSquare}
            />
            <p>Gradient</p>
          </div>
          <div>
            {gradientSquare === "left" ? (
              <>
                <input
                  type="color"
                  defaultValue="#317AC2"
                  onChange={(e) => handleColorSquare(e, "left")}
                />
              </>
            ) : (
              <>
                <input
                  type="color"
                  defaultValue="#317AC2"
                  onChange={(e) => handleColorSquare(e, "first")}
                />
                <input
                  type="color"
                  defaultValue="#f2502d"
                  onChange={(e) => handleColorSquare(e, "second")}
                />
              </>
            )}
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default memo(Corner);
