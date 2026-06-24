"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getActiveLeaders, Leader } from "@/lib/firestore";

const FALLBACK: Leader[] = [
  { name: "Pastor Michael", title: "Fellowship Pastor", image: "/assets/heroimage1.jpg", bio: "Committed to prayer, biblical teaching, and building saints who shine for Christ in their campus and community.", order: 1, active: true },
  { name: "Sis. Grace", title: "Women's Coordinator", image: "/assets/heroimage2.jpg", bio: "Leading women in the fellowship to grow in godliness, wisdom, and effective service for the Kingdom.", order: 2, active: true },
  { name: "Bro. Daniel", title: "Prayer & Outreach Director", image: "/assets/heroimage1.jpg", bio: "Organising campus outreaches and prayer initiatives that win souls and strengthen the body of Christ.", order: 3, active: true },
  { name: "Sis. Ruth", title: "Bible Review Series Host", image: "/assets/heroimage2.jpg", bio: "Hosting the Bible Review Series and facilitating in-depth scripture engagement across the fellowship.", order: 4, active: true },
];

function Leaders() {
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    getActiveLeaders()
      .then((data) => setLeaders(data.length > 0 ? data : FALLBACK))
      .catch(() => setLeaders(FALLBACK));
  }, []);

  const displayed = leaders.length > 0 ? leaders : FALLBACK;

  return (
    <section className="bg-blue-950 py-16 text-white sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-blue-100">Our leaders</p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl md:text-4xl">
            Meet the team that supports worship, prayer, and discipleship across our fellowship.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
          {displayed.map((leader, i) => (
            <article
              key={leader.id ?? leader.name}
              className="grid gap-4 border border-white/10 bg-white/5 p-4 sm:p-5 grid-cols-1 sm:grid-cols-[1.1fr_0.9fr]"
            >
              {/* fill inside a fixed-height container — never breaks */}
              <div className="relative h-48 sm:h-64 w-full overflow-hidden">
                <Image
                  fill
                  src={leader.image || "/assets/heroimage1.jpg"}
                  alt={leader.name}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-end pt-2 sm:pt-0">
                <p className="text-sm uppercase tracking-[0.3em] text-blue-100">Leadership</p>
                <h3 className="mt-2 text-xl sm:text-2xl font-semibold">{leader.name}</h3>
                <p className="mt-1 text-gray-200">{leader.title}</p>
                <p className="mt-3 text-sm text-gray-300">{leader.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Leaders;
