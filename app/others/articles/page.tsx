import CTA from "@/components/CTA";
import Image from "next/image";

function Articles() {

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
            <section>
                <div className="w-300 mx-auto pt-32 flex justify-between items-center ">

                    <div>
                        <p>Articles</p>
                        <h1 className="text-4xl font-bold text-gray-800">Insights to strengthen your faith.</h1>
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
                            Explore articles, reflections, and insights from DLCF Australia to inspire your journey of faith and godly living
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