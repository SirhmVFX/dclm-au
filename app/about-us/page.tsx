"use client";

import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Leaders from "@/components/Leaders";
import { useReveal } from "@/components/useReveal";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    getAboutHero, getAboutIntro, getAboutMissionVision,
    getAboutHowWeWork, getAboutStats, getAboutProcessSteps, getAboutValues,
    AboutHero, AboutIntro, AboutMissionVision, AboutHowWeWork,
    AboutStat, AboutProcessStep, AboutValue,
} from "@/lib/firestore";

const FALLBACK_STATS: AboutStat[] = [
    { value: "Win", label: "Students & Staff Reached", description: "We actively reach out to students and staff of higher institutions across Australian campuses.", order: 1 },
    { value: "Build", label: "Built in Faith", description: "We disciple and build members in sound doctrine, godly character, and spiritual maturity.", order: 2 },
    { value: "Commission", label: "Sent Forth", description: "We commission believers to go out and make a meaningful impact for the Kingdom of God.", order: 3 },
    { value: "AU", label: "Campuses in Australia", description: "An inter-denominational fellowship active across multiple Australian university campuses.", order: 4 },
];

const FALLBACK_STEPS: AboutProcessStep[] = [
    { stepNumber: "01", label: "Outreach", description: "We reach out to students, staff, and fresh graduates across Australian campuses to introduce them to Christ.", order: 1 },
    { stepNumber: "02", label: "Discipleship", description: "New members are nurtured in sound doctrine and the Word of God through Bible studies and fellowship activities.", order: 2 },
    { stepNumber: "03", label: "Fellowship", description: "We create a warm, inter-denominational community where all believers grow together in unity and love.", order: 3 },
    { stepNumber: "04", label: "Commissioning", description: "We equip and send members out to live as saintly intellectuals, making a positive impact in all areas of life.", order: 4 },
];

const FALLBACK_VALUES: AboutValue[] = [
    { slug: "dignity", label: "Dignity", description: "We uphold the dignity of every individual as a bearer of the image of God, worthy of respect and love.", image: "/assets/4.jpg", order: 1 },
    { slug: "excellence", label: "Excellence", description: "We pursue excellence in both spiritual and academic life, believing a saintly intellectual honours God in all areas.", image: "/assets/4.jpg", order: 2 },
    { slug: "faith", label: "Faith", description: "We are grounded in the faith once delivered to the saints, standing firm on the Word of God without compromise.", image: "/assets/4.jpg", order: 3 },
    { slug: "unity-and-love", label: "Unity & Love", description: "We are united in love across denominations, building a fellowship where every believer belongs and thrives.", image: "/assets/4.jpg", order: 4 },
];

