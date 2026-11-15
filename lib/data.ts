export const shop = {
  name: "Pangkas Kotabaru",
  address: "Jalan Suroto, Kotabaru, Yogyakarta",
  tagline: "Potong rapi, tanpa antre.",
  intro:
    "Pilih layanan dan jamnya di sini, kursimu sudah siap saat kamu datang. Barbershop kecil dengan tiga kursi di Kotabaru, Jogja.",
};

export const whatsapp = {
  number: "6281200000000",
  display: "0812-0000-0000",
  demo: true,
};

export const map = {
  home: { name: "Pangkas Kotabaru", x: 300, y: 220 },
  roads: [
    { d: "M-10 230 C200 222 420 236 650 226", w: 16, name: "Jalan utama", labelAt: [120, 220, -1] as [number, number, number] },
    { d: "M300 -10 L300 430", w: 12 },
    { d: "M150 -10 C170 100 140 300 180 430", w: 8 },
    { d: "M440 -10 C430 100 460 300 430 430", w: 8 },
    { d: "M-10 110 C200 120 420 96 650 110", w: 8 },
    { d: "M-10 340 C200 330 420 356 650 340", w: 8 },
  ],
  water: [{ d: "M560 -10 C530 100 600 220 560 300 C530 360 560 400 550 430", w: 14, name: "Sungai Code", labelAt: [590, 180, 76] as [number, number, number] }],
  parks: ["M330 260 h90 v60 h-90 Z", "M40 20 h80 v70 h-80 Z"],
  places: [
    { id: "stadion", name: "Stadion", kind: "stadion" as const, x: 380, y: 160, km: 0.5, minutes: 7 },
    { id: "gereja", name: "Gereja tua", kind: "gereja" as const, x: 220, y: 170, km: 0.4, minutes: 5, note: "Patokan paling mudah. Kami ada di seberang jalan, sebelah kiri." },
    { id: "taman", name: "Taman kota", kind: "taman" as const, x: 375, y: 290, km: 0.3, minutes: 4 },
    { id: "kampus", name: "Kampus", kind: "kampus" as const, x: 100, y: 300, km: 1.2, minutes: 15 },
    { id: "stasiun", name: "Stasiun", kind: "stasiun" as const, x: 140, y: 60, km: 1.8, minutes: 22, note: "Dari stasiun lebih cepat naik ojek, sekitar 7 menit." },
    { id: "masjid", name: "Masjid", kind: "masjid" as const, x: 480, y: 300, km: 0.9, minutes: 11 },
  ],
};

export const hours: { day: string; open: number; close: number }[] = [
  { day: "Minggu", open: 10 * 60, close: 21 * 60 },
  { day: "Senin", open: 10 * 60, close: 21 * 60 },
  { day: "Selasa", open: 10 * 60, close: 21 * 60 },
  { day: "Rabu", open: 10 * 60, close: 21 * 60 },
  { day: "Kamis", open: 10 * 60, close: 21 * 60 },
  { day: "Jumat", open: 13 * 60, close: 21 * 60 },
  { day: "Sabtu", open: 9 * 60, close: 22 * 60 },
];

export type Service = { id: string; name: string; minutes: number; price: number; note?: string };

export const services: Service[] = [
  { id: "potong", name: "Potong rambut", minutes: 30, price: 40000, note: "Termasuk konsultasi model dan styling" },
  { id: "potong-keramas", name: "Potong dan keramas", minutes: 40, price: 50000 },
  { id: "anak", name: "Potong anak", minutes: 25, price: 30000, note: "Untuk usia di bawah 10 tahun" },
  { id: "jenggot", name: "Rapikan jenggot dan kumis", minutes: 15, price: 20000 },
  { id: "handuk", name: "Cukur handuk hangat", minutes: 30, price: 35000, note: "Cukur bersih dengan pisau dan handuk hangat" },
  { id: "garis", name: "Desain garis", minutes: 15, price: 15000 },
  { id: "pijat", name: "Pijat kepala dan pundak", minutes: 20, price: 30000 },
  { id: "semir", name: "Semir hitam", minutes: 45, price: 75000 },
];

export type FaceShape = "oval" | "bulat" | "kotak" | "panjang";
export const faceShapes: { id: FaceShape; label: string }[] = [
  { id: "oval", label: "Oval" },
  { id: "bulat", label: "Bulat" },
  { id: "kotak", label: "Kotak" },
  { id: "panjang", label: "Panjang" },
];

export type StyleId = "buzz" | "crew" | "sidepart" | "twoblock" | "comma" | "pompadour";
export const hairStyles: { id: StyleId; name: string; desc: string; suits: FaceShape[]; upkeep: string }[] = [
  { id: "buzz", name: "Buzz cut", desc: "Dicukur rata pendek dengan mesin. Paling praktis, tidak perlu pomade.", suits: ["oval", "kotak"], upkeep: "Rapikan tiap 2 minggu" },
  { id: "crew", name: "Crew cut", desc: "Samping pendek, atas sedikit lebih panjang. Rapi untuk kerja dan sekolah.", suits: ["oval", "kotak", "panjang"], upkeep: "Rapikan tiap 3 minggu" },
  { id: "sidepart", name: "Side part", desc: "Belahan samping yang klasik, disisir rapi dengan pomade.", suits: ["oval", "bulat", "kotak"], upkeep: "Rapikan tiap 4 minggu" },
  { id: "twoblock", name: "Two block", desc: "Samping dan belakang tipis, atas panjang jatuh ke depan.", suits: ["oval", "bulat", "panjang"], upkeep: "Rapikan tiap 4 minggu" },
  { id: "comma", name: "Comma hair", desc: "Poni melengkung seperti tanda koma. Butuh sedikit catok saat styling.", suits: ["oval", "panjang"], upkeep: "Rapikan tiap 4 minggu" },
  { id: "pompadour", name: "Pompadour", desc: "Rambut atas tinggi disisir ke belakang. Paling mencolok.", suits: ["bulat", "oval"], upkeep: "Rapikan tiap 3 minggu" },
];

export const booking = {
  slotMinutes: 30,
  days: 7,
  leadMinutes: 30,
};

export const faq = [
  {
    q: "Harus booking dulu?",
    a: "Tidak wajib. Kalau datang langsung, kami layani saat ada kursi kosong. Booking membuat kursimu ditahan, jadi tidak perlu menunggu.",
  },
  {
    q: "Bagaimana kalau saya terlambat?",
    a: "Kursi ditahan 10 menit dari jam booking. Kabari lewat WhatsApp kalau terlambat, kami geser ke slot kosong berikutnya.",
  },
  {
    q: "Bisa minta model rambut tertentu?",
    a: "Bisa. Pilih gayanya di bagian gaya rambut, atau bawa foto contoh. Kapster kami bantu sesuaikan dengan bentuk wajah dan jenis rambutmu.",
  },
  {
    q: "Bisa bayar pakai QRIS?",
    a: "Bisa. Kami menerima tunai, QRIS, dan transfer bank.",
  },
  {
    q: "Kenapa hari Jumat bukanya siang?",
    a: "Supaya kapster kami bisa salat Jumat. Hari Jumat kami buka pukul 13.00.",
  },
];
