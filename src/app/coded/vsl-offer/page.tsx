'use client';
import { MessageCircle, ArrowLeft, Star } from "lucide-react";

const WHATSAPP_NUMBER = "212719802571";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// TODO: Replace with your real YouTube video IDs
const MAIN_VIDEO_ID = "Cqz-ukhWSW0";
const SHORTS_IDS = [
  "dQw4w9WgXcQ",
  "dQw4w9WgXcQ",
  "dQw4w9WgXcQ",
  "dQw4w9WgXcQ",
  "dQw4w9WgXcQ",
  "dQw4w9WgXcQ",
];

const BRANDS = [
  { name: "Amouddou Family", src: "/images/brands/amouddou-family.webp" },
];

const REVIEWS: string[] = [
  "/images/reviews/1.png",
  "/images/reviews/2.png",
  "/images/reviews/3.png",
  "/images/reviews/4.png",
  "/images/reviews/5.png",
];

function WhatsAppButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 rounded-full bg-[oklch(0.55_0.17_150)] px-8 py-4 text-base font-bold text-white shadow-[0_10px_40px_-10px_oklch(0.7_0.18_150/0.6)] transition-all hover:scale-105 hover:shadow-[0_15px_50px_-10px_oklch(0.7_0.18_150/0.8)] md:text-lg ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      <span>{label}</span>
    </a>
  );
}

function GhostButton({ label, href = "#work" }: { label: string; href?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-base font-bold backdrop-blur transition-all hover:border-white/50 hover:bg-white/10 md:text-lg"
    >
      <span>{label}</span>
      <ArrowLeft className="h-5 w-5" />
    </a>
  );
}

export default function VslOfferPage() {
  return (
    <main
      className="relative overflow-hidden min-h-screen text-white"
      style={{
        background: "oklch(0.15 0.04 20)",
        fontFamily: "'Tajawal', 'Cairo', system-ui, sans-serif",
      }}
      dir="rtl"
    >
      {/* Glow accents */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-[oklch(0.55_0.22_25/0.25)] blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 top-[40%] h-[500px] w-[500px] rounded-full bg-[oklch(0.45_0.2_15/0.25)] blur-[120px]" />

      {/* SECTION 1 — HERO */}
      <section className="relative mx-auto max-w-6xl px-5 pt-20 pb-24 text-center md:pt-28 md:pb-32">
        <span className="mb-6 inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/80 backdrop-blur">
          BoldNet digital
        </span>
        <h1 className="mx-auto max-w-4xl text-4xl font-black leading-[1.25] tracking-tight md:text-6xl lg:text-7xl">
          <span className="block">عييتي ماتخصر فلوسك فالأدس</span>
          <span className="block text-[oklch(0.62_0.22_25)]">
            والمحتوى بلا حتى نتيجة؟
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75 md:text-xl">
          حبس كاع داكشي لي كدير وتفرج فهاد الفيديو
        </p>

        {/* Main video */}
        <div className="relative mx-auto mt-10 max-w-4xl">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[oklch(0.55_0.22_25)] to-[oklch(0.7_0.2_15)] opacity-60 blur-xl" />
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/15 bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${MAIN_VIDEO_ID}`}
              title="فيديو تعريفي"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <WhatsAppButton label="تواصل معنا فالواتساب" />
          <GhostButton label="شوف خدماتنا" href="#work" />
        </div>
      </section>

      {/* SECTION 2 — Shorts */}
      <section id="work" className="relative mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black md:text-5xl">شوف نماذج من خدمتنا</h2>
          <p className="mt-4 text-base text-white/70 md:text-lg">
            فيديوهات قصيرة حققات نتائج رائعة لعملائنا
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {SHORTS_IDS.map((id, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur transition-transform hover:-translate-y-1"
              style={{ background: "linear-gradient(160deg, oklch(0.2 0.05 20 / 0.6), oklch(0.25 0.08 22 / 0.4))" }}
            >
              <div className="aspect-[9/16] w-full">
                <iframe
                  src={`https://youtube.com/shorts/_pelvzsZ76U?si=VtfDCyC05rzekAUt${id}`}
                  title={`نموذج ${i + 1}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — Brands */}
      <section className="relative mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black md:text-5xl">براندات خدمنا معاهم</h2>
          <p className="mt-3 text-base text-white/70 md:text-lg">
            ثقة من شركات وعلامات تجارية رائدة
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {BRANDS.map((brand, i) => (
            <div
              key={i}
              className="flex h-28 items-center justify-center rounded-xl border border-white/10 bg-white/90 p-4 backdrop-blur transition-all hover:bg-white"
            >
              <img
                src={brand.src}
                alt={brand.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — Reviews */}
      <section className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black md:text-5xl">آراء عملائنا</h2>
          <p className="mt-3 text-base text-white/70 md:text-lg">
            نتائج حقيقية، تجارب حقيقية
          </p>
        </div>

        {REVIEWS.length === 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/20 p-6 text-center backdrop-blur"
                style={{ background: "linear-gradient(160deg, oklch(0.2 0.05 20 / 0.6), oklch(0.25 0.08 22 / 0.4))" }}
              >
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-white/50">ضع هنا صورة المراجعة رقم {i}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-white/10 backdrop-blur"
                style={{ background: "linear-gradient(160deg, oklch(0.2 0.05 20 / 0.6), oklch(0.25 0.08 22 / 0.4))" }}
              >
                <img
                  src={src}
                  alt={`مراجعة عميل ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 5 — CTA */}
      <section className="relative mx-auto max-w-5xl px-5 py-24 md:py-32">
        <div
          className="relative overflow-hidden rounded-3xl border border-white/15 p-10 text-center md:p-16"
          style={{ background: "linear-gradient(135deg, oklch(0.3 0.15 22), oklch(0.45 0.22 25))" }}
        >
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[oklch(0.7_0.22_25/0.4)] blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[oklch(0.5_0.2_15/0.4)] blur-3xl" />

          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-3xl font-black leading-tight md:text-5xl">
              بغيتي تسكايلي براند ديالك؟
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/85 md:text-lg">
              تواصل معانا دابا فالواتساب وغادي نشرحو ليك كيفاش
            </p>
            <div className="mt-8 flex justify-center">
              <WhatsAppButton label="تواصل معانا دابا" />
            </div>
            <p className="mt-6 text-sm text-white/60" dir="ltr">
              +212 719-802571
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-white/50">
        © {new Date().getFullYear()} — جميع الحقوق محفوظة
      </footer>
    </main>
  );
}
