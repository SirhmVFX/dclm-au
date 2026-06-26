"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTeaching, Teaching } from "@/lib/firestore";
import CTA from "@/components/CTA";

type Tab = "notes" | "recordings";

function getYoutubeEmbedId(raw: string): string | null {
    if (!raw?.trim()) return null;
    let url = raw.trim();

    // Add scheme if missing so URL() can parse it
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;

    try {
        const u = new URL(url);
        const host = u.hostname.replace(/^www\./, "");

        // youtu.be/<id>
        if (host === "youtu.be") {
            const id = u.pathname.split("/").filter(Boolean)[0];
            return id || null;
        }

        // youtube.com/watch?v=<id>
        if (host === "youtube.com" || host === "m.youtube.com") {
            // /watch?v=
            const v = u.searchParams.get("v");
            if (v) return v;

            // /embed/<id>
            // /shorts/<id>
            // /live/<id>
            const parts = u.pathname.split("/").filter(Boolean);
            const prefixes = ["embed", "shorts", "live", "v"];
            const idx = parts.findIndex((p) => prefixes.includes(p));
            if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
        }
    } catch {
        // not a valid URL even after adding scheme
    }

    // Last resort — bare video ID (11 alphanumeric chars)
    if (/^[A-Za-z0-9_-]{11}$/.test(raw.trim())) return raw.trim();

    return null;
}

export default function TeachingDetailPage() {
    const { id } = useParams<{ id: string }>();
    const searchParams = useSearchParams();
    const [teaching, setTeaching] = useState<Teaching | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>(() =>
        searchParams.get("tab") === "recordings" ? "recordings" : "notes"
    );

    useEffect(() => {
        if (!id) return;
        getTeaching(id)
            .then((data) => {
                if (!data || !data.published) { setNotFound(true); return; }
                setTeaching(data);
                // If no written content but has recordings, default to recordings tab
                // (only when no ?tab param was set explicitly)
                if (!data.content && (data.youtubeLinks?.length ?? 0) > 0 && searchParams.get("tab") !== "notes") {
                    setActiveTab("recordings");
                }
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

    const hasRecordings = (teaching.youtubeLinks?.length ?? 0) > 0;
    const hasNotes = !!teaching.content;

    return (
        <>
            {/* ── HERO IMAGE ── */}
            {teaching.imgSrc && (
                <div className="w-full h-64 sm:h-80 md:h-105 mt-16 md:mt-20 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <Image src={teaching.imgSrc} alt={teaching.title} fill className="object-cover" priority />
                    </div>
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-0 flex flex-col justify-end pb-10 w-300 mx-auto px-4">
                        <Link href="/bible-review-series/teachings" className="text-white/80 text-sm hover:text-white mb-3">← Teachings</Link>
                        <div className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 uppercase tracking-widest mb-3 w-fit">Bible Review Series</div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">{teaching.title}</h1>
                    </div>
                </div>
            )}

            <div className="w-300 mx-auto py-10 md:py-14 max-w-3xl">
                {/* Back link + title (no hero image case) */}
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

                {/* ── TABS ── only show tabs when both notes and recordings exist */}
                {hasNotes && hasRecordings ? (
                    <>
                        {/* Tab bar */}
                        <div className="flex border-b border-gray-200 mb-8">
                            <button
                                onClick={() => setActiveTab("notes")}
                                className={`px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === "notes"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                Teaching Notes
                            </button>
                            <button
                                onClick={() => setActiveTab("recordings")}
                                className={`px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors flex items-center gap-2 ${activeTab === "recordings"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                Recordings
                                <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-sm font-semibold">
                                    {teaching.youtubeLinks.length}
                                </span>
                            </button>
                        </div>

                        {/* Tab panels */}
                        {activeTab === "notes" && (
                            <NotesPanel content={teaching.content} />
                        )}
                        {activeTab === "recordings" && (
                            <RecordingsPanel links={teaching.youtubeLinks} />
                        )}
                    </>
                ) : hasNotes ? (
                    <NotesPanel content={teaching.content} />
                ) : hasRecordings ? (
                    <RecordingsPanel links={teaching.youtubeLinks} />
                ) : (
                    <p className="text-gray-500 italic">Full teaching content coming soon.</p>
                )}
            </div>

            <CTA />
        </>
    );
}

// ── Sub-components ────────────────────────────────────────

function NotesPanel({ content }: { content: string }) {
    return (
        <div
            className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-primary prose-blockquote:border-primary prose-blockquote:italic"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}

function RecordingsPanel({ links }: { links: Teaching["youtubeLinks"] }) {
    const [active, setActive] = useState(0);

    if (!links?.length) return null;

    const current = links[active];
    const embedId = getYoutubeEmbedId(current.url);

    return (
        <div className="space-y-6">
            {/* Main embed */}
            <div className="w-full aspect-video bg-black">
                {embedId ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${embedId}`}
                        title={current.title || `Recording ${active + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/50 text-sm">
                        Invalid YouTube URL
                    </div>
                )}
            </div>

            {/* Current title */}
            {current.title && (
                <p className="text-base font-semibold text-gray-800">{current.title}</p>
            )}

            {/* Playlist — only show if more than one recording */}
            {links.length > 1 && (
                <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">All Recordings</p>
                    <div className="space-y-2">
                        {links.map((link, i) => {
                            const vid = getYoutubeEmbedId(link.url);
                            return (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    className={`w-full flex items-center gap-3 p-3 border text-left transition-colors ${i === active
                                        ? "border-primary bg-primary/5"
                                        : "border-gray-200 hover:border-gray-300 bg-white"
                                        }`}
                                >
                                    {/* Thumbnail */}
                                    <div className="w-20 h-12 shrink-0 bg-gray-100 overflow-hidden">
                                        {vid ? (
                                            <Image
                                                src={`https://img.youtube.com/vi/${vid}/mqdefault.jpg`}
                                                alt=""
                                                width={120}
                                                height={68}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200" />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className={`text-sm font-medium truncate ${i === active ? "text-primary" : "text-gray-800"}`}>
                                            {link.title || `Recording ${i + 1}`}
                                        </p>
                                        <p className="text-xs text-gray-400 truncate">{link.url}</p>
                                    </div>
                                    {/* Playing indicator */}
                                    {i === active && (
                                        <span className="text-xs text-primary font-semibold shrink-0">▶ Playing</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
