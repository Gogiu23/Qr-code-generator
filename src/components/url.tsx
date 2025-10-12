"use client";
import styles from "./Main.module.css";
import { FaSearch } from "react-icons/fa";

interface UrlProps {
  setUrl: (url: string) => void;
  url: string;
}

export default function Url({ url, setUrl }: UrlProps) {
  const urlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
  return (
    <label htmlFor="web">
      URL
      <div className={styles.divInput}>
        <input
          value={url}
          type="url"
          placeholder="Inserta la direccion web"
          onChange={urlChange}
        />
        <FaSearch className={styles.icon} />
      </div>
    </label>
  );
}
