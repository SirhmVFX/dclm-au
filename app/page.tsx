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
    { value: "100%", label: "Inter-denominational" },
    { value: "24/7", label: "Daily Manna Available" },
    { value: "Win", label: "Students & Staff" },
    { value: "Build", label: "In Faith & Doctrine" },
    { value: "Commission", label: "For the Master" },
    { value: "AU", label: "Australia Campuses" },
  ];

  const services = [
    {
      title: "Our Mission",
      icon: <FaHome size={24} />,
      description:
        "The DLCF has a divine mandate to win, build and commission students and staff of institutions of higher learning to be their best for the Master.",
    },
    {
      title: "Bible Doctrine",
      icon: <FaBuilding size={24} />,
      description:
        "We earnestly contend for the faith which was once delivered unto the saints, standing firm on sound doctrine and godly living.",
    },
    {
      title: "Daily Manna",
      icon: <FaBuilding size={24} />,
      description:
        "Access our daily devotional resource to nourish your soul, grow in the Word, and stay connected with God every day.",
    },
  ];

  const testimonials = [
    {
      id: "01",
      name: "Emmanuel Okafor",
      role: "Campus Member",
      image: "/assets/testimonial1.jpg",
      feedback:
        "DLCF Australia has been a blessing to my spiritual life. The fellowship, the Word, and the godly community have helped me grow tremendously in my walk with God.",
    },
    {
      id: "02",
      name: "Blessing Adeyemi",
      role: "Corps Member",
      image: "/assets/testimonial2.jpg",
      feedback:
        "The Bible Review Series opened my eyes to deep truths in Scripture. I am grateful for the dedication of the team in making this resource available to us.",
    },
    {
      id: "03",
      name: "Samuel Nwosu",
      role: "Graduate",
      image: "/assets/testimonial3.jpg",
      feedback:
        "Daily Manna has become an essential part of my morning routine. It keeps me grounded in God's Word no matter how busy my schedule gets.",
    },
    {
      id: "04",
      name: "Grace Mensah",
      role: "Campus Member",
      image: "/assets/testimonial4.jpg",
      feedback:
        "DLCF Australia welcomed me warmly when I arrived as an international student. The fellowship gave me a spiritual family far from home.",
    },
    {
      id: "05",
      name: "Daniel Eze",
      role: "Staff",
      image: "/assets/testimonial5.jpg",
      feedback:
        "The godly counseling and monthly programmes have been instrumental in shaping my character and deepening my faith in the Lord Jesus Christ.",
    },
    {
      id: "06",
      name: "Ruth Afolabi",
      role: "Campus Member",
      image: "/assets/testimonial6.jpg",
      feedback:
        "Being part of DLCF Australia has helped me balance academic excellence with spiritual growth. I am a better person and a stronger believer because of this fellowship.",
    }
  ];

  const benefits = [
    {
      id: "01",
      title: "Spiritual Growth",
      description:
        "We provide resources, teachings, and fellowship to help you grow deeper in your relationship with God and understanding of His Word.",
    },
    {
      id: "02",
      title: "Academic Excellence",
      description:
        "We believe a saintly intellectual excels in both faith and study. DLCF encourages and supports members to achieve their highest academic potential.",
    },
    {
      id: "03",
      title: "Godly Community",
      description:
        "Connect with like-minded believers across Australian campuses who share the same doctrinal faith, irrespective of denomination or affiliation.",
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
            We&apos;re Saintly <br /> <span className="">Intellectuals</span>
          </h1>
          <p className="text-base md:text-lg lg:text text-white/90 leading-relaxed w-2/3">
            Not slothful in business; fervent in spirit; serving the Lord. Romans 12:11.
          </p>

          <LinkButton title="Get to know us" />
        </div>
      </div>

      <div className="w-300 mx-auto py-32 relative h-[80vh]">
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-6">
            <p>Who we are</p>
            <h1 className="text-[50px] leading-none">
              We are dedicated to raising saintly intellectuals that make positive impacts
            </h1>
            <LinkButton title="About DLCF" />
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
                DLCF Australia is an inter-denominational fellowship, embracing campus Christians
                who share the same doctrinal belief irrespective of their denominations and affiliations.
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
              <p>What We Offer</p>
              <h1 className="text-[50px] leading-none">
                Your spiritual welfare is our concern.
              </h1>
            </div>
            <div className="flex items-end justify-end">
              <LinkButton title="About DLCF" />

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
                  Discipline
                </p>
              </div>

              <div className="p-2 bg-primary text-white top-20 left-40 absolute  ">
                <p>
                  Dignity
                </p>
              </div>

              <div className="p-2 bg-primary text-white left-20 top-40 absolute  ">
                <p>
                  Excellence
                </p>
              </div>

            </div>
          </div>


          <div className="grid grid-cols-4 gap-10 ">

            <div className="col-span-1 py-10 flex flex-col items-start justify-between ">
              <p>Our Benefits</p>

              <div className="space-y-4">
                <p>
                  Discover the advantages of choosing DLCF Australia for your spiritual
                  growth and community engagement.
                </p>

                <LinkButton title="Our Approach" />
              </div>
            </div>

            <div className="col-span-3">
              <div className="border border-gray-300 p-20 ">
                <h1 className="text-[50px]">Why DLCF</h1>
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
            <p className="text-3xl ">We’re proud to advance the cause of Christ, making a real impact on campuses and communities across Australia.</p>
          </div>
          <div className="grid grid-cols-3 gap-10 mt-10">

            <div className="space-y-4">
              <div className="p-10 bg-primary-deep text-white border-b border-primary">
                <h1 className="text-2xl font-bold text-primary">Inter-denominational Fellowship</h1>
                <p className="">We embrace campus Christians from all denominations who share the same doctrinal belief, creating a united body of saintly intellectuals.</p>
              </div>

              <div className="p-10 bg-primary-deep text-white border-t border-primary">
                <h1 className="text-2xl font-bold text-primary">Monthly Programmes &amp; Counseling</h1>
                <p className="">From monthly fellowship meetings to personal godly counseling, we consistently create opportunities to deepen your faith and personal growth.</p>
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
                <h1 className="text-2xl font-bold text-primary">Win, Build &amp; Commission</h1>
                <p className="">Our mandate is to win students and staff for Christ, build them up in the faith, and commission them to make a lasting impact for the Kingdom.</p>
              </div>

              <div className="p-10 bg-primary-deep text-white border-t border-primary" >
                <h1 className="text-2xl font-bold text-primary">Daily Manna &amp; Bible Review</h1>
                <p className="">We provide daily devotionals and in-depth Bible review teachings to help every member grow in the knowledge and fear of the Lord.</p>
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
