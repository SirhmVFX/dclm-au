
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Leaders from "@/components/Leaders";
import LinkButton from "@/components/LinkButton";
import Image from "next/image";


interface Stat {
    label: string;
    value: string;
    description: string;
}

interface ProcessStep {
    id: string;
    label: string;
    description: string;
}

interface KnownFor {
    label: string;
    description: string;
    imgSrc: string;
}

interface Leader {
    name: string;
    title: string;
    imgSrc: string;
}



function AboutUsPage() {



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
        { label: "Dignity", description: "We uphold the dignity of every individual as a bearer of the image of God, worthy of respect and love.", imgSrc: "/assets/4.jpg" },
        { label: "Excellence", description: "We pursue excellence in both spiritual and academic life, believing a saintly intellectual honours God in all areas.", imgSrc: "/assets/4.jpg" },
        { label: "Faith", description: "We are grounded in the faith once delivered to the saints, standing firm on the Word of God without compromise.", imgSrc: "/assets/4.jpg" },
        { label: "Unity & Love", description: "We are united in love across denominations, building a fellowship where every believer belongs and thrives.", imgSrc: "/assets/4.jpg" },
    ];




    return (
        <>
            <section className="pt-32">

                <div className="w-300 mx-auto flex flex-col items-center mb-16 text-center">
                    <p>About Us </p>
                    <h1 className="text-5xl w-1/2 ">We work in unity and love to touch lives for Christ.</h1>
                </div>

                <div className="w-full h-175 ">
                    <Image
                        width={10000}
                        height={10000}
                        src="/assets/2.jpg"
                        alt="About Us Image"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>


            <section>
                <div className="w-300 mx-auto py-20 flex flex-col items-center">
                    <h1 className="text-4xl w-3/4 text-center  text-gray-700">
                        DLCF Australia is united in its mission to spread the love of Christ and touch lives positively across campuses and communities.
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
                        {stats.map((stat) => (
                            <div key={stat.label} className="bg-primary p-6 flex flex-col gap-8">
                                <h3 className="text-2xl text-blue-300 font-bold mb-2">{stat.value}</h3>
                                <div>
                                    <p className="text-white text-xl font-bold">{stat.label}</p>
                                    <p className="text-sm text-white mt-2">{stat.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            <section>

                <div className="w-300 mx-auto py-20">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 ">

                        <div>
                            <h1 className="text-4xl mb-6">Our Mission</h1>

                            <p className="text-gray-600">
                                The DLCF has a divine mandate to win, build and commission students and staff of institutions of higher learning, and fresh graduate volunteers, to be their best for the Master. It is an inter-denominational fellowship, embracing campus Christians who share the same doctrinal belief irrespective of their denominations and affiliations.
                            </p>
                        </div>

                        <div>
                            <h1 className="text-4xl mb-6">Our Vision</h1>

                            <p className="text-gray-600">
                                Our vision is to raise a generation of saintly intellectuals — believers who excel in both faith and academic life, and who go out to make a lasting, positive impact in Australia and beyond.
                            </p>
                        </div>
                    </div>

                </div>
            </section>


            <section>
                <div className="w-300 mx-auto py-20">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16  ">

                        <div>
                            <h1 className="text-4xl mb-6"> How We Work</h1>

                            <p className="text-gray-600">
                                Our commitment to prayer, true worship, and sound doctrine ensures every member grows spiritually and is equipped to live out their faith with integrity and excellence.
                            </p>

                            <div className="mt-12 space-y-8">
                                {processSteps.map((step) => (
                                    <div key={step.id} className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
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

                        <div>
                            <Image
                                width={10000}
                                height={10000}
                                src="/assets/6.jpg"
                                alt="Mission Image"
                                className="w-full h-full"
                            />
                        </div>

                    </div>

                </div>
            </section>



            <section>
                <div className="max-w-7xl mx-auto py-20 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        {knownFor.map((item) => (
                            <div key={item.label} className="relative w-full h-80 overflow-hidden">
                                {/* Image */}
                                <Image
                                    width={400}
                                    height={400}
                                    src="/assets/4.jpg"
                                    alt={`${item.label} Image`}
                                    className="w-full h-full object-cover"
                                />

                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-black/50"></div>

                                {/* Text Content */}
                                <div className="absolute inset-0 flex flex-col justify-between items-start text-white p-8">
                                    <div>
                                        <h3 className="text-3xl font-semibold mb-2">{item.label}</h3>
                                        <p className="text-gray-200 ">{item.description}</p>
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