import { BorderBeam } from "./ui/border-beam";
import Safari from "./ui/safari";

export function BorderBeamDemo() {
    return (
        <div className="relative flex h-fit w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
            {/* <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                Border Beam
            </span> */}
            <Safari />
            <BorderBeam size={300} duration={15} delay={0} anchor={90}/>
        </div>
    );
}
