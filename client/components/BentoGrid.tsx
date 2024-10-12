import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
    IconShieldLock,
    IconAutomation,
    IconBrandOpenSource,
    IconMeteor,
} from "@tabler/icons-react";
import { Gradient } from "./Graident";
import { Rippled } from "./Ripple";
import { AnimatedGridPatternd } from "./AnimatedGrid";
import { FlickeringGid } from "./FlickeringGid";

const Skeleton = () => (
    <div></div>
);
const items = [
    {
        title: "Security",
        description: "Best security practices to keep your apps safe.",
        header: <Gradient />,
        className: "md:col-span-2",
        icon: <IconShieldLock className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Multiple Auth Providers",
        description: "Support for multiple auth providers.",
        header: <Rippled />,
        className: "md:col-span-1",
        icon: <IconAutomation className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Open Source",
        description: "Reliable and transparent, just like you.",
        header: <FlickeringGid />,
        className: "md:col-span-1",
        icon: <IconBrandOpenSource className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Robust and Scalable",
        description: "Built to handle the most demanding applications.",
        header: <AnimatedGridPatternd />,
        className: "md:col-span-2",
        icon: <IconMeteor className="h-4 w-4 text-neutral-500" />,
    
    },
];

export function BentoDemo() {
    return (
        <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={item.className}
                    icon={item.icon}
                />
            ))}
        </BentoGrid>
    );
}

