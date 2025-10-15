"use client";
import Image from "next/image";
import styles from "./Form.module.css";
import { Tab } from "../Main";
import { CSSProperties } from "react";

interface ViewStyles {
  open: CSSProperties;
  close: CSSProperties;
  rotateImage: CSSProperties;
  defectImage: CSSProperties;
  divImage: CSSProperties;
  divOpen: CSSProperties;
  divClose: CSSProperties;
}

interface DataProps {
  tab: Tab;
  activeTab: Tab | undefined;
  open: (tab: Tab) => void;
}

export default function Qr({ tab, activeTab, open }: DataProps) {
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
      ></div>
    </div>
  );
}

const view: ViewStyles = {
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
    backgroundImage: 'url("/images/qr.jpg")',
    backgroundSize: "100%",
    backgroundOrigin: "border-box",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  divOpen: {
    position: "relative",
    zIndex: "99",
    transform: "translateY(-554px)",
    transition: "transform 0.5s ease-in-out",
  },
  divClose: {
    transform: "translateY(0)",
    transition: "transform 0.5s ease-in-out",
    zIndex: "1",
  },
};
