"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useChosenStyle } from "@/components/style-context";
import { faceShapes, hairStyles, type FaceShape, type StyleId } from "@/lib/data";

const faces: Record<FaceShape, string> = {
  oval: "M120 62C168 62 186 104 184 146C182 196 156 228 120 228C84 228 58 196 56 146C54 104 72 62 120 62Z",
  bulat: "M120 66C174 66 192 104 192 148C192 198 160 222 120 222C80 222 48 198 48 148C48 104 66 66 120 66Z",
  kotak: "M120 62C172 62 188 90 188 138C188 196 176 224 120 226C64 224 52 196 52 138C52 90 68 62 120 62Z",
  panjang: "M120 52C162 52 178 96 178 146C178 206 152 240 120 240C88 240 62 206 62 146C62 96 78 52 120 52Z",
};

const hairline = "M46 142C48 116 80 94 120 94C160 94 192 116 194 142";
const ink = "#1d1615";
const shine = { stroke: "#4a3a34", strokeWidth: 2.5, fill: "none", strokeLinecap: "round" as const };

const hair: Record<StyleId, React.ReactNode> = {
  buzz: <path d={`${hairline}C198 92 166 50 120 50C74 50 42 92 46 142Z`} fill="#2a201d" opacity="0.8" />,
  crew: (
    <>
      <path d={`${hairline}C200 84 170 36 120 36C70 36 40 84 46 142Z`} fill={ink} />
      <path d="M84 52c10-6 24-8 38-6M128 46c12 0 24 4 32 10" {...shine} />
    </>
  ),
  sidepart: (
    <>
      <path d={`${hairline}C204 80 174 26 122 26C70 26 38 78 46 142Z`} fill={ink} />
      <path d="M88 32C94 52 98 74 100 96" stroke="#6b554c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M108 36c22 0 48 8 64 26M110 50c22 0 44 8 58 24" {...shine} />
    </>
  ),
  twoblock: (
    <>
      <path d={`${hairline}C198 92 166 50 120 50C74 50 42 92 46 142Z`} fill="#3a2f2b" opacity="0.75" />
      <path d="M58 108C50 58 86 26 122 26C162 26 196 58 184 108C168 118 148 122 128 114C104 124 80 120 58 108Z" fill={ink} />
      <path d="M82 108c6-16 4-34 16-50M118 116c2-18 6-38 20-54M152 112c-2-16 2-34 16-46" {...shine} />
    </>
  ),
  comma: (
    <>
      <path d={`${hairline}C198 92 166 50 120 50C74 50 42 92 46 142Z`} fill="#3a2f2b" opacity="0.75" />
      <path d="M58 106C50 56 86 24 124 24C164 24 196 56 184 108C168 98 152 92 138 94C120 96 110 104 102 116C88 112 72 110 58 106Z" fill={ink} />
      <path d="M108 110C113 121 129 121 132 110C134 103 126 98 120 104" fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  pompadour: (
    <>
      <path d={`${hairline}C206 84 190 12 122 10C62 8 36 70 46 142Z`} fill={ink} />
      <path d="M72 80c10-30 36-48 66-46M90 84c10-22 28-34 50-32M150 26c18 6 30 20 34 40" {...shine} />
    </>
  ),
};

function Head({ face, style }: { face: FaceShape; style: StyleId }) {
  return (
    <svg viewBox="0 0 240 300" className="h-auto w-full" role="img" aria-label={`Ilustrasi kepala wajah ${face} dengan gaya ${style}`}>
      <path d="M10 300C14 250 58 226 120 226C182 226 226 250 230 300Z" fill="#3d0f19" />
      <path d="M40 300 70 236M90 300l14-74M150 300l-14-74M200 300l-30-64" stroke="#d9b45a" strokeWidth="1.5" opacity="0.35" />
      <rect x="98" y="198" width="44" height="40" rx="10" fill="#c98f66" />
      <ellipse cx="54" cy="150" rx="10" ry="18" fill="#c98f66" />
      <ellipse cx="186" cy="150" rx="10" ry="18" fill="#c98f66" />
      <motion.path initial={false} animate={{ d: faces[face] }} transition={{ type: "spring", stiffness: 160, damping: 20 }} fill="#d9a47a" />
      <path d="M96 128h18M126 128h18" stroke="#3a2a24" strokeWidth="4" strokeLinecap="round" />
      <path d="M112 176c5 3 11 3 16 0" stroke="#a5694a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.g
          key={style}
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          {hair[style]}
        </motion.g>
      </AnimatePresence>
    </svg>
  );
}

export function HairstylePicker() {
  const { style: chosen, setStyle: choose } = useChosenStyle();
  const [face, setFace] = useState<FaceShape>("oval");
  const [preview, setPreview] = useState<StyleId>("twoblock");
  const style = hairStyles.find((h) => h.id === preview)!;
  const fits = style.suits.includes(face);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative mx-auto w-full max-w-[22rem]">
        <div aria-hidden="true" className="absolute inset-x-6 bottom-8 top-6 rounded-full bg-brass/25 blur-2xl" />
        <div className="relative overflow-hidden rounded-[40%_40%_24px_24px] border-[10px] border-[#6b4426] bg-[radial-gradient(circle_at_50%_35%,#fbfaf7,#e7e3dc)]">
          <Head face={face} style={preview} />
        </div>
        <p className="mt-3 text-center text-sm text-muted">Ilustrasi. Hasil asli menyesuaikan jenis rambutmu.</p>
      </div>

      <div>
        <fieldset>
          <legend className="font-semibold">Bentuk wajahmu</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {faceShapes.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={face === f.id}
                onClick={() => setFace(f.id)}
                className={`rounded-full border-2 px-4 py-1.5 font-semibold transition-colors ${
                  face === f.id ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink/40"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-7">
          <legend className="font-semibold">Gaya rambut</legend>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {hairStyles.map((h) => {
              const on = preview === h.id;
              const good = h.suits.includes(face);
              return (
                <button
                  key={h.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setPreview(h.id)}
                  className={`relative rounded-xl border-2 px-3.5 py-3 text-left font-semibold transition-colors ${
                    on ? "border-oxblood bg-oxblood text-white" : "border-line bg-white hover:border-ink/40"
                  }`}
                >
                  <span className="display block text-2xl leading-none">{h.name}</span>
                  <span className={`mt-1 block text-xs font-medium ${on ? "text-brass" : good ? "text-[#2f7a4f]" : "text-muted"}`}>
                    {good ? "Cocok untuk wajahmu" : "Kurang cocok"}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <AnimatePresence mode="wait">
          <motion.div
            key={style.id + face}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-7 border-t border-line pt-5"
            aria-live="polite"
          >
            <p className="display text-4xl">{style.name}</p>
            <p className="mt-2 max-w-[48ch] text-muted">{style.desc}</p>
            <p className="mt-2 text-sm font-semibold">
              {fits
                ? `Cocok untuk wajah ${face}.`
                : `Untuk wajah ${face}, kapster kami biasanya menyarankan ${hairStyles
                    .filter((h) => h.suits.includes(face))
                    .slice(0, 2)
                    .map((h) => h.name)
                    .join(" atau ")}.`}{" "}
              {style.upkeep}.
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href="#booking"
            onClick={() => choose(style.id)}
            className="rounded-full bg-brass px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-oxblood hover:text-white"
          >
            Booking dengan gaya ini
          </a>
          {chosen && (
            <p className="text-sm text-muted">
              Dipilih: <strong className="text-ink">{hairStyles.find((h) => h.id === chosen)?.name}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
