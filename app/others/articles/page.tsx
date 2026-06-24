"use client";

import CTA from "@/components/CTA";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPublishedArticles, Article } from "@/lib/firestore";

const FALLBACK_ARTICLES: Article[] = [
    { imgSrc: "/assets/1.jpg", date: "February 25, 2024", readingTime: "5 min read", title: "The Lighthouse at the Harbour", description: "The Southern Cross is a constellation of stars used in navigation in the Southern Hemisphere — an emblem found on our national flag, pointing us to something greater.", content: "", published: true, featured: true },
    { imgSrc: "/assets/2.jpg", date: "March 10, 2024", readingTime: "7 min read", title: "Humanity: Awesome Potential Beset by Innate Limits", description: "Today we see unprecedented development in every field of human endeavour — yet new accomplishments in Medicine, Engineering, and AI reveal how much humanity still needs God.", content: "", published: true, featured: false },
    { imgSrc: "/assets/3.jpg", date: "March 25, 2024", readingTime: "6 min read", title: "The Sacredness of Human Existence", description: "Our civilization today upholds the sacredness of life — yet the deepest questions of human dignity and purpose find their answer only in the Creator.", content: "", published: true, featured: false },
    { imgSrc: "/assets/4.jpg", date: "April 5, 2024", readingTime: "8 min read", title: "The Oasis in the Desert", description: "Humanity has never witnessed the prosperity we enjoy today — we live longer and healthier — yet unexpectedly, we are not happier. Where is the true oasis?", content: "", published: true, featured: false },
];

function Articles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPublishedArticles()
            .then((data) => setArticles(data.length > 0 ? data : FALLBACK_ARTICLES))
            .catch(() => setArticles(FALLBACK_ARTICLES))
            .finally(() => setLoading(false));
    }, []);

    // Split into featured + rest by index, not by id comparison (avoids undefined === undefined bug)
    const featured = articles.find((a) => a.featured) ?? articles[0] ?? null;
    const featuredIndex = featured ? articles.indexOf(featured) : -1;
    const rest = articles.filter((_, i) => i !== featuredIndex);

    return (
        <>
            {/* ── HERO ── */}
            <section>
                <div className="w-300 mx-auto pt-28 md:pt-32 pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                        <p>Articles</p>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Insights to strengthen your faith.</h1>
                    </div>
                    <div className="bg-primary p-6 md:p-8 w-full sm:w-72 shrink-0">
                        <div className="w-full h-10 mb-4">
                            <Image width={200} height={40} src="/assets/dlclogo.png" alt="DLCF Logo" className="w-full h-full object-contain" />
                        </div>
                        <p className="text-white text-sm md:text-base">
                            Explore articles, reflections, and insights from DLCF Australia to inspire your journey of faith and godly living
                        </p>
                    </div>
                </div>
            </section>

            {loading ? (
                <section className="w-300 mx-auto py-20 text-center text-gray-400 text-sm">Loading articles…</section>
            ) : (
                <>
                    {/* ── FEATURED ARTICLE ── */}
                    {featured && (
                        <section>
                            <div className="w-300 mx-auto py-10 md:py-20">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
                                    <Link
                                        href={featured.id ? `/others/articles/${featured.id}` : "#"}
                                        className="block w-full h-56 md:h-72 overflow-hidden hover:opacity-90 transition-opacity"
                                    >
                                        <Image
                                            width={800}
                                            height={600}
                                            src={featured.imgSrc || "/assets/1.jpg"}
                                            alt={featured.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </Link>
                                    <div className="flex flex-col justify-center gap-3">
                                        <div className="flex justify-between">
                                            <p className="text-sm text-gray-500">{featured.date}</p>
                                            <p className="text-xs text-gray-400">{featured.readingTime}</p>
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{featured.title}</h2>
                                        <p className="text-gray-600">{featured.description}</p>
                                        {featured.id && (
                                            <Link href={`/others/articles/${featured.id}`} className="text-primary text-sm font-medium hover:underline">
                                                Read more →
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ── ARTICLES GRID ── */}
                    {rest.length > 0 && (
                        <section>
                            <div className="w-300 mx-auto pb-12 md:pb-20">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {rest.map((article, index) => (
                                        <Link
                                            key={article.id ?? index}
                                            href={article.id ? `/others/articles/${article.id}` : "#"}
                                            className="border border-gray-300 bg-white hover:shadow-md transition-shadow block"
                                        >
                                            <div className="w-full h-48 overflow-hidden">
                                                <Image
                                                    width={600}
                                                    height={300}
                                                    src={article.imgSrc || "/assets/2.jpg"}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-5 md:p-6">
                                                <div className="flex justify-between mb-2">
                                                    <p className="text-sm text-gray-500">{article.date}</p>
                                                    <p className="text-xs text-gray-400">{article.readingTime}</p>
                                                </div>
                                                <h2 className="text-lg font-bold text-gray-800">{article.title}</h2>
                                                <p className="text-gray-600 text-sm mt-1">{article.description}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </>
            )}

            <CTA />
        </>
    );
}

export default Articles;
