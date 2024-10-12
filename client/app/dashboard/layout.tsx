import React, { ReactNode } from 'react';
import DashSidebar from './components/DashSidebar';
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
      <div
          className={`${GeistSans.className} ${GeistMono.className} antialiased flex h-screen`}
      >
          <DashSidebar />
          <main className="flex-1 p-4">{children}</main>
      </div>
  );
};

export default Layout;