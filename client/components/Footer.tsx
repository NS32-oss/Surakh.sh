import { Blocks, CodeXml, CreditCard, Webhook } from "lucide-react";

import Link from "next/link";

const items = [
    {
        title: "Product",
        links: [
            {
                name: "Features",
                Icon: Blocks,
            },
            {
                name: "Pricing",
                Icon: CreditCard,
            },
            {
                name: "Integrations",
                Icon: Webhook,
            },
            {
                name: "API Documentation",
                Icon: CodeXml,
            },
        ],
    },
];

export function Footer() {
    return (
        <div className="pt-24">
            <div className="max-w-screen-xl px-4 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <p className="text-sm text-foreground/60">
                            Surakh.sh is a platform that allows you to
                            authenticate using any provider.
                        </p>

                        <p className="text-sm font-light text-foreground/55 mt-3.5 ">
                            <Link
                                className="hover:text-foreground/90"
                                target="_blank"
                                href="https://x.com/raymethula"
                            >
                                Twitter
                            </Link>{" "}
                            •{" "}
                            <Link className="hover:text-foreground/90" href="#">
                                Github
                            </Link>{" "}
                            •{" "}
                            <Link className="hover:text-foreground/90" href="#">
                                Discord
                            </Link>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 mt-16 md:grid-cols-3 lg:col-span-8 lg:justify-items-end lg:mt-0">
                        {items.map(({ title, links }) => (
                            <div
                                key={title}
                                className="last:mt-12 md:last:mt-0"
                            >
                                <h3 className="text-sm font-semibold">
                                    {title}
                                </h3>
                                <ul className="mt-4 space-y-2.5">
                                    {links.map(({ name, Icon }) => (
                                        <li key={name}>
                                            <Link
                                                href="#"
                                                className="text-sm transition-all text-foreground/60 hover:text-foreground/90 group"
                                            >
                                                <Icon className="inline stroke-2 h-4 mr-1.5 transition-all stroke-foreground/60 group-hover:stroke-foreground/90" />
                                                {name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-20 border-t pt-6 pb-8">
                <p className="text-xs text-foreground/55 px-8">
                    © 2021 Surakh.sh. All rights reserved.
                </p>
            </div>
        </div>
    );
}
