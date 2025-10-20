"use client";
import React, { ReactNode, useContext, useState, createContext } from "react";
import type {
  DotType,
  GradientType,
  CornerDotType,
  CornerSquareType,
} from "qr-code-styling";

//Para objetos
interface ColorState {
  color1: string;
  color2: string;
}
interface ColorBoolean {
  gradient: boolean;
}

interface GlobalContextType {
  hex: ColorState;
  setHex: React.Dispatch<React.SetStateAction<ColorState>>;
  gradient: ColorBoolean;
  setGradient: React.Dispatch<React.SetStateAction<ColorBoolean>>;
  typeDot: DotType;
  setTypeDot: React.Dispatch<React.SetStateAction<DotType>>;
  gradientType: GradientType;
  setGradientType: React.Dispatch<React.SetStateAction<GradientType>>;
  rotation: number;
  setRotation: React.Dispatch<React.SetStateAction<number>>;
  cornerType: CornerDotType;
  setCornerType: React.Dispatch<React.SetStateAction<CornerDotType>>;
  cornerSquare: CornerSquareType;
  setCornerSquareType: React.Dispatch<React.SetStateAction<CornerSquareType>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [cornerSquare, setCornerSquareType] =
    useState<CornerSquareType>("dots");
  const [cornerType, setCornerType] = useState<CornerDotType>("classy");
  const [rotation, setRotation] = useState<number>(0);
  const [hex, setHex] = useState<ColorState>({
    color1: "",
    color2: "",
  });
  const [gradient, setGradient] = useState<ColorBoolean>({ gradient: false });
  const [typeDot, setTypeDot] = useState<DotType>("rounded");
  const [gradientType, setGradientType] = useState<GradientType>("linear");

  const value = {
    hex,
    setHex,
    gradient,
    setGradient,
    typeDot,
    setTypeDot,
    gradientType,
    setGradientType,
    rotation,
    setRotation,
    cornerType,
    setCornerType,
    cornerSquare,
    setCornerSquareType,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
