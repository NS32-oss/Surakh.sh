'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
    const pathname = usePathname();
    const paths = pathname.split("/").filter((path) => path);

    return (
        <nav className=" border-b px-6 py-3">
            <ol className="flex">
                <li>
                    <Link
                        href="/documentation"
                        className="text-blue-600 hover:underline"
                    >
                        Docs
                    </Link>
                </li>
                {paths.slice(1).map((path, index) => (
                    <li key={path} className="flex items-center">
                        <span className="mx-2 text-white">/</span>
                        <Link
                            href={`/documentation/${paths
                                .slice(1, index + 2)
                                .join("/")}`}
                            className="text-blue-600 hover:underline capitalize"
                        >
                            {path.replace(/-/g, " ")}
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;