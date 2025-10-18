"use client";
import Image from "next/image";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={`${styles.nav}`}>
      <Image
        src="/images/LogoNoWords.png"
        width={200}
        height={200}
        alt="image logo"
        priority
      />
      <Image src="/images/title.png" alt="title" width={200} height={200} />
    </nav>
  );
}
