"use client";

import { useReveal } from "@/components/useReveal";
import Image from "next/image";

function Leaders() {
  const headingRef = useReveal("animate-fade-up");
  const gridRef = useReveal("animate-fade-up");

  const leadership = [
    { name: "Pastor Michael", title: "Fellowship Pastor", image: "/assets/heroimage1.jpg" },
    { name: "Sis. Grace", title: "Women's Coordinator", image: "/assets/heroimage2.jpg" },
    { name: "Bro. Daniel", title: "Prayer & Outreach Director", image: "/assets/heroimage1.jpg" },
    { name: "Sis. Ruth", title: "Bible Review Series Host", image: "/assets/heroimage2.jpg" },
  ];

  return (
    <section className="bg-blue-950 py-16 text-white sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headingRef}>
          <p className="text-sm uppercase tracking-[0.35em] text-blue-100">Our leaders</p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl md:text-4xl">
            Meet the team that supports worship, prayer, and discipleship across our fellowship.
          </h2>
        </div>

        <div ref={gridRef} className="mt-10 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
          {leadership.map((leader, i) => (
            <article
              key={leader.name}
              className={`grid gap-4 border border-white/10 bg-white/5 p-4 sm:p-5 grid-cols-1 sm:grid-cols-[1.1fr_0.9fr] reveal delay-${(i % 2 + 1) * 100}`}
            >
              <Image
                src={leader.image}
                alt={leader.name}
                width={600}
                height={400}
                className="h-48 sm:h-64 w-full object-cover"
              />
              <div className="flex flex-col justify-end pt-2 sm:pt-0">
                <p className="text-sm uppercase tracking-[0.3em] text-blue-100">Leadership</p>
                <h3 className="mt-2 text-xl sm:text-2xl font-semibold">{leader.name}</h3>
                <p className="mt-1 text-gray-200">{leader.title}</p>
                <p className="mt-3 text-sm text-gray-300">
                  Committed to prayer, biblical teaching, and building saints who shine for Christ in their campus and community.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Leaders;
