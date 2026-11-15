import type { Metadata, Viewport } from "next";
import "@fontsource-variable/big-shoulders-display";
import "@fontsource-variable/instrument-sans";
import "./globals.css";

const title = "Pangkas Kotabaru | Barbershop dengan Booking Jam di Jogja";
const description =
  "Barbershop di Kotabaru, Yogyakarta. Potong rambut mulai Rp40.000, cukur handuk hangat, dan semir. Pilih jamnya, booking lewat WhatsApp, datang tanpa antre.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["barbershop jogja", "barbershop kotabaru", "potong rambut yogyakarta", "booking barbershop"],
  openGraph: { title, description, locale: "id_ID", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#3d0f19",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
