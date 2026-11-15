import { AreaMap } from "@/components/area-map";
import { Booking, HoursList } from "@/components/booking";
import { DemoNote } from "@/components/demo-note";
import { HairstylePicker } from "@/components/hairstyles";
import { LiveChairs, PoleStripes } from "@/components/live";
import { StyleProvider } from "@/components/style-context";
import { WaButton, WaProvider } from "@/components/wa-sim";
import { faq, services, shop, whatsapp } from "@/lib/data";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const h2 = "display text-[clamp(3rem,7vw,5rem)]";

function Pole({ className = "" }: { className?: string }) {
  const brass = "bg-[linear-gradient(90deg,#7a5c1c,#d9b45a_35%,#f6e1a1_50%,#c49a3e_70%,#6d5118)]";
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className={`absolute inset-x-0 top-0 h-14 rounded-t-full ${brass}`} />
      <div className={`absolute inset-x-1 top-12 h-3 rounded-sm ${brass}`} />
      <div className="absolute inset-x-3 bottom-14 top-[3.6rem] overflow-hidden rounded-md bg-white ring-1 ring-black/25">
        <PoleStripes />
        <div className="pole-glass absolute inset-0" />
      </div>
      <div className={`absolute inset-x-1 bottom-12 h-3 rounded-sm ${brass}`} />
      <div className={`absolute inset-x-0 bottom-0 h-12 rounded-b-2xl ${brass}`} />
    </div>
  );
}

function price(n: number) {
  return n.toLocaleString("id-ID");
}

