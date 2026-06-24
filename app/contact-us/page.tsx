"use client";

import FAQ from "@/components/FAQ";
import { useEffect, useState } from "react";
import {
  submitContactMessage,
  getContactHero, getContactCards, getContactInfo, getContactDetails,
  ContactHero, ContactCard, ContactInfo, ContactDetails,
} from "@/lib/firestore";

// ── Icon map — admin stores icon as a string slug ──────────

function CardIcon({ name }: { name: string }) {
  const cls = "w-6 h-6 text-white";
  if (name === "prayer") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636L9.172 14.828M8 7h.01M16 17h.01M5.636 18.364L14.828 9.172M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
  if (name === "users") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
  if (name === "location") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
  if (name === "phone") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
  if (name === "email") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
  // default: chat
  return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  );
}

// ── Fallbacks ──────────────────────────────────────────────

const FB_CARDS: ContactCard[] = [
  { title: "General Inquiries", description: "For any general questions or information about our fellowship, feel free to reach out to us.", icon: "chat", ctaLabel: "campus@dclm-au.org →", ctaHref: "mailto:campus@dclm-au.org", order: 1 },
  { title: "Prayer & Spiritual Support", description: "Need prayer or godly counsel? Our team is dedicated to supporting your spiritual welfare.", icon: "prayer", ctaLabel: "campus@dclm-au.org →", ctaHref: "mailto:campus@dclm-au.org", order: 2 },
  { title: "Get Involved", description: "Interested in joining our fellowship or partnering with us? We would love to hear from you.", icon: "users", ctaLabel: "campus@dclm-au.org →", ctaHref: "mailto:campus@dclm-au.org", order: 3 },
];

// ── Contact Form ───────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await submitContactMessage(form);
      setSubmitted(true);
      setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-primary flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Message sent!</h3>
        <p className="text-gray-600 max-w-sm">Thank you for reaching out. We will get back to you as soon as possible.</p>
        <button onClick={() => setSubmitted(false)} className="text-primary font-medium hover:underline text-sm">Send another message</button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">FIRST NAME</label>
          <input required type="text" id="firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 outline-none focus:border-primary" placeholder="Enter your first name" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">LAST NAME</label>
          <input required type="text" id="lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 outline-none focus:border-primary" placeholder="Enter your last name" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">YOUR EMAIL</label>
        <input required type="email" id="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 outline-none focus:border-primary" placeholder="Enter your email address" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">YOUR PHONE</label>
        <input type="tel" id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2 border border-gray-300 outline-none focus:border-primary" placeholder="Enter your phone number" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">MESSAGE</label>
        <textarea required id="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2 border border-gray-300 outline-none focus:border-primary" placeholder="Tell us how we can help you" />
      </div>
      <button type="submit" disabled={submitting} className="w-full bg-primary text-white py-3 px-6 hover:bg-primary-deep transition-colors font-semibold disabled:opacity-60">
        {submitting ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}

// ── Page ───────────────────────────────────────────────────

export default function ContactPage() {
  const [hero, setHero] = useState<ContactHero | null>(null);
  const [cards, setCards] = useState<ContactCard[]>(FB_CARDS);
  const [info, setInfo] = useState<ContactInfo | null>(null);
  const [details, setDetails] = useState<ContactDetails | null>(null);

  useEffect(() => {
    Promise.all([
      getContactHero().catch(() => null),
      getContactCards().catch(() => []),
      getContactInfo().catch(() => null),
      getContactDetails().catch(() => null),
    ]).then(([h, c, i, d]) => {
      if (h) setHero(h as ContactHero);
      if ((c as ContactCard[]).length > 0) setCards(c as ContactCard[]);
      if (i) setInfo(i as ContactInfo);
      if (d) setDetails(d as ContactDetails);
    });
  }, []);

  const address = details?.address ?? "49-51 Cameron Street, Cranbourne VIC, Australia";
  const emailHref = details?.emailHref ?? "mailto:campus@dclm-au.org";
  const emailLabel = details?.emailLabel ?? "campus@dclm-au.org";

  return (
    <main>
      {/* ── HERO ── */}
      <section className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {hero?.heading ?? "Contact us."}
          </h1>
          <p className="text-base md:text-xl max-w-2xl mx-auto text-gray-600">
            {hero?.subtext ?? "Feel free to contact and reach us — we are here for you"}
          </p>
        </div>
      </section>

      {/* ── CONTACT CARDS ── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {cards.map((card, i) => (
              <div key={card.id ?? i} className="bg-gray-50 p-6 md:p-8">
                <div className="w-12 h-12 bg-primary flex items-center justify-center mb-4">
                  <CardIcon name={card.icon} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 mb-4">{card.description}</p>
                {card.ctaLabel && (
                  <a href={card.ctaHref} className="text-primary font-medium hover:underline">
                    {card.ctaLabel}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">

            {/* Info column */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {info?.title ?? "Send us a message"}
                </h2>
                <div className="w-20 h-1 bg-primary mb-6" />
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {info?.subtitle ?? "Get in touch"}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {info?.description ?? "We are here to connect with you and support you in your spiritual journey. Whether you have questions, need prayer, or want to join our fellowship, feel free to reach out. Our team is dedicated to helping you find the resources and community you need to grow in faith."}
                </p>
              </div>
              <div className="space-y-4">
                {address && (
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-600">{address}</span>
                  </div>
                )}
                {details?.phone && (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600">{details.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={emailHref} className="text-primary hover:underline">{emailLabel}</a>
                </div>
              </div>
            </div>

            {/* Form column */}
            <div className="bg-white p-6 md:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <FAQ />
    </main>
  );
}
