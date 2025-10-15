"use client";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import styles from "./navbar.module.css";
import { FaWindowClose } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className={`${styles.nav}`}>
      <Image
        src="/images/Logo.png"
        width={100}
        height={100}
        alt="image logo"
        priority
      />
      <Image src="/images/title.png" alt="title" width={200} height={200} />
    </nav>
  );
}
