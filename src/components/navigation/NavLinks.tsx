import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { memo } from "react";
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
    { path: "/ask-legal-advice", label: "Ask Legal Advice", protected: false },
    { path: "/community", label: "Community", protected: false }
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
                  "inline-flex items-center whitespace-nowrap text-sm 2xl:text-base font-medium transition-all duration-300 relative group px-3 py-2 rounded-full",
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

        {/* Chat assistant trigger - opens the shared ChatWidget panel */}
        <NavigationMenuItem className="flex items-center">
          <NavbarChatButton scrolled={scrolled} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
});

NavLinks.displayName = 'NavLinks';