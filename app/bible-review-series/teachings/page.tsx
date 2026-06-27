"use client";

import CTA from "@/components/CTA";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    getPublishedTeachings,
    getActiveTeachingCategories,
    getActiveTeachingSubCategories,
    type Teaching,
    type TeachingCategory,
    type TeachingSubCategory,
} from "@/lib/firestore";
import { MdVideoLibrary } from "react-icons/md";

const ITEMS_PER_PAGE = 6;

const FALLBACK_TEACHINGS: Teaching[] = [
    { title: "1st Thessalonians", description: "A full review of Paul's first letter to the Thessalonians — covering faith, love, holiness, and the hope of Christ's return.", teacher: "DLCF Teaching Team", bibleVerse: "1 Thessalonians 5:23", date: "February 25, 2024", imgSrc: "/assets/heroimage1.jpg", content: "", published: true, youtubeLinks: [], subCategoryId: "" },
    { title: "Lover of the Broken Heart", description: "A snippet exploring God's deep love and compassion for those who are hurting, brokenhearted, and in need of His healing touch.", teacher: "DLCF Teaching Team", bibleVerse: "Psalm 34:18", date: "June 21, 2024", imgSrc: "/assets/heroimage2.jpg", content: "", published: true, youtubeLinks: [], subCategoryId: "" },
    { title: "Luke 2", description: "A reflection on the second chapter of Luke — the birth of Christ, His presentation at the temple, and His early wisdom.", teacher: "DLCF Teaching Team", bibleVerse: "Luke 2:52", date: "June 21, 2024", imgSrc: "/assets/heroimage1.jpg", content: "", published: true, youtubeLinks: [], subCategoryId: "" },
    { title: "Joy as Jesus Comes", description: "Meditating on the anticipation and joy that fills the heart of every believer as we look forward to the second coming of Jesus.", teacher: "DLCF Teaching Team", bibleVerse: "Philippians 4:4", date: "June 21, 2024", imgSrc: "/assets/heroimage2.jpg", content: "", published: true, youtubeLinks: [], subCategoryId: "" },
    { title: "Believe in God", description: "An encouragement drawn from Scripture to hold fast to genuine, unshakeable faith in God regardless of life's circumstances.", teacher: "DLCF Teaching Team", bibleVerse: "John 14:1", date: "June 21, 2024", imgSrc: "/assets/heroimage1.jpg", content: "", published: true, youtubeLinks: [], subCategoryId: "" },
];

