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

async function getRoundedPngBlob(blob: Blob): Promise<Blob | null> {
  const url = URL.createObjectURL(blob);
  const img = await loadImage(url);
  URL.revokeObjectURL(url);

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

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

  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

async function downloadRoundedPng(blob: Blob, filename: string) {
  const rounded = await getRoundedPngBlob(blob);
  if (rounded) downloadBlob(rounded, filename);
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function downloadPdf(blob: Blob, filename: string, size: number) {
  const { jsPDF } = await import("jspdf");
  const dataUrl = await blobToDataUrl(blob);
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [size, size],
  });
  pdf.addImage(dataUrl, "PNG", 0, 0, size, size);
  pdf.save(filename);
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
          color: options.bgTransparent
            ? "transparent"
            : bgGradient
              ? undefined
              : options.bgColor,
          gradient: options.bgTransparent ? undefined : bgGradient,
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
          imageSize: options.logoSize ?? 0.4,
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

    if (extension === "pdf") {
      const blob = await qr.getRawData("png");
      if (blob instanceof Blob) {
        await downloadPdf(blob, `${name}.pdf`, QR_SIZE);
      }
      return;
    }

    if (options.bgShape === "rounded" && extension === "png") {
      const blob = await qr.getRawData("png");
      if (blob instanceof Blob) {
        await downloadRoundedPng(blob, `${name}.png`);
        return;
      }
    }

    qr.download({ name, extension });
  };

  const share = async (
    name: string,
    text?: string,
  ): Promise<"shared" | "cancelled" | "unsupported"> => {
    const qr = qrRef.current;
    if (!qr) return "unsupported";
    if (typeof navigator.share !== "function") return "unsupported";

    const rawBlob = await qr.getRawData("png");
    if (!(rawBlob instanceof Blob)) return "unsupported";

    const blob =
      options.bgShape === "rounded"
        ? ((await getRoundedPngBlob(rawBlob)) ?? rawBlob)
        : rawBlob;
    const file = new File([blob], `${name}.png`, { type: "image/png" });

    if (
      typeof navigator.canShare !== "function" ||
      !navigator.canShare({ files: [file] })
    ) {
      return "unsupported";
    }

    try {
      await navigator.share({ files: [file], title: name, text });
      return "shared";
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return "cancelled";
      return "unsupported";
    }
  };

  return { ref, download, share };
}
