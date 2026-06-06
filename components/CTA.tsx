import Image from "next/image";

function CTA() {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <Image src="/assets/heroimage2.jpg" alt="Church prayer meeting" width={1600} height={900} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative mx-auto flex min-h-[320px] w-full max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-sm uppercase tracking-[0.35em] text-blue-100">Come worship with us</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">Join hands with the fellowship as we contend for the faith and raise godly leaders.</h2>
        <p className="mt-4 max-w-2xl text-base text-gray-100 sm:text-lg">Whether you are visiting for the first time or seeking a deeper walk with Christ, you are warmly welcomed.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="/sign-up" className="bg-white px-5 py-3 text-sm font-semibold text-blue-900">Become a member</a>
          <a href="/contact-us" className="border border-white/80 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Contact the church</a>
        </div>
      </div>
    </section>
  );
}

export default CTA;