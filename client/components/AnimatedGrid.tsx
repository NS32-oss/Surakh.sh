import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";

export function AnimatedGridPatternd() {
    return (
        <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg bg-background p-20 md:shadow-xl">
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                    "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
                )}
            />
        </div>
    );
}
