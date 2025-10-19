"use client";
import Image from "next/image";
import type { DotType } from "qr-code-styling";
import styles from "./Data.module.css";
import { Tab } from "../Main";
import { memo, startTransition, useState } from "react";
import dotStyle from "./Dots.module.css";
import { useGlobalContext } from "@/context/GlobalContext";

interface DataProps {
  tab: Tab;
  activeTab: Tab | undefined;
  open: (tab: Tab) => void;
}

function Dots({ tab, activeTab, open }: DataProps) {
  const [position, setPosition] = useState<string>("middle");
  const [typeGradient, setTypeGradient] = useState<string>("middle");
  const { hex, setHex, setGradient, typeDot, setTypeDot } = useGlobalContext();

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

  const isActive = activeTab === tab;

  return (
    <div id={tab} className={styles.bookDiv}>
      <div
        className={styles.bookTitle}
        onClick={() => startTransition(() => open(tab))}
      >
        <div className={`${styles.divImage} ${styles.divDots}`}></div>
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
                  transition: " all 0.5s ease-in-out",
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
                  setGradient({ gradient: false });
                  setTypeGradient("left");
                }}
              >
                I
              </p>
              <div
                className={dotStyle.buttonSlack}
                style={{
                  transition: " all 0.5s ease-in-out",
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
                  setGradient({ gradient: true });
                  setTypeGradient("right");
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
