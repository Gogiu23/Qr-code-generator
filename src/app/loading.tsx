import Image from "next/image";
import { CSSProperties } from "react";
import loadingStyle from "./loading.module.css";

interface css {
  divGen: CSSProperties;
}

export default function Loading() {
  return (
    <div style={styles.divGen}>
      <Image
        src="/images/Logo.png"
        alt="logo Loading"
        width={200}
        height={200}
        className={loadingStyle.logo}
      />
    </div>
  );
}

const styles: css = {
  divGen: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
