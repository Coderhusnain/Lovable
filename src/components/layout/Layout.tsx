
import { ReactNode, memo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

const Layout = memo(({ children }: LayoutProps) => {
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  
  // Check if the current route is the dashboard
  const isDashboard = location.pathname.includes("/dashboard");
  const isDocumentsPage = location.pathname === "/documents";

  useEffect(() => {
    setMounted(true);
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className={cn(
      `flex flex-col min-h-screen w-full transition-colors duration-500 bg-white`,
      mounted ? 'animate-fade-in' : 'opacity-0'
    )}>
      {!isDashboard && <Header />}
      <main className="flex-grow w-full text-deep-blue">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </main>
      <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <Footer />
      </div>
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;
