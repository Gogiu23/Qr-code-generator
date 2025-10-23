"use client";
import { useId, useState } from "react";
import toggleStyle from "./ToggleSwitch.module.css";

interface toggleProps {
  onChangeValue: (newValue: string) => void;
  value: string;
}

export function Toggle({ value, onChangeValue }: toggleProps) {
  //Generar un id unico por cada instancia
  const uniqueId = useId();
  // 1. Usa useState para controlar si el switch está 'checked' (encendido)
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // 2. Función para manejar el cambio de estado
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setIsChecked se actualiza al valor actual del checkbox
    setIsChecked(event.target.checked);
    //si es true devuelve el valor left como string
    if (isChecked) {
      onChangeValue("left");
    } else {
      onChangeValue("right");
    }
  };

  return (
    <div className={toggleStyle.container}>
      {/* El atributo htmlFor de <label> enlaza el click al input */}
      <label className={toggleStyle.switch} htmlFor={uniqueId}>
        <input
          id={uniqueId}
          // Asignamos un ID para enlazarlo con el htmlFor de <label>
          value={value}
          className={toggleStyle.togglesw}
          type="checkbox"
          // 3. Conectamos el estado 'isChecked' al atributo 'checked'
          checked={isChecked}
          // 4. Conectamos la función de cambio
          onChange={handleChange}
        />

        {/* Los indicadores y el botón son hermanos del input, necesarios para el CSS */}
        <div className={` ${toggleStyle.indicator} ${toggleStyle.left} `}></div>
        <div
          className={` ${toggleStyle.indicator} ${toggleStyle.right} `}
        ></div>
        <div className={toggleStyle.button}></div>
      </label>
    </div>
  );
}
