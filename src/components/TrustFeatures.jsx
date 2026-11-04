"use client";

import { Truck, Award, Video, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Truck,
    title: "All-India Insured Delivery",
    subtitle: "Fast reliable dispatch across MP and all states via tracked courier with insurance.",
  },
  {
    icon: Award,
    title: "100% Certified Silk Mark",
    subtitle: "Pure handloom Banarasi, Kanjivaram & Chanderi silks directly from master weavers.",
  },
  {
    icon: Video,
    title: "Live Video Call Shopping",
    subtitle: "Personal shopping session on WhatsApp video to inspect saree drapes and true colors.",
  },
  {
    icon: ShieldCheck,
    title: "40+ Years Heritage in Pipariya",
    subtitle: "Trusted by generations of families for wedding trousseaus and festive couture since 1985.",
  },
];

export default function TrustFeatures() {
  return (
    <section className="py-12 bg-white border-y border-[#EBE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E5DDD2] flex items-center justify-center shrink-0 text-[#A34850]">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-[14.5px] sm:text-[15px] font-semibold text-[#19181B]">{f.title}</h4>
                  <p className="text-[13px] sm:text-[13.5px] text-[#786F63] mt-1 leading-relaxed font-normal">
                    {f.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
