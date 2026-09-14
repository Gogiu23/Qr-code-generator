import { Models } from "appwrite";

export type DotStyle =
  | "dots"
  | "rounded"
  | "classy"
  | "square"
  | "extra-rounded";
export type CornerSquareStyle = "dot" | "square" | "extra-rounded";
export type BgShape = "square" | "rounded";
export type ExtensionType = "png" | "svg" | "webp";

export interface QROptions {
  dotsColor: string;
  dotsColor2: string;
  dotsGradient: boolean;
  bgColor: string;
  bgColor2: string;
  bgGradient: boolean;
  dotStyle: DotStyle;
  cornerSquareStyle: CornerSquareStyle;
  bgShape: BgShape;
  logoUrl?: string;
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
