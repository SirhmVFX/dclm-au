import CTA from "@/components/CTA";
import Image from "next/image";
import Link from "next/link";

function Teachings() {

    const teachings = [
        { title: "1st Thessalonians", description: "A full review of Paul's first letter to the Thessalonians — covering faith, love, holiness, and the hope of Christ's return.", teacher: "DLCF Teaching Team", bibleVerse: "1 Thessalonians 5:23", date: "February 25, 2024" },
        { title: "Lover of the Broken Heart", description: "A snippet exploring God's deep love and compassion for those who are hurting, brokenhearted, and in need of His healing touch.", teacher: "DLCF Teaching Team", bibleVerse: "Psalm 34:18", date: "June 21, 2024" },
        { title: "Luke 2", description: "A reflection on the second chapter of Luke — the birth of Christ, His presentation at the temple, and His early wisdom.", teacher: "DLCF Teaching Team", bibleVerse: "Luke 2:52", date: "June 21, 2024" },
        { title: "Joy as Jesus Comes", description: "Meditating on the anticipation and joy that fills the heart of every believer as we look forward to the second coming of Jesus.", teacher: "DLCF Teaching Team", bibleVerse: "Philippians 4:4", date: "June 21, 2024" },
        { title: "Believe in God", description: "An encouragement drawn from Scripture to hold fast to genuine, unshakeable faith in God regardless of life's circumstances.", teacher: "DLCF Teaching Team", bibleVerse: "John 14:1", date: "June 21, 2024" },
    ];
    return (
        <>
            <section>
                <div className="w-300 mx-auto pt-32 text-center ">

                    <p>Teachings</p>
                    <h1 className="text-4xl font-bold text-gray-800">In-depth Bible Review Series.</h1>
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

