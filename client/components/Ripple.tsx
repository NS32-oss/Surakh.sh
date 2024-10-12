import Ripple from "@/components/ui/ripple";

export function Rippled() {
    return (
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl">
            <Ripple />
        </div>
    );
}
