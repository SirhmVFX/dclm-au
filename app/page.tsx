"use client";

import CTA from "@/components/CTA";
import LinkButton2 from "@/components/LinkButton2";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CgChevronDown } from "react-icons/cg";
import { FaBuilding, FaHome } from "react-icons/fa";
import LoadingScreen from "@/components/LoadingScreen";
import {
  getHeroSlides, getPublishedTestimonials, getActiveStats,
  getWhoWeAre, getWhatWeOffer, getServices, getBenefits, getAchievements,
  HeroSlide, Testimonial, Stat,
  WhoWeAre, WhatWeOffer, Service, Benefit, Achievement,
} from "@/lib/firestore";

// ── Fallbacks ──────────────────────────────────────────────

const FB_STATS: Stat[] = [
  { value: "100%", label: "Inter-denominational", order: 1, active: true },
  { value: "24/7", label: "Daily Manna Available", order: 2, active: true },
  { value: "Win", label: "Students & Staff", order: 3, active: true },
  { value: "Build", label: "In Faith & Doctrine", order: 4, active: true },
  { value: "Commission", label: "For the Master", order: 5, active: true },
  { value: "AU", label: "Australia Campuses", order: 6, active: true },
];

const FB_TESTIMONIALS: Testimonial[] = [
  { name: "Emmanuel Okafor", role: "Campus Member", feedback: "DLCF Australia has been a blessing to my spiritual life. The fellowship, the Word, and the godly community have helped me grow tremendously in my walk with God.", imgSrc: "/assets/1.jpg", published: true, order: 1 },
  { name: "Blessing Adeyemi", role: "Corps Member", feedback: "The Bible Review Series opened my eyes to deep truths in Scripture. I am grateful for the dedication of the team in making this resource available to us.", imgSrc: "/assets/2.jpg", published: true, order: 2 },
  { name: "Samuel Nwosu", role: "Graduate", feedback: "Daily Manna has become an essential part of my morning routine. It keeps me grounded in God's Word no matter how busy my schedule gets.", imgSrc: "/assets/3.jpg", published: true, order: 3 },
  { name: "Grace Mensah", role: "Campus Member", feedback: "DLCF Australia welcomed me warmly when I arrived as an international student. The fellowship gave me a spiritual family far from home.", imgSrc: "/assets/4.jpg", published: true, order: 4 },
  { name: "Daniel Eze", role: "Staff", feedback: "The godly counseling and monthly programmes have been instrumental in shaping my character and deepening my faith in the Lord Jesus Christ.", imgSrc: "/assets/5.jpg", published: true, order: 5 },
  { name: "Ruth Afolabi", role: "Campus Member", feedback: "Being part of DLCF Australia has helped me balance academic excellence with spiritual growth. I am a better person and a stronger believer because of this fellowship.", imgSrc: "/assets/6.jpg", published: true, order: 6 },
];

const FB_SERVICES: Service[] = [
  { title: "Our Mission", icon: "FaHome", description: "The DLCF has a divine mandate to win, build and commission students and staff of institutions of higher learning to be their best for the Master.", order: 1 },
  { title: "Bible Doctrine", icon: "FaBuilding", description: "We earnestly contend for the faith which was once delivered unto the saints, standing firm on sound doctrine and godly living.", order: 2 },
  { title: "Daily Manna", icon: "FaBuilding", description: "Access our daily devotional resource to nourish your soul, grow in the Word, and stay connected with God every day.", order: 3 },
];

const FB_BENEFITS: Benefit[] = [
  { numId: "01", title: "Spiritual Growth", description: "We provide resources, teachings, and fellowship to help you grow deeper in your relationship with God and understanding of His Word.", order: 1 },
  { numId: "02", title: "Excellence in Life", description: "We believe a saintly intellectual excels in both faith and study. DLCF encourages and supports members to achieve their highest academic potential.", order: 2 },
  { numId: "03", title: "Godly Community", description: "Connect with like-minded believers across Australian campuses who share the same doctrinal faith, irrespective of denomination or affiliation.", order: 3 },
];

const FB_ACHIEVEMENTS: Achievement[] = [
  { title: "Inter-denominational Fellowship", description: "We embrace campus Christians from all denominations who share the same doctrinal belief, creating a united body of saintly intellectuals.", order: 1 },
  { title: "Monthly Programmes & Counseling", description: "From monthly fellowship meetings to personal godly counseling, we consistently create opportunities to deepen your faith and personal growth.", order: 2 },
  { title: "Win, Build & Commission", description: "Our mandate is to win students and staff for Christ, build them up in the faith, and commission them to make a lasting impact for the Kingdom.", order: 3 },
  { title: "Daily Manna & Bible Review", description: "We provide daily devotionals and in-depth Bible review teachings to help every member grow in the knowledge and fear of the Lord.", order: 4 },
];

