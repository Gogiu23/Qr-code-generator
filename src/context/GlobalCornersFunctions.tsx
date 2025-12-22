"use client";

import React, { ReactNode, useContext, useState, createContext } from "react";
import type { CornerDotType, CornerSquareType } from "qr-code-styling";

//Objetos
interface ColorState {
  color1: string;
  color2: string;
}

interface ColorBoolean {
  gradientDots: boolean;
  gradientSquare: boolean;
}

interface GlobalContextType {
  gradientDots: ColorBoolean;
  setGradientDots: React.Dispatch<React.SetStateAction<ColorBoolean>>;
  hexDots: ColorState;
  setHexDots: React.Dispatch<React.SetStateAction<ColorState>>;
  hexSquare: ColorState;
  setHexSquare: React.Dispatch<React.SetStateAction<ColorState>>;
  cornerSquare: CornerSquareType;
  setCornerSquareType: React.Dispatch<React.SetStateAction<CornerSquareType>>;
  cornerType: CornerDotType;
  setCornerType: React.Dispatch<React.SetStateAction<CornerDotType>>;
}

const GlobalCornersContext = createContext<GlobalContextType | undefined>(
  undefined,
);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalCornersProvider = ({ children }: GlobalProviderProps) => {
  const [cornerSquare, setCornerSquareType] =
    useState<CornerSquareType>("classy");
  const [cornerType, setCornerType] = useState<CornerDotType>("classy");
  const [hexDots, setHexDots] = useState<ColorState>({
    color1: "",
    color2: "",
  });
  const [hexSquare, setHexSquare] = useState<ColorState>({
    color1: "",
    color2: "",
  });
  const [gradientDots, setGradientDots] = useState<ColorBoolean>({
    gradientDots: false,
    gradientSquare: false,
  });

  const value = {
    gradientDots,
    setGradientDots,
    hexDots,
    setHexDots,
    hexSquare,
    setHexSquare,
    cornerType,
    setCornerType,
    cornerSquare,
    setCornerSquareType,
  };

  return (
    <GlobalCornersContext.Provider value={value}>
      {children}
    </GlobalCornersContext.Provider>
  );
};

export const useGlobalCornerContext = () => {
  const context = useContext(GlobalCornersContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalCornerContext must be used within a GlobalCornersProvider",
    );
  }
  return context;
};
