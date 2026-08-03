import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";

export interface PageView {
    path: string;
    title: string;
    section: string;
    referrer: string;
    timestamp: Timestamp;
    sessionId: string;
}

export interface ItemView {
    itemId: string;        // Firestore doc ID of the article/teaching/etc.
    itemType: string;      // "article" | "teaching" | "snippet" | "event" | "doctrine"
    itemTitle: string;
    path: string;
    timestamp: Timestamp;
    sessionId: string;
}

/** Derive a human-readable section from a URL path */
export function deriveSection(path: string): string {
    if (path === "/" || path === "") return "home";
    if (path.startsWith("/others/articles")) return "articles";
    if (path.startsWith("/bible-review-series/teachings")) return "teachings";
    if (path.startsWith("/bible-review-series/snippets")) return "snippets";
    if (path.startsWith("/bible-doctrine")) return "bible-doctrine";
    if (path.startsWith("/daily-manna")) return "daily-manna";
    if (path.startsWith("/others/daily-manna")) return "daily-manna";
    if (path.startsWith("/events")) return "events";
    if (path.startsWith("/about-us")) return "about";
    if (path.startsWith("/contact-us")) return "contact";
    return "other";
}

/** Generate or retrieve a session ID stored in sessionStorage */
function getSessionId(): string {
    if (typeof window === "undefined") return "ssr";
    const key = "_dclm_sid";
    let sid = sessionStorage.getItem(key);
    if (!sid) {
        sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
        sessionStorage.setItem(key, sid);
    }
    return sid;
}

/**
 * Cooldown-based dedup: returns true if the event was already tracked
 * within the last `cooldownMs` milliseconds (default 30 minutes).
 * This allows the same user to generate multiple views across separate
 * visits while still preventing double-counts on a single page load.
 */
function isDuplicate(key: string, cooldownMs = 5 * 60 * 1000): boolean {
    if (typeof window === "undefined") return true;
    const raw = sessionStorage.getItem(key);
    if (!raw) return false;
    const last = parseInt(raw, 10);
    if (isNaN(last)) return false;
    return Date.now() - last < cooldownMs;
}

function markTracked(key: string): void {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(key, String(Date.now()));
}

/** Track a single page view — deduplicates within a 30-min cooldown per path */
export async function trackPageView(path: string, title: string): Promise<void> {
    if (typeof window === "undefined") return;

    const dedupeKey = `_pv_${path}`;
    if (isDuplicate(dedupeKey)) return;
    markTracked(dedupeKey);

    try {
        await addDoc(collection(db, "pageViews"), {
            path,
            title: title || document.title,
            section: deriveSection(path),
            referrer: document.referrer || "direct",
            timestamp: Timestamp.now(),
            sessionId: getSessionId(),
        });
    } catch (err) {
        if (process.env.NODE_ENV === "development") {
            console.warn("[analytics] trackPageView failed:", err);
        }
    }
}

/** Track a view for a specific content item — deduplicates within a 30-min cooldown */
export async function trackItemView(
    itemId: string,
    itemType: string,
    itemTitle: string,
    path: string,
): Promise<void> {
    if (typeof window === "undefined") return;

    const dedupeKey = `_iv_${itemType}_${itemId}`;
    if (isDuplicate(dedupeKey)) return;
    markTracked(dedupeKey);

    try {
        await addDoc(collection(db, "itemViews"), {
            itemId,
            itemType,
            itemTitle,
            path,
            timestamp: Timestamp.now(),
            sessionId: getSessionId(),
        });
    } catch (err) {
        if (process.env.NODE_ENV === "development") {
            console.warn("[analytics] trackItemView failed:", err);
        }
    }
}
