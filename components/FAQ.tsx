"use client";

import { useReveal } from "@/components/useReveal";
import { useEffect, useState } from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { getActiveFAQs, FAQItem } from "@/lib/firestore";

const FALLBACK: FAQItem[] = [
  { question: "What is DCLM Australia all about?", answer: "We are a Christ-centred fellowship committed to the undiluted word of God, prayer, discipleship, and outreach among students and young professionals in Australia.", order: 1, active: true },
  { question: "Do I need to be a member before attending?", answer: "Not at all. Visitors are welcome to attend services, Bible study meetings, and fellowship activities as we continue to grow together in Christ.", order: 2, active: true },
  { question: "How can I join the weekly programmes?", answer: "You can visit our contact page, reach out through social media, or sign up on this website to receive updates on prayer meetings, Bible study, and monthly programmes.", order: 3, active: true },
  { question: "Does the fellowship provide spiritual support?", answer: "Yes. We offer prayer support, counselling, Bible review series, and weekly teachings to strengthen believers and guide new members in their spiritual journey.", order: 4, active: true },
];

function FAQ() {
  const [activeFaq, setActiveFaq] = useState<string | number>(1);
  const headingRef = useReveal("animate-fade-up");
  const listRef = useReveal("animate-fade-up");

  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
    getActiveFAQs()
      .then((data) => setFaqs(data.length > 0 ? data : FALLBACK))
      .catch(() => setFaqs(FALLBACK));
  }, []);

  const displayed = faqs.length > 0 ? faqs : FALLBACK;

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="mx-auto mb-8 md:mb-10 max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-700">Frequently asked questions</p>
          <h2 className="mt-3 text-2xl font-semibold text-gray-900 sm:text-3xl md:text-4xl">
            Everything you need to know before connecting with our fellowship.
          </h2>
        </div>

        <div ref={listRef} className="space-y-3 md:space-y-4">
          {displayed.map((faq, i) => {
            const key = faq.id ?? i;
            return (
              <article key={key} className={`border border-gray-200 bg-white p-5 md:p-6 reveal delay-${(i + 1) * 100}`}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() => setActiveFaq(activeFaq === key ? -1 : key)}
                >
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <IoChevronDownCircleOutline
                    className={`h-6 w-6 shrink-0 text-blue-700 transition-transform duration-300 ${activeFaq === key ? "rotate-180" : ""}`}
                  />
                </button>
                <div className={`accordion-content ${activeFaq === key ? "open" : ""}`}>
                  <div className="accordion-inner">
                    <p className="mt-4 text-sm md:text-base text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
