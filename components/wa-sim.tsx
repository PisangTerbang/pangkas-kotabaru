"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { WhatsAppIcon, waHref } from "@/components/wa";

type Chat = { message: string; reply: string; code: string; time: string };

type WaContext = {
  number: string;
  demo: boolean;
  lastCode: string | null;
  send: (message: string, reply: string) => void;
};

const Ctx = createContext<WaContext | null>(null);

export function useWa() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWa harus dipakai di dalam <WaProvider>");
  return ctx;
}

function makeCode(prefix: string) {
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function clockNow() {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" });
}

export function WaProvider({
  name,
  number,
  display,
  demo,
  codePrefix,
  avatarClassName = "bg-[#25d366]",
  children,
}: {
  name: string;
  number: string;
  display: string;
  demo: boolean;
  codePrefix: string;
  avatarClassName?: string;
  children: React.ReactNode;
}) {
  const [chat, setChat] = useState<Chat | null>(null);
  const [lastCode, setLastCode] = useState<string | null>(null);

  const send = useCallback(
    (message: string, reply: string) => {
      const code = makeCode(codePrefix);
      setLastCode(code);
      setChat({ message, reply: reply.replaceAll("{kode}", code), code, time: clockNow() });
    },
    [codePrefix],
  );

  const value = useMemo(() => ({ number, demo, lastCode, send }), [number, demo, lastCode, send]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <AnimatePresence>
        {chat && (
          <ChatWindow key={chat.code} chat={chat} name={name} display={display} avatarClassName={avatarClassName} onClose={() => setChat(null)} />
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

export function WaButton({
  message,
  reply,
  className,
  children,
  icon = true,
}: {
  message: string;
  reply: string;
  className?: string;
  children: React.ReactNode;
  icon?: boolean;
}) {
  const { number, demo, send } = useWa();
  return (
    <a
      href={waHref(number, message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        if (!demo) return;
        e.preventDefault();
        send(message, reply);
      }}
      className={className}
    >
      {icon && <WhatsAppIcon className="size-5 shrink-0" />}
      {children}
    </a>
  );
}

function Ticks({ read }: { read: boolean }) {
  return (
    <svg viewBox="0 0 18 12" className={`h-3 w-[18px] ${read ? "text-[#53bdeb]" : "text-[#8696a0]"}`} aria-hidden="true">
      <path d="M1 6.5 4.5 10 11 2.5M6.5 9.5 7.5 10 14 2.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatWindow({
  chat,
  name,
  display,
  avatarClassName,
  onClose,
}: {
  chat: Chat;
  name: string;
  display: string;
  avatarClassName: string;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers = [setTimeout(() => setPhase(1), 900), setTimeout(() => setPhase(2), 1500), setTimeout(() => setPhase(3), 3300)];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [phase]);

  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <motion.div className="fixed inset-0 z-[100] grid place-items-end p-3 sm:place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Simulasi chat WhatsApp dengan ${name}`}
        initial={{ y: 40, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 40, scale: 0.96, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative flex h-[min(38rem,88svh)] w-full max-w-[24rem] flex-col overflow-hidden rounded-[28px] bg-[#efeae2] text-[#111b21] shadow-2xl ring-1 ring-black/10"
        style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}
      >
        <div className="flex items-center gap-3 bg-[#008069] px-4 py-3 text-white">
          <span className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white ${avatarClassName}`}>{initials}</span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate font-semibold">{name}</p>
            <p className="text-xs text-white/80">{phase === 2 ? "sedang mengetik…" : `online, ${display}`}</p>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} className="rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-white/15">
            Tutup
          </button>
        </div>

        <p className="bg-[#fff3c4] px-4 py-2 text-center text-xs text-[#54656f]">
          Ini simulasi. Nomor di situs demo adalah nomor contoh, jadi tidak ada pesan yang benar-benar terkirim.
        </p>

        <div
          ref={bodyRef}
          className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 py-4"
          style={{
            backgroundImage: "radial-gradient(rgb(0 0 0 / 0.045) 1px, transparent 1.4px)",
            backgroundSize: "14px 14px",
          }}
        >
          <span className="mx-auto mb-1 rounded-lg bg-white/90 px-3 py-1 text-xs text-[#54656f] shadow-sm">Hari ini</span>

          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3 py-2 text-[0.92rem] leading-snug shadow-sm"
          >
            <p className="whitespace-pre-line">{chat.message}</p>
            <p className="mt-1 flex items-center justify-end gap-1 text-[0.68rem] text-[#667781]">
              {chat.time}
              <Ticks read={phase >= 1} />
            </p>
          </motion.div>

          <AnimatePresence mode="popLayout">
            {phase === 2 && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex w-fit gap-1 rounded-xl rounded-tl-sm bg-white px-4 py-3 shadow-sm"
                aria-label="sedang mengetik"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="size-2 rounded-full bg-[#8696a0]"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </motion.div>
            )}
            {phase === 3 && (
              <motion.div
                key="reply"
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="max-w-[85%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[0.92rem] leading-snug shadow-sm"
                aria-live="polite"
              >
                <p className="whitespace-pre-line">{chat.reply}</p>
                <p className="mt-1 text-right text-[0.68rem] text-[#667781]">{chat.time}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 bg-[#f0f2f5] px-3 py-2.5">
          <span className="flex-1 rounded-full bg-white px-4 py-2.5 text-sm text-[#8696a0]">Ketik pesan</span>
          <span className="grid size-10 place-items-center rounded-full bg-[#008069] text-white" aria-hidden="true">
            <WhatsAppIcon className="size-5" />
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
