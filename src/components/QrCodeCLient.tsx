"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./QrCodeClient.module.css";
import dynamic from "next/dynamic";
import Image from "next/image";
import QRCodeStyling, { FileExtension, Gradient } from "qr-code-styling";
import { useGlobalContext } from "@/context/GlobalContext";
import Button from "./ui/Button";

// ✅ Carga dinámica (por si lo importan en otro lado)
const QrCodeClient = ({
  url,
  width,
  height,
  margin,
}: {
  url: string;
  width: number;
  height: number;
  margin: number;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const [start, setStart] = useState<boolean>(true);
  const { hex, gradient, typeDot, gradientType } = useGlobalContext();
  const [fileExt, setFileExt] = useState<FileExtension>("png");

  useEffect(() => {
    // Importa qr-code-styling solo en el cliente
    import("qr-code-styling").then(({ default: QRCodeStyling }) => {
      const instance = new QRCodeStyling({
        width: width || 300,
        height: height || 300,
        data: url || "",
        margin: margin || 0,
        dotsOptions: {
          color: hex.color1 || "#333",
          type: "rounded",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 20,
        },
      });

      setQrCode(instance);
      if (ref.current) {
        ref.current.innerHTML = "";
        instance.append(ref.current);
      }
    });
  }, []); // Solo al montar

  const gradientOptions = useMemo(() => {
    if (!gradient.gradient) {
      return { gradient: undefined };
    }
    return {
      gradient: {
        type: gradientType,
        colorStops: [
          {
            offset: 0,
            color: hex.color1,
          },
          {
            offset: 1,
            color: hex.color2,
          },
        ],
      } satisfies Gradient,
    };
  }, [gradient.gradient, gradientType, hex.color1, hex.color2]);

  // Actualiza cada vez que cambien los props
  useEffect(() => {
    console.log(gradientType);
    if (qrCode) {
      qrCode.update({
        width,
        height,
        data: url,
        margin,
        dotsOptions: {
          color: hex.color1,
          ...gradientOptions,
          type: typeDot,
        },
      });
      setStart(!(url && url.length > 0));
    }
  }, [
    url,
    hex,
    width,
    height,
    margin,
    qrCode,
    // gradient,
    typeDot,
    // gradientType,
    gradientOptions,
  ]);

  const handleDownload = () => {
    if (!qrCode) {
      alert(
        "Qr code is not ready to be download (empty or some others errors)",
      );
      return;
    }
    try {
      qrCode.download({
        name: "Quode",
        extension: fileExt,
      });
    } catch (error) {
      alert("qr code is empty");
      console.error("Download errro", error);
      console.log(error);
    }
  };
  const handleExtDown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFileExt(e.target.value as FileExtension);
  };

  return (
    <>
      <div className={styles.boxImage}>
        <div
          ref={ref}
          className={`${styles.divRef}${start ? styles.visible : styles.notVisible}`}
        ></div>
        {start && (
          <Image
            width={300}
            height={300}
            src="/images/Logo.webp"
            alt="placeholder image"
            className={styles.divImage}
            priority
          />
        )}
      </div>

      <div className={styles.download}>
        <Button onClick={handleDownload}>Download</Button>
        <select
          name="format"
          id="formatDownload"
          className={styles.select}
          onChange={handleExtDown}
        >
          <option value="PNG">PNG</option>
          <option value="JPEG">JPEG</option>
          <option value="SVG">SVG</option>
        </select>
      </div>
    </>
  );
};

// ✅ Si importas este componente desde un Server Component:
export default dynamic(() => Promise.resolve(QrCodeClient), { ssr: false });
