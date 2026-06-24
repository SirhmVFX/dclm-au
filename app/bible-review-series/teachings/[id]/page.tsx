"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTeaching, Teaching } from "@/lib/firestore";
import CTA from "@/components/CTA";

export default function TeachingDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [teaching, setTeaching] = useState<Teaching | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!id) return;
        getTeaching(id)
            .then((data) => {
                if (!data || !data.published) { setNotFound(true); return; }
                setTeaching(data);
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <p className="text-gray-400 text-sm">Loading…</p>
            </main>
        );
    }

    if (notFound || !teaching) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-gray-600">Teaching not found.</p>
                <Link href="/bible-review-series/teachings" className="text-primary underline text-sm">← Back to Teachings</Link>
            </main>
        );
    }

    return (
        <>
            {/* ── HERO IMAGE ── */}
            {teaching.imgSrc && (
                <div className="w-full h-64 sm:h-80 md:h-[420px] mt-16 md:mt-20 relative">
                    <Image src={teaching.imgSrc} alt={teaching.title} fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-0 flex flex-col justify-end pb-10 w-300 mx-auto px-4">
                        <Link href="/bible-review-series/teachings" className="text-white/80 text-sm hover:text-white mb-3">← Teachings</Link>
                        <div className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 uppercase tracking-widest mb-3 w-fit">Bible Review Series</div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">{teaching.title}</h1>
                    </div>
                </div>
            )}

            {/* ── META + CONTENT ── */}
            <article className="w-300 mx-auto py-12 md:py-16 max-w-3xl">
                {!teaching.imgSrc && (
                    <>
                        <Link href="/bible-review-series/teachings" className="text-primary text-sm hover:underline block mb-8 mt-24">← Back to Teachings</Link>
                        <div className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 uppercase tracking-widest mb-4">Bible Review Series</div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{teaching.title}</h1>
                    </>
                )}

                {/* Meta strip */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 border-t border-b border-gray-200 py-4 mb-8">
                    {teaching.teacher && (
                        <span className="flex items-center gap-1">
                            <span className="text-gray-400">Teacher</span>
                            <span className="font-medium text-gray-700">{teaching.teacher}</span>
                        </span>
                    )}
                    {teaching.bibleVerse && (
                        <span className="flex items-center gap-1">
                            <span className="text-gray-400">Key Verse</span>
                            <span className="font-medium text-gray-700">{teaching.bibleVerse}</span>
                        </span>
                    )}
                    {teaching.date && (
                        <span className="flex items-center gap-1">
                            <span className="text-gray-400">Date</span>
                            <span className="font-medium text-gray-700">{teaching.date}</span>
                        </span>
                    )}
                </div>

                <p className="text-lg text-gray-600 mb-8 border-l-4 border-primary pl-4">{teaching.description}</p>

                {teaching.content ? (
                    <div
                        className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-primary prose-blockquote:border-primary prose-blockquote:italic"
                        dangerouslySetInnerHTML={{ __html: teaching.content }}
                    />
                ) : (
                    <p className="text-gray-500 italic">Full teaching content coming soon.</p>
                )}
            </article>

            <CTA />
        </>
    );
}
