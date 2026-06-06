"use client";

import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Leaders from "@/components/Leaders";
import LinkButton from "@/components/LinkButton";
import { useReveal } from "@/components/useReveal";
import Image from "next/image";

function AboutUsPage() {
    const heroRef = useReveal("animate-fade-up");
    const missionRef = useReveal("animate-fade-up");
    const processRef = useReveal("animate-fade-up");
    const valuesRef = useReveal("animate-fade-up");
    const statsRef = useReveal("animate-fade-up");

    const stats = [
        { label: "Students & Staff Reached", value: "Win", description: "We actively reach out to students and staff of higher institutions across Australian campuses." },
        { label: "Built in Faith", value: "Build", description: "We disciple and build members in sound doctrine, godly character, and spiritual maturity." },
        { label: "Sent Forth", value: "Commission", description: "We commission believers to go out and make a meaningful impact for the Kingdom of God." },
        { label: "Campuses in Australia", value: "AU", description: "An inter-denominational fellowship active across multiple Australian university campuses." },
    ];

    const processSteps = [
        { id: "01", label: "Outreach", description: "We reach out to students, staff, and fresh graduates across Australian campuses to introduce them to Christ." },
        { id: "02", label: "Discipleship", description: "New members are nurtured in sound doctrine and the Word of God through Bible studies and fellowship activities." },
        { id: "03", label: "Fellowship", description: "We create a warm, inter-denominational community where all believers grow together in unity and love." },
        { id: "04", label: "Commissioning", description: "We equip and send members out to live as saintly intellectuals, making a positive impact in all areas of life." },
    ];

    const knownFor = [
        { label: "Dignity", description: "We uphold the dignity of every individual as a bearer of the image of God, worthy of respect and love." },
        { label: "Excellence", description: "We pursue excellence in both spiritual and academic life, believing a saintly intellectual honours God in all areas." },
        { label: "Faith", description: "We are grounded in the faith once delivered to the saints, standing firm on the Word of God without compromise." },
        { label: "Unity & Love", description: "We are united in love across denominations, building a fellowship where every believer belongs and thrives." },
    ];

    return (
        <>
            {/* ── HERO ── */}
            <section className="pt-32">
                <div ref={heroRef} className="w-300 mx-auto flex flex-col items-center mb-10 md:mb-16 text-center">
                    <p>About Us</p>
                    <h1 className="text-3xl md:text-5xl w-full md:w-1/2">We work in unity and love to touch lives for Christ.</h1>
                </div>
                <div className="w-full h-56 sm:h-96 md:h-[44rem]">
                    <Image
                        width={1600}
                        height={900}
                        src="/assets/2.jpg"
                        alt="About Us Image"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* ── INTRO + STATS ── */}
            <section>
                <div className="w-300 mx-auto py-12 md:py-20 flex flex-col items-center">
                    <div ref={missionRef}>
                        <h1 className="text-2xl md:text-4xl w-full md:w-3/4 mx-auto text-center text-gray-700">
                            DLCF Australia is united in its mission to spread the love of Christ and touch lives positively across campuses and communities.
                        </h1>
                    </div>

                    <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-10 md:mt-12 w-full">
                        {stats.map((stat, i) => (
                            <div key={stat.label} className={`bg-primary p-6 flex flex-col gap-6 reveal delay-${(i + 1) * 100}`}>
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
                            <h1 className="text-3xl md:text-4xl mb-6">Our Mission</h1>
                            <p className="text-gray-600">
                                The DLCF has a divine mandate to win, build and commission students and staff of institutions of higher learning, and fresh graduate volunteers, to be their best for the Master. It is an inter-denominational fellowship, embracing campus Christians who share the same doctrinal belief irrespective of their denominations and affiliations.
                            </p>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl mb-6">Our Vision</h1>
                            <p className="text-gray-600">
                                Our vision is to raise a generation of saintly intellectuals — believers who excel in both faith and academic life, and who go out to make a lasting, positive impact in Australia and beyond.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── HOW WE WORK ── */}
            <section>
                <div className="w-300 mx-auto py-12 md:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                        <div ref={processRef}>
                            <h1 className="text-3xl md:text-4xl mb-6">How We Work</h1>
                            <p className="text-gray-600">
                                Our commitment to prayer, true worship, and sound doctrine ensures every member grows spiritually and is equipped to live out their faith with integrity and excellence.
                            </p>
                            <div className="mt-10 space-y-8">
                                {processSteps.map((step, i) => (
                                    <div key={step.id} className={`flex items-start gap-4 reveal delay-${(i + 1) * 100}`}>
                                        <div className="shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                                            {step.id}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">{step.label}</h3>
                                            <p className="text-gray-600">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <Image
                                width={800}
                                height={900}
                                src="/assets/6.jpg"
                                alt="Mission Image"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── VALUES GRID ── */}
            <section>
                <div className="w-300 mx-auto py-12 md:py-20 px-0">
                    <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16">
                        {knownFor.map((item, i) => (
                            <div key={item.label} className={`relative w-full h-64 md:h-80 overflow-hidden reveal delay-${(i % 2 + 1) * 200}`}>
                                <Image
                                    width={800}
                                    height={600}
                                    src="/assets/4.jpg"
                                    alt={`${item.label} Image`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50" />
                                <div className="absolute inset-0 flex flex-col justify-between items-start text-white p-6 md:p-8">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-semibold mb-2">{item.label}</h3>
                                        <p className="text-gray-200 text-sm md:text-base">{item.description}</p>
                                    </div>
                                    <LinkButton title="Learn More" />
                                </div>
                            </div>
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