export default function Home() {
  return (
    <WaProvider
      name={shop.name}
      number={whatsapp.number}
      display={whatsapp.display}
      demo={whatsapp.demo}
      codePrefix="PK"
      avatarClassName="bg-oxblood"
    >
    <StyleProvider>
      <a
        href="#booking"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-white px-5 py-3 font-semibold shadow-lg focus:translate-y-0"
      >
        Langsung ke booking
      </a>

      <header className="sticky top-0 z-40 bg-oxblood/95 text-white backdrop-blur">
        <div className={`${wrap} flex h-16 items-center justify-between gap-4`}>
          <a href="#" className="flex items-center gap-3">
            <svg viewBox="0 0 16 40" className="h-9 w-4" aria-hidden="true">
              <rect x="1" y="0" width="14" height="5" rx="2.5" fill="#d9b45a" />
              <rect x="3" y="5" width="10" height="30" fill="#fff" />
              <path d="M3 9 13 5v5L3 14Zm0 10 10-4v5L3 24Zm0 10 10-4v5L3 34Z" fill="#c4262e" />
              <rect x="1" y="35" width="14" height="5" rx="2.5" fill="#d9b45a" />
            </svg>
            <span className="display text-2xl tracking-wide">{shop.name}</span>
          </a>
          <nav aria-label="Navigasi" className="hidden gap-8 font-medium text-white/80 md:flex">
            <a href="#harga" className="hover:text-white">Harga</a>
            <a href="#gaya" className="hover:text-white">Gaya rambut</a>
            <a href="#booking" className="hover:text-white">Booking</a>
            <a href="#lokasi" className="hover:text-white">Lokasi</a>
          </nav>
          <a href="#booking" className="rounded-full bg-brass px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-white">
            Booking jam
          </a>
        </div>
      </header>

      <main id="isi">
        <section className="relative overflow-hidden bg-oxblood text-white">
          <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-[28px] border border-brass/30 sm:inset-5" />
          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-8 pb-20 pt-14 sm:pb-24 md:grid-cols-[1fr_auto] lg:pt-20">
            <div>
              <h1 className="display gilded text-[clamp(4.2rem,12vw,10rem)]">{shop.tagline}</h1>
              <p className="mt-8 max-w-[44ch] text-lg text-white/75">{shop.intro}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#booking" className="rounded-full bg-brass px-7 py-4 font-semibold text-ink transition-colors hover:bg-white">
                  Pilih jam potong
                </a>
                <a href="#harga" className="rounded-full px-6 py-4 font-semibold ring-1 ring-inset ring-white/30 transition-colors hover:bg-white hover:text-oxblood">
                  Lihat harga
                </a>
              </div>
              <p className="mt-10 text-white/60">Buka setiap hari 10.00 sampai 21.00. Jumat mulai 13.00, Sabtu sampai 22.00.</p>
            </div>
            <Pole className="mx-auto hidden h-[30rem] w-24 md:block lg:h-[34rem] lg:w-28" />
          </div>
        </section>

        <section aria-label="Status kursi" className="border-t border-brass/20 bg-oxblood-deep py-10 sm:py-12">
          <div className={wrap}>
            <LiveChairs />
          </div>
        </section>

        <section id="harga" className="tiles py-20 sm:py-28">
          <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]`}>
            <div>
              <h2 className={h2}>Harga</h2>
              <p className="mt-5 max-w-[36ch] text-muted">
                Semua potong rambut sudah termasuk konsultasi model, cuci singkat dengan semprotan, dan styling dengan pomade pilihanmu.
              </p>
              <p className="mt-4 max-w-[36ch] text-muted">Layanan bisa digabung waktu booking. Durasinya kami jumlahkan otomatis.</p>
            </div>

            <figure className="rounded-lg border-[14px] border-[#6b4426] shadow-[0_30px_50px_-28px_rgb(0_0_0/0.55),inset_0_0_0_1px_rgb(0_0_0/0.3)]">
              <div className="felt px-5 py-7 text-white sm:px-9 sm:py-9">
                <ul className="display flex flex-col gap-3.5 text-[clamp(1.25rem,2.6vw,1.75rem)] font-bold uppercase leading-none tracking-[0.06em]">
                  {services.map((s) => (
                    <li key={s.id} className="flex items-baseline justify-between gap-4">
                      <span>{s.name}</span>
                      <span className="tabular-nums">{price(s.price)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <figcaption className="sr-only">Daftar harga layanan {shop.name} dalam rupiah</figcaption>
            </figure>
          </div>
        </section>

        <section id="gaya" className="border-t border-line bg-white py-20 sm:py-28">
          <div className={wrap}>
            <h2 className={h2}>Pilih gaya rambut</h2>
            <p className="mb-12 mt-5 max-w-[52ch] text-muted">
              Coba beberapa gaya dan lihat mana yang cocok dengan bentuk wajahmu. Gaya yang kamu pilih ikut tercatat di booking.
            </p>
            <HairstylePicker />
          </div>
        </section>

        <section id="booking" className="border-t border-line bg-tile py-20 sm:py-28">
          <div className={wrap}>
            <h2 className={h2}>Booking jam</h2>
            <p className="mb-14 mt-5 max-w-[52ch] text-muted">
              Tiga langkah, lalu kirim lewat WhatsApp. Kursimu ditahan 10 menit dari jam yang kamu pilih.
            </p>
            <Booking />
          </div>
        </section>

        <section id="lokasi" className="bg-oxblood-deep py-20 text-white sm:py-28">
          <div className={wrap}>
            <h2 className={`${h2} gilded`}>Lokasi</h2>
            <p className="mb-10 mt-5 max-w-[50ch] text-white/70">
              {shop.address}. Pilih patokan di sekitarmu untuk melihat rutenya.
            </p>
            <div className="rounded-[24px] border border-brass/30 p-3 sm:p-5">
              <AreaMap />
            </div>
            <div className="mt-14 grid gap-10 md:grid-cols-[1fr_1fr]">
              <div>
                <h3 className="display gilded text-4xl">Jam buka</h3>
                <div className="mt-5">
                  <HoursList />
                </div>
              </div>
              <div className="md:pt-14">
                <p className="text-white/70">Parkir motor muat sekitar 8 motor di depan toko. Untuk mobil, parkir di sisi taman kota, dua menit jalan kaki.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className={`${wrap} grid gap-10 lg:grid-cols-[0.8fr_1.2fr]`}>
            <div>
              <h2 className={h2}>Sebelum datang</h2>
              <WaButton
                message={`Halo ${shop.name}, hari ini antre tidak?`}
                reply={"Halo, sekarang masih ada kursi kosong.\nKalau mau pasti tidak menunggu, booking jamnya langsung di website kami ya."}
                className="mt-6 inline-flex items-center gap-2 font-semibold underline decoration-2 underline-offset-4 [&>svg]:text-wa"
              >
                Tanya lewat WhatsApp
              </WaButton>
            </div>
            <dl className="divide-y divide-line border-y border-line">
              {faq.map((item) => (
                <div key={item.q} className="py-6">
                  <dt className="text-lg font-semibold">{item.q}</dt>
                  <dd className="mt-1.5 max-w-[60ch] text-muted">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="bg-oxblood text-white/65">
        <div className={`${wrap} flex flex-wrap items-center justify-between gap-4 py-8 text-sm`}>
          <p>
            <span className="display mr-2 text-lg text-white">{shop.name}</span>
            {shop.address}. WhatsApp {whatsapp.display} (nomor contoh)
          </p>
          <DemoNote />
        </div>
      </footer>
    </StyleProvider>
    </WaProvider>
  );
}