function AboutUsPage() {
    const heroRef = useReveal("animate-fade-up");
    const missionRef = useReveal("animate-fade-up");
    const processRef = useReveal("animate-fade-up");
    const statsRef = useReveal("animate-fade-up");

    const [hero, setHero] = useState<AboutHero | null>(null);
    const [intro, setIntro] = useState<AboutIntro | null>(null);
    const [mv, setMv] = useState<AboutMissionVision | null>(null);
    const [howWeWork, setHowWeWork] = useState<AboutHowWeWork | null>(null);
    const [stats, setStats] = useState<AboutStat[]>(FALLBACK_STATS);
    const [steps, setSteps] = useState<AboutProcessStep[]>(FALLBACK_STEPS);
    const [values, setValues] = useState<AboutValue[]>(FALLBACK_VALUES);

    useEffect(() => {
        Promise.all([
            getAboutHero().catch(() => null),
            getAboutIntro().catch(() => null),
            getAboutMissionVision().catch(() => null),
            getAboutHowWeWork().catch(() => null),
            getAboutStats().catch(() => []),
            getAboutProcessSteps().catch(() => []),
            getAboutValues().catch(() => []),
        ]).then(([h, i, m, w, s, p, v]) => {
            if (h) setHero(h);
            if (i) setIntro(i);
            if (m) setMv(m);
            if (w) setHowWeWork(w);
            if (s.length > 0) setStats(s);
            if (p.length > 0) setSteps(p);
            if (v.length > 0) setValues(v);
        });
    }, []);

    return (
        <>
            {/* ── HERO ── */}
            <section className="pt-32">
                <div ref={heroRef} className="w-300 mx-auto flex flex-col items-center mb-10 md:mb-16 text-center">
                    <p>{hero?.tag ?? "About Us"}</p>
                    <h1 className="text-3xl md:text-5xl w-full md:w-1/2">
                        {hero?.heading ?? "We work in unity and love to touch lives for Christ."}
                    </h1>
                </div>
                <div className="w-full h-56 sm:h-96 md:h-176 relative overflow-hidden">
                    <Image
                        fill
                        src={hero?.image || "/assets/2.jpg"}
                        alt="About Us Image"
                        className="object-cover"
                        priority
                    />
                </div>
            </section>

            {/* ── INTRO + STATS ── */}
            <section>
                <div className="w-300 mx-auto py-12 md:py-20 flex flex-col items-center">
                    <div ref={missionRef}>
                        <h1 className="text-2xl md:text-4xl w-full md:w-3/4 mx-auto text-center text-gray-700">
                            {intro?.heading ?? "DLCF Australia is united in its mission to spread the love of Christ and touch lives positively across campuses and communities."}
                        </h1>
                    </div>
                    <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-10 md:mt-12 w-full">
                        {stats.map((stat, i) => (
                            <div key={stat.id ?? i} className={`bg-primary p-6 flex flex-col gap-6 reveal delay-${(i + 1) * 100}`}>
                                <h3 className="text-2xl text-blue-300 font-bold">{stat.value}</h3>
                                <div>
                                    <p className="text-white text-lg font-bold">{stat.label}</p>
                                    <p className="text-sm text-white mt-2">{stat.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MISSION & VISION ── */}
            <section>
                <div className="w-300 mx-auto py-12 md:py-20">
                    <div ref={processRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                        <div>
                            <h1 className="text-3xl md:text-4xl mb-6">{mv?.missionTitle ?? "Our Mission"}</h1>
                            <p className="text-gray-600">{mv?.missionText ?? "The DLCF has a divine mandate to win, build and commission students and staff of institutions of higher learning, and fresh graduate volunteers, to be their best for the Master. It is an inter-denominational fellowship, embracing campus Christians who share the same doctrinal belief irrespective of their denominations and affiliations."}</p>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl mb-6">{mv?.visionTitle ?? "Our Vision"}</h1>
                            <p className="text-gray-600">{mv?.visionText ?? "Our vision is to raise a generation of saintly intellectuals — believers who excel in both faith and academic life, and who go out to make a lasting, positive impact in Australia and beyond."}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── HOW WE WORK ── */}
            <section>
                <div className="w-300 mx-auto py-12 md:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                        <div ref={processRef}>
                            <h1 className="text-3xl md:text-4xl mb-6">{howWeWork?.heading ?? "How We Work"}</h1>
                            <p className="text-gray-600">{howWeWork?.description ?? "Our commitment to prayer, true worship, and sound doctrine ensures every member grows spiritually and is equipped to live out their faith with integrity and excellence."}</p>
                            <div className="mt-10 space-y-8">
                                {steps.map((step, i) => (
                                    <div key={step.id ?? i} className={`flex items-start gap-4 reveal delay-${(i + 1) * 100}`}>
                                        <div className="shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                                            {step.stepNumber}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">{step.label}</h3>
                                            <p className="text-gray-600">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="hidden md:block relative h-full min-h-96">
                            <Image
                                fill
                                src={howWeWork?.image || "/assets/6.jpg"}
                                alt="How We Work"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── VALUES GRID ── */}
            <section>
                <div className="w-300 mx-auto py-12 md:py-20 px-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16">
                        {values.map((item, i) => (
                            <Link
                                key={item.id ?? i}
                                href={item.slug ? `/about-us/values/${item.slug}` : "#"}
                                className="relative w-full h-64 md:h-80 overflow-hidden block group"
                            >
                                <div className="absolute inset-0">
                                    <Image
                                        src={item.image || "/assets/4.jpg"}
                                        alt={item.label}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/50" />
                                <div className="absolute inset-0 flex flex-col justify-between items-start text-white p-6 md:p-8">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-semibold mb-2">{item.label}</h3>
                                        <p className="text-gray-200 text-sm md:text-base">{item.description}</p>
                                    </div>
                                    <span className="text-blue-300 text-sm font-medium group-hover:underline">
                                        Learn More →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Leaders />
            <FAQ />
            <CTA />
        </>
    );
}

export default AboutUsPage;
