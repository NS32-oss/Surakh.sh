"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";

import { Check } from "lucide-react";

const pricingItems = [
    {
        plan: "Free",
        price: {
            monthly: 0,
            yearly: 0,
        },
        includes: "What's included:",
        features: [
            "Basic authentication",
            "Email/password login",
            "Up to 1,000 monthly active users",
            "Community support",
        ],
        cta: "Start for free",
    },
    {
        plan: "Pro",
        price: {
            monthly: 29,
            yearly: 24,
        },
        includes: "Everything in Free, plus:",
        features: [
            "Social login (Google, GitHub, etc.)",
            "Multi-factor authentication",
            "Customizable login pages",
            "Up to 10,000 monthly active users",
            "Priority support",
        ],
        cta: "Get started",
    },
    {
        plan: "Enterprise",
        price: {
            monthly: 99,
            yearly: 79,
        },
        includes: "Everything in Pro, plus:",
        features: [
            "SAML and LDAP integration",
            "Custom user roles",
            "Up to 100,000 monthly active users",
            "24/7 support",
        ],
        cta: "Contact sales",
    },
];

export function Pricing() {
    const [annualBilling, setAnnualBilling] = React.useState(true);
    const period = React.useMemo(
        () => (annualBilling ? "yearly" : "monthly"),
        [annualBilling]
    );

    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <div className="bg-[#111111] py-12 font-mono">
            <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
                <div className="max-w-xl mx-auto text-center">
                    <p className="text-foreground/60 mt-6 md:text-lg">
                        Get the features you need today, with the flexibility to
                        upgrade as your project scales.
                    </p>
                </div>

                <div className="relative mx-auto mt-12 flex max-w-fit items-center space-x-2">
                    <p className="text-foreground/60 font-medium">Monthly</p>
                    <Switch
                        checked={annualBilling}
                        onCheckedChange={setAnnualBilling}
                    />
                    <p className="text-foreground/60 font-medium">Yearly</p>
                    <Badge
                        className="rounded-full border-foreground"
                        variant="outline"
                    >
                        20% off
                    </Badge>
                </div>

                {/* desktop view */}
                <div className="hidden grid-cols-3 gap-6 mt-10 lg:grid">
                    {pricingItems.map((item) => (
                        <PricingCard
                            key={item.plan}
                            item={item}
                            period={period}
                        />
                    ))}
                </div>

                {/* mobile view */}
                <div className="mt-10 lg:hidden">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            startIndex: 1,
                        }}
                    >
                        <CarouselContent>
                            {pricingItems.map((item) => (
                                <CarouselItem
                                    key={item.plan}
                                    className="basis-[min(90vw,400px)]"
                                >
                                    <PricingCard item={item} period={period} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    <div className="mt-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                            {pricingItems.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                                        index === current
                                            ? "bg-black"
                                            : "bg-black/25"
                                    }`}
                                    onClick={() => api?.scrollTo(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface PricingItem {
    plan: string;
    price: {
        monthly: number;
        yearly: number;
    };
    includes: string;
    features: string[];
    cta: string;
}

function PricingCard({ item, period }: { item: PricingItem; period: string }) {
    const { plan, includes, price, features, cta } = item;

    return (
        <div
            key={plan}
            className={cn(
                "relative h-full flex flex-col bg-black border border-slate-300 rounded-xl p-8",
                plan === "Pro" && "border-foreground border-2"
            )}
        >
            <p className="text-xl font-medium mb-3.5">{plan}</p>

            <div className="flex items-center gap-x-1">
                {/* <h5 className="text-4xl font-semibold">${price[period]}</h5> */}
            </div>
            {plan === "Free" ? (
                <p className="text-sm text-foreground/60 font-medium">
                    free forever
                </p>
            ) : (
                <p className="text-sm text-foreground/60 font-medium">
                    per {period === "yearly" ? "month, billed yearly" : "month"}
                </p>
            )}
            <p className="text-sm font-medium mt-6">{includes}</p>
            <ul className="text-sm text-foreground/60 mt-3 mb-10 space-y-3">
                {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                        <Check className="w-5 h-6 flex-none text-foreground" />
                        {feature}
                    </li>
                ))}
            </ul>

            <div className="flex grow items-end py-4">
                {plan === "Pro" ? (
                    <Button className="w-full h-10 rounded-full">{cta}</Button>
                ) : (
                    <Button
                        className="w-full h-10 rounded-full"
                        variant="outline"
                    >
                        {cta}
                    </Button>
                )}
            </div>
        </div>
    );
}
