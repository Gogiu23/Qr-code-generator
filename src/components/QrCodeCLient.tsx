"use client";
import QRCodeStyling from "qr-code-styling";
import { Button } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface QrCodeClientProps {
  url: string;
  color: string;
  width: number;
  height: number;
  margin: number;
}

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  image: "",
  dotsOptions: {
    color: "#333",
    type: "rounded",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20,
  },
});

export default function QrCodeClient({
  url,
  color,
  width,
  height,
  margin,
}: QrCodeClientProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState<boolean>(true);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
    return () => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    qrCode.update({
      width: width,
      height: height,
      data: url,
      margin: margin,
      dotsOptions: {
        color: color,
      },
    });
    if (url && url.length > 0) {
      setStart(false);
    } else {
      setStart(true);
    }
  }, [url, color, width, height, margin]);

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
            src="/images/Logo.png"
            alt="placeholder image"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
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
}

const style = {
  boxImage: {
    position: "relative",
    width: "500px",
    height: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // border: "2px solid red",
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
