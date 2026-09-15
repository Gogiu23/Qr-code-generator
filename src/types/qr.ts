import { Models } from "appwrite";

export type DotStyle =
  | "dots"
  | "rounded"
  | "classy"
  | "square"
  | "extra-rounded";
export type CornerSquareStyle = "dot" | "square" | "extra-rounded";
export type BgShape = "square" | "rounded";
export type ExtensionType = "png" | "svg" | "jpeg" | "pdf";

export type ContentType = "url" | "text" | "phone" | "email" | "wifi";
export type WifiEncryption = "WPA" | "WEP" | "nopass";

export interface ContentFields {
  url: string;
  text: string;
  phone: string;
  email: string;
  wifiSsid: string;
  wifiPassword: string;
  wifiEncryption: WifiEncryption;
}

export interface QROptions {
  dotsColor: string;
  dotsColor2: string;
  dotsGradient: boolean;
  bgColor: string;
  bgColor2: string;
  bgGradient: boolean;
  bgTransparent: boolean;
  dotStyle: DotStyle;
  cornerSquareStyle: CornerSquareStyle;
  bgShape: BgShape;
  logoUrl?: string;
  logoSize?: number;
}

export interface QRDesignRecord {
  $id?: string;
  user_id: string;
  title: string;
  content: string;
  options: QROptions;
  created_at?: string;
}

export interface AppwriteQRRow extends Models.Row {
  user_id: string;
  title: string;
  content: string;
  options: string; // JSON Stringified
}
