"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex min-h-screen bg-[#111111] font-mono">
            {/* Left side */}
            <div className="w-1/2 flex flex-col justify-between p-10 bg-[#111111] text-white">
                <div>
                    <h1 className="text-xl font-bold flex items-center">
                        <span className="mr-2"></span> Surakh.sh
                    </h1>
                </div>
                <div className="text-white">
                    <blockquote className="text-lg">
                        “This library has saved me countless hours of work and
                        helped me deliver stunning designs to my clients faster
                        than ever before.”
                    </blockquote>
                    <p className="mt-4">Sofia Davis</p>
                </div>
            </div>

            {/* Right side */}
            <div className="w-1/2 bg-black flex items-center justify-center">
                <div className="bg-black p-10 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-semibold mb-6 text-white">
                        Create an account
                    </h2>
                    <Label className="block mb-2 text-sm text-white">
                        Enter your email below to create your account
                    </Label>
                    <Input
                        type="email"
                        className="w-full p-2 mb-4 text-white rounded-lg"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        className="w-full p-2 mb-4 text-white rounded-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Link href="/dashboard/projectkeys">
                        <Button className="w-full bg-white text-black mb-4">
                            Sign Up with Email
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
