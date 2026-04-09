'use client';

import Image from 'next/image';
import { ChevronDown, CheckCircle, TrendingUp, Film, Bot, Camera, Users, PenTool, Lamp, PenSquare, UserPlus, CircleDollarSign } from 'lucide-react';

export default function UgcOfferPage() {
  return (
    <main dir="rtl" className="font-sans bg-white text-gray-900">

      {/* ===== HERO ===== */}
      <section className="relative bg-[#e8231a] text-white min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <span className="text-white font-bold text-xl">BOLDNET DIGITAL</span>
        </div>

        <div className="max-w-3xl mx-auto z-10">
          <p className="text-lg mb-4 opacity-90">إذا كنت تبحث عن فيديوهات عادية</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            BOLDNET ليست الخيار المناسب<br />لك كـ Seller
          </h1>
          <a
            href="#contact"
            className="inline-block mt-6 bg-white text-[#e8231a] font-bold text-lg px-10 py-4 rounded-full hover:bg-gray-100 transition"
          >
            تواصل معنا الآن
          </a>
        </div>

        {/* Decorative circle */}
        <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-white opacity-5" />
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'CTR', value: '۱٫۲٪' },
            { label: 'CPM', value: '۳۵ دولار' },
            { label: 'المبيعات الشهرية', value: '+۵۰۰' },
            { label: 'العملاء المتوقعون', value: '×۳' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-[#e8231a]">{s.value}</p>
              <p className="text-gray-500 mt-1 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROBLEM ===== */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 mx-auto">
            <div className="w-full h-full bg-red-100 flex items-center justify-center">
              <TrendingUp className="w-16 h-16 text-[#e8231a]" />
            </div>
          </div>
          <div className="text-right flex-1">
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#e8231a]">المشكلة</h2>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed max-w-xl">
              نحن في 2026 حتى لو غيّرت التسويق. الرقمي في البداية الإلكترونية تظل أصعب مهارة.
              هنا يبدأ الفشل في التجربة الإلكترونية. وهنا يأتي BOLDNET
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT OTHERS DO vs BOLDNET ===== */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12">ما يقدمه المنافسون</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Others */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-700 mb-6">ما يقدمه الآخرون</h3>
              <ul className="space-y-4">
                {[
                  'فيديوهات 10000',
                  'مونتاج',
                  'كتابة سكريبت',
                  'Content planning',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-500">
                    <ChevronDown className="w-5 h-5 text-red-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* BOLDNET */}
            <div className="bg-[#e8231a] text-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-6">في BOLDNET نركز على العكس</h3>
              <ul className="space-y-4">
                {[
                  'فيديوهات UGC تحول المشاهد لعميل',
                  'إنتاج احترافي في بيئة واحدة',
                  'كل شيء من A إلى Z',
                  'نتائج حقيقية وقابلة للقياس',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PAIN POINT — VIRAL VIDEOS ===== */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-gray-500 text-lg mb-4">لماذا تفشل الفيديوهات؟ المشكل الحقيقي:</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#e8231a] mb-12">
            لأنها متشابهة!
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] bg-red-50 rounded-2xl flex items-center justify-center">
              <Film className="w-24 h-24 text-[#e8231a] opacity-40" />
            </div>
            <div className="space-y-4">
              {[
                'لأنه نفس القالب يستخدمه الجميع',
                'لأنها لا تصل للجمهور المناسب',
                'لأن المشاهد لا يتفاعل معها',
                'لأنها لا تولّد مبيعات حقيقية',
              ].map((point, i) => (
                <div key={i} className="bg-red-50 border border-red-100 rounded-xl p-4 text-gray-700">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="bg-red-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-[#e8231a] mb-12">خدماتنا</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: Camera, label: 'تصوير احترافي' },
              { icon: Film, label: 'مونتاج وإخراج' },
              { icon: PenTool, label: 'كتابة إبداعية' },
              { icon: Users, label: 'UGC Creators' },
              { icon: Bot, label: 'Ads Strategy' },
              { icon: Lamp, label: 'Brand Identity' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
                <Icon className="w-10 h-10 text-[#e8231a] mb-3" />
                <p className="font-semibold text-gray-700">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== META SECTION ===== */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center">
            <Bot className="w-20 h-20 text-blue-500 opacity-40" />
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
              تعرف ما تريـــده META وهذا ما توفره لها
            </h2>
            <div className="bg-[#e8231a] text-white p-6 rounded-xl text-lg leading-relaxed space-y-3">
              {[
                'مشاهدة من أول ثانية',
                'مشاعر قوية',
                'قصة أصيلة',
                'كأس Arabian Rose',
              ].map((item, i) => (
                <p key={i} className="flex items-center gap-3">
                  <span className="bg-white text-[#e8231a] rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </span>
                  {item}
                </p>
              ))}
            </div>
            <p className="mt-4 text-gray-500">
              وهذا يجلب مشتركين جدد من المكريترين بلكان —{' '}
              <span className="font-semibold text-gray-700">LANDING PAGES</span>
            </p>
          </div>
        </div>
      </section>

      {/* ===== WE DO EVERYTHING ===== */}
      <section className="bg-red-50 py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square max-w-sm mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center">
            <PenSquare className="w-24 h-24 text-[#e8231a] opacity-30" />
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm text-right">
            <h2 className="text-2xl font-extrabold text-[#e8231a] mb-6">تذكير BOLDNET بكل شيء:</h2>
            <ul className="space-y-3 text-gray-700">
              {[
                'نصنع فيديوهات UGC بجودة إعلانات كبرى',
                'فريق متخصص في صناعة المحتوى الرقمي',
                'نتحمل مسؤولية الإنتاج والتوزيع',
                'نتابع الأداء ونحسّن الحملات',
                'LANDING PAGES بتصميم احترافي',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-[#e8231a] font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section id="contact" className="bg-[#e8231a] py-24 px-6 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">أما إن كنت تريـده</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
            {[
              { icon: UserPlus, label: 'عملاء أكثر' },
              { icon: CircleDollarSign, label: 'CTR أعلى' },
              { icon: TrendingUp, label: 'CPM أفضل' },
              { icon: Film, label: 'محتوى يبيع' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="bg-white/10 rounded-2xl p-6 flex flex-col items-center gap-3">
                <Icon className="w-8 h-8" />
                <p className="font-semibold text-sm">{label}</p>
              </div>
            ))}
          </div>
          <a
            href="https://wa.me/YOURNUMBER"
            className="inline-block bg-white text-[#e8231a] font-extrabold text-xl px-12 py-5 rounded-full hover:bg-gray-100 transition"
          >
            أسأل المتخصصة الآن
          </a>
        </div>
      </section>

    </main>
  );
}
