"use client";
import Image from "next/image";
import styles from "./Form.module.css";
import { Tab } from "../Main";
import { CSSProperties } from "react";
import dotStyle from "./Dots.module.css";

interface ViewStyles {
  open: CSSProperties;
  close: CSSProperties;
  rotateImage: CSSProperties;
  defectImage: CSSProperties;
  divImage: CSSProperties;
  divOpen: CSSProperties;
  divClose: CSSProperties;
  inputColor: CSSProperties;
}

interface DataProps {
  tab: Tab;
  activeTab: Tab | undefined;
  open: (tab: Tab) => void;
}

export default function Dots({ tab, activeTab, open }: DataProps) {
  return (
    <div
      id={tab}
      className={styles.bookDiv}
      style={activeTab === tab ? view.divOpen : view.divClose}
    >
      <div className={styles.bookTitle} onClick={() => open(tab)}>
        <div className={styles.divImage} style={view.divImage}></div>
        <div className={styles.divBackground}></div>
        {tab}
        <Image
          src="/images/bookRemind.png"
          alt="image book title"
          width={100}
          height={100}
          style={activeTab === tab ? view.rotateImage : view.defectImage}
        />
      </div>
      <div
        className={styles.content}
        style={activeTab === tab ? view.open : view.close}
      >
        <fieldset className={dotStyle.fieldsets}>
          <legend>Dots shape</legend>
          <select name="type" id="type id">
            <option value="1">Rounded</option>
            <option value="1">Dots</option>
            <option value="1">Classy</option>
            <option value="1">Classy-rounded</option>
            <option value="1">Square</option>
            <option value="1">Extra rounded</option>
          </select>
        </fieldset>
        <fieldset className={dotStyle.fieldsets}>
          <legend>Color Dots</legend>
          <div className={dotStyle.divColors}>
            <p>Linear</p>
            <div className={dotStyle.button}>
              <p style={{ color: "white" }}>I</p>
              <div className={dotStyle.buttonSlack}></div>
              <p style={{ color: "white" }}>O</p>
            </div>
            <p>Gradient</p>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

const view: ViewStyles = {
  inputColor: {
    width: "40px",
    border: "4px solid var(--yellow)",
    borderRadius: "10px",
  },
  open: {
    position: "absolute",
    top: "0%",
    height: "50vh",
    background: "var(--pink)",
    transform: "translateY(100px)",
    zIndex: "99",
    opacity: "1",
    transition: "all 0.5s ease-in-out",
  },
  close: {
    opacity: "0",
    zIndex: "1",
    transition: "all 0.5s ease-in-out",
  },
  rotateImage: {
    transform: "rotate(90deg)",
    transition: "transform 0.5s ease-in-out",
  },
  defectImage: {
    transform: "rotate(0deg)",
    transition: "transform 0.5s ease-in-out",
  },
  divImage: {
    backgroundImage: 'url("/images/dots.jpg")',
    backgroundSize: "100%",
    backgroundOrigin: "border-box",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  divOpen: {
    position: "relative",
    zIndex: "99",
    transform: "translateY(-53px)",
    transition: "transform 0.5s ease-in-out",
  },
  divClose: {
    transform: "translateY(0)",
    transition: "transform 0.5s ease-in-out",
    zIndex: "1",
  },
};
