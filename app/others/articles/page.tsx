"use client";

import CTA from "@/components/CTA";
import { useReveal } from "@/components/useReveal";
import Image from "next/image";

function Articles() {
    const heroRef = useReveal("animate-fade-up");
    const featuredRef = useReveal("animate-slide-left");
    const gridRef = useReveal("animate-fade-up");

    const articles = [
        {
            imgSrc: "/assets/1.jpg",
            date: "February 25, 2024",
            readingTime: "5 min read",
            title: "The Lighthouse at the Harbour",
            description: "The Southern Cross is a constellation of stars used in navigation in the Southern Hemisphere — an emblem found on our national flag, pointing us to something greater."
        },
        {
            imgSrc: "/assets/2.jpg",
            date: "February 25, 2024",
            readingTime: "7 min read",
            title: "Humanity: Awesome Potential Beset by Innate Limits",
            description: "Today we see unprecedented development in every field of human endeavour — yet new accomplishments in Medicine, Engineering, and AI reveal how much humanity still needs God."
        },
        {
            imgSrc: "/assets/3.jpg",
            date: "February 25, 2024",
            readingTime: "6 min read",
            title: "The Sacredness of Human Existence",
            description: "Our civilization today upholds the sacredness of life — yet the deepest questions of human dignity and purpose find their answer only in the Creator."
        },
        {
            imgSrc: "/assets/4.jpg",
            date: "February 25, 2024",
            readingTime: "8 min read",
            title: "The Oasis in the Desert",
            description: "Humanity has never witnessed the prosperity we enjoy today — we live longer and healthier — yet unexpectedly, we are not happier. Where is the true oasis?"
        },
    ];

    return (
        <>
            {/* ── HERO ── */}
            <section>
                <div ref={heroRef} className="w-300 mx-auto pt-28 md:pt-32 pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                        <p>Articles</p>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Insights to strengthen your faith.</h1>
                    </div>
                    <div className="bg-primary p-6 md:p-8 w-full sm:w-72 md:w-75 shrink-0">
                        <div className="w-full h-10 mb-4">
                            <Image
                                width={200}
                                height={40}
                                src="/assets/dlclogo.png"
                                alt="DLCF Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <p className="text-white text-sm md:text-base">
                            Explore articles, reflections, and insights from DLCF Australia to inspire your journey of faith and godly living
                        </p>
                    </div>
                </div>
            </section>

            {/* ── FEATURED ARTICLE ── */}
            <section>
                <div className="w-300 mx-auto py-10 md:py-20">
                    {articles[0] && (
                        <div ref={featuredRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
                            <div className="w-full h-56 md:h-full">
                                <Image
                                    width={800}
                                    height={600}
                                    src={articles[0].imgSrc}
                                    alt={articles[0].title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-center gap-3">
                                <div className="flex justify-between">
                                    <p className="text-sm text-gray-500">{articles[0].date}</p>
                                    <p className="text-xs text-gray-400">{articles[0].readingTime}</p>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800">{articles[0].title}</h2>
                                <p className="text-gray-600">{articles[0].description}</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ── ARTICLES GRID ── */}
            <section>
                <div className="w-300 mx-auto pb-12 md:pb-20">
                    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {articles.slice(1).map((article, index) => (
                            <div key={index} className={`border border-gray-300 reveal delay-${(index + 1) * 100}`}>
                                <div className="w-full h-48">
                                    <Image
                                        width={600}
                                        height={300}
                                        src={article.imgSrc}
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
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTA />
        </>
    );
}

export default Articles;
