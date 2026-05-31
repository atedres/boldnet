import Link from "next/link";

export default function ThankYouPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800;900&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseGlow { 0%,100%{opacity:.4} 50%{opacity:.8} }
        @keyframes popIn { from{opacity:0;transform:scale(0.6)} to{opacity:1;transform:scale(1)} }
        .fade-up { animation: fadeUp .7s ease both; }
        .d1 { animation-delay: .15s; }
        .d2 { animation-delay: .3s; }
        .d3 { animation-delay: .45s; }
        .glow-pulse { animation: pulseGlow 3s ease-in-out infinite; }
        .pop-in { animation: popIn .6s cubic-bezier(.34,1.56,.64,1) both; }
        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>

      <main
        className="relative min-h-screen overflow-hidden text-white flex items-center justify-center"
        style={{ background: "#0d0505", fontFamily: "'Tajawal', system-ui, sans-serif" }}
        dir="rtl"
      >
        {/* Grid */}
        <div className="grid-bg pointer-events-none absolute inset-0" />

        {/* Glows */}
        <div className="pointer-events-none absolute -right-60 -top-20 h-[600px] w-[600px] rounded-full glow-pulse"
          style={{ background: "radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -left-60 bottom-0 h-[500px] w-[500px] rounded-full glow-pulse"
          style={{ background: "radial-gradient(circle, rgba(185,28,28,0.13) 0%, transparent 70%)", animationDelay: "1.5s" }} />

        {/* Card */}
        <div className="relative z-10 mx-auto max-w-lg px-6 py-16 text-center">

          {/* Icon */}
          <div className="pop-in mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-red-600/30"
            style={{ background: "radial-gradient(circle, rgba(220,38,38,0.2) 0%, transparent 70%)", boxShadow: "0 0 60px rgba(220,38,38,0.3)" }}>
            <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="fade-up text-4xl font-black leading-tight md:text-5xl">
            شكراً عليك! 🎉
          </h1>

          {/* Subtext */}
          <p className="fade-up d1 mt-5 text-lg text-white/65 leading-relaxed">
            وصلنا طلبك وغادي نتواصلو معك
            <span className="text-red-500 font-bold"> فأقل من 30 دقيقة</span>
          </p>

          {/* Divider */}
          <div className="fade-up d2 mx-auto mt-8 mb-8 h-px w-24"
            style={{ background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent)" }} />

          {/* Footer note */}
          <p className="fade-up d3 text-sm text-white/35">
            BoldNet Digital — نتواصلو معك قريباً
          </p>
        </div>
      </main>
    </>
  );
}
