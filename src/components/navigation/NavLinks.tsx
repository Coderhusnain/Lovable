import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { memo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import NavbarChatButton from "@/components/navigation/NavbarChatButton";

interface NavLinksProps {
  scrolled: boolean;
  isActive: (path: string) => boolean;
}

export const NavLinks = memo(({ scrolled, isActive }: NavLinksProps) => {
  const navItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  const navigate = useNavigate();

  const handleProtectedNavigation = (path: string) => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate(path);
      } else {
        navigate("/login");
      }
    });
  };

  const navItems = [
    { path: "/", label: "Home", protected: false },
    { path: "/start-a-business", label: "Start a Business", protected: false },
    { path: "/documents", label: "Make Documents", protected: false },
    { path: "/pricing", label: "Pricing", protected: false },
    { path: "/ask-legal-advice", label: "Ask Legal Advice", protected: false }
  ];

  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutActive = isActive("/services") || isActive("/vision-mission");

  const [companyOpen, setCompanyOpen] = useState(false);
  const companyActive =
    isActive("/careers") || isActive("/contact") || isActive("/blogs") || isActive("/community");

  const companyLinks = [
    { to: "/vision-mission", title: "About Us", desc: "Who we are and how we make legal help affordable" },
    { to: "/careers", title: "Careers", desc: "Life at Legalgram and how we work" },
    { to: "/contact", title: "Contact Us", desc: "Sales, partnerships, and general inquiries" },
    { to: "/blogs", title: "Blogs", desc: "Legal guides, business tips, and plain language answers" },
    { to: "/community", title: "Community", desc: "Ask questions and learn from other members" },
  ];

  return (
    <NavigationMenu className="hidden xl:flex">
      <NavigationMenuList className={cn(
        "gap-1 2xl:gap-2 px-3 py-2 rounded-full items-center",
        scrolled ? "bg-white/5 backdrop-blur-md" : "bg-transparent"
      )}>
        {navItems.map((item) => (
          <motion.div key={item.path} variants={navItemVariants} className="flex items-center">
            <NavigationMenuItem className="flex items-center">
              <NavigationMenuLink
                className={cn(
                  "inline-flex items-center whitespace-nowrap text-sm 2xl:text-base font-medium transition-all duration-300 relative group px-2.5 py-2 rounded-full",
                  isActive(item.path) 
                    ? "text-bright-orange-500" 
                    : "text-bright-orange-500/90 hover:text-bright-orange-500"
                )}
                asChild
              >
                {item.protected ? (
                  <button
                    type="button"
                    className={cn(
                      "bg-transparent border-none outline-none p-0 m-0 font-inherit whitespace-nowrap text-bright-orange-500 transition-colors duration-300 hover:text-bright-orange-600",
                      isActive(item.path)
                        ? "text-bright-orange-500"
                        : "text-bright-orange-500/90 hover:text-bright-orange-500"
                    )}
                    onClick={() => handleProtectedNavigation(item.path)}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link to={item.path}>{item.label}</Link>
                )}
              </NavigationMenuLink>
            </NavigationMenuItem>
          </motion.div>
        ))}

        {/* About dropdown: Services + Vision & Mission */}
        <NavigationMenuItem
          className="flex items-center relative"
          onMouseEnter={() => setAboutOpen(true)}
          onMouseLeave={() => setAboutOpen(false)}
        >
          <button
            type="button"
            onClick={() => setAboutOpen((o) => !o)}
            className={cn(
              "inline-flex items-center gap-1 whitespace-nowrap text-sm 2xl:text-base font-medium transition-all duration-300 px-2.5 py-2 rounded-full",
              aboutActive ? "text-bright-orange-500" : "text-bright-orange-500/90 hover:text-bright-orange-500"
            )}
          >
            About
            <ChevronDown size={14} className={cn("transition-transform duration-200", aboutOpen && "rotate-180")} />
          </button>
          {aboutOpen && (
            <div className="absolute left-0 top-full pt-2 z-50">
              <div className="w-56 rounded-xl border border-gray-100 bg-white shadow-xl py-2">
                <Link
                  to="/services"
                  onClick={() => setAboutOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-bright-orange-50 hover:text-bright-orange-600 transition-colors"
                >
                  Our Services
                </Link>
                <Link
                  to="/vision-mission"
                  onClick={() => setAboutOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-bright-orange-50 hover:text-bright-orange-600 transition-colors"
                >
                  Our Vision & Mission
                </Link>
              </div>
            </div>
          )}
        </NavigationMenuItem>

        {/* Company dropdown: About Us, Careers, Contact Us, Blogs, Community */}
        <NavigationMenuItem
          className="flex items-center relative"
          onMouseEnter={() => setCompanyOpen(true)}
          onMouseLeave={() => setCompanyOpen(false)}
        >
          <button
            type="button"
            onClick={() => setCompanyOpen((o) => !o)}
            className={cn(
              "inline-flex items-center gap-1 whitespace-nowrap text-sm 2xl:text-base font-medium transition-all duration-300 px-2.5 py-2 rounded-full",
              companyActive ? "text-bright-orange-500" : "text-bright-orange-500/90 hover:text-bright-orange-500"
            )}
          >
            Company
            <ChevronDown size={14} className={cn("transition-transform duration-200", companyOpen && "rotate-180")} />
          </button>
          {companyOpen && (
            <div className="absolute right-0 top-full pt-2 z-50">
              <div className="w-80 rounded-xl border border-gray-100 bg-white shadow-xl py-3">
                <p className="px-5 pb-2 text-xs font-medium text-gray-400">Company</p>
                {companyLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setCompanyOpen(false)}
                    className="block px-5 py-2.5 hover:bg-bright-orange-50 transition-colors group"
                  >
                    <span className="block text-sm font-semibold text-gray-800 group-hover:text-bright-orange-600">
                      {l.title}
                    </span>
                    <span className="block text-xs text-gray-500 mt-0.5">{l.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </NavigationMenuItem>

        {/* Chat assistant trigger - opens the shared ChatWidget panel */}
        <NavigationMenuItem className="flex items-center">
          <NavbarChatButton scrolled={scrolled} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
});

NavLinks.displayName = 'NavLinks';