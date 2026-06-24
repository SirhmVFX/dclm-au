import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    query,
    orderBy,
    where,
    limit,
    Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase";

// ── Types ──────────────────────────────────────────────────

export interface HeroSlide {
    id?: string;
    src: string;
    heading: string;
    sub: string;
    order: number;
    active: boolean;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export interface Article {
    id?: string;
    title: string;
    description: string;
    content: string;
    imgSrc: string;
    date: string;
    readingTime: string;
    published: boolean;
    featured: boolean;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export interface Snippet {
    id?: string;
    title: string;
    description: string;
    content: string;
    img: string;
    published: boolean;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export interface Teaching {
    id?: string;
    title: string;
    description: string;
    content: string;
    teacher: string;
    bibleVerse: string;
    date: string;
    imgSrc: string;
    published: boolean;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export interface Testimonial {
    id?: string;
    name: string;
    role: string;
    feedback: string;
    imgSrc: string;
    published: boolean;
    order: number;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export interface Leader {
    id?: string;
    name: string;
    title: string;
    image: string;
    bio: string;
    order: number;
    active: boolean;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export interface FAQItem {
    id?: string;
    question: string;
    answer: string;
    order: number;
    active: boolean;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export interface Stat {
    id?: string;
    value: string;
    label: string;
    order: number;
    active: boolean;
}

export interface SiteSettings {
    id?: string;
    siteName: string;
    siteDescription: string;
    email: string;
    phone: string;
    address: string;
    facebookUrl: string;
    instagramUrl: string;
    youtubeUrl: string;
    logoUrl: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaBody: string;
    ctaButtonText: string;
    ctaButtonUrl: string;
    footerCopyright: string;
    updatedAt?: Timestamp;
}

// ── Helpers ────────────────────────────────────────────────

async function getOrdered<T>(col: string, field = "order"): Promise<T[]> {
    const q = query(collection(db, col), orderBy(field));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
}

async function getAll<T>(col: string): Promise<T[]> {
    const snap = await getDocs(collection(db, col));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
}

async function getOne<T>(col: string, id: string): Promise<T | null> {
    const snap = await getDoc(doc(db, col, id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as T;
}

// ── Public read helpers ────────────────────────────────────

// Hero Slides
export const getHeroSlides = () => getOrdered<HeroSlide>("heroSlides");

// Articles — only published, ordered by createdAt newest first
export async function getPublishedArticles(): Promise<Article[]> {
    const snap = await getDocs(collection(db, "articles"));
    return snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as Article))
        .filter((a) => a.published)
        .sort((a, b) => {
            const ta = (a.createdAt as any)?.seconds ?? 0;
            const tb = (b.createdAt as any)?.seconds ?? 0;
            return tb - ta;
        });
}

export const getArticle = (id: string) => getOne<Article>("articles", id);

// Snippets — only published
export async function getPublishedSnippets(): Promise<Snippet[]> {
    const snap = await getDocs(collection(db, "snippets"));
    return snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as Snippet))
        .filter((s) => s.published)
        .sort((a, b) => {
            const ta = (a.createdAt as any)?.seconds ?? 0;
            const tb = (b.createdAt as any)?.seconds ?? 0;
            return tb - ta;
        });
}

export const getSnippet = (id: string) => getOne<Snippet>("snippets", id);

// Teachings — only published
export async function getPublishedTeachings(): Promise<Teaching[]> {
    const snap = await getDocs(collection(db, "teachings"));
    return snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as Teaching))
        .filter((t) => t.published)
        .sort((a, b) => {
            const ta = (a.createdAt as any)?.seconds ?? 0;
            const tb = (b.createdAt as any)?.seconds ?? 0;
            return tb - ta;
        });
}

export const getTeaching = (id: string) => getOne<Teaching>("teachings", id);

// Testimonials — only published
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
    const snap = await getDocs(collection(db, "testimonials"));
    return snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as Testimonial))
        .filter((t) => t.published)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

// Leaders — only active
export async function getActiveLeaders(): Promise<Leader[]> {
    const snap = await getDocs(collection(db, "leaders"));
    return snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as Leader))
        .filter((l) => l.active)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

