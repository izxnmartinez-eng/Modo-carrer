"use client";

import { motion } from "framer-motion";
import type { GrowthPoint } from "@/lib/growth";

export interface GrowthSeries {
  id: string;
  label: string;
  color: string;
  points: GrowthPoint[];
  /** Potential ceiling, drawn as a dashed guide line. */
  potential: number;
}

/**
 * Season-by-season projected overall, one line per player.
 * X axis is age, Y axis is overall rating.
 */
export function GrowthChart({ series, height = 200 }: { series: GrowthSeries[]; height?: number }) {
  const all = series.flatMap((s) => s.points);
  if (all.length === 0) return null;

  const width = 520;
  const pad = { top: 14, right: 14, bottom: 26, left: 30 };

  const ages = all.map((p) => p.age);
  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);
  const ratings = [...all.map((p) => p.overall), ...series.map((s) => s.potential)];
  const minRating = Math.max(40, Math.min(...ratings) - 3);
  const maxRating = Math.min(99, Math.max(...ratings) + 3);

  const x = (age: number) =>
    pad.left + ((age - minAge) / Math.max(1, maxAge - minAge)) * (width - pad.left - pad.right);
  const y = (rating: number) =>
    pad.top + (1 - (rating - minRating) / Math.max(1, maxRating - minRating)) * (height - pad.top - pad.bottom);

  const gridRatings = [minRating, Math.round((minRating + maxRating) / 2), maxRating];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Projected overall by age for ${series.map((s) => s.label).join(", ")}`}
    >
      {gridRatings.map((r) => (
        <g key={r}>
          <line x1={pad.left} y1={y(r)} x2={width - pad.right} y2={y(r)} stroke="var(--color-line)" strokeWidth={1} />
          <text x={4} y={y(r)} dominantBaseline="middle" className="fill-zinc-600 font-mono text-[9px]">
            {r}
          </text>
        </g>
      ))}

      {Array.from({ length: maxAge - minAge + 1 }, (_, i) => minAge + i)
        .filter((age) => (age - minAge) % 2 === 0)
        .map((age) => (
          <text
            key={age}
            x={x(age)}
            y={height - 8}
            textAnchor="middle"
            className="fill-zinc-600 font-mono text-[9px]"
          >
            {age}
          </text>
        ))}

      {series.map((s) => (
        <line
          key={`cap-${s.id}`}
          x1={pad.left}
          y1={y(s.potential)}
          x2={width - pad.right}
          y2={y(s.potential)}
          stroke={s.color}
          strokeWidth={1}
          strokeDasharray="4 5"
          opacity={0.35}
        />
      ))}

      {series.map((s) => {
        const d = s.points.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.age)},${y(p.overall)}`).join(" ");
        return (
          <g key={s.id}>
            <motion.path
              d={d}
              fill="none"
              stroke={s.color}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
            {s.points
              .filter((p) => p.isNow)
              .map((p) => (
                <circle key={`now-${s.id}`} cx={x(p.age)} cy={y(p.overall)} r={4} fill={s.color} stroke="var(--color-ground)" strokeWidth={2} />
              ))}
          </g>
        );
      })}
    </svg>
  );
}
