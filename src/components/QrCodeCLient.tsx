"use client";
import QRCodeStyling from "qr-code-styling";
import { Button } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface QrCodeClientProps {
  url: string;
  color: string;
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

export default function QrCodeClient({ url, color }: QrCodeClientProps) {
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
      data: url,
      dotsOptions: {
        color: color,
      },
    });
    if (url && url.length > 0) {
      setStart(false);
    } else {
      setStart(true);
    }
  }, [url, color]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          ref={ref}
          style={{
            opacity: start ? 0 : 1,
            transition: "opacity 0.3s",
            width: "300px",
            height: "300px",
            borderRadius: "10px",
          }}
        ></div>
        {start && (
          <Image
            width={300}
            height={300}
            src="/images/ChatGPT Image 10 oct 2025, 13_21_01.png"
            alt="placeholder image"
            style={{ position: "absolute", top: 0, left: 0 }}
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
