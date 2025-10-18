"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { CSSProperties } from "react";
import QRCodeStyling, { Gradient } from "qr-code-styling";
import { useGlobalContext } from "@/context/GlobalContext";

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
  const { hex, gradient } = useGlobalContext();

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

  const gradientOptions = gradient.gradient
    ? {
        gradient: {
          type: "linear",
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
      }
    : { gradient: undefined };

  // Actualiza cada vez que cambien los props
  useEffect(() => {
    if (qrCode) {
      qrCode.update({
        width,
        height,
        data: url,
        margin,
        dotsOptions: {
          color: hex.color1,
          ...gradientOptions,
        },
      });
      setStart(!(url && url.length > 0));
    }
  }, [url, hex, width, height, margin, qrCode, gradient]);

  const style: { boxImage: CSSProperties; download: CSSProperties } = {
    boxImage: {
      position: "relative",
      width: "500px",
      height: "500px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    download: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      width: "80%",
      height: "100px",
      borderRadius: "10px",
      border: "2px solid blue",
    },
  };

  return (
    <>
      <div style={style.boxImage}>
        <div
          ref={ref}
          style={{
            opacity: start ? 0 : 1,
            transition: "opacity 0.3s",
            width: "300px",
            height: "300px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></div>
        {start && (
          <Image
            width={300}
            height={300}
            src="/images/Logo.webp"
            alt="placeholder image"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            priority
          />
        )}
      </div>

      <div className="download" style={style.download}>
        <Button>Download</Button>
        <select name="format" id="formatDownload">
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
