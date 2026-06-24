"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSnippet, Snippet } from "@/lib/firestore";
import CTA from "@/components/CTA";

export default function SnippetDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [snippet, setSnippet] = useState<Snippet | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!id) return;
        getSnippet(id)
            .then((data) => {
                if (!data || !data.published) { setNotFound(true); return; }
                setSnippet(data);
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

    if (notFound || !snippet) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-gray-600">Snippet not found.</p>
                <Link href="/bible-review-series/snippets" className="text-primary underline text-sm">← Back to Snippets</Link>
            </main>
        );
    }

    return (
        <>
            {/* ── HERO IMAGE ── */}
            {snippet.img && (
                <div className="w-full h-64 sm:h-80 md:h-105 mt-16 md:mt-20 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <Image src={snippet.img} alt={snippet.title} fill className="object-cover" priority />
                    </div>
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 flex flex-col justify-end pb-10 w-300 mx-auto px-4">
                        <Link href="/bible-review-series/snippets" className="text-white/80 text-sm hover:text-white mb-3">← Snippets</Link>
                        <div className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 uppercase tracking-widest mb-3 w-fit">Bible Snippet</div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">{snippet.title}</h1>
                    </div>
                </div>
            )}

            {/* ── CONTENT ── */}
            <article className="w-300 mx-auto py-12 md:py-16 max-w-3xl">
                {!snippet.img && (
                    <>
                        <Link href="/bible-review-series/snippets" className="text-primary text-sm hover:underline block mb-8 mt-24">← Back to Snippets</Link>
                        <div className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 uppercase tracking-widest mb-4">Bible Snippet</div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{snippet.title}</h1>
                    </>
                )}

                <p className="text-lg text-gray-600 mb-8 border-l-4 border-primary pl-4">{snippet.description}</p>

                {snippet.content ? (
                    <div
                        className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-primary prose-blockquote:border-primary prose-blockquote:text-gray-600"
                        dangerouslySetInnerHTML={{ __html: snippet.content }}
                    />
                ) : (
                    <p className="text-gray-500 italic">Full content coming soon.</p>
                )}
            </article>

            <CTA />
        </>
    );
}
