"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getSiteSettings, SiteSettings } from "@/lib/firestore";

function CTA() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(() => { });
  }, []);

  const label = settings?.ctaTitle ?? "Come worship with us";
  const headline = settings?.ctaSubtitle ?? "Join hands with the fellowship as we contend for the faith and raise godly leaders.";
  const body = settings?.ctaBody ?? "Whether you are visiting for the first time or seeking a deeper walk with Christ, you are warmly welcomed.";
  const btnText = settings?.ctaButtonText ?? "Connect with us";
  const btnUrl = settings?.ctaButtonUrl ?? "/contact-us";

  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <Image src="/assets/heroimage2.jpg" alt="Church prayer meeting" width={1600} height={900} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative mx-auto flex min-h-80 w-full max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-sm uppercase tracking-[0.35em] text-blue-100">{label}</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">{headline}</h2>
        <p className="mt-4 max-w-2xl text-base text-gray-100 sm:text-lg">{body}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={btnUrl} className="bg-white px-5 py-3 text-sm font-semibold text-blue-900">{btnText}</a>
          <a href="/contact-us" className="border border-white/80 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Contact the church</a>
        </div>
      </div>
    </section>
  );
}

export default CTA;
