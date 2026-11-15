"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";

export type PlaceKind = "kampus" | "masjid" | "pasar" | "halte" | "taman" | "kos" | "gereja" | "stadion" | "toko" | "stasiun";

export type MapPlace = {
  id: string;
  name: string;
  kind: PlaceKind;
  x: number;
  y: number;
  km: number;
  minutes: number;
  note?: string;
};

export type MapTheme = {
  land: string;
  block: string;
  road: string;
  roadEdge: string;
  water: string;
  park: string;
  route: string;
  pin: string;
  pinInk: string;
  place: string;
  label: string;
};

function Glyph({ kind }: { kind: PlaceKind }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "kampus":
      return <path {...p} d="M-7 -1 0 -5 7 -1 0 3Z M-4 1v3c2 2 6 2 8 0V1" />;
    case "masjid":
      return <path {...p} d="M-6 5V0a6 6 0 0 1 12 0v5Z M0 -6v-1" />;
    case "pasar":
      return <path {...p} d="M-6 -2h12l-2 7h-8Z M-3 -2l2-4M3 -2l-2-4" />;
    case "halte":
      return <path {...p} d="M-5 -6h10v8h-10Z M-5 -1h10 M-3 5v-3M3 5v-3" />;
    case "taman":
      return <path {...p} d="M0 6V0 M0 0c-6 0-6-8 0-8s6 8 0 8" />;
    case "kos":
      return <path {...p} d="M-6 0 0 -6 6 0 M-4 -1v6h8v-6" />;
    case "gereja":
      return <path {...p} d="M0 -7v6 M-3 -4h6 M-5 6V1l5-3 5 3v5Z" />;
    case "stadion":
      return <ellipse {...p} rx="7" ry="4.5" />;
    case "toko":
      return <path {...p} d="M-5 -2h10l-1 8h-8Z M-2.5 -2a2.5 2.5 0 0 1 5 0" />;
    case "stasiun":
      return <path {...p} d="M-5 -6h10v9h-10Z M-5 -1h10 M-4 6l2-3M4 6l-2-3" />;
  }
}

