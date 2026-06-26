"use client";

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
    if (totalPages <= 1) return null;

    // Build page number list with ellipsis
    function getPages(): (number | "…")[] {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        const pages: (number | "…")[] = [];
        pages.push(1);
        if (currentPage > 3) pages.push("…");
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pages.push(i);
        }
        if (currentPage < totalPages - 2) pages.push("…");
        pages.push(totalPages);
        return pages;
    }

    return (
        <div className="flex items-center justify-center gap-1 py-10">
            {/* Prev */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm border border-gray-300 text-gray-600 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
                ← Prev
            </button>

            {getPages().map((p, i) =>
                p === "…" ? (
                    <span key={`ellipsis-${i}`} className="px-2 py-2 text-sm text-gray-400 select-none">
                        …
                    </span>
                ) : (
                    <button
                        key={p}
                        onClick={() => onPageChange(p as number)}
                        className={`w-9 h-9 text-sm border transition-colors ${p === currentPage
                                ? "bg-primary text-white border-primary"
                                : "border-gray-300 text-gray-600 hover:border-primary hover:text-primary"
                            }`}
                    >
                        {p}
                    </button>
                )
            )}

            {/* Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm border border-gray-300 text-gray-600 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
                Next →
            </button>
        </div>
    );
}
