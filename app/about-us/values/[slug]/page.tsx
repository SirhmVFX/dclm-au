"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAboutValueBySlug, AboutValue } from "@/lib/firestore";
import CTA from "@/components/CTA";

export default function ValueDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [value, setValue] = useState<AboutValue | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!slug) return;
        getAboutValueBySlug(slug)
            .then((data) => {
                if (!data) { setNotFound(true); return; }
                setValue(data);
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <p className="text-gray-400 text-sm">Loading…</p>
            </main>
        );
    }

    if (notFound || !value) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-gray-600">Page not found.</p>
                <Link href="/about-us" className="text-primary underline text-sm">← Back to About Us</Link>
            </main>
        );
    }

    return (
        <>
            {/* ── HERO ── */}
            <div className="w-full h-64 sm:h-80 md:h-120 mt-16 md:mt-20 relative overflow-hidden">
                <Image
                    src={value.image || "/assets/4.jpg"}
                    alt={value.label}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/55" />
                <div className="absolute inset-0 flex flex-col justify-end pb-10 w-300 mx-auto px-4">
                    <Link href="/about-us" className="text-white/70 text-sm hover:text-white mb-4">← About Us</Link>
                    <p className="text-blue-300 text-xs uppercase tracking-widest mb-2">Our Values</p>
                    <h1 className="text-3xl md:text-5xl font-bold text-white">{value.label}</h1>
                </div>
            </div>

            {/* ── CONTENT ── */}
            <article className="w-300 mx-auto max-w-3xl py-12 md:py-20">
                <p className="text-lg md:text-xl text-gray-600 mb-10 border-l-4 border-primary pl-5 leading-relaxed">
                    {value.description}
                </p>

                {value.content ? (
                    <div
                        className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-primary prose-blockquote:border-primary"
                        dangerouslySetInnerHTML={{ __html: value.content }}
                    />
                ) : (
                    <p className="text-gray-400 italic">Full content coming soon.</p>
                )}
            </article>

            <CTA />
        </>
    );
}
