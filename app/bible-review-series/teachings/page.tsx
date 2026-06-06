import CTA from "@/components/CTA";
import Image from "next/image";
import Link from "next/link";

function Teachings() {

    const teachings = [
        { title: "Sustainable Energy Solutions", description: "Explore innovative approaches to harnessing renewable energy sources for a greener future.", teacher: "Pastor John", bibleVerse: "Genesis 1:28", date: "2024-06-01" },
        { title: "Energy Efficiency in Buildings", description: "Learn about strategies and technologies to optimize energy use in residential and commercial buildings.", teacher: "Pastor Jane", bibleVerse: "Genesis 1:28", date: "2024-06-01" },
        { title: "Green Transportation", description: "Discover eco-friendly transportation options and their impact on reducing carbon emissions.", teacher: "Pastor Bob", bibleVerse: "Genesis 1:28", date: "2024-06-01" },
        { title: "Waste Management and Recycling", description: "Understand the importance of waste reduction, recycling, and sustainable waste management practices.", teacher: "Pastor Alice", bibleVerse: "Genesis 1:28", date: "2024-06-01" },
        { title: "Water Conservation Techniques", description: "Explore methods to conserve water resources and promote sustainable water usage.", teacher: "Pastor Charlie", bibleVerse: "Genesis 1:28", date: "2024-06-01" },
    ];
    return (
        <>
        <section>
           <div className="w-300 mx-auto pt-32 text-center ">

            <p>Teachings</p>
            <h1 className="text-4xl font-bold text-gray-800">Green solutions at work.</h1>
           </div>



        </section>


<section>
    <div className="w-300 mx-auto py-20">
        <div className="grid grid-cols-2 gap-10">

    {teachings.map((teaching, index) => (
        <div key={index} className="border border-gray-300">
           <div className="w-full h-48 ">
             <Image
                width={10000}
                height={10000}
                src="/assets/heroimage1.jpg"
                alt={`${teaching.title} Image`}
                className="w-full h-full object-cover"
            />
           </div>
            <div className="grid grid-cols-2 gap-4 ">
                <div className="p-6">
                <h3 className="text-lg font-semibold">{teaching.title}</h3>
                <p className="text-gray-600">{teaching.description}</p>
                <Link href="#" className="text-green-500 hover:text-green-700 mt-4 inline-block">
                    Read More
                </Link>
                </div>
            <div className="space-y-4 text-sm text-gray-500 p-6">
                <p>{teaching.teacher}</p>
                <div className="border-t border-gray-300"></div>
                <p>{teaching.bibleVerse}</p>
                <div className="border-t border-gray-300"></div>
                <p>{teaching.date}</p>
            </div>
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

export default Teachings;

