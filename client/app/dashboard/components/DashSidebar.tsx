import Link from "next/link";
import { Key, ShieldPlus, Bolt, Book } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashSidebar() {
    return (
        <div className="flex flex-col h-full p-8 bg-black text-white">
            <div className="flex items-center space-x-2 mb-8">
                <ShieldPlus className="h-6 w-6" />
                <p className="font-[family-name:var(--font-geist-mono)]">
                    Surakh.sh
                </p>
            </div>
            <nav className="flex flex-col space-y-4">
                <Link
                    href="/dashboard/projectkeys"
                    className="text-white flex items-center space-x-2"
                >
                    <Key className="h-4 w-4" />
                    <span>API Keys</span>
                </Link>

                <Link
                    href="/docs"
                    className="text-white flex items-center space-x-2"
                >
                    <Book className="h-4 w-4" />
                    <span>Docs</span>
                </Link>
            </nav>
        </div>
    );
}
