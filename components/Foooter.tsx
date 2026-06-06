import Image from "next/image";
import Link from "next/link";
import { BsYoutube } from "react-icons/bs";
import { FaFacebook, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#07112b] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <Image src="/assets/dlclogo.png" alt="DCLM AU Logo" width={80} height={80} className="h-16 w-16" />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-blue-200">Deeper Life Campus Fellowship</p>
                <h2 className="text-xl font-semibold">Australia</h2>
              </div>
            </div>
            <p className="max-w-md text-sm text-gray-300">A fellowship committed to winning souls, building saints, and commissioning believers for effective Christian service in Australia.</p>
            <div className="flex gap-3 text-gray-200">
              <Link href="https://web.facebook.com/dlcfaustralia/" className="hover:text-white" aria-label="Facebook"><FaFacebook className="h-5 w-5" /></Link>
              <Link href="https://www.instagram.com/dlcfaustralia" className="hover:text-white" aria-label="Instagram"><FaInstagram className="h-5 w-5" /></Link>
              <Link href="https://www.youtube.com/@dlcfaustralia" className="hover:text-white" aria-label="YouTube"><BsYoutube className="h-5 w-5" /></Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">Church</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about-us" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact-us" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/sign-up" className="hover:text-white">Join Our Fellowship</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/bible-review-series/snippets" className="hover:text-white">Bible Snippets</Link></li>
              <li><Link href="/bible-review-series/teachings" className="hover:text-white">Teachings</Link></li>
              <li><Link href="/others/articles" className="hover:text-white">Articles</Link></li>
              <li><Link href="https://www.dailymanna.app/" className="hover:text-white">Daily Manna</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/contact-us" className="hover:text-white">Prayer Requests</Link></li>
              <li><Link href="/login" className="hover:text-white">Member Login</Link></li>
              <li><Link href="/sign-up" className="hover:text-white">Become a Member</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-300">© 2026 DCLM Australia. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
