"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPublishedEvents, type Event } from "@/lib/firestore";
import CTA from "@/components/CTA";
import { MdLocationOn, MdCalendarToday, MdArrowForward } from "react-icons/md";

function statusPill(status: Event["status"]) {
    const map: Record<Event["status"], string> = {
        upcoming: "bg-blue-600 text-white",
        ongoing: "bg-green-600 text-white",
        past: "bg-gray-400 text-white",
    };
    return map[status] ?? "bg-gray-400 text-white";
}

function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | Event["status"]>("all");

    useEffect(() => {
        getPublishedEvents()
            .then(setEvents)
            .catch(() => setEvents([]))
            .finally(() => setLoading(false));
    }, []);

    const filtered = filter === "all" ? events : events.filter((e) => e.status === filter);
    const upcoming = events.filter((e) => e.status === "upcoming");
    const ongoing = events.filter((e) => e.status === "ongoing");
    const past = events.filter((e) => e.status === "past");

    return (
        <>
            {/* HERO */}
            <section className="pt-28 md:pt-32 pb-12">
                <div className="w-300 mx-auto">
                    <p className="text-sm text-primary font-medium uppercase tracking-widest mb-2">What&apos;s On</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Upcoming Events</h1>
                    <p className="text-gray-500 max-w-xl">
                        Join us for conferences, camps, seminars and special services. All are welcome.
                    </p>
                </div>
            </section>

            {/* FILTER TABS */}
            {!loading && events.length > 0 && (
                <section>
                    <div className="w-300 mx-auto mb-8">
                        <div className="flex flex-wrap gap-2">
                            {[
                                { key: "all", label: `All (${events.length})` },
                                { key: "upcoming", label: `Upcoming (${upcoming.length})` },
                                { key: "ongoing", label: `Ongoing (${ongoing.length})` },
                                { key: "past", label: `Past (${past.length})` },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setFilter(tab.key as typeof filter)}
                                    className={`px-4 py-1.5 text-sm border transition-colors ${filter === tab.key
                                            ? "bg-primary text-white border-primary"
                                            : "bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* EVENTS GRID */}
            <section>
                <div className="w-300 mx-auto pb-20">
                    {loading ? (
                        <p className="text-center text-gray-400 text-sm py-20">Loading events…</p>
                    ) : filtered.length === 0 ? (
                        <p className="text-center text-gray-400 text-sm py-20">No events found.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((event, i) => (
                                <Link
                                    key={event.id ?? i}
                                    href={event.id ? `/events/${event.id}` : "#"}
                                    className="group border border-gray-200 bg-white hover:shadow-lg transition-shadow flex flex-col"
                                >
                                    {/* Poster */}
                                    <div className="relative w-full overflow-hidden bg-gray-100">
                                        {event.posterImage ? (
                                            <Image
                                                src={event.posterImage}
                                                alt={event.title}
                                                width={480}
                                                height={640}
                                                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : event.bannerImage ? (
                                            <Image
                                                src={event.bannerImage}
                                                alt={event.title}
                                                width={600}
                                                height={300}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-48 bg-primary/10 flex items-center justify-center">
                                                <MdCalendarToday size={40} className="text-primary/40" />
                                            </div>
                                        )}
                                        {/* Status pill */}
                                        <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-0.5 uppercase tracking-wider ${statusPill(event.status)}`}>
                                            {event.status}
                                        </span>
                                        {event.featured && (
                                            <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 bg-yellow-400 text-yellow-900 uppercase tracking-wider">
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="p-5 flex-1 flex flex-col gap-2">
                                        {event.type && (
                                            <p className="text-xs text-primary font-semibold uppercase tracking-widest">{event.type}</p>
                                        )}
                                        <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{event.title}</h2>
                                        {event.subtitle && <p className="text-sm text-gray-500">{event.subtitle}</p>}

                                        <div className="flex flex-col gap-1 mt-2 text-xs text-gray-500">
                                            {(event.startDate || event.endDate) && (
                                                <span className="flex items-center gap-1.5">
                                                    <MdCalendarToday size={13} className="text-primary shrink-0" />
                                                    {event.startDate}{event.endDate && event.endDate !== event.startDate ? ` – ${event.endDate}` : ""}
                                                </span>
                                            )}
                                            {(event.venueCity || event.venueName) && (
                                                <span className="flex items-center gap-1.5">
                                                    <MdLocationOn size={13} className="text-primary shrink-0" />
                                                    {event.venueCity || event.venueName}
                                                </span>
                                            )}
                                        </div>

                                        {event.theme && (
                                            <p className="text-sm font-semibold text-gray-700 mt-1 italic">"{event.theme}"</p>
                                        )}

                                        <div className="mt-auto pt-3 flex items-center justify-between">
                                            <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                                View Event <MdArrowForward size={15} />
                                            </span>
                                            {event.registrationUrl && event.status !== "past" && (
                                                <span className="text-xs bg-primary text-white px-2 py-1 font-semibold">
                                                    {event.registrationLabel || "Register"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <CTA />
        </>
    );
}

export default function EventsPageWrapper() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <EventsPage />
        </Suspense>
    );
}
