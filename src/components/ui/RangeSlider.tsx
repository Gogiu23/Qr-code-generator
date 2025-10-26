"use client";
import React, { useState, useRef, useEffect, memo } from "react";
import RangeStyle from "./RangeSlider.module.css"; // Asume que el CSS está en este archivo

interface RangeSliderProps {
  min: number;
  max: number;
  initialValue?: number;
  onChangeValue: (newValue: string) => void;
}

// El número mágico de desplazamiento del thumb
const THUMB_OFFSET = 14;

function RangeSlider({
  min,
  max,
  initialValue = 0,
  onChangeValue,
}: RangeSliderProps) {
  // Estado para el valor del slider
  const [value, setValue] = useState(initialValue);

  // Referencia para el elemento DOM de la burbuja
  const bubbleRef = useRef<HTMLDivElement>(null);

  // Referencia para el elemento DOM del input de rango
  const rangeRef = useRef<HTMLInputElement>(null);

  // Lógica memorizada para calcular la posición de la burbuja
  const calculateBubblePosition = (
    val: number,
    rangeMin: number,
    rangeMax: number,
  ) => {
    // Escala el valor a un porcentaje (0 a 100)
    const offset = Number(((val - rangeMin) * 100) / (rangeMax - rangeMin));
    return offset;
  };

  // 🔄 EFECTO: Actualiza la posición de la burbuja cuando el valor cambia
  useEffect(() => {
    const bubble = bubbleRef.current;
    const range = rangeRef.current;

    // Verificación de existencia de DOM
    if (!bubble || !range) return;

    // Calcular el porcentaje
    const offset = calculateBubblePosition(value, min, max);

    // 2. Aplicar el desplazamiento CSS (misma lógica que la función setBubble)
    bubble.style.left = `calc(${offset}% - ${THUMB_OFFSET}px)`;
  }, [value, min, max]);
  // Dependencias: El efecto se ejecuta cuando el valor, min o max cambian.

  // 📝 HANDLER: Maneja el cambio de valor del input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChangeValue(e.target.value);
  };

  return (
    <div className={RangeStyle.rangeWrap}>
      <input
        type="range"
        className={RangeStyle.range}
        min={min}
        max={max}
        // value={value}
        onChange={handleInputChange}
        ref={rangeRef} // Conecta la referencia al input
      />
      {/* Conecta la referencia a la burbuja */}
      <div className={RangeStyle.bubble} ref={bubbleRef}>
        {value}
      </div>
    </div>
  );
}

export default memo(RangeSlider);
// Uso en otro componente:
// <RangeSlider min={-20} max={20} initialValue={5} />
