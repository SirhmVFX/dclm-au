"use client";

import CTA from "@/components/CTA";
import LinkButton from "@/components/LinkButton";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CgChevronDown } from "react-icons/cg";
import { FaBuilding, FaHome } from "react-icons/fa";

export default function Home() {
  const [showBenefits, setShowBenefits] = useState(false);
  const stats = [
    { value: "70%", label: "Savings on Energy Bills" },
    { value: "100%", label: "Renewable Energy" },
    { value: "50K+", label: "Homes Powered" },
    { value: "30%", label: "Increase in Home Value" },
    { value: "$31M", label: "Worth of savings" },
    { value: "10M+", label: "Tons of CO₂ Avoided" },
  ];

  const services = [
    {
      title: "Residential Solar",
      icon: <FaHome size={24} />,
      description:
        "Harness the power of the sun to reduce your energy bills and carbon footprint with our residential solar solutions.",
    },
    {
      title: "Commercial Solar",
      icon: <FaBuilding size={24} />,
      description:
        "Empower your business with sustainable energy solutions that drive cost savings and environmental responsibility.",
    },
    {
      title: "Energy Storage",
      icon: <FaBuilding size={24} />,
      description:
        "Store excess solar energy for use during peak hours or power outages, ensuring a reliable and efficient energy supply.",
    },
  ];

  const testimonials = [
    {
      id: "01",
      name: "John Doe",
      role: "Homeowner",
      image: "/assets/testimonial1.jpg",
      feedback:
        "Switching to solar with Sunergy was the best decision I made. My energy bills have significantly decreased, and I feel good about reducing my carbon footprint.",
    },
    {
      id: "02",
      name: "Jane Smith",
      role: "Business Owner",
      image: "/assets/testimonial2.jpg",
      feedback:
        "The installation process was seamless, and the team at Sunergy was incredibly helpful. I highly recommend their services to anyone considering solar energy.",
    },
    {
      id: "03",
      name: "Michael Johnson",
      role: "Homeowner",
      image: "/assets/testimonial3.jpg",
      feedback:
        "I was amazed at how much I saved on my energy bills after installing solar panels. Sunergy's solutions are efficient and reliable.",
    },
    {
      id: "04",
      name: "Sarah Williams",
      role: "Homeowner",
      image: "/assets/testimonial4.jpg",
      feedback:
        "Sunergy's solar solutions have been a game-changer for our family. We've seen significant savings on our energy bills while contributing to a more sustainable future.",
    },
    {
      id: "05",
      name: "David Brown",
      role: "Business Owner",
      image: "/assets/testimonial5.jpg",
      feedback:
        "Sunergy has been instrumental in helping us transition to renewable energy. The support and expertise they provide are unmatched.",
    },
    {
      id: "06",
      name: "Lisa Davis",
      role: "Homeowner",
      image: "/assets/testimonial6.jpg",
      feedback:
        "The solar panels installed by Sunergy have been a fantastic investment. Our energy bills are down, and we're proud to be part of the solution.",
    }
  ];

  const benefits = [
    {
      id: "01",
      title: "Cost Savings",
      description:
        "Save money on energy bills with our efficient solar solutions that harness the power of the sun.",
    },
    {
      id: "02",
      title: "Environmental Impact",
      description:
        "Reduce your carbon footprint and contribute to a cleaner planet by switching to renewable energy.",
    },
    {
      id: "03",
      title: "Energy Independence",
      description:
        "Gain energy independence and protect yourself from rising energy costs with our reliable solar systems.",
    },
  ];
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/assets/heroimage2.jpg"
            alt="Hero background image"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative pb-32 z-10 flex flex-col items-start justify-end h-full px-4  max-w-[1200px] mx-auto space-y-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight ">
            We are made perfect <br /> <span className="">in Christ Jesus</span>
          </h1>
          <p className="text-base md:text-lg lg:text text-white/90 leading-relaxed w-2/3">
            And hath put all things under His feet, and gave Him to be the head
            over all things to the church, Which is His body, the fulness of Him
            that filleth all in all. Ephesians 1:22-23.
          </p>

          <LinkButton title="Get to know us" />
        </div>
      </div>

      <div className="w-300 mx-auto py-32 relative h-[80vh]">
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-6">
            <p>What we do</p>
            <h1 className="text-[50px] leading-none">
              We are dedicated to making individuals contend in their faith
            </h1>
            <LinkButton title="About DLM" />
          </div>

          <div>
            <div>
              <Image
                width={10000}
                height={10000}
                src="/assets/heroimage1.jpg"
                alt="map"
                className="w-full h-full"
              />
            </div>

            <div className="p-8 bg-primary text-white space-y-4">
              <p>
                Sunergy was founded with a vision to drive sustainable energy
                solutions that empower individuals, businesses, and communities.
              </p>

              <Link href="/about" className="text-blue-500 hover:underline">
                Learn More
              </Link>
            </div>
          </div>

        </div>

        <div className="absolute bottom-0 left-0 -z-10">
          <Image
            decoding="auto"
            width={10000}
            height={10000}
            src="/assets/map.png"
            alt="map"
            className="w-full h-full"
          />
        </div>

        <div className="grid grid-cols-6 gap-10 pt-28">
          {stats.map((stat, index) => (
            <div
              key={index}
              className=""
            >
              <p className="text-4xl font-bold">{stat.value}</p>
              <p className="text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>


      <section>
        <div className="w-300 mx-auto py-32">
          <div className="grid grid-cols-2 gap-10 justify-between items-end">
            <div className="space-y-6">
              <p>Our Services</p>
              <h1 className="text-[50px] leading-none">
                Our solutions, your sustainable future.
              </h1>
            </div>
            <div className="flex items-end justify-end">
              <LinkButton title="About DLM" />

            </div>
          </div>

          <div className="grid grid-cols-4 gap-10 mt-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-10 bg-primary text-white hover:shadow-lg transition-shadow duration-300 relative flex justify-between flex-col"
              >
                <div className=" p-2 bg-primary absolute left-0 top-0">{service.icon}</div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                  <p className="text-white text-sm ">{service.description}</p>
                </div>
                <Link href="/services" className="text-blue-300 hover:underline mt-4 inline-block">
                  Learn More
                </Link>
              </div>
            ))}

            <div className="relative">
              <Image
                width={10000}
                height={10000}
                src="/assets/1.jpg"
                alt="map"
                className="w-full h-full object-cover"
              />

              <div className="p-2 bg-primary text-white top-10 left-10 absolute  ">
                <p>
                  solar Power
                </p>
              </div>

              <div className="p-2 bg-primary text-white top-20 left-40 absolute  ">
                <p>
                  solar Power
                </p>
              </div>

              <div className="p-2 bg-primary text-white left-20 top-40 absolute  ">
                <p>
                  solar Power
                </p>
              </div>

            </div>
          </div>


          <div className="grid grid-cols-4 gap-10 ">

            <div className="col-span-1 py-10 flex flex-col items-start justify-between ">
              <p>Our Benefits</p>

              <div className="space-y-4">
                <p>
                  Discover the advantages of choosing DCLM for your spiritual
                  growth and community engagement.
                </p>

                <LinkButton title="Our Approach" />
              </div>
            </div>

            <div className="col-span-3">
              <div className="border border-gray-300 p-20 ">
                <h1 className="text-[50px]">Why DCLM</h1>
              </div>

              {benefits.map((benefit) => (
                <div key={benefit.id} className=" border border-gray-300 p-6 ">
                  <div className=" flex items-center justify-between  cursor-pointer" onClick={() => setShowBenefits(!showBenefits)} >
                    <div className="flex justify-center gap-2 space-x-4">
                      <p>
                        {benefit.id}
                      </p>
                      <h2 className="text-xl font-semibold mb-2">{benefit.title}</h2>
                    </div>

                    <CgChevronDown size={20} className="text-primary mt-2" />
                  </div>
                  {showBenefits && (
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  )}
                </div>

              ))}


              <div className="w-full h-75">
                <Image
                  width={10000}
                  height={10000}
                  src="/assets/3.jpg"
                  alt="map"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>

        </div>
      </section>


      <section className="bg-primary-deep text-white ">

        <div className="w-300 mx-auto py-32">

          <div className="space-y-6 w-2/3 mx-auto text-center">
            <p>Our Achievements</p>
            <p className="text-3xl ">We’re proud to advance renewable innovation, making a real impact on communities and the environment.</p>
          </div>
          <div className="grid grid-cols-3 gap-10 mt-10">

            <div className="space-y-4">
              <div className="p-10 bg-primary-deep text-white border-b border-primary">
                <h1 className="text-2xl font-bold text-primary">Over 100,000 Homes Powered</h1>
                <p className="">We’ve successfully installed solar and wind systems in thousands of homes, helping families consistently save on energy and gain true independence.</p>
              </div>

              <div className="p-10 bg-primary-deep text-white border-t border-primary">
                <h1 className="text-2xl font-bold text-primary">Over 100,000 Homes Powered</h1>
                <p className="">We’ve successfully installed solar and wind systems in thousands of homes, helping families consistently save on energy and gain true independence.</p>
              </div>
            </div>

            <div>
              <Image
                width={10000}
                height={10000}
                src="/assets/dlclogo.png"
                alt="map"
                className="w-full h-full object-contain"
              />
            </div>



            <div className="space-y-4">
              <div className="p-10 bg-primary-deep text-white. border-b border-primary">
                <h1 className="text-2xl font-bold text-primary">Over 100,000 Homes Powered</h1>
                <p className="">We’ve successfully installed solar and wind systems in thousands of homes, helping families consistently save on energy and gain true independence.</p>
              </div>

              <div className="p-10 bg-primary-deep text-white border-t border-primary" >
                <h1 className="text-2xl font-bold text-primary">Over 100,000 Homes Powered</h1>
                <p className="">We’ve successfully installed solar and wind systems in thousands of homes, helping families consistently save on energy and gain true independence.</p>
              </div>
            </div>

          </div>

        </div>

      </section>


      <section className=" py-32">

        <div className="text-center pb-20">
          <p>Testimonies</p>
          <h1 className="text-4xl">What some of our <br /> members are saying</h1>
        </div>
        <div>

          <div className="grid grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="border border-gray-300 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    width={10000}
                    height={10000}
                    src="/assets/1.jpg"
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{testimonial.name}</h2>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.feedback}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      <CTA />
    </>
  );
}
