"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, useSyncExternalStore } from "react";
import { useChosenStyle } from "@/components/style-context";
import { WhatsAppIcon, rupiah } from "@/components/wa";
import { WaButton } from "@/components/wa-sim";
import { booking, hairStyles, hours, services, shop } from "@/lib/data";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function wibNow() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
}

const clock = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}.${String(m % 60).padStart(2, "0")}`;

type Day = { date: Date; title: string; short: string; open: number; close: number };

function nextDays(now: Date): Day[] {
  return Array.from({ length: booking.days }, (_, i) => {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    const h = hours[date.getDay()];
    const weekday = date.toLocaleDateString("id-ID", { weekday: "short" });
    return {
      date,
      title: i === 0 ? "Hari ini" : i === 1 ? "Besok" : weekday,
      short: date.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
      open: h.open,
      close: h.close,
    };
  });
}

function slotsFor(day: Day, duration: number, isToday: boolean, now: Date) {
  const earliest = isToday ? now.getHours() * 60 + now.getMinutes() + booking.leadMinutes : 0;
  const out: number[] = [];
  for (let m = day.open; m + duration <= day.close; m += booking.slotMinutes) {
    if (m >= earliest) out.push(m);
  }
  return out;
}

export function Booking() {
  const isClient = useIsClient();
  const { style: styleId, setStyle } = useChosenStyle();
  const style = hairStyles.find((h) => h.id === styleId) ?? null;
  const [picked, setPicked] = useState<string[]>(["potong"]);
  const [pickedDay, setPickedDay] = useState<number | null>(null);
  const [slot, setSlot] = useState<number | null>(null);
  const [name, setName] = useState("");

  const chosen = services.filter((s) => picked.includes(s.id));
  const duration = chosen.reduce((n, s) => n + s.minutes, 0);
  const price = chosen.reduce((n, s) => n + s.price, 0);

  const now = isClient ? wibNow() : null;
  const days = now ? nextDays(now) : [];
  const need = Math.max(duration, booking.slotMinutes);
  const slotsOf = (i: number) => (now && days[i] ? slotsFor(days[i], need, i === 0, now) : []);
  const firstOpen = Math.max(0, days.findIndex((_, i) => slotsOf(i).length > 0));
  const dayIdx = pickedDay ?? firstOpen;
  const day = days[dayIdx];
  const slots = slotsOf(dayIdx);
  const activeSlot = slot !== null && slots.includes(slot) ? slot : null;

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const longDate = day?.date.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" });
  const ready = chosen.length > 0 && activeSlot !== null;
  const message = ready
    ? [
        `Halo ${shop.name}, saya mau booking.`,
        `Layanan: ${chosen.map((s) => s.name).join(", ")}`,
        style && `Gaya rambut: ${style.name}`,
        `Hari: ${longDate}`,
        `Jam: ${clock(activeSlot)} (sekitar ${duration} menit)`,
        `Perkiraan biaya: ${rupiah(price)}`,
        name.trim() && `Nama: ${name.trim()}`,
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  const step = "flex items-baseline gap-3 text-xl font-semibold";
  const num = "display text-4xl text-brass-deep";

  return (
    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.55fr_1fr]">
      <div className="flex flex-col gap-12">
        <fieldset className="min-w-0">
          <legend className={step}>
            <span className={num}>1</span> Pilih layanan
          </legend>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {services.map((s) => (
              <label
                key={s.id}
                className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-line bg-white px-4 py-3.5 transition-colors hover:border-ink/40 has-checked:border-oxblood has-checked:bg-oxblood has-checked:text-white has-focus-visible:outline-3 has-focus-visible:outline-brass [&:has(:checked)_.meta]:text-white/70"
              >
                <input type="checkbox" checked={picked.includes(s.id)} onChange={() => toggle(s.id)} className="mt-1 size-4 shrink-0 accent-brass" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3 font-semibold">
                    {s.name}
                    <span className="tabular-nums">{rupiah(s.price)}</span>
                  </span>
                  <span className="meta block text-sm text-muted">{s.minutes} menit</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="min-w-0">
          <legend className={step}>
            <span className={num}>2</span> Pilih hari
          </legend>
          <div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-7 sm:px-0">
            {isClient
              ? days.map((d, i) => (
                  <label
                    key={d.short}
                    className="relative w-[5.5rem] shrink-0 cursor-pointer rounded-xl sm:w-auto border-2 border-line bg-white py-2.5 text-center transition-colors hover:border-ink/40 has-checked:border-ink has-checked:bg-ink has-checked:text-white has-focus-visible:outline-3 has-focus-visible:outline-brass"
                  >
                    <input type="radio" name="day" checked={dayIdx === i} onChange={() => setPickedDay(i)} className="sr-only" />
                    <span className="block text-sm">{d.title}</span>
                    <span className="display block text-2xl">{d.short}</span>
                  </label>
                ))
              : Array.from({ length: booking.days }, (_, i) => <span key={i} className="h-[4.6rem] w-[5.5rem] shrink-0 rounded-xl bg-line/60 sm:w-auto" />)}
          </div>
        </fieldset>

        <fieldset className="min-w-0">
          <legend className={step}>
            <span className={num}>3</span> Pilih jam
          </legend>
          {day && (
            <p className="mt-2 text-sm text-muted">
              {day.title === "Hari ini" || day.title === "Besok" ? `${day.title}, ` : ""}
              {hours[day.date.getDay()].day} buka {clock(day.open)} sampai {clock(day.close)}.
            </p>
          )}
          <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {slots.map((m) => (
              <label
                key={m}
                className="relative cursor-pointer rounded-lg border-2 border-line bg-white py-2 text-center font-semibold tabular-nums transition-colors hover:border-ink/40 has-checked:border-brass has-checked:bg-brass has-checked:text-ink has-focus-visible:outline-3 has-focus-visible:outline-oxblood"
              >
                <input type="radio" name="slot" checked={activeSlot === m} onChange={() => setSlot(m)} className="sr-only" />
                {clock(m)}
              </label>
            ))}
          </div>
          {isClient && slots.length === 0 && (
            <p className="mt-4 rounded-xl border-2 border-dashed border-line px-5 py-6 text-center text-muted">
              {chosen.length === 0
                ? "Pilih minimal satu layanan untuk melihat jam yang tersedia."
                : "Jam hari ini sudah lewat. Pilih hari lain di atas."}
            </p>
          )}
        </fieldset>
      </div>

      <aside aria-label="Ringkasan booking" className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_50px_-30px_rgb(41_9_17/0.5)] ring-1 ring-line">
          <div className="h-2 bg-[repeating-linear-gradient(-45deg,var(--color-pole-red)_0_10px,#fff_10px_16px,var(--color-pole-blue)_16px_26px,#fff_26px_32px)]" />
          <div className="p-6 sm:p-7">
            <p className="font-semibold text-muted">Booking kamu</p>
            <div className="mt-2 min-h-[4.5rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={activeSlot ?? "kosong"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="display text-6xl"
                >
                  {activeSlot !== null ? clock(activeSlot) : "--.--"}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="font-semibold">{activeSlot !== null ? longDate : "Pilih hari dan jam"}</p>

            {style && (
              <p className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-tile px-3 py-2 text-sm">
                <span>
                  Gaya: <strong>{style.name}</strong>
                </span>
                <button type="button" onClick={() => setStyle(null)} className="font-semibold text-muted underline underline-offset-2 hover:text-ink">
                  Hapus
                </button>
              </p>
            )}
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {chosen.length === 0 && <li className="py-3 text-muted">Belum ada layanan</li>}
              {chosen.map((s) => (
                <li key={s.id} className="flex justify-between gap-4 py-2.5">
                  <span>{s.name}</span>
                  <span className="tabular-nums">{rupiah(s.price)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-muted">{duration > 0 ? `Sekitar ${duration} menit` : ""}</span>
              <span className="display text-3xl tabular-nums">{rupiah(price)}</span>
            </div>

            <label htmlFor="booking-name" className="mt-6 block text-sm font-semibold">
              Nama
            </label>
            <input
              id="booking-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="mt-1.5 w-full rounded-lg border-2 border-line px-3.5 py-2.5 outline-none focus:border-oxblood"
            />

            {ready ? (
              <WaButton
                message={message}
                reply={[
                  `Siap, kursimu sudah kami tahan untuk ${longDate} pukul ${clock(activeSlot)}.`,
                  "Kode booking {kode}. Tunjukkan kodenya ke kasir waktu datang ya.",
                  "Kursi ditahan 10 menit dari jam booking.",
                ].join("\n")}
                className="mt-5 flex items-center justify-center gap-2.5 rounded-full bg-wa px-6 py-4 font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Booking lewat WhatsApp
              </WaButton>
            ) : (
              <span aria-disabled="true" className="mt-5 flex cursor-not-allowed items-center justify-center gap-2.5 rounded-full bg-line px-6 py-4 font-semibold text-muted">
                <WhatsAppIcon className="size-5" />
                {chosen.length === 0 ? "Pilih layanan dulu" : "Pilih jam dulu"}
              </span>
            )}
            <p className="mt-3 text-center text-sm text-muted">Kami balas untuk konfirmasi. Kalau jamnya sudah terisi, kami tawarkan jam terdekat.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

export function HoursList() {
  const isClient = useIsClient();
  const today = isClient ? wibNow().getDay() : -1;
  const order = [1, 2, 3, 4, 5, 6, 0];
  return (
    <ul className="divide-y divide-white/15">
      {order.map((i) => (
        <li key={i} className={`flex justify-between gap-4 py-2.5 ${i === today ? "font-semibold text-brass" : ""}`}>
          <span>
            {hours[i].day}
            {i === today && <span className="ml-2 text-sm font-normal">(hari ini)</span>}
          </span>
          <span className="tabular-nums">
            {clock(hours[i].open)} sampai {clock(hours[i].close)}
          </span>
        </li>
      ))}
    </ul>
  );
}
