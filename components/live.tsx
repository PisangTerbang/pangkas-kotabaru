"use client";

import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useTransform, useVelocity } from "motion/react";
import { useEffect, useState } from "react";
import { services } from "@/lib/data";

const PERIOD = 91.37;

export function PoleStripes() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const offset = useMotionValue(0);
  const y = useTransform(offset, (v) => -v);
  const reduce = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const speed = PERIOD / 2.8 + Math.min(Math.abs(velocity.get()), 4000) * 0.12;
    offset.set((offset.get() + (speed * delta) / 1000) % PERIOD);
  });

  return <motion.div className="pole-stripes" style={{ y }} />;
}

function useTick() {
  const [now, setNow] = useState(0);
  useEffect(() => {
    const tick = () => setNow(new Date().getTime());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

const barbers = ["Kursi 1", "Kursi 2", "Kursi 3"];
const cycle = [38, 44, 31];

function chairState(i: number, now: number) {
  const totalSec = Math.floor(now / 1000) + i * 777;
  const len = cycle[i] * 60;
  const pos = totalSec % len;
  const busyFor = len - 8 * 60;
  if (pos >= busyFor) return { busy: false as const };
  const remaining = busyFor - pos;
  const service = services[(Math.floor(totalSec / len) + i) % 4];
  return { busy: true as const, remaining, service: service.name, progress: pos / busyFor };
}

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function LiveChairs() {
  const now = useTick();
  const isClient = now > 0;
  const chairs = barbers.map((_, i) => chairState(i, now));
  const free = chairs.filter((c) => !c.busy).length;
  const soonest = Math.min(...chairs.map((c) => (c.busy ? c.remaining : 0)));

  return (
    <div className="grid items-center gap-6 lg:grid-cols-[1fr_2.2fr]">
      <div>
        <p className="flex items-center gap-2 text-sm font-semibold text-white/60">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-[#4ade80]" />
          </span>
          Kursi sekarang (simulasi)
        </p>
        <p className="display mt-2 text-4xl text-white" aria-live="polite">
          {!isClient ? "Memuat" : free > 0 ? `${free} kursi kosong` : `Kosong dalam ${Math.ceil(soonest / 60)} menit`}
        </p>
        <p className="mt-1 text-white/60">{free > 0 ? "Datang sekarang, langsung dilayani." : "Booking jam supaya tidak perlu menunggu."}</p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-3">
        {barbers.map((name, i) => {
          const c = chairs[i];
          return (
            <li key={name} className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
              <p className="flex items-center justify-between text-sm text-white/60">
                {name}
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${!isClient ? "" : c.busy ? "bg-pole-red/80 text-white" : "bg-[#4ade80] text-ink"}`}>
                  {!isClient ? "" : c.busy ? "Terisi" : "Kosong"}
                </span>
              </p>
              <AnimatePresence mode="wait" initial={false}>
                {isClient && c.busy ? (
                  <motion.div key={`b-${c.service}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="mt-2 font-semibold text-white">{c.service}</p>
                    <p className="display mt-1 text-3xl tabular-nums text-brass">{mmss(c.remaining)}</p>
                    <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white/10">
                      <span className="block h-full rounded-full bg-brass transition-[width] duration-1000" style={{ width: `${Math.round(c.progress * 100)}%` }} />
                    </span>
                  </motion.div>
                ) : (
                  <motion.div key="free" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="mt-2 font-semibold text-white">{isClient ? "Siap untuk kamu" : " "}</p>
                    <p className="display mt-1 text-3xl text-white/30">--:--</p>
                    <span className="mt-2 block h-1.5 rounded-full bg-white/10" />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