// FAQs — only active
export async function getActiveFAQs(): Promise<FAQItem[]> {
    const snap = await getDocs(collection(db, "faqs"));
    return snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as FAQItem))
        .filter((f) => f.active)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

// Stats — only active
export async function getActiveStats(): Promise<Stat[]> {
    const snap = await getDocs(collection(db, "stats"));
    return snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as Stat))
        .filter((s) => s.active)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

// Site Settings
export async function getSiteSettings(): Promise<SiteSettings | null> {
    const snap = await getDocs(collection(db, "siteSettings"));
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() } as SiteSettings;
}

// Contact form submission
export async function submitContactMessage(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
}): Promise<void> {
    await addDoc(collection(db, "contactMessages"), {
        ...data,
        read: false,
        createdAt: new Date().toISOString(),
    });
}

// ── Homepage CMS ───────────────────────────────────────────

export interface WhoWeAre {
    id?: string;
    tag: string;
    heading: string;
    description: string;
    image: string;
}

export interface WhatWeOffer {
    id?: string;
    tag: string;
    heading: string;
}

export interface Service {
    id?: string;
    title: string;
    icon: string;
    description: string;
    order: number;
}

export interface Benefit {
    id?: string;
    numId: string;
    title: string;
    description: string;
    order: number;
}

export interface Achievement {
    id?: string;
    title: string;
    description: string;
    order: number;
}

export async function getWhoWeAre(): Promise<WhoWeAre | null> {
    const snap = await getDocs(collection(db, "whoWeAre"));
    if (snap.empty) return null;
    return { id: snap.docs[0].id, ...snap.docs[0].data() } as WhoWeAre;
}

export async function getWhatWeOffer(): Promise<WhatWeOffer | null> {
    const snap = await getDocs(collection(db, "whatWeOffer"));
    if (snap.empty) return null;
    return { id: snap.docs[0].id, ...snap.docs[0].data() } as WhatWeOffer;
}

export async function getServices(): Promise<Service[]> {
    const q = query(collection(db, "services"), orderBy("order"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service));
}

export async function getBenefits(): Promise<Benefit[]> {
    const q = query(collection(db, "benefits"), orderBy("order"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Benefit));
}

export async function getAchievements(): Promise<Achievement[]> {
    const q = query(collection(db, "achievements"), orderBy("order"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Achievement));
}

// ── About Page CMS ─────────────────────────────────────────

export interface AboutHero {
    id?: string;
    tag: string;
    heading: string;
    image: string;
}

export interface AboutIntro {
    id?: string;
    heading: string;
}

export interface AboutMissionVision {
    id?: string;
    missionTitle: string;
    missionText: string;
    visionTitle: string;
    visionText: string;
}

export interface AboutHowWeWork {
    id?: string;
    heading: string;
    description: string;
    image: string;
}

export interface AboutStat {
    id?: string;
    value: string;
    label: string;
    description: string;
    order: number;
}

export interface AboutProcessStep {
    id?: string;
    stepNumber: string;
    label: string;
    description: string;
    order: number;
}

export interface AboutValue {
    id?: string;
    label: string;
    description: string;
    image: string;
    order: number;
}

async function getSingleDoc<T>(col: string): Promise<T | null> {
    const snap = await getDocs(collection(db, col));
    if (snap.empty) return null;
    return { id: snap.docs[0].id, ...snap.docs[0].data() } as T;
}

export const getAboutHero = () => getSingleDoc<AboutHero>("aboutHero");
export const getAboutIntro = () => getSingleDoc<AboutIntro>("aboutIntro");
export const getAboutMissionVision = () => getSingleDoc<AboutMissionVision>("aboutMissionVision");
export const getAboutHowWeWork = () => getSingleDoc<AboutHowWeWork>("aboutHowWeWork");

export async function getAboutStats(): Promise<AboutStat[]> {
    const snap = await getDocs(collection(db, "aboutStats"));
    return snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as AboutStat))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getAboutProcessSteps(): Promise<AboutProcessStep[]> {
    const snap = await getDocs(collection(db, "aboutProcessSteps"));
    return snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as AboutProcessStep))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getAboutValues(): Promise<AboutValue[]> {
    const snap = await getDocs(collection(db, "aboutValues"));
    return snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as AboutValue))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

