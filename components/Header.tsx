"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface NavItem {
  id: number;
  link?: string;
  name: string;
  isDropdown?: boolean;
  dropdownItems?: {
    id: number;
    link: string;
    name: string;
  }[];
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";

  // On non-home pages always use dark text so it's visible on a white background.
  // On the home page, switch to dark text only once the user scrolls.
  const useDarkText = !isHome || isScrolled;

  const navlinks: NavItem[] = [
    { id: 1, link: "/", name: "Home" },
    { id: 2, link: "/about-us", name: "About Us" },
    { id: 3, link: "/contact-us", name: "Contact Us" },
    {
      id: 4,
      name: "Resources",
      isDropdown: true,
      dropdownItems: [
        { id: 4.1, link: "https://www.dailymanna.app/", name: "Daily Manna" },
        { id: 4.2, link: "/others/articles", name: "Articles" },
      ],
    },
    {
      id: 5,
      name: "Others",
      isDropdown: true,
      dropdownItems: [
        { id: 5.1, link: "/bible-review-series/snippets", name: "Snippets" },
        { id: 5.2, link: "/bible-review-series/teachings", name: "Teachings" },

      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white " : "bg-transparent"
        }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12">
              <Image
                src="/assets/dlclogo.png"
                alt="DCLM AU Logo"
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className={`text-xs uppercase tracking-[0.35em] transition-colors duration-300 ${useDarkText ? "text-blue-700" : "text-white/90"
                }`}>
                Deeper Life Campus Fellowship
              </p>
              <h1 className={`text-lg font-semibold transition-colors duration-300 ${useDarkText ? "text-gray-900" : "text-white"
                }`}>
                DCLF AU
              </h1>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navlinks.map((item) => (
              <div key={item.id} className="relative">
                {item.isDropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.id ? 0 : item.id)
                      }
                      className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${useDarkText
                        ? "text-gray-700 hover:text-blue-700"
                        : "text-white hover:text-gray-100"
                        }`}
                    >
                      {item.name}
                      <svg
                        className={`h-4 w-4 transition-transform duration-300 ${openDropdown === item.id ? "rotate-180" : ""
                          }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {openDropdown === item.id && (
                      <div className="absolute left-0 top-full mt-2 w-52 border border-gray-200 bg-white py-2  animate-fade-in">
                        {(item.dropdownItems ?? []).map((dropdownItem) => (
                          <Link
                            key={dropdownItem.id}
                            href={dropdownItem.link}
                            onClick={() => setOpenDropdown(0)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-700"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.link ?? "/"}
                    className={`text-sm font-medium transition-colors duration-300 ${useDarkText
                      ? "text-gray-700 hover:text-blue-700"
                      : "text-white hover:text-gray-100"
                      }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className={`px-4 py-2 text-sm font-semibold transition-colors duration-300 ${useDarkText
                ? "text-blue-700 hover:bg-blue-50"
                : "text-white hover:bg-white/10"
                }`}
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className={`px-4 py-2 text-sm font-semibold transition-colors duration-300 ${useDarkText
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
            >
              Sign up
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <svg
              className={`h-6 w-6 transition-colors duration-300 ${useDarkText ? "text-gray-900" : "text-white"
                }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 bg-white py-4 md:hidden animate-fade-in">
            <nav className="flex flex-col gap-3">
              {navlinks.map((item) => (
                <div key={item.id}>
                  {item.isDropdown ? (
                    <div className="space-y-2">
                      <p className="px-2 text-xs uppercase tracking-[0.3em] text-blue-700">
                        {item.name}
                      </p>
                      {(item.dropdownItems ?? []).map((dropdownItem) => (
                        <Link
                          key={dropdownItem.id}
                          href={dropdownItem.link}
                          onClick={() => setIsMenuOpen(false)}
                          className="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.link ?? "/"}
                      onClick={() => setIsMenuOpen(false)}
                      className="block rounded px-3 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="rounded bg-blue-700 px-3 py-2 text-center text-white"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setIsMenuOpen(false)}
                className="rounded border border-blue-700 px-3 py-2 text-center text-blue-700"
              >
                Sign up
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
