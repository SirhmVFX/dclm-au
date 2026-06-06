"use client";
import { useState } from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

function FAQ() {
  const [activeFaq, setActiveFaq] = useState(1);
  const faqs: FAQItem[] = [
    { id: 1, question: "What is DCLM Australia all about?", answer: "We are a Christ-centred fellowship committed to the undiluted word of God, prayer, discipleship, and outreach among students and young professionals in Australia." },
    { id: 2, question: "Do I need to be a member before attending?", answer: "Not at all. Visitors are welcome to attend services, Bible study meetings, and fellowship activities as we continue to grow together in Christ." },
    { id: 3, question: "How can I join the weekly programmes?", answer: "You can visit our contact page, reach out through social media, or sign up on this website to receive updates on prayer meetings, Bible study, and monthly programmes." },
    { id: 4, question: "Does the fellowship provide spiritual support?", answer: "Yes. We offer prayer support, counselling, Bible review series, and weekly teachings to strengthen believers and guide new members in their spiritual journey." },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-700">Frequently asked questions</p>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">Everything you need to know before connecting with our fellowship.</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <article key={faq.id} className="border border-gray-200 bg-white p-6">
              <button type="button" className="flex w-full items-center justify-between gap-4 text-left" onClick={() => setActiveFaq(activeFaq === faq.id ? 0 : faq.id)}>
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                <IoChevronDownCircleOutline className={`h-6 w-6 shrink-0 text-blue-700 transition ${activeFaq === faq.id ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === faq.id && <p className="mt-4 text-gray-600">{faq.answer}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;