import React from "react";
import Sidebar from "./components/Sidebar";
import Breadcrumb from "./components/Breadcrumbs";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${GeistSans.className} ${GeistMono.className} antialiased flex h-screen`}>
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Breadcrumb />
                <main className="flex-1 overflow-y-auto px-6 py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
