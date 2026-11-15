"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { StyleId } from "@/lib/data";

type StyleState = { style: StyleId | null; setStyle: (s: StyleId | null) => void };

const Ctx = createContext<StyleState | null>(null);

export function StyleProvider({ children }: { children: React.ReactNode }) {
  const [style, setStyle] = useState<StyleId | null>(null);
  const value = useMemo(() => ({ style, setStyle }), [style]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useChosenStyle() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useChosenStyle harus dipakai di dalam <StyleProvider>");
  return ctx;
}
