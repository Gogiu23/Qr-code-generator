"use client";
import { GithubPlacement } from "@uiw/react-color-github";
import Button from "./ui/Button";
import { Chrome } from "@uiw/react-color";

interface ColorProps {
  hex: string;
  setHex: (hex: string) => void;
  setColor: (color: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Color({
  hex,
  setHex,
  setColor,
  isOpen,
  setIsOpen,
}: ColorProps) {
  const handlePickerColor = () => {
    setIsOpen(!isOpen);
  };

  return (
    <label htmlFor="color">
      <Button title="Button Color" onClick={handlePickerColor} variant="dark">
        Pick a color
      </Button>
      {isOpen ? (
        <Chrome
          color={hex}
          style={view.color}
          showAlpha={false}
          placement={GithubPlacement.TopLeft}
          onChange={(color) => {
            setHex(color.hex);
            setColor(color.hex);
          }}
        />
      ) : (
        <></>
      )}
    </label>
  );
}

const view = {
  color: {
    borderRadius: "10px",
  },
};
