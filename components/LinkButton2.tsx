import Link from "next/link";

function LinkButton2({ title, href }: { title: string, href: string }) {
    return (
        <>
            <Link href={href} className="px-4 py-3 bg-primary text-white">{title}</Link>
        </>
    );
}

export default LinkButton2;
