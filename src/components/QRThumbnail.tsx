"use client";
import { useEffect, useRef } from "react";
import type { Gradient } from "qr-code-styling";
import { QROptions } from "@/types/qr";

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

interface QRThumbnailProps {
  content: string;
  options: QROptions;
  size?: number;
}

export default function QRThumbnail({ content, options, size = 88 }: QRThumbnailProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const dotsGradient = options.dotsGradient
      ? buildGradient(options.dotsColor, options.dotsColor2)
      : undefined;
    const bgGradient = options.bgGradient
      ? buildGradient(options.bgColor, options.bgColor2)
      : undefined;

    import("qr-code-styling").then(({ default: QRCodeStyling }) => {
      if (cancelled || !ref.current) return;

      const qr = new QRCodeStyling({
        width: size,
        height: size,
        data: content || " ",
        image: options.logoUrl || undefined,
        margin: 2,
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
          crossOrigin: "anonymous",
          margin: 2,
          imageSize: options.logoSize ?? 0.4,
        },
      });

      ref.current.innerHTML = "";
      qr.append(ref.current);
    });

    return () => {
      cancelled = true;
    };
  }, [content, options, size]);

  return (
    <div
      ref={ref}
      className="rounded-lg overflow-hidden shrink-0"
      style={{
        width: size,
        height: size,
        borderRadius: options.bgShape === "rounded" ? size * 0.09 : 0,
      }}
    />
  );
}
