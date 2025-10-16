"use client";
import { ReactNode, useContext, useState, createContext } from "react";

interface ColorState {
  color1: string;
  color2: string;
}

interface GlobalContextType {
  color: ColorState;
  setColor: React.Dispatch<React.SetStateAction<ColorState>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [color, setColor] = useState<ColorState>({
    color1: "",
    color2: "",
  });

  const value = {
    color,
    setColor,
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
