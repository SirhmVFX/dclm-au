// app/contact/page.jsx or pages/contact.js
import FAQ from "@/components/FAQ";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="">
      {/* Hero Section */}
      <section className="pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact us.</h1>
          <p className="text-xlmax-w-2xl mx-auto">
            Let's work together to create sustainable energy solutions
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* General Inquiries */}
            <div className="bg-gray-50  p-8  transition">
              <div className="w-12 h-12 bg-primary flex items-center justify-center mb-4">
                <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">General Inquiries</h3>
              <p className="text-gray-600 mb-4">
                For any general questions or information about our services, feel free to reach out.
              </p>
              <a href="mailto:info@example.com" className="text-primary hover:text-primary font-medium">
                info@example.com →
              </a>
            </div>

            {/* Support & Maintenance */}
            <div className="bg-gray-50  p-8  transition">
              <div className="w-12 h-12 bg-primary flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636L9.172 14.828M8 7h.01M16 17h.01M5.636 18.364L14.828 9.172M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Support & Maintenance</h3>
              <p className="text-gray-600 mb-4">
                Need assistance with an existing project or technical support? We're here to help.
              </p>
              <a href="mailto:support@example.com" className="text-primary hover:text-primary font-medium">
                support@example.com →
              </a>
            </div>

            {/* Partnerships */}
            <div className="bg-gray-50  p-8  transition">
              <div className="w-12 h-12 bg-primary flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Partnerships</h3>
              <p className="text-gray-600 mb-4">
                Interested in working together to create sustainable solutions? Contact our team.
              </p>
              <a href="mailto:partnerships@example.com" className="text-primary hover:text-primary font-medium">
                partnerships@example.com →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Get in Touch */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a message</h2>
                <div className="w-20 h-1 bg-primary mb-6"></div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Get in touch</h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect with us to drive green success. Our team is here to support your sustainable goals. 
                  Whether you have questions, need assistance, or want to collaborate, we're ready to help 
                  you take the next step toward a greener future.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600">5 Washington Square, New York, USA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-600">+1 212 425 8617</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@example.com" className="text-primary hover:text-primary">info@example.com</a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white -lg p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      FIRST NAME
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      defaultValue="Jane"
                      className="w-full px-4 py-2 border border-gray-300  focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      LAST NAME
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      defaultValue="Smith"
                      className="w-full px-4 py-2 border border-gray-300  focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue="jane@framer.com"
                    className="w-full px-4 py-2 border border-gray-300  focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    YOUR PHONE
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    defaultValue="+1 555 457 8635"
                    className="w-full px-4 py-2 border border-gray-300  focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    defaultValue="I'm looking for..."
                    className="w-full px-4 py-2 border border-gray-300  focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tell us about your project or inquiry"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6  hover:bg-primary-deep transition-colors font-semibold"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FAQ />
    </main>
  );
}