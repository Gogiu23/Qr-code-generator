"use client";
import Url from "../url";
import Image from "next/image";
import styles from "./Form.module.css";
import { Tab } from "../Main";
import { CSSProperties } from "react";
import DataImg from "../../../public/images/data.jpg";

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
  url: string;
  setUrl: (url: string) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setMargin: (margin: number) => void;
  width: number;
  height: number;
  margin: number;
}

export default function Data({
  tab,
  activeTab,
  open,
  url,
  setUrl,
  setWidth,
  setHeight,
  setMargin,
  width,
  height,
  margin,
}: DataProps) {
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
        <Url
          url={url}
          setUrl={setUrl}
          setWidth={setWidth}
          setHeight={setHeight}
          setMargin={setMargin}
          width={width}
          height={height}
          margin={margin}
        />
      </div>
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
    backgroundImage: 'url("/images/data.jpg")',
    backgroundSize: "100%",
    backgroundOrigin: "border-box",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  divOpen: {
    position: "relative",
    zIndex: "99",
    transform: "translateY(78px)",
    transition: "transform 0.5s ease-in-out",
  },
  divClose: {
    transform: "translateY(0)",
    transition: "transform 0.5s ease-in-out",
    zIndex: "1",
  },
};
