"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsYoutube } from "react-icons/bs";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { getSiteSettings, SiteSettings } from "@/lib/firestore";

function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(() => { });
  }, []);

  const facebook = settings?.facebookUrl ?? "https://web.facebook.com/dlcfaustralia/";
  const instagram = settings?.instagramUrl ?? "https://www.instagram.com/dlcfaustralia";
  const youtube = settings?.youtubeUrl ?? "https://www.youtube.com/@dlcfaustralia";
  const copyright = settings?.footerCopyright ?? "© 2026 DCLM Australia. All rights reserved.";

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
              <Link href={facebook} className="hover:text-white" aria-label="Facebook"><FaFacebook className="h-5 w-5" /></Link>
              <Link href={instagram} className="hover:text-white" aria-label="Instagram"><FaInstagram className="h-5 w-5" /></Link>
              <Link href={youtube} className="hover:text-white" aria-label="YouTube"><BsYoutube className="h-5 w-5" /></Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">Church</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about-us" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact-us" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/contact-us" className="hover:text-white">Join Our Fellowship</Link></li>
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
              <li><Link href="/contact-us" className="hover:text-white">Connect with Us</Link></li>
              <li><Link href="/contact-us" className="hover:text-white">Become a Member</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-300">{copyright}</div>
    </footer>
  );
}

export default Footer;
