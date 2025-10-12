// src/components/Button.tsx
"use client";
import * as React from "react";

// 1. Extiende las propiedades estándar de un botón HTML
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Puedes añadir cualquier prop personalizada aquí, por ejemplo:
  variant?: "light" | "dark";
  title?: string;
  style?: React.CSSProperties;
}

// 2. Acepta 'children' y usa el 'rest operator' para capturar el resto de props
export default function Button({
  children,
  variant = "dark",
  style: userProvidedStyle,
  ...rest
}: ButtonProps) {
  const selectedStyle = variantStyle[variant];

  const finalStyle = {
    ...baseStyle,
    ...selectedStyle,
    ...userProvidedStyle,
  };
  return (
    <button
      // 3. ¡ESPARCE el resto de propiedades! Esto incluye onClick, title, disabled, etc.
      {...rest}
      // Combina tu estilo base con el estilo de la variante y cualquier className pasado
      style={finalStyle}
    >
      {children}
    </button>
  );
}
const baseStyle = {
  padding: "13px",
  borderRadius: "10px",
};
const variantStyle = {
  dark: {
    background: "var(--background)",
    color: "white",
  },
  light: {
    background: "var(--yellow)",
    color: "#333",
  },
};
