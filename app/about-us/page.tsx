
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
        { label: "Projects Completed", value: "150+", description: "Successfully delivered renewable energy solutions to clients worldwide." },
        { label: "Satisfied Clients", value: "120+", description: "Happy customers who trust our renewable energy solutions." },
        { label: "Awards Won", value: "10", description: "Recognized for excellence in sustainable energy innovation." },
        { label: "Global Presence", value: "5 Continents", description: "Operating in multiple countries to promote renewable energy globally." },
    ];

    const processSteps = [
        { id: "01", label: "Consultation", description: "We assess your energy needs and goals to recommend the best renewable solutions." },
        { id: "02", label: "Design & Planning", description: "Our experts create a customized plan tailored to your specific requirements." },
        { id: "03", label: "Installation", description: "Our skilled technicians handle the installation process with precision and care." },
        { id: "04", label: "Maintenance & Support", description: "We provide ongoing support to ensure your system operates efficiently." },
    ];

    const knownFor = [
        { label: "Innovation", description: "Pioneering cutting-edge renewable energy technologies.", imgSrc: "/assets/innovation.jpg" },
        { label: "Reliability", description: "Delivering consistent and dependable energy solutions.", imgSrc: "/assets/reliability.jpg" },
        { label: "Affordability", description: "Providing cost-effective options for sustainable energy.", imgSrc: "/assets/affordability.jpg" },
        { label: "Customer Service", description: "Dedicated to exceptional support and satisfaction.", imgSrc: "/assets/customer-service.jpg" },
    ];




    return (
        <>
            <section className="pt-32">

                <div className="w-300 mx-auto flex flex-col items-center mb-16 text-center">
                    <p>About Us </p>
                    <h1 className="text-5xl w-1/2 ">Driven by innovation, inspired by nature.</h1>
                </div>

                <div className="w-full h-175 ">
                    <Image
                        width={10000}
                        height={10000}
                        src="/assets/heroimage1.jpg"
                        alt="About Us Image"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>


            <section>
                <div className="w-300 mx-auto py-20 flex flex-col items-center">
                    <h1 className="text-4xl w-3/4 text-center  text-gray-700">
                        Sunergy transforms energy with sustainable solutions, building a cleaner, greener future through renewable systems that empower communities.
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
                                At Sunergy, our mission is to accelerate the global transition to renewable energy by providing innovative, reliable, and affordable solutions that empower individuals and businesses to reduce their carbon footprint and embrace a sustainable future.
                            </p>
                        </div>

                        <div>
                            <h1 className="text-4xl mb-6">Our Vision</h1>

                            <p className="text-gray-600">
                                Our vision is to create a world where clean, renewable energy is accessible to all, fostering a healthier planet and a brighter future for generations to come.
                            </p>
                        </div>
                    </div>

                </div>
            </section>


            <section>
                <div className="w-300 mx-auto py-20">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16  ">

                        <div>
                            <h1 className="text-4xl mb-6"> Process inSunergy</h1>

                            <p className="text-gray-600">
                                Our commitment to sustainability and cutting-edge technology ensures you’ll enjoy energy that’s not only reliable but also beneficial in multiple ways.
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
                                src="/assets/heroimage1.jpg"
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
                                    src="/assets/heroimage1.jpg"
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