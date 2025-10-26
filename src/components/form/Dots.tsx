"use client";
import Image from "next/image";
import type { DotType } from "qr-code-styling";
import styles from "./Data.module.css";
import React, { memo, useEffect, useState } from "react";
import dotStyle from "./Dots.module.css";
import { useGlobalContext } from "@/context/GlobalContext";
import { Toggle } from "../ui/ToggleSwitch";
import RangeSlider from "../ui/RangeSlider";

function Dots() {
  const [position, setPosition] = useState<string>("left");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState("left");
  const [valueGradient, setValueGradient] = useState("left");
  const [typeGradient, setTypeGradient] = useState<string>("middle");
  const { hex, setHex, setGradient, setTypeDot, setGradientType, setRotation } =
    useGlobalContext();

  // funcion para detectar el tipo de color escogido
  const handlePick = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    if (value === "middle") {
      setHex((prev) => ({
        ...prev,
        color1: e.target.value,
      }));
    } else if (value === "left") {
      setHex((prev) => ({
        ...prev,
        color1: e.target.value,
      }));
    } else {
      setHex((prev) => ({
        ...prev,
        color2: e.target.value,
      }));
    }
  };

  //Funcion para detectar el tipo de Dot
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeDot(e.target.value as DotType);
  };

  //Funcion para abrir el contendor grande
  const handleOpenTab = () => {
    setIsOpen((prev) => !prev);
  };

  //Use effect para cambiar el estado rapidamente y aparecer en pantalla
  useEffect(() => {
    //si Value es left el toggle se desplaza a la izquierda y viceversa
    if (value === "left") {
      setGradient({ gradient: false });
      setTypeGradient("middle");
      setPosition("left");
    } else {
      setGradient({ gradient: true });
      setTypeGradient("left");
      setPosition("right");
    }
  }, [value]);

  //Determina el tipo de gradiente, si linear o radial
  useEffect(() => {
    //Si typeGradient es left, sera linear. Si no radial
    if (valueGradient === "left") {
      setGradientType("linear");
    } else {
      setGradientType("radial");
    }
  }, [valueGradient]);

  //Funcion para determinar el valor del toggle
  const handleChangeToogleGradient = (newValue: string) => {
    setValue(newValue);
  };

  //funciona para determinar el valor del typeGradient
  const handleTypeGradientToggle = (Value: string) => {
    setValueGradient(Value);
  };

  return (
    <div className={styles.bookDiv}>
      <div className={styles.bookTitle} onClick={() => handleOpenTab()}>
        <div className={`${styles.divImage} ${styles.divDots}`}></div>
        <p className={styles.p}>Dots</p>
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
        {/*Aqui empieza el contenido dentro de la tarjeta*/}
        <fieldset
          className={dotStyle.fieldsets}
          style={{ paddingBottom: "25px" }}
        >
          <legend className={dotStyle.legend}>Dots shape</legend>
          <select
            name="type"
            id="type id"
            className={dotStyle.select}
            onChange={handleSelect}
          >
            <option value="classy">Classy</option>
            <option value="square">Square</option>
            <option value="classy-rounded">Classy-rounded</option>
            <option value="dots">Dots</option>
            <option value="rounded">Rounded</option>
            <option value="extra-rounded">Extra rounded</option>
          </select>
        </fieldset>
        <fieldset className={dotStyle.fieldsets}>
          <legend className={dotStyle.legend}>Color Dots</legend>
          <div className={dotStyle.divColors}>
            <p className={dotStyle.p}>1 Color</p>
            <Toggle value={value} onChangeValue={handleChangeToogleGradient} />
            <p className={dotStyle.p}>2 Colors</p>
          </div>
        </fieldset>
        {/*Renderiza solo si position este en left o right*/}
        <fieldset
          className={dotStyle.fieldsets}
          style={{
            transition: "opacity 0.3s ease",
            ...(position === "middle" ? { opacity: "0" } : { opacity: "1" }),
          }}
        >
          <legend className={dotStyle.legend}>Colors preferences</legend>
          {position === "left" ? (
            <div className={dotStyle.divInput}>
              <input
                className={dotStyle.input}
                type="color"
                onChange={(e) => handlePick(e, "middle")}
                style={{ background: hex.color1 }}
              />
            </div>
          ) : (
            <>
              <div className={dotStyle.divInput}>
                <input
                  className={dotStyle.input}
                  type="color"
                  onChange={(e) => handlePick(e, "left")}
                  style={{ background: hex.color1 }}
                />
              </div>
              <div className={dotStyle.divInput}>
                <input
                  className={dotStyle.input}
                  type="color"
                  onChange={(e) => handlePick(e, "right")}
                  style={{ background: hex.color2 }}
                />
              </div>
            </>
          )}
        </fieldset>
        {/*Renderizado de tipo de gradient y la inclinacion del gradient*/}
        <fieldset
          className={dotStyle.fieldsets}
          style={{
            transition: "opacity 0.3s ease",
            ...(typeGradient === "middle"
              ? { display: "none" }
              : { display: "flex" }),
          }}
        >
          <legend className={dotStyle.legend}>Type of gradient</legend>
          <div className={dotStyle.divGradient}>
            <div className={dotStyle.divColors}>
              <p className={dotStyle.p}>Linear</p>
              <Toggle
                value={valueGradient}
                onChangeValue={handleTypeGradientToggle}
              />
              <p className={dotStyle.p}>Radial</p>
              {/*Calcular el valor del slider*/}
            </div>
            <div className={dotStyle.divColors}>
              <p className={dotStyle.p} style={{ fontSize: "1.5rem" }}>
                0 deg
              </p>
              <RangeSlider
                min={0}
                max={360}
                initialValue={90}
                onChangeValue={(Value: string) => {
                  const numberRotation = Number(Value);
                  const degrees = numberRotation * (Math.PI / 180);
                  setRotation(degrees);
                }}
              />
              <p className={dotStyle.p} style={{ fontSize: "1.5rem" }}>
                360 deg
              </p>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
export default memo(Dots);
