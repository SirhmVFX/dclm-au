import Image from "next/image";

function Leaders() {
  const leadership = [
    { name: "Pastor Michael", title: "Fellowship Pastor", image: "/assets/heroimage1.jpg" },
    { name: "Sis. Grace", title: "Women’s Coordinator", image: "/assets/heroimage2.jpg" },
    { name: "Bro. Daniel", title: "Prayer & Outreach Director", image: "/assets/heroimage1.jpg" },
    { name: "Sis. Ruth", title: "Bible Review Series Host", image: "/assets/heroimage2.jpg" },
  ];

  return (
    <section className="bg-blue-950 py-16 text-white sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm uppercase tracking-[0.35em] text-blue-100">Our leaders</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Meet the team that supports worship, prayer, and discipleship across our fellowship.</h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {leadership.map((leader) => (
            <article key={leader.name} className="grid gap-4 border border-white/10 bg-white/5 p-5 md:grid-cols-[1.1fr_0.9fr]">
              <Image src={leader.image} alt={leader.name} width={600} height={400} className="h-64 w-full object-cover" />
              <div className="flex flex-col justify-end">
                <p className="text-sm uppercase tracking-[0.3em] text-blue-100">Leadership</p>
                <h3 className="mt-2 text-2xl font-semibold">{leader.name}</h3>
                <p className="mt-1 text-gray-200">{leader.title}</p>
                <p className="mt-4 text-sm text-gray-300">Committed to prayer, biblical teaching, and building saints who shine for Christ in their campus and community.</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Leaders;