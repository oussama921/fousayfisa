// A strip of hand-cut-looking tiles. Seeded so it renders the same on every request.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const palettes = {
  warm: ["#b4532f", "#c8963e", "#8f3d20", "#e2d6c3", "#1f4e8c", "#d9b98a", "#6b7a3a"],
  cool: ["#1f4e8c", "#2f6db0", "#e2d6c3", "#c8963e", "#fbf7f0", "#3d4757"],
};

export function Tesserae({
  seed = 7,
  rows = 2,
  palette = "warm",
  className = "",
}: {
  seed?: number;
  rows?: number;
  palette?: keyof typeof palettes;
  className?: string;
}) {
  const rand = mulberry32(seed);
  const colors = palettes[palette];
  const width = 1200;
  const size = 14;
  const gap = 3;
  const tiles: { x: number; y: number; w: number; h: number; r: number; c: string }[] = [];

  for (let row = 0; row < rows; row++) {
    let x = rand() * -10;
    while (x < width) {
      const w = size * (0.7 + rand() * 0.9);
      tiles.push({
        x,
        y: row * (size + gap) + (rand() - 0.5) * 2,
        w,
        h: size * (0.85 + rand() * 0.2),
        r: (rand() - 0.5) * 8,
        c: colors[Math.floor(rand() * colors.length)],
      });
      x += w + gap;
    }
  }

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} ${rows * (size + gap)}`}
      preserveAspectRatio="xMidYMid slice"
      className={`block w-full ${className}`}
      style={{ height: rows * (size + gap) }}
    >
      {tiles.map((t, i) => (
        <rect
          key={i}
          x={t.x.toFixed(1)}
          y={t.y.toFixed(1)}
          width={t.w.toFixed(1)}
          height={t.h.toFixed(1)}
          rx={1.5}
          fill={t.c}
          transform={`rotate(${t.r.toFixed(1)} ${(t.x + t.w / 2).toFixed(1)} ${(t.y + t.h / 2).toFixed(1)})`}
        />
      ))}
    </svg>
  );
}
