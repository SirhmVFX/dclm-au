import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Leaders from "@/components/Leaders";
import Image from "next/image";
import { BiChevronRight } from "react-icons/bi";

function Snippet() {

    const snippets = [
        {img: "/assets/biblereview.png", title: "When God Met Man", description: "In the beginning, God created the heavens and the earth." },
        {img: "/assets/biblereview.png", title: "When God Met Man", description: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
        {img: "/assets/biblereview.png", title: "Psalm 23:1", description: "The Lord is my shepherd, I lack nothing." },
        {img: "/assets/biblereview.png", title: "Romans 8:28", description: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
    ];
    return (
        <>
       <section className="pt-32">
            <div className="w-300 mx-auto flex justify-between mb-16 text-center">
               <div>
                <p>Bible Snippets</p>
            <h1 className="text-4xl font-bold text-gray-800">Bible Review Series</h1>
               </div>


               <div className="relative w-64 h-40">
                
                <Image
                width={10000}
                height={10000}
                src="/assets/biblereview.png"
                alt="Bible Review Series"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-primary left-0 top-0 "> 
                <p>Bible Review Series</p>
              </div>

              <div className="absolute inset-0 bg-primary left-0 top-10 "> 
                <p>Bible Review Series</p>
              </div>

              <div className="absolute inset-0 bg-primary left-0 top-20"> 
                <p>Bible Review Series</p>
              </div>
               </div>



            </div>
        </section>


<section>
    <div className="w-300 mx-auto py-20"> 

       < div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {snippets.map((snippet, index) => (
                <div key={index} className="border border-gray-300">
                    <div className="relative w-full h-48">
                        <Image
                            width={10000}
                            height={10000}
                            src={snippet.img}
                            alt={`${snippet.title} Image`}
                            className="w-full h-fullobject-cover"
                        />
                    </div>
                    
                    
                    <div className="p-6">
<div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{snippet.title}</h3>
                        <BiChevronRight className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-gray-600">{snippet.description}</p>
                        </div>
                </div>
            ))}
        </div>
    </div>

</section>


<section className="w-full h-125 relative">
    <Image
        width={10000}
        height={10000}
        src="/assets/heroimage1.jpg"
        alt="Bible Review Series"
        className="w-full h-full object-cover"
      />


      <div className="absolute w-[300px] left-20 top-20  bg-primary p-6">

        <div className="w-32 h-32 ">
             <Image
        width={100}
        height={100}
        src="/assets/dlclogo.png"
        alt="Bible Review Series"
        className="w-full h-full object-cover"
      />
        </div>

      <h1>See our impact in action.</h1>
      <p>Explore our portfolio to see how we’ve transformed energy challenges into sustainable solutions. From innovative solar systems to advanced energy storage, our projects showcase the power of green technology.</p>
      
      </div>
</section>


<Leaders />

<FAQ />

<CTA />

</>
    );
}

export default Snippet;