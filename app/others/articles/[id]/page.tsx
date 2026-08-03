"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticle, Article } from "@/lib/firestore";
import CTA from "@/components/CTA";

export default function ArticleDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!id) return;
        getArticle(id)
            .then((data) => {
                if (!data || !data.published) { setNotFound(true); return; }
                setArticle(data);
                // Track this item view
                import("@/lib/analytics").then(({ trackItemView }) =>
                    trackItemView(id, "article", data.title, `/others/articles/${id}`)
                );
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

    if (notFound || !article) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-gray-600">Article not found.</p>
                <Link href="/others/articles" className="text-primary underline text-sm">← Back to Articles</Link>
            </main>
        );
    }

    return (
        <>
            {/* ── HERO IMAGE ── */}
            {article.imgSrc && (
                <div className="w-full h-64 sm:h-96 md:h-120 mt-16 md:mt-20 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <Image src={article.imgSrc} alt={article.title} fill className="object-cover" priority />
                    </div>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-8 left-0 right-0 w-300 mx-auto px-4">
                        <Link href="/others/articles" className="text-white/80 text-sm hover:text-white">← Articles</Link>
                    </div>
                </div>
            )}

            {/* ── CONTENT ── */}
            <article className="w-300 mx-auto py-12 md:py-16 max-w-3xl">
                {!article.imgSrc && (
                    <Link href="/others/articles" className="text-primary text-sm hover:underline block mb-8 mt-24">← Back to Articles</Link>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readingTime}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{article.title}</h1>
                <p className="text-lg text-gray-600 mb-8 border-l-4 border-primary pl-4">{article.description}</p>

                {article.content ? (
                    <div
                        className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-primary"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                ) : (
                    <p className="text-gray-500 italic">Full article content coming soon.</p>
                )}
            </article>

            <CTA />
        </>
    );
}
