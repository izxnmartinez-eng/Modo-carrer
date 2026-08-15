"use client";

import { motion } from "framer-motion";
import type { TacticPosition } from "@/lib/types";

/**
 * Pitch nodes sit close enough together that full role names collide, so each
 * role is drawn as the abbreviation Career Mode players actually use. The
 * unabbreviated names are listed beside the diagram.
 */
const ROLE_SHORT: Record<string, string> = {
  Goalkeeper: "GK",
  "Sweeper Keeper": "SK",
  Fullback: "FB",
  Falseback: "FaB",
  Wingback: "WB",
  "Attacking Wingback": "AWB",
  Defender: "DEF",
  Stopper: "STP",
  "Ball-Playing Defender": "BPD",
  Holding: "HLD",
  "Deep-Lying Playmaker": "DLP",
  "Box-To-Box": "B2B",
  Playmaker: "PLM",
  "Wide Midfielder": "WM",
  Winger: "WNG",
  "Inside Forward": "IF",
  "Shadow Striker": "SS",
  "Advanced Forward": "AF",
  Poacher: "PCH",
  "False 9": "F9",
  "Target Forward": "TF",
  "Pressing Forward": "PF",
};

export function shortRole(role: string): string {
  const known = ROLE_SHORT[role];
  if (known) return known;

  // Translated role names have no entry in the glossary, so fall back to
  // initials — and to the first three letters when a single word makes the
  // initials too short to read ("Carrilero" → "CAR", not "C").
  const initials = role
    .split(/[\s-]+/)
    .map((word) => word[0] ?? "")
    .join("")
    .slice(0, 3);
  return (initials.length >= 2 ? initials : role.slice(0, 3)).toUpperCase();
}

/**
 * Vertical pitch diagram.
 * Tactic coordinates are percentages: x 0-100 left→right, y 0 (opposition goal
 * line) → 100 (own goal line).
 */
export function Pitch({
  positions,
  selectedId,
  onSelect,
}: {
  positions: TacticPosition[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}) {
  const W = 68;
  const H = 105;
  const px = (x: number) => 2 + (x / 100) * (W - 4);
  const py = (y: number) => 3 + (y / 100) * (H - 6);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Formation diagram">
      <rect x={0} y={0} width={W} height={H} rx={3} fill="#0d1a10" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect
          key={i}
          x={0}
          y={(H / 7) * i}
          width={W}
          height={H / 7}
          fill={i % 2 === 0 ? "#10231400" : "#12281808"}
        />
      ))}

      <g stroke="#2f4a36" strokeWidth={0.4} fill="none">
        <rect x={2} y={3} width={W - 4} height={H - 6} rx={1} />
        <line x1={2} y1={H / 2} x2={W - 2} y2={H / 2} />
        <circle cx={W / 2} cy={H / 2} r={9} />
        <rect x={W / 2 - 20} y={3} width={40} height={16} />
        <rect x={W / 2 - 9} y={3} width={18} height={6} />
        <rect x={W / 2 - 20} y={H - 19} width={40} height={16} />
        <rect x={W / 2 - 9} y={H - 9} width={18} height={6} />
      </g>

      {positions.map((position, index) => {
        const cx = px(position.x);
        const cy = py(position.y);
        const selected = selectedId === position.id;
        return (
          <motion.g
            key={position.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.025, type: "spring", stiffness: 400, damping: 26 }}
            onClick={() => onSelect?.(position.id)}
            className={onSelect ? "cursor-pointer" : undefined}
          >
            <circle
              cx={cx}
              cy={cy}
              r={4.6}
              fill={selected ? "var(--color-accent)" : "#0b0f0c"}
              stroke="var(--color-accent)"
              strokeWidth={selected ? 1 : 0.7}
              opacity={selected ? 1 : 0.92}
            />
            <text
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="central"
              className="font-mono text-[3.2px] font-bold"
              fill={selected ? "#0b0f0c" : "var(--color-accent)"}
            >
              {position.label}
            </text>
            <text
              x={cx}
              y={cy + 7.4}
              textAnchor="middle"
              className="font-mono text-[2.9px] font-semibold"
              fill={selected ? "var(--color-accent)" : "#8b9a8f"}
            >
              {shortRole(position.role)}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
