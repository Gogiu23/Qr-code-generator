"use client";
import Image from "next/image";
import type { DotType } from "qr-code-styling";
import styles from "./Data.module.css";
import { memo, useState } from "react";
import dotStyle from "./Dots.module.css";
import { useGlobalContext } from "@/context/GlobalContext";

function Dots() {
  const [position, setPosition] = useState<string>("middle");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [typeGradient, setTypeGradient] = useState<string>("middle");
  const { hex, setHex, setGradient, setTypeDot, setGradientType } =
    useGlobalContext();

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

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeDot(e.target.value as DotType);
  };

  const handleOpenTab = () => {
    setIsOpen((prev) => !prev);
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
        <fieldset className={dotStyle.fieldsets}>
          <legend className={dotStyle.legend}>Dots shape</legend>
          <select
            name="type"
            id="type id"
            className={dotStyle.select}
            onChange={handleSelect}
          >
            <option value="rounded">Rounded</option>
            <option value="dots">Dots</option>
            <option value="classy">Classy</option>
            <option value="classy-rounded">Classy-rounded</option>
            <option value="square">Square</option>
            <option value="extra rounded">Extra rounded</option>
          </select>
        </fieldset>
        <fieldset className={dotStyle.fieldsets}>
          <legend className={dotStyle.legend}>Color Dots</legend>
          <div className={dotStyle.divColors}>
            <p>One Color</p>
            <div className={dotStyle.button}>
              <p
                className={dotStyle.p}
                onClick={() => {
                  setGradient({ gradient: false });
                  setTypeGradient("middle");
                  setPosition("left");
                }}
              >
                I
              </p>
              <div
                className={dotStyle.buttonSlack}
                style={{
                  transition: " all 0.5s  cubic-bezier(0.11, 1.7, 0.76, 1)",
                  ...(position === "middle"
                    ? { transform: "translateX(0px)" }
                    : position === "right"
                      ? { transform: "translateX(38px)" }
                      : { transform: "translateX(-35px)" }),
                }}
              ></div>
              <p
                className={dotStyle.p}
                onClick={() => {
                  setGradient({ gradient: true });
                  setTypeGradient("left");
                  setPosition("right");
                }}
              >
                O
              </p>
            </div>
            <p>Gradient</p>
          </div>
        </fieldset>
        <fieldset
          className={dotStyle.fieldsets}
          style={{
            transition: "opacity 0.3s ease",
            ...(position === "middle" ? { opacity: "0" } : { opacity: "1" }),
          }}
        >
          <legend className={dotStyle.legend}>Colors preferences</legend>
          {position === "left" ? (
            <input
              className={dotStyle.input}
              type="color"
              onChange={(e) => handlePick(e, "middle")}
              style={{ background: hex.color1 }}
            />
          ) : (
            <>
              <input
                className={dotStyle.input}
                type="color"
                onChange={(e) => handlePick(e, "left")}
                style={{ background: hex.color1 }}
              />
              <input
                className={dotStyle.input}
                type="color"
                onChange={(e) => handlePick(e, "right")}
                style={{ background: hex.color2 }}
              />
            </>
          )}
        </fieldset>
        <fieldset
          className={dotStyle.fieldsets}
          style={{
            transition: "opacity 0.3s ease",
            ...(typeGradient === "middle"
              ? { opacity: "0" }
              : { opacity: "1" }),
          }}
        >
          <legend className={dotStyle.legend}>Type of gradient</legend>
          <div className={dotStyle.divColors}>
            <p>Linear</p>
            <div className={dotStyle.button}>
              <p
                className={dotStyle.p}
                onClick={() => {
                  setTypeGradient("left");
                  setGradientType("linear");
                }}
              >
                I
              </p>
              <div
                className={dotStyle.buttonSlack}
                style={{
                  transition: " all 0.5s cubic-bezier(0.25, 1.3, 0.5, 1)",
                  ...(typeGradient === "middle"
                    ? { transform: "translateX(0px)" }
                    : typeGradient === "right"
                      ? { transform: "translateX(38px)" }
                      : { transform: "translateX(-35px)" }),
                }}
              ></div>
              <p
                className={dotStyle.p}
                onClick={() => {
                  setTypeGradient("right");
                  setGradientType("radial");
                }}
              >
                O
              </p>
            </div>
            <p>Radial</p>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
export default memo(Dots);
