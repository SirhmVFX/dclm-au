"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

export default function PageTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Fire on every route change; title may update after a tick
        const timer = setTimeout(() => {
            trackPageView(pathname, document.title);
        }, 300); // small delay so document.title is up-to-date

        return () => clearTimeout(timer);
    }, [pathname]);

    return null; // renders nothing
}
