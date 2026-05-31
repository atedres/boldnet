'use client';
import { MessageCircle, ArrowLeft, Star, Send, Zap, TrendingUp, Users, CheckCircle } from "lucide-react";
import Script from "next/script";
import { useState } from "react";
import { useRouter } from "next/navigation";

const WHATSAPP_NUMBER = "212719802571";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const MAIN_VIDEO_ID = "Cqz-ukhWSW0";
const SHORTS_IDS = [
  "A0U30aTBjnE",
  "HzEmRMQ7Mto",
  "GNLWQNCHfsY",
  "GfA9djqOP0k",
  "xjsc4b17Lkc",
  "wJXxNTBM8ME",
];

const BRANDS = [
  { name: "Amouddou Family", src: "/images/brands/amouddou-family.webp" },
  { name: "SSA", src: "/images/brands/ssa.jpg" },
  { name: "Legacy", src: "/images/brands/legacy.webp" },
  { name: "Widyan Ljanna", src: "/images/brands/widyan-ljanna.webp" },
];

const REVIEWS: string[] = [
  "/images/reviews/1.png",
  "/images/reviews/2.png",
  "/images/reviews/3.png",
  "/images/reviews/4.png",
  "/images/reviews/5.png",
];

const STATS = [
  { icon: TrendingUp, value: "+300%", label: "زيادة في المشاهدات" },
  { icon: Users, value: "50+", label: "عميل راضي" },
  { icon: Zap, value: "48h", label: "وقت التسليم" },
];

