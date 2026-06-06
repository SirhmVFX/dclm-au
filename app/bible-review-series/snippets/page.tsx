import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Leaders from "@/components/Leaders";
import Image from "next/image";
import { BiChevronRight } from "react-icons/bi";

function Snippet() {

  const snippets = [
    { img: "/assets/9.jpg", title: "Choose to Trust in God", description: "A reflection on what it means to place your complete trust in God in every situation of life." },
    { img: "/assets/6.jpg", title: "Forgiveness", description: "Exploring the power and necessity of forgiveness as taught and modelled by our Lord Jesus Christ." },
    { img: "/assets/10.jpg", title: "Believe in God", description: "An encouragement to hold fast to genuine faith in God, especially in the midst of life's challenges." },
    { img: "/assets/8.jpg", title: "Joy as Jesus Comes", description: "Meditating on the joy that believers anticipate as we look forward to the coming of our Lord Jesus Christ." },
  ];
  return (
    <>
      <section className="pt-32">
        <div className="w-300 mx-auto flex justify-between mb-16 ">
          <div>
            <p>Bible Snippets</p>
            <h1 className="text-4xl font-bold text-gray-800">Short reflections from the Word</h1>
          </div>


          <div className="relative w-64 h-40">

            <Image
              width={10000}
              height={10000}
              src="/assets/11.jpg"
              alt="Bible Review Series"
              className="w-full h-full object-cover"
            />

            <div className="absolute  bg-primary left-0 top-0 ">
              <p>Bible Snippets</p>
            </div>

            <div className="absolute  bg-primary left-0 top-10 ">
              <p>Spiritual Growth</p>
            </div>

            <div className="absolute  bg-primary left-0 top-20">
              <p>Sound Doctrine</p>
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
          src="/assets/12.jpg"
          alt="Bible Review Series"
          className="w-full h-full object-cover"
        />


        <div className="absolute w-[450px] left-[15%] top-20  bg-primary/35 text-white p-6">

          <div className="w-32 h-32 ">
            <Image
              width={100}
              height={100}
              src="/assets/dlclogo.png"
              alt="Bible Review Series"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-xl font-bold mb-4">Contending earnestly for the faith.</h1>
          <p>Please feel free to check on our Bible Review Series below — in-depth teachings and short reflections to help you grow in the knowledge of God’s Word.</p>

        </div>
      </section>


      <Leaders />

      <FAQ />

      <CTA />

    </>
  );
}

export default Snippet;