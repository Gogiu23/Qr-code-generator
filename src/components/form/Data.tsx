"use client";
import Url from "../url";
import Image from "next/image";
import styles from "./Form.module.css";
import { Tab } from "../Main";

interface DataProps {
  tab: Tab;
  activeTab: Tab | undefined;
  open: (tab: Tab) => void;
  url: string;
  setUrl: (url: string) => void;
}

export default function Data({ tab, activeTab, open, url, setUrl }: DataProps) {
  return (
    <div
      id={tab}
      className={styles.bookDiv}
      style={activeTab === tab ? view.open : view.close}
    >
      <div className={styles.bookTitle}>
        {tab}
        <Image
          src="/images/bookRemind.png"
          alt="image book title"
          width={100}
          height={100}
          style={activeTab === tab ? view.rotateImage : view.defectImage}
          onClick={() => open(tab)}
        />
      </div>
      <div
        className={styles.content}
        style={activeTab === tab ? view.contentOpen : view.contentClose}
      >
        <Url url={url} setUrl={setUrl} />
      </div>
    </div>
  );
}

const view = {
  open: {
    position: "absolute",
    top: "0%",
    transform: "translateY(150px)",
    height: "50vh",
    background: "var(--pink)",
    zIndex: "99",
    border: "3px solid",
    borderRadius: "10px",
    transition: "all 0.5s ease-in-out",
  },
  close: {
    height: "100px",
    position: "relative",
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
  contentOpen: {
    opacity: "1",
    transition: "opacity 0.5s ease-in-out",
  },
  contentClose: {
    opacity: "0",
    transition: "opacity 0.5s ease-in-out",
  },
};
