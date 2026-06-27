"use client";

import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Leaders from "@/components/Leaders";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BiChevronRight } from "react-icons/bi";
import { MdFacebook, MdOpenInNew } from "react-icons/md";
import {
  getPublishedSnippets,
  getPublishedFacebookPosts,
  getActiveSnippetCategories,
  type Snippet,
  type FacebookPost,
  type SnippetCategory,
} from "@/lib/firestore";

type Tab = "reflections" | "facebook";

const ITEMS_PER_PAGE = 9;
const FB_ITEMS_PER_PAGE = 9;

const FALLBACK_SNIPPETS: Snippet[] = [
  { img: "/assets/9.jpg", title: "Choose to Trust in God", description: "A reflection on what it means to place your complete trust in God in every situation of life.", content: "", published: true, categoryIds: [] },
  { img: "/assets/6.jpg", title: "Forgiveness", description: "Exploring the power and necessity of forgiveness as taught and modelled by our Lord Jesus Christ.", content: "", published: true, categoryIds: [] },
  { img: "/assets/10.jpg", title: "Believe in God", description: "An encouragement to hold fast to genuine faith in God, especially in the midst of life's challenges.", content: "", published: true, categoryIds: [] },
  { img: "/assets/8.jpg", title: "Joy as Jesus Comes", description: "Meditating on the joy that believers anticipate as we look forward to the coming of our Lord Jesus Christ.", content: "", published: true, categoryIds: [] },
];

function SnippetsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = (searchParams.get("tab") as Tab) === "facebook" ? "facebook" : "reflections";
  const activeSlug = searchParams.get("category") ?? "all";
  const currentPage = Number(searchParams.get("page") ?? "1");

  const [allSnippets, setAllSnippets] = useState<Snippet[]>([]);
  const [fbPosts, setFbPosts] = useState<FacebookPost[]>([]);
  const [snippetCategories, setSnippetCategories] = useState<SnippetCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPublishedSnippets(), getPublishedFacebookPosts(), getActiveSnippetCategories()])
      .then(([snips, posts, cats]) => {
        setAllSnippets(snips.length > 0 ? snips : FALLBACK_SNIPPETS);
        setFbPosts(posts);
        setSnippetCategories(cats);
      })
      .catch(() => {
        setAllSnippets(FALLBACK_SNIPPETS);
        setFbPosts([]);
        setSnippetCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter snippets by active category
  const filteredSnippets = activeSlug === "all"
    ? allSnippets
    : (() => {
      const cat = snippetCategories.find((c) => c.slug === activeSlug);
      if (!cat?.id) return allSnippets;
      return allSnippets.filter((s) => (s.categoryIds ?? []).includes(cat.id!));
    })();

  // Snippets pagination
  const totalSnippetPages = Math.ceil(filteredSnippets.length / ITEMS_PER_PAGE);
  const safeSnippetPage = Math.min(Math.max(currentPage, 1), Math.max(totalSnippetPages, 1));
  const snippetPageItems = filteredSnippets.slice(
    (safeSnippetPage - 1) * ITEMS_PER_PAGE,
    safeSnippetPage * ITEMS_PER_PAGE
  );

  // Facebook pagination
  const totalFbPages = Math.ceil(fbPosts.length / FB_ITEMS_PER_PAGE);
  const safeFbPage = Math.min(Math.max(currentPage, 1), Math.max(totalFbPages, 1));
  const fbPageItems = fbPosts.slice(
    (safeFbPage - 1) * FB_ITEMS_PER_PAGE,
    safeFbPage * FB_ITEMS_PER_PAGE
  );

  function setTab(tab: Tab) {
    const params = new URLSearchParams();
    if (tab !== "reflections") params.set("tab", tab);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  function setCategory(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") params.delete("category"); else params.set("category", slug);
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  }

  function setPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) params.delete("page"); else params.set("page", String(page));
    router.push(`?${params.toString()}`, { scroll: true });
  }

  return (
    <>
      {/* HERO */}
      <section className="pt-32">
        <div className="w-300 mx-auto flex flex-col sm:flex-row justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p>Bible Snippets</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Short reflections from the Word</h1>
          </div>
          <div className="relative w-full sm:w-64 h-40 shrink-0 overflow-hidden">
            <Image fill src="/assets/11.jpg" alt="Bible Review Series" className="object-cover" />
            <div className="absolute bg-primary text-white text-sm px-2 py-1 left-0 top-0 z-10"><p>Bible Snippets</p></div>
            <div className="absolute bg-primary text-white text-sm px-2 py-1 left-0 top-10 z-10"><p>Spiritual Growth</p></div>
            <div className="absolute bg-primary text-white text-sm px-2 py-1 left-0 top-20 z-10"><p>Sound Doctrine</p></div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section>
        <div className="w-300 mx-auto">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setTab("reflections")}
              className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === "reflections"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
            >
              Reflections
            </button>
            <button
              onClick={() => setTab("facebook")}
              className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors flex items-center gap-2 ${activeTab === "facebook"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
            >
              <MdFacebook size={16} className={activeTab === "facebook" ? "text-[#1877F2]" : "text-gray-400"} />
              Facebook Posts
              {fbPosts.length > 0 && (
                <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-sm font-semibold">
                  {fbPosts.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* REFLECTIONS TAB */}
      {activeTab === "reflections" && (
        <section>
          <div className="w-300 mx-auto py-12 md:py-20">
            {/* Category filter — only shown when categories exist */}
            {!loading && snippetCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  onClick={() => setCategory("all")}
                  className={`px-4 py-1.5 text-sm border transition-colors ${activeSlug === "all" ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary"}`}
                >
                  All
                </button>
                {snippetCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.slug)}
                    className={`px-4 py-1.5 text-sm border transition-colors ${activeSlug === cat.slug ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary"}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}

            {loading ? (
              <p className="text-center text-gray-400 text-sm py-20">Loading snippets…</p>
            ) : filteredSnippets.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-20">
                {activeSlug !== "all" ? "No snippets in this category yet." : "No snippets yet."}
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                  {snippetPageItems.map((snippet, index) => (
                    <Link
                      key={snippet.id ?? index}
                      href={snippet.id ? `/bible-review-series/snippets/${snippet.id}` : "#"}
                      className="border border-gray-300 bg-white hover:shadow-md transition-shadow block"
                    >
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image fill src={snippet.img || "/assets/9.jpg"} alt={snippet.title} className="object-cover" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">{snippet.title}</h3>
                          <BiChevronRight className="h-6 w-6 text-gray-400 shrink-0" />
                        </div>
                        {snippet.categoryIds?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {snippet.categoryIds.map((cid) => {
                              const cat = snippetCategories.find((c) => c.id === cid);
                              return cat ? (
                                <span key={cid} className="text-xs px-2 py-0.5 bg-primary/10 text-primary">{cat.name}</span>
                              ) : null;
                            })}
                          </div>
                        )}
                        <p className="text-gray-600">{snippet.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Pagination
                  currentPage={safeSnippetPage}
                  totalPages={totalSnippetPages}
                  onPageChange={setPage}
                />
              </>
            )}
          </div>
        </section>
      )}

      {/* FACEBOOK POSTS TAB */}
      {activeTab === "facebook" && (
        <section>
          <div className="w-300 mx-auto py-12 md:py-20">
            {loading ? (
              <p className="text-center text-gray-400 text-sm py-20">Loading posts…</p>
            ) : fbPosts.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <MdFacebook size={48} className="mx-auto text-gray-200" />
                <p className="text-gray-400 text-sm">No Facebook posts have been added yet.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {fbPageItems.map((post) => (
                    <a
                      key={post.id}
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gray-200 bg-white hover:shadow-md transition-shadow flex flex-col group"
                    >
                      {/* Cover image if uploaded */}
                      {post.image ? (
                        <div className="relative w-full h-48 overflow-hidden shrink-0">
                          <Image
                            fill
                            src={post.image}
                            alt={post.caption || "Facebook post"}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        /* No image — Facebook blue placeholder */
                        <div className="w-full h-16 bg-[#1877F2] flex items-center justify-center shrink-0">
                          <MdFacebook size={32} className="text-white/80" />
                        </div>
                      )}

                      {/* Card body */}
                      <div className="p-5 flex-1 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-[#1877F2] flex items-center justify-center shrink-0">
                            <MdFacebook size={16} className="text-white" />
                          </div>
                          <span className="text-xs font-semibold text-gray-700">DLCF Australia</span>
                        </div>

                        {post.caption && (
                          <p className="text-sm text-gray-700 leading-relaxed line-clamp-5 flex-1">
                            {post.caption}
                          </p>
                        )}

                        <div className="flex items-center justify-end pt-2 border-t border-gray-100">
                          <span className="text-xs font-semibold text-[#1877F2] flex items-center gap-1 group-hover:underline">
                            View on Facebook <MdOpenInNew size={12} />
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                <Pagination
                  currentPage={safeFbPage}
                  totalPages={totalFbPages}
                  onPageChange={setPage}
                />
              </>
            )}
          </div>
        </section>
      )}

      {/* BANNER */}
      <section className="w-full h-64 sm:h-96 md:h-124 relative overflow-hidden">
        <Image fill src="/assets/12.jpg" alt="Bible Review Series" className="object-cover" />
        <div className="absolute inset-x-4 sm:inset-auto sm:left-[10%] sm:w-105 top-8 sm:top-12 md:top-20 bg-primary/35 text-white p-5 md:p-6 z-10">
          <div className="relative w-20 h-20 md:w-32 md:h-32 mb-4">
            <Image fill src="/assets/dlclogo.png" alt="DLCF Logo" className="object-contain" />
          </div>
          <h1 className="text-lg md:text-xl font-bold mb-3">Contending earnestly for the faith.</h1>
          <p className="text-sm md:text-base">Please feel free to check on our Bible Review Series below — in-depth teachings and short reflections to help you grow in the knowledge of God&apos;s Word.</p>
        </div>
      </section>

      <Leaders />
      <FAQ />
      <CTA />
    </>
  );
}

export default function SnippetssPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SnippetsPage />
    </Suspense>
  );
}
