"use client";

import CTA from "@/components/CTA";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPublishedDoctrines, Doctrine } from "@/lib/firestore";

const ITEMS_PER_PAGE = 9;

const FALLBACK_DOCTRINES: Doctrine[] = [
    {
        imgSrc: "/assets/1.jpg",
        date: "January 1, 2024",
        readingTime: "5 min read",
        title: "The Doctrine of Salvation",
        description: "We believe that salvation is by grace through faith in the Lord Jesus Christ alone, and not by human effort or merit.",
        content: "",
        published: true,
        featured: true,
    },
    {
        imgSrc: "/assets/2.jpg",
        date: "February 10, 2024",
        readingTime: "6 min read",
        title: "The Doctrine of the Holy Bible",
        description: "We believe that the Bible, consisting of the sixty-six books of the Old and New Testaments, is the inspired, infallible, and authoritative Word of God.",
        content: "",
        published: true,
        featured: false,
    },
    {
        imgSrc: "/assets/3.jpg",
        date: "March 5, 2024",
        readingTime: "7 min read",
        title: "The Doctrine of the Trinity",
        description: "We believe in one God, eternally existent in three persons: Father, Son, and Holy Spirit — co-equal, co-eternal, and co-existent.",
        content: "",
        published: true,
        featured: false,
    },
    {
        imgSrc: "/assets/4.jpg",
        date: "April 20, 2024",
        readingTime: "5 min read",
        title: "The Doctrine of Holiness",
        description: "We believe in the call to holy living — that every believer is to be sanctified wholly in spirit, soul, and body for God's glory.",
        content: "",
        published: true,
        featured: false,
    },
];

function Doctrines() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page") ?? "1");

    const [allDoctrines, setAllDoctrines] = useState<Doctrine[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPublishedDoctrines()
            .then((data) => setAllDoctrines(data.length > 0 ? data : FALLBACK_DOCTRINES))
            .catch(() => setAllDoctrines(FALLBACK_DOCTRINES))
            .finally(() => setLoading(false));
    }, []);

    // Featured shown only on page 1
    const featured = currentPage === 1
        ? (allDoctrines.find((d) => d.featured) ?? allDoctrines[0] ?? null)
        : null;
    const featuredIndex = featured ? allDoctrines.indexOf(featured) : -1;
    const rest = allDoctrines.filter((_, i) => i !== featuredIndex);

    const totalPages = Math.ceil(rest.length / ITEMS_PER_PAGE);
    const safePage = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
    const pageItems = rest.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

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
                        <p className="text-sm text-gray-500 mb-1">Bible Doctrine</p>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            What We Believe
                        </h1>
                    </div>
                    <div className="bg-primary p-6 md:p-8 w-full sm:w-72 shrink-0">
                        <div className="w-full h-10 mb-4">
                            <Image width={200} height={40} src="/assets/dlclogo.png" alt="DLCF Logo" className="w-full h-full object-contain" />
                        </div>
                        <p className="text-white text-sm md:text-base">
                            We earnestly contend for the faith once delivered unto the saints — standing firm on sound doctrine and godly living.
                        </p>
                    </div>
                </div>
            </section>

            {loading ? (
                <section className="w-300 mx-auto py-20 text-center text-gray-400 text-sm">
                    Loading doctrines…
                </section>
            ) : allDoctrines.length === 0 ? (
                <section className="w-300 mx-auto py-20 text-center text-gray-400 text-sm">
                    No doctrines published yet.
                </section>
            ) : (
                <>
                    {/* ── FEATURED DOCTRINE ── */}
                    {featured && (
                        <section>
                            <div className="w-300 mx-auto py-10 md:py-20">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
                                    <Link
                                        href={featured.id ? `/bible-doctrine/${featured.id}` : "#"}
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
                                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                            {featured.title}
                                        </h2>
                                        <p className="text-gray-600">{featured.description}</p>
                                        {featured.id && (
                                            <Link
                                                href={`/bible-doctrine/${featured.id}`}
                                                className="text-primary text-sm font-medium hover:underline"
                                            >
                                                Read more →
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ── DOCTRINES GRID ── */}
                    {pageItems.length > 0 && (
                        <section>
                            <div className="w-300 mx-auto pb-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {pageItems.map((doctrine, index) => (
                                        <Link
                                            key={doctrine.id ?? index}
                                            href={doctrine.id ? `/bible-doctrine/${doctrine.id}` : "#"}
                                            className="border border-gray-300 bg-white hover:shadow-md transition-shadow block"
                                        >
                                            <div className="w-full h-48 overflow-hidden">
                                                <Image
                                                    width={600}
                                                    height={300}
                                                    src={doctrine.imgSrc || "/assets/2.jpg"}
                                                    alt={doctrine.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-5 md:p-6">
                                                <div className="flex justify-between mb-2">
                                                    <p className="text-sm text-gray-500">{doctrine.date}</p>
                                                    <p className="text-xs text-gray-400">{doctrine.readingTime}</p>
                                                </div>
                                                <h2 className="text-lg font-bold text-gray-800">{doctrine.title}</h2>
                                                <p className="text-gray-600 text-sm mt-1">{doctrine.description}</p>
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

export default function BibleDoctrinePage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <Doctrines />
        </Suspense>
    );
}
