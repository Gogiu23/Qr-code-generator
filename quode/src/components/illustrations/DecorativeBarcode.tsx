function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface DecorativeBarcodeProps {
  /** Ancho en px (el alto se calcula con una proporción fija). */
  size?: number;
  seed?: number;
  color?: string;
  className?: string;
  title?: string;
}

export default function DecorativeBarcode({
  size = 160,
  seed = 11,
  color = "#333333",
  className,
  title,
}: DecorativeBarcodeProps) {
  const rand = seededRandom(seed);
  const bars: { x: number; w: number }[] = [];
  let x = 4;
  while (x < 96) {
    const w = 1 + rand() * 2.5;
    bars.push({ x, w });
    x += w + 1 + rand() * 1.5;
  }

  return (
    <svg
      viewBox="0 0 100 60"
      width={size}
      height={size * 0.6}
      className={className}
      role="img"
      aria-label={title ?? "Ilustración de un código de barras"}
    >
      <rect x="0" y="0" width="100" height="60" rx="3" fill="white" />
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={6} width={b.w} height={40} fill={color} />
      ))}
    </svg>
  );
}
