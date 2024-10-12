import Link from "next/link";
import { ShieldPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { NavMenu } from "./NavMenu";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-[#111111] text-white">
            <div className="flex items-center space-x-8 px-10 text-white">
                <Link href="/" className="flex items-center space-x-2">
                    <ShieldPlus className="h-6 w-6" />
                    <p className="font-[family-name:var(--font-geist-mono)]">
                        Surakh.sh
                    </p>
                </Link>
            </div>
            <div className="flex space-x-2">
                <Button variant="secondary">Examples</Button>
                <Button variant="secondary">Components</Button>
                <Link href="/docs">
                    <Button variant="secondary">Documentation</Button>
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <Link href="/auth">
                    <Button variant="secondary" className="text-white">
                        Login
                    </Button>
                </Link>
                <Link href="/auth">
                    <Button className="text-white border-white hover:bg-white hover:text-black">
                        Start your trial
                    </Button>
                </Link>
            </div>
        </nav>
    );
}
