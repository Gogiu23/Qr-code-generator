import { ImageResponse } from "next/og";
import { AppIconMark } from "@/lib/appIcon";

export const contentType = "image/png";

export function GET() {
  return new ImageResponse(<AppIconMark size={512} />, {
    width: 512,
    height: 512,
  });
}
