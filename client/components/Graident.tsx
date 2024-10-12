"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";

export function Gradient() {
    return (
        <div className="relative flex size-full items-center justify-center overflow-hidden rounded-lg  bg-background p-20 md:shadow-xl">
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className={cn(
                    "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
                )}
            />
        </div>
    );
}
