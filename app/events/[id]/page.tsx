"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getEvent, type Event } from "@/lib/firestore";
import CTA from "@/components/CTA";
import {
    MdLocationOn, MdCalendarToday, MdPhone, MdEmail,
    MdLanguage, MdArrowBack, MdPeople, MdAccessTime,
} from "react-icons/md";

function EventDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [lightbox, setLightbox] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        getEvent(id)
            .then((data) => {
                if (!data || !data.published) { setNotFound(true); return; }
                setEvent(data);
                import("@/lib/analytics").then(({ trackItemView }) =>
                    trackItemView(id, "event", data.title, `/events/${id}`)
                );
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <main className="min-h-screen flex items-center justify-center"><p className="text-gray-400 text-sm">Loading…</p></main>;
    }
    if (notFound || !event) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-gray-600">Event not found.</p>
                <Link href="/events" className="text-primary underline text-sm">← Back to Events</Link>
            </main>
        );
    }

    const hasPoster = !!event.posterImage;
    const hasBanner = !!event.bannerImage;
    const allImages = [
        ...(hasPoster ? [event.posterImage] : []),
        ...(hasBanner ? [event.bannerImage] : []),
        ...(event.galleryImages ?? []),
    ];

    return (
        <>
            {/* ── HERO BANNER ── */}
            {hasBanner ? (
                <div className="relative w-full h-72 sm:h-96 md:h-[500px] mt-16 md:mt-20 overflow-hidden">
                    <Image src={event.bannerImage} alt={event.title} fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end pb-10 w-300 mx-auto px-4">
                        <Link href="/events" className="text-white/70 text-sm hover:text-white mb-4 flex items-center gap-1 w-fit">
                            <MdArrowBack size={15} /> All Events
                        </Link>
                        {event.type && (
                            <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 uppercase tracking-widest mb-3 w-fit">
                                {event.type}
                            </span>
                        )}
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">{event.title}</h1>
                        {event.subtitle && <p className="text-white/80 text-lg mt-2">{event.subtitle}</p>}
                    </div>
                </div>
            ) : (
                <div className="w-300 mx-auto pt-28 md:pt-32 pb-4">
                    <Link href="/events" className="text-primary text-sm hover:underline flex items-center gap-1 mb-6 w-fit">
                        <MdArrowBack size={15} /> All Events
                    </Link>
                    {event.type && (
                        <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 uppercase tracking-widest mb-3">
                            {event.type}
                        </span>
                    )}
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">{event.title}</h1>
                    {event.subtitle && <p className="text-gray-500 text-lg mt-2">{event.subtitle}</p>}
                </div>
            )}

            {/* ── MAIN CONTENT ── */}
            <div className="w-300 mx-auto py-10 md:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">

                    {/* ── LEFT: MAIN INFO ── */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Theme & Tagline */}
                        {(event.theme || event.tagline) && (
                            <div className="border-l-4 border-primary pl-5 space-y-1">
                                {event.theme && <p className="text-xl md:text-2xl font-bold text-gray-800">{event.theme}</p>}
                                {event.tagline && <p className="text-primary font-semibold text-lg">{event.tagline}</p>}
                            </div>
                        )}

                        {/* Scripture */}
                        {(event.bibleText || event.biblePassage) && (
                            <div className="bg-primary/5 border border-primary/20 p-6 space-y-3">
                                {event.bibleText && (
                                    <blockquote className="text-gray-700 italic text-base leading-relaxed">
                                        &ldquo;{event.bibleText}&rdquo;
                                    </blockquote>
                                )}
                                {event.biblePassage && (
                                    <p className="text-primary font-bold text-sm uppercase tracking-widest">{event.biblePassage}</p>
                                )}
                            </div>
                        )}

                        {/* Description */}
                        {event.description && (
                            <div
                                className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-primary"
                                dangerouslySetInnerHTML={{ __html: event.description }}
                            />
                        )}

                        {/* Highlights / Pillars */}
                        {event.highlights?.length > 0 && (
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Event Pillars</h2>
                                <div className="flex flex-wrap gap-3">
                                    {event.highlights.map((h, i) => (
                                        <span key={i} className="px-5 py-2 border-2 border-primary text-primary font-bold text-sm uppercase tracking-widest">
                                            {h}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Schedule */}
                        {event.schedule?.length > 0 && (
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Programme Schedule</h2>
                                <div className="divide-y divide-gray-100 border border-gray-200">
                                    {event.schedule.map((s, i) => (
                                        <div key={i} className="flex items-start gap-4 px-5 py-4">
                                            <MdAccessTime size={18} className="text-primary mt-0.5 shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800">{s.day}</p>
                                                <p className="text-primary font-medium text-sm">{s.time}</p>
                                                {s.description && <p className="text-gray-500 text-sm mt-0.5">{s.description}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Speakers */}
                        {event.speakers?.length > 0 && (
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Ministers / Speakers</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                                    {event.speakers.map((sp, i) => (
                                        <div key={i} className="text-center space-y-2">
                                            <div className="relative w-24 h-24 mx-auto overflow-hidden border-2 border-primary/30">
                                                {sp.image ? (
                                                    <Image src={sp.image} alt={sp.name} fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                                        <MdPeople size={32} className="text-primary/40" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">{sp.name}</p>
                                                {sp.title && <p className="text-xs text-gray-500">{sp.title}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {event.featuring && (
                                    <p className="text-sm text-gray-600 mt-4 flex items-center gap-1.5">
                                        <MdPeople size={15} className="text-primary" />
                                        Also featuring: <span className="font-semibold text-gray-800">{event.featuring}</span>
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Gallery */}
                        {allImages.length > 1 && (
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Gallery</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {allImages.map((img, i) => (
                                        <button key={i} onClick={() => setLightbox(img)} className="relative overflow-hidden aspect-square group">
                                            <Image src={img} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── RIGHT: SIDEBAR ── */}
                    <div className="space-y-6">

                        {/* Poster */}
                        {hasPoster && (
                            <div className="border border-gray-200 overflow-hidden">
                                <Image src={event.posterImage} alt={`${event.title} poster`} width={400} height={560} className="w-full object-contain" />
                            </div>
                        )}

                        {/* Key Details Card */}
                        <div className="border border-gray-200 p-5 space-y-4">
                            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-widest border-b border-gray-100 pb-2">Event Details</h3>

                            {(event.startDate || event.endDate) && (
                                <div className="flex gap-3">
                                    <MdCalendarToday size={18} className="text-primary mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Date</p>
                                        <p className="text-sm font-semibold text-gray-800">{event.startDate}</p>
                                        {event.endDate && event.endDate !== event.startDate && (
                                            <p className="text-sm text-gray-600">to {event.endDate}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {(event.venueName || event.venueCity) && (
                                <div className="flex gap-3">
                                    <MdLocationOn size={18} className="text-primary mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Venue</p>
                                        {event.venueName && <p className="text-sm font-semibold text-gray-800">{event.venueName}</p>}
                                        {event.venueAddress && <p className="text-sm text-gray-600">{event.venueAddress}</p>}
                                        {event.venueCity && <p className="text-sm text-gray-600">{event.venueCity}</p>}
                                        {event.venueMapUrl && (
                                            <a href={event.venueMapUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">
                                                View on map →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {event.targetAudience && (
                                <div className="flex gap-3">
                                    <MdPeople size={18} className="text-primary mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Who Should Attend</p>
                                        <p className="text-sm font-semibold text-gray-800">{event.targetAudience}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Registration CTA */}
                        {event.registrationUrl && event.status !== "past" && (
                            <a
                                href={event.registrationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-primary text-white text-center font-bold py-4 text-base hover:bg-primary/90 transition-colors"
                            >
                                {event.registrationLabel || "Register Here"} →
                            </a>
                        )}

                        {/* Contact */}
                        {(event.contactPhone || event.contactEmail || event.websiteUrl) && (
                            <div className="border border-gray-200 p-5 space-y-3">
                                <h3 className="font-bold text-gray-800 text-sm uppercase tracking-widest border-b border-gray-100 pb-2">Contact</h3>
                                {event.contactPhone && (
                                    <a href={`tel:${event.contactPhone}`} className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary">
                                        <MdPhone size={15} className="text-primary" /> {event.contactPhone}
                                    </a>
                                )}
                                {event.contactEmail && (
                                    <a href={`mailto:${event.contactEmail}`} className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary">
                                        <MdEmail size={15} className="text-primary" /> {event.contactEmail}
                                    </a>
                                )}
                                {event.websiteUrl && (
                                    <a href={event.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary">
                                        <MdLanguage size={15} className="text-primary" /> {event.websiteUrl.replace(/^https?:\/\//, "")}
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Back link */}
                        <Link href="/events" className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors">
                            <MdArrowBack size={14} /> Back to all events
                        </Link>
                    </div>
                </div>
            </div>

            <CTA />

            {/* Lightbox */}
            {lightbox && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setLightbox(null)}
                >
                    <button className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl" onClick={() => setLightbox(null)}>×</button>
                    <div className="relative max-w-3xl max-h-full w-full h-full" onClick={(e) => e.stopPropagation()}>
                        <Image src={lightbox} alt="" fill className="object-contain" />
                    </div>
                </div>
            )}
        </>
    );
}

export default function EventDetailPageWrapper() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <EventDetailPage />
        </Suspense>
    );
}
