"use client";

import CTA from "@/components/CTA";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { getPublishedDoctrines, Doctrine } from "@/lib/firestore";

const FALLBACK_DOCTRINES: Doctrine[] = [
    { order: 1, imgSrc: "/assets/1.jpg", date: "January 1, 2024", readingTime: "5 min read", title: "The Doctrine of Salvation", description: "We believe that salvation is by grace through faith in the Lord Jesus Christ alone, and not by human effort or merit. It is the free gift of God to all who believe.", content: "", published: true, featured: false },
    { order: 2, imgSrc: "/assets/2.jpg", date: "February 10, 2024", readingTime: "6 min read", title: "The Doctrine of the Holy Bible", description: "We believe that the Bible, consisting of the sixty-six books of the Old and New Testaments, is the inspired, infallible, and authoritative Word of God.", content: "", published: true, featured: false },
    { order: 3, imgSrc: "/assets/3.jpg", date: "March 5, 2024", readingTime: "7 min read", title: "The Doctrine of the Trinity", description: "We believe in one God, eternally existent in three persons: Father, Son, and Holy Spirit — co-equal, co-eternal, and co-existent.", content: "", published: true, featured: false },
    { order: 4, imgSrc: "/assets/4.jpg", date: "April 20, 2024", readingTime: "5 min read", title: "The Doctrine of Holiness", description: "We believe in the call to holy living — that every believer is to be sanctified wholly in spirit, soul, and body for God's glory.", content: "", published: true, featured: false },
    { order: 5, imgSrc: "/assets/1.jpg", date: "May 15, 2024", readingTime: "6 min read", title: "The Doctrine of the Second Coming", description: "We believe in the personal, visible, and imminent return of the Lord Jesus Christ to receive His Church and to judge the world in righteousness.", content: "", published: true, featured: false },
    { order: 6, imgSrc: "/assets/2.jpg", date: "June 1, 2024", readingTime: "5 min read", title: "The Doctrine of Prayer", description: "We believe that prayer is the believer's vital communion with God — and that through persistent, faith-filled prayer, great things are accomplished for His Kingdom.", content: "", published: true, featured: false },
];

function DoctrinesContent() {
    const [doctrines, setDoctrines] = useState<Doctrine[]>([]);
    const [loading, setLoading] = useState(true);
    const [openId, setOpenId] = useState<string | null>(null);

    useEffect(() => {
        getPublishedDoctrines()
            .then((data) => setDoctrines(data.length > 0 ? data : FALLBACK_DOCTRINES))
            .catch(() => setDoctrines(FALLBACK_DOCTRINES))
            .finally(() => setLoading(false));
    }, []);

    const toggle = (id: string) => setOpenId(prev => prev === id ? null : id);

    return (
        <>
            {/* ── HERO ── */}
            <section className="bg-primary">
                <div className="w-300 mx-auto pt-28 md:pt-36 pb-16 md:pb-20">
                    <div className="max-w-2xl">
                        <p className="text-white/60 uppercase tracking-widest text-xs font-semibold mb-4">
                            What We Believe
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                            Bible Doctrine
                        </h1>
                        <p className="text-white/80 text-base md:text-lg leading-relaxed">
                            We earnestly contend for the faith once delivered unto the saints. These are the
                            foundational truths that guide every aspect of our fellowship and daily walk with God.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── INTRO BANNER ── */}
            <section className="border-b border-gray-200 bg-gray-50">
                <div className="w-300 mx-auto py-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
                    {[
                        { num: "66", label: "Books of Scripture" },
                        { num: "3", label: "Persons of the Trinity" },
                        { num: "1", label: "Way of Salvation" },
                    ].map((s) => (
                        <div key={s.label} className="flex items-baseline gap-3">
                            <span className="text-3xl md:text-4xl font-bold text-primary">{s.num}</span>
                            <span className="text-gray-600 text-sm font-medium uppercase tracking-wide">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── DOCTRINES ── */}
            <section className="w-300 mx-auto py-12 md:py-20">
                {loading ? (
                    <p className="text-gray-400 text-sm text-center py-12">Loading doctrines…</p>
                ) : doctrines.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-12">No doctrines published yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {doctrines.map((doctrine, index) => {
                            const key = doctrine.id ?? String(index);
                            const isOpen = openId === key;
                            const hasDetail = !!doctrine.id && !!doctrine.content;

                            return (
                                <div
                                    key={key}
                                    className={`border transition-all duration-300 ${isOpen ? "border-primary shadow-md" : "border-gray-200 hover:border-primary/40"}`}
                                >
                                    {/* Card header */}
                                    <button
                                        className="w-full text-left p-6 flex items-start gap-4 group"
                                        onClick={() => toggle(key)}
                                        aria-expanded={isOpen}
                                    >
                                        {/* Number badge */}
                                        <span className={`shrink-0 w-10 h-10 flex items-center justify-center text-sm font-bold transition-colors ${isOpen ? "bg-primary text-white" : "bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary"}`}>
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <h2 className={`text-base md:text-lg font-bold leading-snug transition-colors ${isOpen ? "text-primary" : "text-gray-800"}`}>
                                                {doctrine.title}
                                            </h2>
                                            <p className="text-xs text-gray-400 mt-1">{doctrine.date} · {doctrine.readingTime}</p>
                                        </div>
                                        {/* Chevron */}
                                        <span className={`shrink-0 text-xl leading-none text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-45 text-primary" : ""}`}>
                                            +
                                        </span>
                                    </button>

                                    {/* Expandable body */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}
                                        style={{ transitionTimingFunction: "ease" }}
                                    >
                                        <div className="px-6 pb-6 pl-20 space-y-4">
                                            {/* Cover image (small) */}
                                            {doctrine.imgSrc && (
                                                <div className="w-full h-40 overflow-hidden">
                                                    <Image
                                                        src={doctrine.imgSrc}
                                                        alt={doctrine.title}
                                                        width={600}
                                                        height={200}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {doctrine.description}
                                            </p>
                                            {hasDetail && (
                                                <Link
                                                    href={`/bible-doctrine/${doctrine.id}`}
                                                    className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:underline"
                                                >
                                                    Read full doctrine
                                                    <span aria-hidden>→</span>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* ── SCRIPTURE BANNER ── */}
            <section className="bg-primary/5 border-y border-primary/20">
                <div className="w-300 mx-auto py-12 md:py-16 text-center max-w-2xl">
                    <p className="text-primary/60 text-xs uppercase tracking-widest mb-4 font-semibold">
                        Our Anchor
                    </p>
                    <blockquote className="text-gray-800 text-xl md:text-2xl font-semibold leading-relaxed mb-4">
                        &ldquo;Jude, the servant of Jesus Christ… exhorted you that ye should earnestly contend
                        for the faith which was once delivered unto the saints.&rdquo;
                    </blockquote>
                    <cite className="text-primary text-sm font-medium not-italic">Jude 1:3</cite>
                </div>
            </section>

            <CTA />
        </>
    );
}

export default function BibleDoctrinePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-primary" />}>
            <DoctrinesContent />
        </Suspense>
    );
}
