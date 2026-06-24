"use client";

import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Leaders from "@/components/Leaders";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { getPublishedSnippets, Snippet } from "@/lib/firestore";

const FALLBACK_SNIPPETS: Snippet[] = [
  { img: "/assets/9.jpg", title: "Choose to Trust in God", description: "A reflection on what it means to place your complete trust in God in every situation of life.", content: "", published: true },
  { img: "/assets/6.jpg", title: "Forgiveness", description: "Exploring the power and necessity of forgiveness as taught and modelled by our Lord Jesus Christ.", content: "", published: true },
  { img: "/assets/10.jpg", title: "Believe in God", description: "An encouragement to hold fast to genuine faith in God, especially in the midst of life's challenges.", content: "", published: true },
  { img: "/assets/8.jpg", title: "Joy as Jesus Comes", description: "Meditating on the joy that believers anticipate as we look forward to the coming of our Lord Jesus Christ.", content: "", published: true },
];

function SnippetsPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedSnippets()
      .then((data) => setSnippets(data.length > 0 ? data : FALLBACK_SNIPPETS))
      .catch(() => setSnippets(FALLBACK_SNIPPETS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="pt-32">
        <div className="w-300 mx-auto flex flex-col sm:flex-row justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p>Bible Snippets</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Short reflections from the Word</h1>
          </div>
          <div className="relative w-full sm:w-64 h-40 shrink-0">
            <Image width={400} height={200} src="/assets/11.jpg" alt="Bible Review Series" className="w-full h-full object-cover" />
            <div className="absolute bg-primary text-white text-sm px-2 py-1 left-0 top-0"><p>Bible Snippets</p></div>
            <div className="absolute bg-primary text-white text-sm px-2 py-1 left-0 top-10"><p>Spiritual Growth</p></div>
            <div className="absolute bg-primary text-white text-sm px-2 py-1 left-0 top-20"><p>Sound Doctrine</p></div>
          </div>
        </div>
      </section>

      {/* ── SNIPPETS GRID ── */}
      <section>
        <div className="w-300 mx-auto py-12 md:py-20">
          {loading ? (
            <p className="text-center text-gray-400 text-sm py-20">Loading snippets…</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              {snippets.map((snippet, index) => (
                <Link
                  key={snippet.id ?? index}
                  href={snippet.id ? `/bible-review-series/snippets/${snippet.id}` : "#"}
                  className="border border-gray-300 bg-white hover:shadow-md transition-shadow block"
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      width={600}
                      height={300}
                      src={snippet.img || "/assets/9.jpg"}
                      alt={snippet.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{snippet.title}</h3>
                      <BiChevronRight className="h-6 w-6 text-gray-400 shrink-0" />
                    </div>
                    <p className="text-gray-600">{snippet.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── BANNER ── */}
      <section className="w-full h-64 sm:h-96 md:h-124 relative">
        <Image width={1600} height={700} src="/assets/12.jpg" alt="Bible Review Series" className="w-full h-full object-cover" />
        <div className="absolute inset-x-4 sm:inset-auto sm:left-[10%] sm:w-105 top-8 sm:top-12 md:top-20 bg-primary/35 text-white p-5 md:p-6">
          <div className="w-20 h-20 md:w-32 md:h-32 mb-4">
            <Image width={128} height={128} src="/assets/dlclogo.png" alt="DLCF Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-lg md:text-xl font-bold mb-3">Contending earnestly for the faith.</h1>
          <p className="text-sm md:text-base">Please feel free to check on our Bible Review Series below — in-depth teachings and short reflections to help you grow in the knowledge of God&apos;s Word.</p>
        </div>
      </section>

      <Leaders />
      <FAQ />
      <CTA />
    </>
  );
}

export default SnippetsPage;
