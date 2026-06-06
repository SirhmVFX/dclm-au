import CTA from "@/components/CTA";
import Image from "next/image";

function Articles() {

    const articles = [
        {
            imgSrc: "/assets/1.jpg",
            date: "September 15, 2024",
            readingTime: "5 min read",
            title: "The Future of Renewable Energy: Trends to Watch in 2024",
            description: "Discover the latest advancements and trends in renewable energy that are shaping the future of sustainable power generation."
        },
        {
            imgSrc: "/assets/2.jpg",
            date: "September 10, 2024",
            readingTime: "7 min read",
            title: "How Solar Panels Are Revolutionizing Home Energy Use",
            description: "Learn how solar panels are transforming residential energy consumption and helping homeowners save money while reducing their carbon footprint."
        },
        {
            imgSrc: "/assets/3.jpg",
            date: "September 5, 2024",
            readingTime: "6 min read",
            title: "The Role of Wind Energy in Achieving Global Sustainability Goals",
            description: "Explore the critical role that wind energy plays in meeting global sustainability targets and combating climate change."
        },
        {
            imgSrc: "/assets/4.jpg",
            date: "September 1, 2024",
            readingTime: "8 min read",
            title: "Innovations in Battery Storage for Renewable Energy Systems",
            description: "Discover the latest innovations in battery storage technology that are enhancing the efficiency and reliability of renewable energy systems."
        },
    ];
    return (
        <>
            <section>
                <div className="w-300 mx-auto pt-32 flex justify-between items-center ">

                    <div>
                        <p>Articles</p>
                        <h1 className="text-4xl font-bold text-gray-800">Green solutions at work.</h1>
                    </div>

                    <div className="bg-primary p-8 w-75">
                        <div className="w-full h-10 mb-6">
                            <Image
                                width={10000}
                                height={10000}
                                src="/assets/dlclogo.png"
                                alt="Green Solutions"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <h1>
                            Explore tips, trends, and innovations in green technology to inspire your journey toward a  greener world
                        </h1>

                    </div>


                </div>
            </section>


            <section>
                <div className="w-300 mx-auto py-20">
                    {articles[0] && (
                        <div key={0} className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                            <div>
                                <Image
                                    width={10000}
                                    height={10000}
                                    src={articles[0].imgSrc}
                                    alt={articles[0].title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-gray-500">{articles[0].date}</p>
                                    <p className="text-xs text-gray-400">{articles[0].readingTime}</p>
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">{articles[0].title}</h2>
                                <p className="text-gray-600">{articles[0].description}</p>
                            </div>
                        </div>
                    )}

                </div>
            </section>


            <section>
                <div className="w-300 mx-auto py-20">

                    <div className="grid grid-cols-3 gap-4">
                        {articles.slice(1).map((article, index) => (
                            <div key={index} className="border border-gray-300 mb-8">
                                <div className="w-full h-48">
                                    <Image
                                        width={10000}
                                        height={10000}
                                        src={article.imgSrc}
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-500">{article.date}</p>
                                        <p className="text-xs text-gray-400">{article.readingTime}</p>
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-800">{article.title}</h2>
                                    <p className="text-gray-600">{article.description}</p>
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