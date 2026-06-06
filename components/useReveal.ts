"use client";
import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport it receives `animClass`
 * (default: "animate-fade-up"), and any child elements that already
 * have the "reveal" class get their own animate-* class applied too
 * (useful for staggered children).
 */
export function useReveal(animClass = "animate-fade-up") {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.classList.add("reveal");

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add(animClass);
                    el.querySelectorAll<HTMLElement>(".reveal").forEach((child) => {
                        const childAnim =
                            [...child.classList].find((c) => c.startsWith("animate-")) ??
                            animClass;
                        child.classList.add(childAnim);
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [animClass]);

    return ref;
}
