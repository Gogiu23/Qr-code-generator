const MODULES = 17;

function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function isFinderModule(r: number, c: number): boolean | null {
  const corners = [
    [0, 0],
    [0, MODULES - 7],
    [MODULES - 7, 0],
  ];
  for (const [r0, c0] of corners) {
    if (r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7) {
      const lr = r - r0;
      const lc = c - c0;
      const outerRing = lr === 0 || lr === 6 || lc === 0 || lc === 6;
      const innerCore = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
      return outerRing || innerCore;
    }
  }
  return null;
}

interface DecorativeQrProps {
  /** Tamaño en px (cuadrado). */
  size?: number;
  /** Semilla para variar el patrón decorativo entre instancias. */
  seed?: number;
  color?: string;
  className?: string;
  /** Fracción (0-1) del área central a cubrir, para simular un logo o daño. */
  coverPercent?: number;
  title?: string;
}

export default function DecorativeQr({
  size = 160,
  seed = 7,
  color = "#333333",
  className,
  coverPercent,
  title,
}: DecorativeQrProps) {
  const rand = seededRandom(seed);
  const modules: boolean[][] = [];
  for (let r = 0; r < MODULES; r++) {
    const row: boolean[] = [];
    for (let c = 0; c < MODULES; c++) {
      const finder = isFinderModule(r, c);
      if (finder !== null) {
        row.push(finder);
        continue;
      }
      if (r === 6 || c === 6) {
        row.push((r + c) % 2 === 0);
        continue;
      }
      row.push(rand() > 0.55);
    }
    modules.push(row);
  }

  const moduleSize = 100 / MODULES;
  const coverSize = coverPercent ? Math.sqrt(coverPercent) * 100 : 0;
  const coverOffset = (100 - coverSize) / 2;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title ?? "Ilustración de un código QR"}
    >
      <rect x="0" y="0" width="100" height="100" rx="4" fill="white" />
      {modules.map((row, r) =>
        row.map((on, c) =>
          on ? (
            <rect
              key={`${r}-${c}`}
              x={c * moduleSize}
              y={r * moduleSize}
              width={moduleSize}
              height={moduleSize}
              fill={color}
            />
          ) : null,
        ),
      )}
      {coverPercent ? (
        <rect
          x={coverOffset}
          y={coverOffset}
          width={coverSize}
          height={coverSize}
          rx="3"
          fill="#EAFFD0"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
      ) : null}
    </svg>
  );
}
