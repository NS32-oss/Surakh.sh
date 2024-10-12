import React, { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Navbar1 from "./components/Navbar1";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div
            className={`${GeistSans.className} ${GeistMono.className} antialiased flex-1 h-screen`}
        >
            <Navbar1 />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
