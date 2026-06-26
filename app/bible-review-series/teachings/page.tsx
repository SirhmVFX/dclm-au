"use client";

import CTA from "@/components/CTA";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPublishedTeachings, Teaching } from "@/lib/firestore";
import { MdVideoLibrary } from "react-icons/md";

const ITEMS_PER_PAGE = 6;

const FALLBACK_TEACHINGS: Teaching[] = [
    { title: "1st Thessalonians", description: "A full review of Paul's first letter to the Thessalonians — covering faith, love, holiness, and the hope of Christ's return.", teacher: "DLCF Teaching Team", bibleVerse: "1 Thessalonians 5:23", date: "February 25, 2024", imgSrc: "/assets/heroimage1.jpg", content: "", published: true, youtubeLinks: [] },
    { title: "Lover of the Broken Heart", description: "A snippet exploring God's deep love and compassion for those who are hurting, brokenhearted, and in need of His healing touch.", teacher: "DLCF Teaching Team", bibleVerse: "Psalm 34:18", date: "June 21, 2024", imgSrc: "/assets/heroimage2.jpg", content: "", published: true, youtubeLinks: [] },
    { title: "Luke 2", description: "A reflection on the second chapter of Luke — the birth of Christ, His presentation at the temple, and His early wisdom.", teacher: "DLCF Teaching Team", bibleVerse: "Luke 2:52", date: "June 21, 2024", imgSrc: "/assets/heroimage1.jpg", content: "", published: true, youtubeLinks: [] },
    { title: "Joy as Jesus Comes", description: "Meditating on the anticipation and joy that fills the heart of every believer as we look forward to the second coming of Jesus.", teacher: "DLCF Teaching Team", bibleVerse: "Philippians 4:4", date: "June 21, 2024", imgSrc: "/assets/heroimage2.jpg", content: "", published: true, youtubeLinks: [] },
    { title: "Believe in God", description: "An encouragement drawn from Scripture to hold fast to genuine, unshakeable faith in God regardless of life's circumstances.", teacher: "DLCF Teaching Team", bibleVerse: "John 14:1", date: "June 21, 2024", imgSrc: "/assets/heroimage1.jpg", content: "", published: true, youtubeLinks: [] },
];

function Teachings() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page") ?? "1");

    const [allTeachings, setAllTeachings] = useState<Teaching[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPublishedTeachings()
            .then((data) => setAllTeachings(data.length > 0 ? data : FALLBACK_TEACHINGS))
            .catch(() => setAllTeachings(FALLBACK_TEACHINGS))
            .finally(() => setLoading(false));
    }, []);

    const totalPages = Math.ceil(allTeachings.length / ITEMS_PER_PAGE);
    const safePage = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
    const pageItems = allTeachings.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

    function setPage(page: number) {
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) params.delete("page"); else params.set("page", String(page));
        router.push(`?${params.toString()}`, { scroll: true });
    }

    return (
        <>
            {/* ── HERO ── */}
            <section>
                <div className="w-300 mx-auto pt-28 md:pt-32 pb-8 text-center">
                    <p>Teachings</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">In-depth Bible Review Series.</h1>
                </div>
            </section>

            {/* ── TEACHINGS GRID ── */}
            <section>
                <div className="w-300 mx-auto py-12 md:py-20">
                    {loading ? (
                        <p className="text-center text-gray-400 text-sm py-20">Loading teachings…</p>
                    ) : allTeachings.length === 0 ? (
                        <p className="text-center text-gray-400 text-sm py-20">No teachings yet.</p>
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