function Teachings() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // URL state: ?category=slug &sub=slug &page=N
    const activeCatSlug = searchParams.get("category") ?? "all";
    const activeSubSlug = searchParams.get("sub") ?? "all";
    const currentPage = Number(searchParams.get("page") ?? "1");

    const [allTeachings, setAllTeachings] = useState<Teaching[]>([]);
    const [categories, setCategories] = useState<TeachingCategory[]>([]);
    const [subCategories, setSubCategories] = useState<TeachingSubCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getPublishedTeachings(),
            getActiveTeachingCategories(),
            getActiveTeachingSubCategories(),
        ])
            .then(([teachings, cats, subs]) => {
                setAllTeachings(teachings.length > 0 ? teachings : FALLBACK_TEACHINGS);
                setCategories(cats);
                setSubCategories(subs);
            })
            .catch(() => {
                setAllTeachings(FALLBACK_TEACHINGS);
                setCategories([]);
                setSubCategories([]);
            })
            .finally(() => setLoading(false));
    }, []);

    // Active category object
    const activeCat = categories.find((c) => c.slug === activeCatSlug) ?? null;

    // Subcategories belonging to the active category
    const visibleSubs = activeCat
        ? subCategories.filter((s) => s.categoryId === activeCat.id)
        : [];

    // Active subcategory object
    const activeSub = visibleSubs.find((s) => s.slug === activeSubSlug) ?? null;

    // Filter teachings
    const filtered = (() => {
        if (activeCatSlug === "all") return allTeachings;

        // Get all sub IDs for this category
        const catSubIds = subCategories
            .filter((s) => s.categoryId === activeCat?.id)
            .map((s) => s.id!);

        if (activeSub) {
            // Specific subcategory selected
            return allTeachings.filter((t) => t.subCategoryId === activeSub.id);
        }
        // Category selected but no specific sub — show all in that category
        return allTeachings.filter((t) => catSubIds.includes(t.subCategoryId ?? ""));
    })();

    // Pagination
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const safePage = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
    const pageItems = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

    function setCategory(slug: string) {
        const params = new URLSearchParams();
        if (slug !== "all") params.set("category", slug);
        router.push(`?${params.toString()}`, { scroll: false });
    }

    function setSubCategory(slug: string) {
        const params = new URLSearchParams(searchParams.toString());
        if (slug === "all") params.delete("sub"); else params.set("sub", slug);
        params.delete("page");
        router.push(`?${params.toString()}`, { scroll: false });
    }

    function setPage(page: number) {
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) params.delete("page"); else params.set("page", String(page));
        router.push(`?${params.toString()}`, { scroll: true });
    }

    // Label for a teaching's subcategory
    function getSubLabel(subCategoryId: string) {
        const sub = subCategories.find((s) => s.id === subCategoryId);
        if (!sub) return null;
        const cat = categories.find((c) => c.id === sub.categoryId);
        return cat ? `${cat.name} › ${sub.name}` : sub.name;
    }

    return (
        <>
            {/* HERO */}
            <section>
                <div className="w-300 mx-auto pt-28 md:pt-32 pb-8 text-center">
                    <p>Teachings</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">In-depth Bible Review Series.</h1>
                </div>
            </section>

            {/* CATEGORY FILTER */}
            {!loading && categories.length > 0 && (
                <section>
                    <div className="w-300 mx-auto pb-0">
                        {/* Top-level categories */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setCategory("all")}
                                className={`px-4 py-1.5 text-sm border transition-colors ${activeCatSlug === "all"
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
                                    className={`px-4 py-1.5 text-sm border transition-colors ${activeCatSlug === cat.slug
                                            ? "bg-primary text-white border-primary"
                                            : "bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Subcategory row — shown when a category is selected and has subs */}
                        {activeCat && visibleSubs.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3 pl-2 border-l-2 border-primary/30">
                                <button
                                    onClick={() => setSubCategory("all")}
                                    className={`px-3 py-1 text-xs border transition-colors ${activeSubSlug === "all"
                                            ? "bg-primary/10 text-primary border-primary/40"
                                            : "bg-white text-gray-500 border-gray-200 hover:border-primary/40 hover:text-primary"
                                        }`}
                                >
                                    All {activeCat.name}
                                </button>
                                {visibleSubs.map((sub) => (
                                    <button
                                        key={sub.id}
                                        onClick={() => setSubCategory(sub.slug)}
                                        className={`px-3 py-1 text-xs border transition-colors ${activeSubSlug === sub.slug
                                                ? "bg-primary/10 text-primary border-primary/40"
                                                : "bg-white text-gray-500 border-gray-200 hover:border-primary/40 hover:text-primary"
                                            }`}
                                    >
                                        {sub.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* TEACHINGS GRID */}
            <section>
                <div className="w-300 mx-auto py-12 md:py-20">
                    {loading ? (
                        <p className="text-center text-gray-400 text-sm py-20">Loading teachings…</p>
                    ) : filtered.length === 0 ? (
                        <p className="text-center text-gray-400 text-sm py-20">
                            {activeCatSlug !== "all" ? "No teachings in this category yet." : "No teachings yet."}
                        </p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                                {pageItems.map((teaching, index) => (
                                    <div key={teaching.id ?? index} className="border border-gray-300 bg-white">
                                        <Link
                                            href={teaching.id ? `/bible-review-series/teachings/${teaching.id}` : "#"}
                                            className="block w-full h-48 overflow-hidden hover:opacity-90 transition-opacity"
                                        >
                                            <Image
                                                width={800} height={300}
                                                src={teaching.imgSrc || "/assets/heroimage1.jpg"}
                                                alt={teaching.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </Link>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                                            <div className="p-5 md:p-6">
                                                {/* Subcategory breadcrumb */}
                                                {teaching.subCategoryId && getSubLabel(teaching.subCategoryId) && (
                                                    <p className="text-xs text-primary font-medium mb-1">{getSubLabel(teaching.subCategoryId)}</p>
                                                )}
                                                <h3 className="text-lg font-semibold text-gray-900">{teaching.title}</h3>
                                                <p className="text-gray-600 text-sm mt-1">{teaching.description}</p>
                                                <div className="flex items-center gap-3 mt-4">
                                                    {teaching.id && (
                                                        <Link href={`/bible-review-series/teachings/${teaching.id}`} className="text-primary hover:underline text-sm font-medium">
                                                            Read More →
                                                        </Link>
                                                    )}
                                                    {(teaching.youtubeLinks?.length ?? 0) > 0 && (
                                                        <Link
                                                            href={teaching.id ? `/bible-review-series/teachings/${teaching.id}?tab=recordings` : "#"}
                                                            className="flex items-center gap-1 text-xs text-red-500 font-medium hover:underline"
                                                        >
                                                            <MdVideoLibrary size={13} />
                                                            {teaching.youtubeLinks.length} Recording{teaching.youtubeLinks.length !== 1 ? "s" : ""}
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="space-y-3 text-sm text-gray-500 p-5 md:p-6 border-t sm:border-t-0 sm:border-l border-gray-200">
                                                <p className="font-medium text-gray-700">{teaching.teacher}</p>
                                                <div className="border-t border-gray-200" />
                                                <p>{teaching.bibleVerse}</p>
                                                <div className="border-t border-gray-200" />
                                                <p>{teaching.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Pagination
                                currentPage={safePage}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </div>
            </section>

            <CTA />
        </>
    );
}

export default function TeachingsPageWrapper() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <Teachings />
        </Suspense>
    );
}
