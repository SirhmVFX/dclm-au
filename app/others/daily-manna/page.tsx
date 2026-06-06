import CTA from "@/components/CTA";
import Link from "next/link";

function DailyManna() {
  return (
    <>
      <section className="pt-32">
        <div className="w-300 mx-auto flex justify-between items-end mb-16">
          <div>
            <p>Daily Devotional</p>
            <h1 className="text-4xl font-bold text-gray-800">Daily Manna</h1>
          </div>

          <div className="w-1/3">
            <p className="text-gray-600">
              Daily Manna is a devotional resource that provides a word from God every day to nourish your soul,
              strengthen your faith, and keep you connected with the Lord.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="w-300 mx-auto py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">Your spiritual nourishment, every day</h2>
              <p className="text-gray-600">
                Just as the Israelites gathered manna fresh each morning in the wilderness, God provides fresh spiritual
                nourishment for His people daily. The Daily Manna devotional is designed to help students, staff, and
                believers across Australian campuses start every day grounded in the Word of God.
              </p>
              <p className="text-gray-600">
                Each devotion includes a Bible passage, a reflection, and a practical application — giving you what you
                need to face each day with faith, purpose, and godly character.
              </p>

              <Link
                href="https://dailymanna.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-6 py-3 hover:bg-primary-deep transition-colors font-semibold"
              >
                Go to Daily Manna →
              </Link>
            </div>

            <div className="space-y-6">
              <div className="border border-gray-300 p-8">
                <p className="text-sm text-gray-500 mb-2">Why Daily Manna?</p>
                <h3 className="text-xl font-semibold mb-4">Stay rooted in the Word</h3>
                <p className="text-gray-600">
                  Campus life can be demanding. Daily Manna ensures you never miss a fresh encounter with God&apos;s Word,
                  no matter how busy your schedule gets.
                </p>
              </div>

              <div className="border border-gray-300 p-8">
                <p className="text-sm text-gray-500 mb-2">Available Daily</p>
                <h3 className="text-xl font-semibold mb-4">Free and always accessible</h3>
                <p className="text-gray-600">
                  Daily Manna is freely available to all. Visit the Daily Manna app or website to read and download
                  each day&apos;s devotional at your convenience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white">
        <div className="w-300 mx-auto py-20 text-center space-y-6">
          <p>Get Started</p>
          <h2 className="text-3xl font-bold">Daily Manna Is Always Available</h2>
          <p className="w-1/2 mx-auto">
            Take heed unto thyself, and unto the doctrine; continue in them: for in doing this thou shalt both
            save thyself, and them that hear thee. — 1 Timothy 4:16
          </p>
          <Link
            href="https://dailymanna.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-primary px-8 py-3 font-semibold hover:bg-gray-100 transition-colors"
          >
            Go to Daily Manna
          </Link>
        </div>
      </section>

      <CTA />
    </>
  );
}

export default DailyManna;
