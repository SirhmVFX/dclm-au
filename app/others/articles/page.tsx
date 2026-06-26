"use client";

import CTA from "@/components/CTA";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    getPublishedArticles,
    getActiveArticleCategories,
    Article,
    ArticleCategory,
} from "@/lib/firestore";

const ITEMS_PER_PAGE = 9; // grid cards per page (featured is separate)

const FALLBACK_ARTICLES: Article[] = [
    { imgSrc: "/assets/1.jpg", date: "February 25, 2024", readingTime: "5 min read", title: "The Lighthouse at the Harbour", description: "The Southern Cross is a constellation of stars used in navigation in the Southern Hemisphere — an emblem found on our national flag, pointing us to something greater.", content: "", published: true, featured: true, categoryIds: [] },
    { imgSrc: "/assets/2.jpg", date: "March 10, 2024", readingTime: "7 min read", title: "Humanity: Awesome Potential Beset by Innate Limits", description: "Today we see unprecedented development in every field of human endeavour — yet new accomplishments in Medicine, Engineering, and AI reveal how much humanity still needs God.", content: "", published: true, featured: false, categoryIds: [] },
    { imgSrc: "/assets/3.jpg", date: "March 25, 2024", readingTime: "6 min read", title: "The Sacredness of Human Existence", description: "Our civilization today upholds the sacredness of life — yet the deepest questions of human dignity and purpose find their answer only in the Creator.", content: "", published: true, featured: false, categoryIds: [] },
    { imgSrc: "/assets/4.jpg", date: "April 5, 2024", readingTime: "8 min read", title: "The Oasis in the Desert", description: "Humanity has never witnessed the prosperity we enjoy today — we live longer and healthier — yet unexpectedly, we are not happier. Where is the true oasis?", content: "", published: true, featured: false, categoryIds: [] },
];

function Articles() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeSlug = searchParams.get("category") ?? "all";
    const currentPage = Number(searchParams.get("page") ?? "1");

    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<ArticleCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getPublishedArticles(), getActiveArticleCategories()])
            .then(([arts, cats]) => {
                setAllArticles(arts.length > 0 ? arts : FALLBACK_ARTICLES);
                setCategories(cats);
            })
            .catch(() => {
                setAllArticles(FALLBACK_ARTICLES);
                setCategories([]);
            })
            .finally(() => setLoading(false));
    }, []);

    // Filter by active category
    const filtered = useCallback(() => {
        if (activeSlug === "all") return allArticles;
        const cat = categories.find((c) => c.slug === activeSlug);
        if (!cat?.id) return allArticles;
        return allArticles.filter((a) => (a.categoryIds ?? []).includes(cat.id!));
    }, [allArticles, categories, activeSlug])();

    // Featured is only shown on page 1
    const featured = currentPage === 1
        ? (filtered.find((a) => a.featured) ?? filtered[0] ?? null)
        : null;
    const featuredIndex = featured ? filtered.indexOf(featured) : -1;
    const rest = filtered.filter((_, i) => i !== featuredIndex);

    // Paginate the non-featured articles
    const totalPages = Math.ceil(rest.length / ITEMS_PER_PAGE);
    const safePage = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
    const pageItems = rest.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

    function setCategory(slug: string) {
        const params = new URLSearchParams(searchParams.toString());
        if (slug === "all") params.delete("category"); else params.set("category", slug);
        params.delete("page"); // reset to page 1 on category change
        router.push(`?${params.toString()}`, { scroll: false });
    }

    function setPage(page: number) {
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) params.delete("page"); else params.set("page", String(page));
        router.push(`?${params.toString()}`, { scroll: true });
    }

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

            {/* ── CATEGORY FILTER TABS ── */}
            {!loading && categories.length > 0 && (
                <section>
                    <div className="w-300 mx-auto pb-2">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setCategory("all")}
                                className={`px-4 py-1.5 text-sm border transition-colors ${activeSlug === "all"
                                        ? "bg-primary text-white border-primary"
                                        : "bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary"
                                    }`}
                            >
                                All
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setCategory(cat.slug)}
                                    className={`px-4 py-1.5 text-sm border transition-colors ${activeSlug === cat.slug
                                            ? "bg-primary text-white border-primary"
                                            : "bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {loading ? (
                <section className="w-300 mx-auto py-20 text-center text-gray-400 text-sm">Loading articles…</section>
            ) : filtered.length === 0 ? (
                <section className="w-300 mx-auto py-20 text-center text-gray-400 text-sm">
                    No articles in this category yet.
                </section>
            ) : (
                <>
                    {/* ── FEATURED ARTICLE (page 1 only) ── */}
                    {featured && (
                        <section>
                            <div className="w-300 mx-auto py-10 md:py-20">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
                                    <Link
                                        href={featured.id ? `/others/articles/${featured.id}` : "#"}
                                        className="block w-full h-56 md:h-72 overflow-hidden hover:opacity-90 transition-opacity"
                                    >
                                        <Image
                                            width={800} height={600}
                                            src={featured.imgSrc || "/assets/1.jpg"}
                                            alt={featured.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </Link>
                                    <div className="flex flex-col justify-center gap-3">
                                        {featured.categoryIds?.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {featured.categoryIds.map((cid) => {
                                                    const cat = categories.find((c) => c.id === cid);
                                                    return cat ? (
                                                        <button key={cid} onClick={() => setCategory(cat.slug)} className="text-xs px-2 py-0.5 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                                            {cat.name}
                                                        </button>
                                                    ) : null;
                                                })}
                                            </div>
                                        )}
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
                    {pageItems.length > 0 && (
                        <section>
                            <div className="w-300 mx-auto pb-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {pageItems.map((article, index) => (
                                        <Link
                                            key={article.id ?? index}
                                            href={article.id ? `/others/articles/${article.id}` : "#"}
                                            className="border border-gray-300 bg-white hover:shadow-md transition-shadow block"
                                        >
                                            <div className="w-full h-48 overflow-hidden">
                                                <Image width={600} height={300} src={article.imgSrc || "/assets/2.jpg"} alt={article.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="p-5 md:p-6">
                                                {article.categoryIds?.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mb-2">
                                                        {article.categoryIds.map((cid) => {
                                                            const cat = categories.find((c) => c.id === cid);
                                                            return cat ? (
                                                                <span key={cid} className="text-xs px-2 py-0.5 bg-primary/10 text-primary">{cat.name}</span>
                                                            ) : null;
                                                        })}
                                                    </div>
                                                )}
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

                                <Pagination
                                    currentPage={safePage}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                />
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