export function IllustratedMap({
  home,
  places,
  roads,
  water = [],
  parks = [],
  theme,
  travel,
  ring,
  caption,
  className = "",
  listClassName = "",
  buttonClassName = "",
  activeButtonClassName = "",
}: {
  home: { name: string; x: number; y: number };
  places: MapPlace[];
  roads: { d: string; w?: number; name?: string; labelAt?: [number, number, number] }[];
  water?: { d: string; w?: number; name?: string; labelAt?: [number, number, number] }[];
  parks?: string[];
  theme: MapTheme;
  travel: string;
  ring?: { r: number; label: string };
  caption: string;
  className?: string;
  listClassName?: string;
  buttonClassName?: string;
  activeButtonClassName?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const uid = useId().replace(/:/g, "");
  const place = places.find((p) => p.id === active) ?? null;

  const route = place
    ? (() => {
        const mx = (home.x + place.x) / 2;
        const my = (home.y + place.y) / 2;
        const dx = place.x - home.x;
        const dy = place.y - home.y;
        return `M${home.x} ${home.y} Q${mx - dy * 0.22} ${my + dx * 0.22} ${place.x} ${place.y}`;
      })()
    : null;

  return (
    <div className={`grid gap-5 lg:grid-cols-[1.6fr_1fr] ${className}`}>
      <figure className="relative overflow-hidden rounded-[inherit]">
        <svg viewBox="0 0 640 420" className="block h-auto w-full" role="img" aria-label={caption}>
          <defs>
            <pattern id={`blocks-${uid}`} width="34" height="28" patternUnits="userSpaceOnUse">
              <rect x="3" y="3" width="13" height="10" rx="2" fill={theme.block} />
              <rect x="19" y="3" width="12" height="9" rx="2" fill={theme.block} />
              <rect x="3" y="15" width="10" height="10" rx="2" fill={theme.block} />
              <rect x="16" y="15" width="15" height="10" rx="2" fill={theme.block} />
            </pattern>
          </defs>
          <rect width="640" height="420" fill={theme.land} />
          <rect width="640" height="420" fill={`url(#blocks-${uid})`} />
          {parks.map((d, i) => (
            <path key={i} d={d} fill={theme.park} />
          ))}
          {water.map((w, i) => (
            <g key={i}>
              <path d={w.d} fill="none" stroke={theme.water} strokeWidth={w.w ?? 12} strokeLinecap="round" strokeLinejoin="round" />
              {w.name && w.labelAt && (
                <text
                  x={w.labelAt[0]}
                  y={w.labelAt[1]}
                  transform={`rotate(${w.labelAt[2]} ${w.labelAt[0]} ${w.labelAt[1]})`}
                  fill={theme.label}
                  fontSize="11"
                  fontStyle="italic"
                  opacity="0.75"
                >
                  {w.name}
                </text>
              )}
            </g>
          ))}
          {roads.map((r, i) => (
            <path key={`e${i}`} d={r.d} fill="none" stroke={theme.roadEdge} strokeWidth={(r.w ?? 10) + 3} strokeLinecap="round" strokeLinejoin="round" />
          ))}
          {roads.map((r, i) => (
            <path key={`r${i}`} d={r.d} fill="none" stroke={theme.road} strokeWidth={r.w ?? 10} strokeLinecap="round" strokeLinejoin="round" />
          ))}
          {roads.map(
            (r, i) =>
              r.name &&
              r.labelAt && (
                <text
                  key={`l${i}`}
                  x={r.labelAt[0]}
                  y={r.labelAt[1]}
                  transform={`rotate(${r.labelAt[2]} ${r.labelAt[0]} ${r.labelAt[1]})`}
                  fill={theme.label}
                  fontSize="11"
                  fontWeight="700"
                  textAnchor="middle"
                  opacity="0.7"
                >
                  {r.name}
                </text>
              ),
          )}

          {ring && (
            <g>
              <circle cx={home.x} cy={home.y} r={ring.r} fill={theme.route} fillOpacity="0.07" stroke={theme.route} strokeWidth="2" strokeDasharray="7 7" />
              <text x={home.x} y={home.y - ring.r + 16} textAnchor="middle" fontSize="11" fontWeight="700" fill={theme.route}>
                {ring.label}
              </text>
            </g>
          )}

          <AnimatePresence>
            {route && (
              <motion.g key={route} initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.path
                  d={route}
                  fill="none"
                  stroke={theme.route}
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.path
                  d={route}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.6"
                  strokeDasharray="2 8"
                  strokeLinecap="round"
                  initial={{ opacity: 0, strokeDashoffset: 0 }}
                  animate={{ opacity: 0.9, strokeDashoffset: -40 }}
                  transition={{ opacity: { delay: 0.8 }, strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: "linear" } }}
                />
              </motion.g>
            )}
          </AnimatePresence>

          {places.map((p) => {
            const on = p.id === active;
            return (
              <g
                key={p.id}
                transform={`translate(${p.x} ${p.y})`}
                onClick={() => setActive(on ? null : p.id)}
                className="cursor-pointer"
                style={{ color: on ? "#fff" : theme.place }}
              >
                <motion.circle r="14" fill={on ? theme.route : "#fff"} stroke={theme.route} strokeWidth="2" animate={{ scale: on ? 1.2 : 1 }} />
                <Glyph kind={p.kind} />
                <text y="27" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={theme.label} stroke={theme.land} strokeWidth="3" paintOrder="stroke">
                  {p.name}
                </text>
              </g>
            );
          })}

          <g transform={`translate(${home.x} ${home.y})`}>
            <motion.circle r="16" fill={theme.pin} initial={{ scale: 1, opacity: 0.45 }} animate={{ scale: 2.4, opacity: 0 }} transition={{ duration: 2, repeat: Infinity }} />
            <path d="M0 6c-9-10-13-15-13-21a13 13 0 0 1 26 0c0 6-4 11-13 21Z" fill={theme.pin} stroke="#fff" strokeWidth="2.5" />
            <circle cy="-15" r="5" fill={theme.pinInk} />
            <text y="24" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={theme.label} stroke={theme.land} strokeWidth="3.5" paintOrder="stroke">
              {home.name}
            </text>
          </g>
        </svg>
        <figcaption className="pointer-events-none absolute bottom-2 right-3 rounded px-1.5 text-[0.7rem] font-semibold opacity-70" style={{ color: theme.label, background: theme.land }}>
          Peta ilustrasi, tidak berskala
        </figcaption>
      </figure>

      <div className={`flex flex-col ${listClassName}`}>
        <div className="min-h-[7.5rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            {place ? (
              <motion.div key={place.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <p className="text-sm opacity-70">Dari {home.name} ke</p>
                <p className="text-2xl font-extrabold leading-tight">{place.name}</p>
                <p className="mt-1.5 font-semibold">
                  {place.km.toLocaleString("id-ID")} km, sekitar {place.minutes} menit {travel}
                </p>
                {place.note && <p className="mt-1 text-sm opacity-75">{place.note}</p>}
              </motion.div>
            ) : (
              <motion.p key="kosong" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="opacity-75">
                Pilih tempat di peta atau di daftar untuk melihat rute dan jaraknya.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-2">
          {places.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                aria-pressed={p.id === active}
                onClick={() => setActive(p.id === active ? null : p.id)}
                className={`w-full text-left ${buttonClassName} ${p.id === active ? activeButtonClassName : ""}`}
              >
                {p.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
