"use client";
import { ReactNode, useContext, useState, createContext } from "react";
import type { DotType } from "qr-code-styling";

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
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [hex, setHex] = useState<ColorState>({
    color1: "",
    color2: "",
  });
  const [gradient, setGradient] = useState<ColorBoolean>({ gradient: false });
  const [typeDot, setTypeDot] = useState<DotType>("rounded");

  const value = {
    hex,
    setHex,
    gradient,
    setGradient,
    typeDot,
    setTypeDot,
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
