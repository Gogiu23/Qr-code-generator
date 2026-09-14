"use client";
import { useEffect, useRef } from "react";
import type QRCodeStyling from "qr-code-styling";
import type { Gradient } from "qr-code-styling";
import { QROptions, ExtensionType } from "@/types/qr";

function buildGradient(color1: string, color2: string): Gradient {
  return {
    type: "linear",
    rotation: Math.PI / 4,
    colorStops: [
      { offset: 0, color: color1 },
      { offset: 1, color: color2 },
    ],
  };
}

const QR_SIZE = 260;
export const QR_BG_RADIUS = Math.round(QR_SIZE * 0.09);

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function downloadRoundedPng(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const img = await loadImage(url);
  URL.revokeObjectURL(url);

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const radius = Math.round(img.width * 0.09);
  const w = canvas.width;
  const h = canvas.height;

  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.arcTo(w, 0, w, h, radius);
  ctx.arcTo(w, h, 0, h, radius);
  ctx.arcTo(0, h, 0, 0, radius);
  ctx.arcTo(0, 0, w, 0, radius);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, 0, 0);

  canvas.toBlob((outBlob) => {
    if (outBlob) downloadBlob(outBlob, filename);
  }, "image/png");
}

export function useQRCode(content: string, options: QROptions) {
  const ref = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    let cancelled = false;

    const buildOptions = () => {
      const dotsGradient = options.dotsGradient
        ? buildGradient(options.dotsColor, options.dotsColor2)
        : undefined;
      const bgGradient = options.bgGradient
        ? buildGradient(options.bgColor, options.bgColor2)
        : undefined;

      return {
        width: QR_SIZE,
        height: QR_SIZE,
        data: content || " ",
        image: options.logoUrl || undefined,
        margin: 4,
        dotsOptions: {
          type: options.dotStyle,
          color: dotsGradient ? undefined : options.dotsColor,
          gradient: dotsGradient,
        },
        backgroundOptions: {
          color: bgGradient ? undefined : options.bgColor,
          gradient: bgGradient,
        },
        cornersSquareOptions: {
          type: options.cornerSquareStyle,
          color: dotsGradient ? undefined : options.dotsColor,
          gradient: dotsGradient,
        },
        cornersDotOptions: {
          color: dotsGradient ? undefined : options.dotsColor,
          gradient: dotsGradient,
        },
        imageOptions: {
          crossOrigin: "anonymous" as const,
          margin: 4,
        },
      };
    };

    import("qr-code-styling").then(({ default: QRCodeStyling }) => {
      if (cancelled) return;

      if (!qrRef.current) {
        qrRef.current = new QRCodeStyling(buildOptions());
        if (ref.current) {
          ref.current.innerHTML = "";
          qrRef.current.append(ref.current);
        }
      } else {
        qrRef.current.update(buildOptions());
      }
    });

    return () => {
      cancelled = true;
    };
  }, [content, options]);

  const download = async (extension: ExtensionType, name: string) => {
    const qr = qrRef.current;
    if (!qr) return;

    if (options.bgShape === "rounded" && extension === "png") {
      const blob = await qr.getRawData("png");
      if (blob instanceof Blob) {
        await downloadRoundedPng(blob, `${name}.png`);
        return;
      }
    }

    qr.download({ name, extension });
  };

  return { ref, download };
}
