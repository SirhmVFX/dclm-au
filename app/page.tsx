"use client";

import CTA from "@/components/CTA";
import LinkButton from "@/components/LinkButton";
import { useReveal } from "@/components/useReveal";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CgChevronDown } from "react-icons/cg";
import { FaBuilding, FaHome } from "react-icons/fa";

/* ── Hero slides ── */
const heroSlides = [
  {
    src: "/assets/heroimage2.jpg",
    heading: <>We&apos;re Saintly <br /> <span>Intellectuals</span></>,
    sub: "Not slothful in business; fervent in spirit; serving the Lord. Romans 12:11.",
  },
  {
    src: "/assets/2.jpg",
    heading: <>Contending Earnestly <br /> <span>for the Faith</span></>,
    sub: "Beloved, earnestly contend for the faith which was once delivered unto the saints. Jude 1:3.",
  },
  {
    src: "/assets/3.jpg",
    heading: <>Win. Build. <br /> <span>Commission.</span></>,
    sub: "Our mandate is to win students and staff for Christ, build them in faith, and commission them for the Kingdom.",
  },
];

export default function Home() {
  /* Hero slideshow */
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroKey, setHeroKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setHeroKey((k) => k + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function goToSlide(i: number) {
    setCurrentSlide(i);
    setHeroKey((k) => k + 1);
  }

  /* Accordion */
  const [openBenefit, setOpenBenefit] = useState<string | null>(null);
  function toggleBenefit(id: string) {
    setOpenBenefit((prev) => (prev === id ? null : id));
  }

  /* Reveal refs */
  const aboutRef = useReveal("animate-fade-up");
  const statsRef = useReveal("animate-fade-up");
  const offerRef = useReveal("animate-fade-up");
  const servicesRef = useReveal("animate-fade-up");
  const benefitsRef = useReveal("animate-fade-up");
  const achieveRef = useReveal("animate-fade-up");
  const testiRef = useReveal("animate-fade-up");

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
      description: "The DLCF has a divine mandate to win, build and commission students and staff of institutions of higher learning to be their best for the Master.",
    },
    {
      title: "Bible Doctrine",
      icon: <FaBuilding size={24} />,
      description: "We earnestly contend for the faith which was once delivered unto the saints, standing firm on sound doctrine and godly living.",
    },
    {
      title: "Daily Manna",
      icon: <FaBuilding size={24} />,
      description: "Access our daily devotional resource to nourish your soul, grow in the Word, and stay connected with God every day.",
    },
  ];

  const testimonials = [
    { id: "01", name: "Emmanuel Okafor", role: "Campus Member", feedback: "DLCF Australia has been a blessing to my spiritual life. The fellowship, the Word, and the godly community have helped me grow tremendously in my walk with God." },
    { id: "02", name: "Blessing Adeyemi", role: "Corps Member", feedback: "The Bible Review Series opened my eyes to deep truths in Scripture. I am grateful for the dedication of the team in making this resource available to us." },
    { id: "03", name: "Samuel Nwosu", role: "Graduate", feedback: "Daily Manna has become an essential part of my morning routine. It keeps me grounded in God's Word no matter how busy my schedule gets." },
    { id: "04", name: "Grace Mensah", role: "Campus Member", feedback: "DLCF Australia welcomed me warmly when I arrived as an international student. The fellowship gave me a spiritual family far from home." },
    { id: "05", name: "Daniel Eze", role: "Staff", feedback: "The godly counseling and monthly programmes have been instrumental in shaping my character and deepening my faith in the Lord Jesus Christ." },
    { id: "06", name: "Ruth Afolabi", role: "Campus Member", feedback: "Being part of DLCF Australia has helped me balance academic excellence with spiritual growth. I am a better person and a stronger believer because of this fellowship." },
  ];

  const benefits = [
    { id: "01", title: "Spiritual Growth", description: "We provide resources, teachings, and fellowship to help you grow deeper in your relationship with God and understanding of His Word." },
    { id: "02", title: "Academic Excellence", description: "We believe a saintly intellectual excels in both faith and study. DLCF encourages and supports members to achieve their highest academic potential." },
    { id: "03", title: "Godly Community", description: "Connect with like-minded believers across Australian campuses who share the same doctrinal faith, irrespective of denomination or affiliation." },
  ];

  return (
    <>
      {/* ── HERO SLIDESHOW ── */}
      <div className="relative w-full h-screen overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <Image src={slide.src} alt={`Hero slide ${i + 1}`} fill priority={i === 0} className="object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50" />

        <div
          key={heroKey}
          className="hero-slide-enter relative pb-16 md:pb-32 z-10 flex flex-col items-start justify-end h-full px-4 max-w-300 mx-auto space-y-3"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight">
            {heroSlides[currentSlide].heading}
          </h1>
          <p className="text-sm md:text-lg text-white/90 leading-relaxed w-full sm:w-2/3">
            {heroSlides[currentSlide].sub}
          </p>
          <LinkButton title="Get to know us" />
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>

      {/* ── WHO WE ARE ── */}
      <div className="w-300 mx-auto py-16 md:py-32 relative">
        <div ref={aboutRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <div className="space-y-5 md:space-y-6">
            <p>Who we are</p>
            <h1 className="text-3xl md:text-[50px] leading-tight md:leading-none">
              We are dedicated to raising saintly intellectuals that make positive impacts
            </h1>
            <LinkButton title="About DLCF" />
          </div>

          <div>
            <div>
              <Image width={800} height={600} src="/assets/heroimage1.jpg" alt="About DLCF" className="w-full h-full" />
            </div>
            <div className="p-6 md:p-8 bg-primary text-white space-y-4">
              <p>
                DLCF Australia is an inter-denominational fellowship, embracing campus Christians
                who share the same doctrinal belief irrespective of their denominations and affiliations.
              </p>
              <Link href="/about-us" className="text-blue-300 hover:underline">Learn More</Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 -z-10 hidden md:block">
          <Image decoding="async" width={1200} height={800} src="/assets/map.png" alt="map background" className="w-full h-full" />
        </div>

        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-10 pt-12 md:pt-28">
          {stats.map((stat, index) => (
            <div key={index} className={`reveal delay-${(index + 1) * 100}`}>
              <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
              <p className="text-xs md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHAT WE OFFER ── */}
      <section>
        <div className="w-300 mx-auto py-16 md:py-32">
          <div ref={offerRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 justify-between items-end mb-8 md:mb-0">
            <div className="space-y-4 md:space-y-6">
              <p>What We Offer</p>
              <h1 className="text-3xl md:text-[50px] leading-tight md:leading-none">
                Your spiritual welfare is our concern.
              </h1>
            </div>
            <div className="flex items-end justify-start sm:justify-end">
              <LinkButton title="About DLCF" />
            </div>
          </div>

          <div ref={servicesRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-8 md:mt-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-8 md:p-10 bg-primary text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative flex justify-between flex-col min-h-48"
              >
                <div className="p-2 bg-primary absolute left-0 top-0">{service.icon}</div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                  <p className="text-white text-sm">{service.description}</p>
                </div>
                <Link href="/about-us" className="text-blue-300 hover:underline mt-4 inline-block">Learn More</Link>
              </div>
            ))}

            <div className="relative hidden md:block">
              <Image width={600} height={600} src="/assets/1.jpg" alt="Fellowship image" className="w-full h-full object-cover" />
              <div className="p-2 bg-primary text-white top-10 left-10 absolute"><p>Discipline</p></div>
              <div className="p-2 bg-primary text-white top-20 left-20 absolute"><p>Dignity</p></div>
              <div className="p-2 bg-primary text-white left-10 top-36 absolute"><p>Excellence</p></div>
            </div>
          </div>

          {/* ── BENEFITS / ACCORDION ── */}
          <div ref={benefitsRef} className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10 mt-8 md:mt-0">
            <div className="md:col-span-1 py-8 md:py-10 flex flex-col items-start gap-6 md:justify-between">
              <p>Our Benefits</p>
              <div className="space-y-4">
                <p>Discover the advantages of choosing DLCF Australia for your spiritual growth and community engagement.</p>
                <LinkButton title="Our Approach" />
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="border border-gray-300 p-8 md:p-20">
                <h1 className="text-3xl md:text-[50px]">Why DLCF</h1>
              </div>

              {benefits.map((benefit) => (
                <div key={benefit.id} className="border border-gray-300 p-5 md:p-6">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleBenefit(benefit.id)}
                  >
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-gray-400">{benefit.id}</p>
                      <h2 className="text-lg md:text-xl font-semibold">{benefit.title}</h2>
                    </div>
                    <CgChevronDown
                      size={20}
                      className={`text-primary shrink-0 transition-transform duration-300 ${openBenefit === benefit.id ? "rotate-180" : ""}`}
                    />
                  </div>
                  <div className={`accordion-content ${openBenefit === benefit.id ? "open" : ""}`}>
                    <div className="accordion-inner">
                      <p className="text-gray-600 pt-3 text-sm md:text-base">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="w-full h-48 md:h-75">
                <Image width={800} height={400} src="/assets/3.jpg" alt="Fellowship" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section className="bg-primary-deep text-white">
        <div className="w-300 mx-auto py-16 md:py-32">
          <div ref={achieveRef} className="space-y-4 md:space-y-6 w-full md:w-2/3 mx-auto text-center">
            <p>Our Achievements</p>
            <p className="text-xl md:text-3xl">
              We&apos;re proud to advance the cause of Christ, making a real impact on campuses and communities across Australia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mt-8 md:mt-10">
            <div className="space-y-4">
              <div className="p-6 md:p-10 bg-primary-deep text-white border-b border-primary hover:border-white/40 transition-colors duration-300">
                <h1 className="text-xl md:text-2xl font-bold text-primary">Inter-denominational Fellowship</h1>
                <p className="mt-2 text-sm md:text-base">We embrace campus Christians from all denominations who share the same doctrinal belief, creating a united body of saintly intellectuals.</p>
              </div>
              <div className="p-6 md:p-10 bg-primary-deep text-white border-t border-primary hover:border-white/40 transition-colors duration-300">
                <h1 className="text-xl md:text-2xl font-bold text-primary">Monthly Programmes &amp; Counseling</h1>
                <p className="mt-2 text-sm md:text-base">From monthly fellowship meetings to personal godly counseling, we consistently create opportunities to deepen your faith and personal growth.</p>
              </div>
            </div>

            <div className="hidden md:block">
              <Image width={600} height={800} src="/assets/dlclogo.png" alt="DLCF Logo" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-4">
              <div className="p-6 md:p-10 bg-primary-deep text-white border-b border-primary hover:border-white/40 transition-colors duration-300">
                <h1 className="text-xl md:text-2xl font-bold text-primary">Win, Build &amp; Commission</h1>
                <p className="mt-2 text-sm md:text-base">Our mandate is to win students and staff for Christ, build them up in the faith, and commission them to make a lasting impact for the Kingdom.</p>
              </div>
              <div className="p-6 md:p-10 bg-primary-deep text-white border-t border-primary hover:border-white/40 transition-colors duration-300">
                <h1 className="text-xl md:text-2xl font-bold text-primary">Daily Manna &amp; Bible Review</h1>
                <p className="mt-2 text-sm md:text-base">We provide daily devotionals and in-depth Bible review teachings to help every member grow in the knowledge and fear of the Lord.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 md:py-32">
        <div ref={testiRef}>
          <div className="text-center pb-10 md:pb-20">
            <p>Testimonies</p>
            <h1 className="text-2xl md:text-4xl">What some of our <br /> members are saying</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <div
                key={testimonial.id}
                className={`border border-gray-300 p-5 md:p-6 reveal delay-${Math.min((i % 3 + 1) * 100, 300)}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image width={64} height={64} src="/assets/1.jpg" alt={testimonial.name} className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover" />
                  <div>
                    <h2 className="text-base md:text-lg font-semibold">{testimonial.name}</h2>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm md:text-base">{testimonial.feedback}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