function WhatsAppButton({ label, className = "" }: { label: string; className?: string }) {
  const handleClick = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'Contact');
    }
  };
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 text-base font-bold text-white shadow-[0_8px_32px_-4px_rgba(220,38,38,0.5)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_40px_-4px_rgba(220,38,38,0.7)] md:text-lg ${className}`}
    >
      <MessageCircle className="h-5 w-5 transition-transform group-hover:rotate-12" />
      <span>{label}</span>
    </a>
  );
}

function GhostButton({ label, href = "#work" }: { label: string; href?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-bold backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 md:text-lg"
    >
      <span>{label}</span>
      <ArrowLeft className="h-5 w-5" />
    </a>
  );
}

function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", business: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const MAX_CHARS = 500;

  const SHEET_URL = "https://script.google.com/macros/s/AKfycbx8gxXpHbO_5LkVJQhHzY62s2qVh6fcQTDIGY1tmxG665UD9PATAto1wOwGmadw1xOBuw/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          service: formData.service,
          business: formData.business,
        }),
      });
    } catch (err) {
      console.error("Sheet error:", err);
    }
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
    setLoading(false);
    setSubmitted(true);
    router.push("/coded/vsl-offer-2/thank-you");
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 shadow-[0_0_40px_rgba(220,38,38,0.5)]">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-black">شكراً عليك!</h3>
        <p className="text-white/70">وصلتنا معلوماتك، غادي نتواصلو معك قريباً.</p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 text-sm text-red-400 underline underline-offset-4">
          <MessageCircle className="h-4 w-4" />
          أو تواصل معانا مباشرة فالواتساب
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-right">
      {/* Name + Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-white/80">الاسم الكامل</label>
          <input type="text" required placeholder="اكتب اسمك هنا..."
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xl border border-white/12 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-white/80">رقم الواتساب</label>
          <input type="tel" required placeholder="+212 6XX XXX XXX" dir="ltr"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-xl border border-white/12 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
        </div>
      </div>

      {/* Service */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-white/80">شنو الخدمة لي محتاج؟</label>
        <input type="text" required placeholder="اكتب الخدمة لي محتاج..."
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className="w-full rounded-xl border border-white/12 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
      </div>

      {/* Business description */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-white/80">
          وصف النشاط التجاري ديالك
          <span className="mr-1 font-normal text-white/35 text-xs">(اختياري)</span>
        </label>
        <textarea
          rows={4}
          maxLength={MAX_CHARS}
          placeholder="اشرح لينا شوية عن براندك، خدماتك، والجمهور لي كتستهدف... هاد المعلومات كتساعدنا نقدمو ليك أحسن حل"
          value={formData.business}
          onChange={(e) => setFormData({ ...formData, business: e.target.value })}
          className="w-full resize-y rounded-xl border border-white/12 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20 leading-relaxed"
          style={{ background: "rgba(255,255,255,0.06)", minHeight: "100px" }}
        />
        <p className={`text-xs text-left ${formData.business.length > 450 ? "text-red-400" : "text-white/30"}`}>
          {formData.business.length} / {MAX_CHARS}
        </p>
      </div>

      {/* Submit */}
      <button type="submit" disabled={loading}
        className="group flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 py-4 text-base font-black text-white shadow-[0_8px_32px_-4px_rgba(220,38,38,0.5)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_-4px_rgba(220,38,38,0.7)] disabled:opacity-70"
      >
        {loading ? (
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <><Send className="h-5 w-5 transition-transform group-hover:-translate-x-1" /><span>ابعث الطلب دابا</span></>
        )}
      </button>

    </form>
  );
}

export default function VslOfferPage() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '2047490192829442');
        fbq('track', 'PageView');
      `}</Script>
      <noscript>
        <img height="1" width="1" style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=2047490192829442&ev=PageView&noscript=1" />
      </noscript>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseGlow { 0%,100%{opacity:.4} 50%{opacity:.7} }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .fade-up{animation:fadeUp .7s ease both}
        .fade-up-d1{animation-delay:.1s} .fade-up-d2{animation-delay:.2s}
        .fade-up-d3{animation-delay:.3s} .fade-up-d4{animation-delay:.4s}
        .glow-pulse{animation:pulseGlow 3s ease-in-out infinite}
        .ticker-track{animation:ticker 28s linear infinite}
        .grid-bg{background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:60px 60px}
        .card-hover{transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s ease}
        .card-hover:hover{transform:translateY(-6px);box-shadow:0 24px 60px -12px rgba(220,38,38,0.2)}
        .tag-pill{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:100px;border:1px solid rgba(220,38,38,.35);background:rgba(220,38,38,.08);font-size:13px;font-weight:700;color:#f87171;letter-spacing:.02em}
        .section-line{display:inline-flex;align-items:center;gap:10px}
        .section-line::before,.section-line::after{content:'';display:block;height:2px;width:32px;background:linear-gradient(90deg,#DC2626,transparent);border-radius:2px}
      `}</style>

      <main className="relative overflow-hidden min-h-screen text-white"
        style={{ background: "#0d0505", fontFamily: "'Tajawal', system-ui, sans-serif" }} dir="rtl">

        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-60 -top-20 h-[700px] w-[700px] rounded-full glow-pulse"
          style={{ background: "radial-gradient(circle,rgba(220,38,38,0.16) 0%,transparent 70%)" }} />
        <div className="pointer-events-none absolute -left-60 top-[35%] h-[600px] w-[600px] rounded-full glow-pulse"
          style={{ background: "radial-gradient(circle,rgba(185,28,28,0.12) 0%,transparent 70%)", animationDelay: "1.5s" }} />

        {/* HERO */}
        <section className="relative mx-auto max-w-6xl px-5 pt-24 pb-28 text-center md:pt-32 md:pb-36">
          <div className="mb-8 flex justify-center fade-up">
            <span className="tag-pill">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
              BoldNet Digital
            </span>
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-black leading-[1.3] tracking-tight md:text-6xl lg:text-7xl fade-up fade-up-d1">
            <span className="block text-white">عييتي ماتخصر فلوسك فالأدس</span>
            <span className="block mt-2 text-red-600">
              والمحتوى بلا حتى نتيجة؟
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/65 md:text-xl fade-up fade-up-d2">
            حبس كاع داكشي لي كدير وتفرج فهاد الفيديو
          </p>

          <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-6 fade-up fade-up-d2">
            {STATS.map(({ icon: Icon, value, label }, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600/15 border border-red-600/25">
                  <Icon className="h-4 w-4 text-red-500" />
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-white leading-none">{value}</div>
                  <div className="text-xs text-white/50 mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mx-auto mt-12 max-w-4xl fade-up fade-up-d3">
            <div className="absolute -inset-4 rounded-3xl opacity-40 blur-2xl"
              style={{ background: "linear-gradient(135deg,#DC2626,#B91C1C,transparent)" }} />
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_32px_80px_-16px_rgba(220,38,38,0.3)]">
              <iframe src={`https://www.youtube.com/embed/${MAIN_VIDEO_ID}`} title="فيديو تعريفي"
                loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen className="h-full w-full" />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 fade-up fade-up-d4">
            <WhatsAppButton label="تواصل معنا فالواتساب" />
            <GhostButton label="شوف خدماتنا" href="#work" />
          </div>
        </section>

        {/* TICKER */}
        <div className="relative overflow-hidden border-y py-4" style={{ borderColor: "rgba(220,38,38,0.2)", background: "rgba(220,38,38,0.04)" }}>
          <div className="flex gap-0 ticker-track whitespace-nowrap">
            {[...Array(2)].map((_, k) => (
              <div key={k} className="flex items-center gap-8 px-8">
                {["فيديوهات قصيرة","ريلز احترافية","محتوى يبيع","براند قوي","نتائج حقيقية","عملاء راضيين"].map((t, i) => (
                  <span key={i} className="flex items-center gap-3 text-sm font-bold text-white/50">
                    <span className="h-1 w-1 rounded-full bg-red-600" />{t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* WORK */}
        <section id="work" className="relative mx-auto max-w-7xl px-5 py-24 md:py-32">
          <div className="mb-14 text-center">
            <div className="section-line mb-4 justify-center text-sm font-bold text-red-500">نماذج من عملنا</div>
            <h2 className="text-3xl font-black md:text-5xl">فيديوهات حققات نتائج</h2>
            <p className="mt-4 text-base text-white/60 md:text-lg">شوف بعين راسك خدمة لي كدارو لعملائنا</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {SHORTS_IDS.map((id, i) => (
              <div key={i} className="card-hover group relative overflow-hidden rounded-2xl border border-white/8"
                style={{ background: "linear-gradient(160deg,rgba(220,38,38,0.05) 0%,rgba(20,6,6,0.8) 100%)" }}>
                <div className="aspect-[9/16] w-full">
                  <iframe src={`https://www.youtube.com/embed/${id}`} title={`نموذج ${i+1}`}
                    loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen className="h-full w-full" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BRANDS */}
        <section className="relative mx-auto max-w-6xl px-5 py-20 md:py-24">
          <div className="mb-14 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(220,38,38,0.3))" }} />
            <div className="text-center">
              <div className="section-line mb-3 justify-center text-sm font-bold text-red-500">شركاؤنا</div>
              <h2 className="text-3xl font-black md:text-4xl">براندات وثقت فينا</h2>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(270deg,transparent,rgba(220,38,38,0.3))" }} />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {BRANDS.map((brand, i) => (
              <div key={i} className="card-hover group flex h-28 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/95 p-4 hover:bg-white">
                <img src={brand.src} alt={brand.name} loading="lazy" className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" />
              </div>
            ))}
          </div>
        </section>

        {/* REVIEWS */}
        <section className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
          <div className="mb-14 text-center">
            <div className="section-line mb-4 justify-center text-sm font-bold text-red-500">آراء العملاء</div>
            <h2 className="text-3xl font-black md:text-5xl">نتائج حقيقية، تجارب حقيقية</h2>
            <div className="mt-4 flex items-center justify-center gap-1">
              {[...Array(5)].map((_,k) => <Star key={k} className="h-5 w-5 fill-red-600 text-red-600" />)}
              <span className="mr-2 text-sm text-white/60 font-semibold">50+ عميل راضي</span>
            </div>
          </div>
          {REVIEWS.length === 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 p-6 text-center"
                  style={{ background: "linear-gradient(160deg,rgba(220,38,38,0.05) 0%,rgba(20,6,6,0.6) 100%)" }}>
                  <div className="flex gap-1 text-red-600">{[...Array(5)].map((_,k)=><Star key={k} className="h-5 w-5 fill-current"/>)}</div>
                  <p className="text-sm text-white/40">ضع هنا صورة المراجعة رقم {i}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {REVIEWS.map((src,i) => (
                <div key={i} className="card-hover overflow-hidden rounded-2xl border border-white/10"
                  style={{ background: "linear-gradient(160deg,rgba(220,38,38,0.05) 0%,rgba(20,6,6,0.6) 100%)" }}>
                  <img src={src} alt={`مراجعة عميل ${i+1}`} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA + FORM */}
        <section id="contact" className="relative mx-auto max-w-5xl px-5 py-24 md:py-32">
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#150404 0%,#250808 50%,#150404 100%)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 0%,rgba(220,38,38,0.2) 0%,transparent 60%),radial-gradient(ellipse at 20% 100%,rgba(185,28,28,0.15) 0%,transparent 60%)" }} />
            <div className="absolute top-0 right-0 h-px w-24 bg-gradient-to-r from-transparent to-red-600" />
            <div className="absolute top-0 right-0 w-px h-24 bg-gradient-to-b from-red-600 to-transparent" />
            <div className="absolute bottom-0 left-0 h-px w-24 bg-gradient-to-l from-transparent to-red-600" />
            <div className="absolute bottom-0 left-0 w-px h-24 bg-gradient-to-t from-red-600 to-transparent" />

            <div className="relative grid gap-0 md:grid-cols-2">
              {/* Left: copy */}
              <div className="p-8 md:p-12">
                <span className="tag-pill mb-6 inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                  ابدأ الآن
                </span>
                <h2 className="text-3xl font-black leading-tight md:text-4xl lg:text-5xl">
                  بغيتي تسكايلي{" "}
                  <span style={{ background: "linear-gradient(135deg,#EF4444,#fca5a5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    براند ديالك؟
                  </span>
                </h2>
                <p className="mt-5 text-base text-white/70 md:text-lg leading-relaxed">
                  عمر الفورم وغادي نتواصلو معك فأقل من 30 دقيقة أو تواصل معانا مباشرة فالواتساب.
                </p>
                <div className="mt-8 space-y-3">
                  {["محتوى يحقق نتائج قابلة للقياس","فريق متخصص في البراندات المغربية","تسليم سريع وبجودة عالية"].map((item,i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600/20 border border-red-600/30">
                        <CheckCircle className="h-3 w-3 text-red-500" />
                      </div>
                      <span className="text-sm text-white/70 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/15 border border-[#25D366]/25">
                    <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">أو تواصل مباشرة</p>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-bold text-[#25D366] hover:underline" dir="ltr">
                      +212 719-802571
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="p-8 md:p-12 border-t border-white/8 md:border-t-0 md:border-r border-white/8">
                <h3 className="text-lg font-black text-white">ابعث طلبك الآن</h3>
                <p className="mt-1 text-sm text-white/50">استشارة أولى مجانية</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t px-5 py-10 text-center" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="mx-auto max-w-6xl flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <span className="tag-pill text-xs">BoldNet Digital</span>
            <p className="text-sm text-white/35">© {new Date().getFullYear()} — جميع الحقوق محفوظة</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="text-sm text-white/40 hover:text-white/70 transition-colors" dir="ltr">
              +212 719-802571
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
