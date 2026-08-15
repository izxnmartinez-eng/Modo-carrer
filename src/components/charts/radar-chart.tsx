"use client";

import { motion } from "framer-motion";

export interface RadarSeries {
  id: string;
  label: string;
  /** CSS colour used for the stroke and a translucent fill. */
  color: string;
  values: number[];
}

/**
 * Dependency-free radar chart for the six card stats.
 * Values are read on a 0-99 scale; axes are drawn clockwise from the top.
 */
export function RadarChart({
  axes,
  series,
  size = 260,
}: {
  axes: string[];
  series: RadarSeries[];
  size?: number;
}) {
  const center = size / 2;
  const radius = center - 30;
  const count = axes.length;

  const point = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    const r = (Math.min(99, Math.max(0, value)) / 99) * radius;
    return [center + Math.cos(angle) * r, center + Math.sin(angle) * r] as const;
  };

  const ring = (fraction: number) =>
    axes
      .map((_, i) => {
        const [x, y] = point(i, 99 * fraction);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="h-auto w-full max-w-[320px]"
      role="img"
      aria-label={`Attribute radar comparing ${series.map((s) => s.label).join(", ")}`}
    >
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon key={f} points={ring(f)} fill="none" stroke="var(--color-line)" strokeWidth={1} />
      ))}
      {axes.map((_, i) => {
        const [x, y] = point(i, 99);
        return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="var(--color-line)" strokeWidth={1} />;
      })}

      {series.map((s) => {
        const points = s.values.map((v, i) => point(i, v).map((n) => n.toFixed(1)).join(",")).join(" ");
        return (
          <motion.polygon
            key={s.id}
            points={points}
            fill={s.color}
            fillOpacity={0.16}
            stroke={s.color}
            strokeWidth={2}
            strokeLinejoin="round"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{ transformOrigin: `${center}px ${center}px` }}
          />
        );
      })}

      {axes.map((axis, i) => {
        const [x, y] = point(i, 118);
        return (
          <text
            key={axis}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-zinc-500 font-mono text-[10px] font-bold"
          >
            {axis}
          </text>
        );
      })}
    </svg>
  );
}
