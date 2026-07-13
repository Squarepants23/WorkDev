import type { ReactNode } from "react";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-300/30 blur-3xl" />

        <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-300/25 blur-3xl" />

        <div className="absolute bottom-0 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-indigo-300/20 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_60%)]" />
      </div>

      <Navbar />

      <main className="relative z-10 min-h-[calc(100vh-160px)]">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
