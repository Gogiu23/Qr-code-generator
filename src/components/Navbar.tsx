"use client";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import styles from "./navbar.module.css";
import { FaWindowClose } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className={`${styles.nav}`}>
      <Image
        src="/images/ChatGPT Image 10 oct 2025, 13_21_01.png"
        width={100}
        height={100}
        alt="image logo"
        priority
      />
      <Button className="text-black rounded-lg p-2 cursor-pointer">
        <FaWindowClose className={styles.iconButt} />
      </Button>
    </nav>
  );
}