// Map icon string → JSX (services from DB store icon name as string)
function ServiceIcon({ name }: { name: string }) {
  if (name === "FaHome") return <FaHome size={24} />;
  return <FaBuilding size={24} />;
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroKey, setHeroKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openBenefit, setOpenBenefit] = useState<string | null>(null);

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [stats, setStats] = useState<Stat[]>(FB_STATS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FB_TESTIMONIALS);
  const [whoWeAre, setWhoWeAre] = useState<WhoWeAre | null>(null);
  const [whatWeOffer, setWhatWeOffer] = useState<WhatWeOffer | null>(null);
  const [services, setServices] = useState<Service[]>(FB_SERVICES);
  const [benefits, setBenefits] = useState<Benefit[]>(FB_BENEFITS);
  const [achievements, setAchievements] = useState<Achievement[]>(FB_ACHIEVEMENTS);

  function toggleBenefit(id: string) {
    setOpenBenefit((prev) => (prev === id ? null : id));
  }

  useEffect(() => {
    Promise.all([
      getHeroSlides().catch(() => []),
      getActiveStats().catch(() => []),
      getPublishedTestimonials().catch(() => []),
      getWhoWeAre().catch(() => null),
      getWhatWeOffer().catch(() => null),
      getServices().catch(() => []),
      getBenefits().catch(() => []),
      getAchievements().catch(() => []),
    ]).then(([slides, statsData, testiData, wwa, wwo, svc, ben, ach]) => {
      if ((slides as HeroSlide[]).length > 0) setHeroSlides(slides as HeroSlide[]);
      if ((statsData as Stat[]).length > 0) setStats(statsData as Stat[]);
      if ((testiData as Testimonial[]).length > 0) setTestimonials(testiData as Testimonial[]);
      if (wwa) setWhoWeAre(wwa as WhoWeAre);
      if (wwo) setWhatWeOffer(wwo as WhatWeOffer);
      if ((svc as Service[]).length > 0) setServices(svc as Service[]);
      if ((ben as Benefit[]).length > 0) setBenefits(ben as Benefit[]);
      if ((ach as Achievement[]).length > 0) setAchievements(ach as Achievement[]);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setHeroKey((k) => k + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  function goToSlide(i: number) {
    setCurrentSlide(i);
    setHeroKey((k) => k + 1);
  }

  // Split achievements into two columns of 2
  const achLeft = achievements.filter((_, i) => i % 2 === 0);
  const achRight = achievements.filter((_, i) => i % 2 !== 0);

  if (loading) return <LoadingScreen />;

  return (
    <>
      {/* ── HERO SLIDESHOW ── */}
      <div className="relative w-full h-screen overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div key={i} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute inset-0">
              <Image src={slide.src} alt={`Hero slide ${i + 1}`} fill priority={i === 0} className="object-cover" />
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50" />
        <div key={heroKey} className="hero-slide-enter relative pb-16 md:pb-32 z-10 flex flex-col items-start justify-end h-full px-4 max-w-300 mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight">
            {heroSlides[currentSlide]?.heading}
          </h1>
          <p className="text-sm md:text-lg text-white/90 leading-relaxed w-full sm:w-2/3">
            {heroSlides[currentSlide]?.sub}
          </p>
          <LinkButton2 title="Get to know us" href="/about-us" />
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} aria-label={`Go to slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>

      {/* ── WHO WE ARE ── */}
      <div className="w-300 mx-auto py-16 md:py-32 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <div className="space-y-5 md:space-y-6">
            <p>{whoWeAre?.tag ?? "Who we are"}</p>
            <h1 className="text-3xl md:text-[50px] leading-tight md:leading-none">
              {whoWeAre?.heading ?? "We are dedicated to raising saintly intellectuals that make positive impacts"}
            </h1>
            <LinkButton2 title="About DLCF" href="/about-us" />
          </div>
          <div>
            <div className="relative w-full h-100 overflow-hidden">
              <Image
                fill
                src={whoWeAre?.image || "/assets/heroimage1.jpg"}
                alt="About DLCF"
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8 bg-primary text-white space-y-4">
              <p>{whoWeAre?.description ?? "DLCF Australia is an inter-denominational fellowship, embracing campus Christians who share the same doctrinal belief irrespective of their denominations and affiliations."}</p>
              <Link href="/about-us" className="text-blue-300 hover:underline">Learn More</Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-20 left-0 -z-10 right-0 hidden md:block">
          <Image decoding="async" width={1200} height={800} src="/assets/map.png" alt="map background" className="w-full h-full" />
        </div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-10 pt-12 md:pt-28">
          {stats.map((stat, index) => (
            <div key={stat.id ?? index}>
              <p className="text-sm md:text-2xl text-black font-bold">{stat.value}</p>
              <p className="text-xs md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHAT WE OFFER ── */}
      <section>
        <div className="w-300 mx-auto py-16 md:py-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 justify-between items-end mb-8 md:mb-0">
            <div className="space-y-4 md:space-y-6">
              <p>{whatWeOffer?.tag ?? "What We Offer"}</p>
              <h1 className="text-3xl md:text-[50px] leading-tight md:leading-none">
                {whatWeOffer?.heading ?? "Your spiritual welfare is our concern."}
              </h1>
            </div>
            <div className="flex items-end justify-start sm:justify-end">
              <LinkButton2 title="About DLCF" href="/about-us" />
            </div>
          </div>

          {/* ── SERVICES ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-8 md:mt-10">
            {services.map((service, index) => (
              <div key={service.id ?? index} className="p-8 md:p-10 bg-primary text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative flex justify-between flex-col min-h-48">
                <div className="p-2 bg-primary absolute left-0 top-0">
                  <ServiceIcon name={service.icon} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                  <p className="text-white text-sm">{service.description}</p>
                </div>
                <Link href="/about-us" className="text-blue-300 hover:underline mt-4 inline-block">Learn More</Link>
              </div>
            ))}
            <div className="relative hidden md:block h-full min-h-64 overflow-hidden">
              <div className="absolute inset-0">
                <Image fill src="/assets/1.jpg" alt="Fellowship image" className="object-cover" />
              </div>
              <div className="p-2 bg-primary text-white top-10 left-10 absolute z-10"><p>Discipline</p></div>
              <div className="p-2 bg-primary text-white top-20 left-20 absolute z-10"><p>Dignity</p></div>
              <div className="p-2 bg-primary text-white left-10 top-36 absolute z-10"><p>Excellence</p></div>
            </div>
          </div>

          {/* ── BENEFITS ── */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10 mt-8 md:mt-0">
            <div className="md:col-span-1 py-8 md:py-10 flex flex-col items-start gap-6 md:justify-between">
              <p>Our Benefits</p>
              <div className="space-y-4">
                <p>Discover the advantages of choosing DLCF Australia for your spiritual growth and community engagement.</p>
                <LinkButton2 title="Our Approach" href="/about-us" />
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="border border-gray-300 p-8 md:p-20">
                <h1 className="text-3xl md:text-[50px]">Why DLCF</h1>
              </div>
              {benefits.map((benefit) => {
                const key = benefit.id ?? benefit.numId;
                return (
                  <div key={key} className="border border-gray-300 p-5 md:p-6">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleBenefit(key!)}>
                      <div className="flex items-center gap-3">
                        <p className="text-sm text-gray-400">{benefit.numId}</p>
                        <h2 className="text-lg md:text-xl font-semibold">{benefit.title}</h2>
                      </div>
                      <CgChevronDown size={20} className={`text-primary shrink-0 transition-transform duration-300 ${openBenefit === key ? "rotate-180" : ""}`} />
                    </div>
                    <div className={`accordion-content ${openBenefit === key ? "open" : ""}`}>
                      <div className="accordion-inner">
                        <p className="text-gray-600 pt-3 text-sm md:text-base">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="relative w-full h-48 md:h-75 overflow-hidden">
                <div className="absolute inset-0">
                  <Image fill src="/assets/3.jpg" alt="Fellowship" className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section className="bg-primary-deep text-white">
        <div className="w-300 mx-auto py-16 md:py-32">
          <div className="space-y-4 md:space-y-6 w-full md:w-2/3 mx-auto text-center">
            <p>Our Achievements</p>
            <p className="text-xl md:text-3xl">We&apos;re proud to advance the cause of Christ, making a real impact on campuses and communities across Australia.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mt-8 md:mt-10">
            <div className="space-y-4">
              {achLeft.map((ach, i) => (
                <div key={ach.id ?? i} className={`p-6 md:p-10 bg-primary-deep text-white ${i % 2 === 0 ? "border-b" : "border-t"} border-primary hover:border-white/40 transition-colors duration-300`}>
                  <h1 className="text-xl md:text-2xl font-bold text-primary">{ach.title}</h1>
                  <p className="mt-2 text-sm md:text-base">{ach.description}</p>
                </div>
              ))}
            </div>
            <div className="hidden md:block relative overflow-hidden">
              <Image width={600} height={800} src="/assets/deeperlife-logo.png" alt="DLCF Logo" className="w-full h-full object-contain" />
            </div>
            <div className="space-y-4">
              {achRight.map((ach, i) => (
                <div key={ach.id ?? i} className={`p-6 md:p-10 bg-primary-deep text-white ${i % 2 === 0 ? "border-b" : "border-t"} border-primary hover:border-white/40 transition-colors duration-300`}>
                  <h1 className="text-xl md:text-2xl font-bold text-primary">{ach.title}</h1>
                  <p className="mt-2 text-sm md:text-base">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 md:py-32">
        <div className="text-center pb-10 md:pb-20">
          <p>Testimonies</p>
          <h1 className="text-2xl md:text-4xl">What some of our <br /> members are saying</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <div key={testimonial.id ?? i} className="border border-gray-300 p-5 md:p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0">
                  <Image
                    fill
                    src={testimonial.imgSrc || "/assets/1.jpg"}
                    alt={testimonial.name}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-semibold">{testimonial.name}</h2>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm md:text-base">{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
