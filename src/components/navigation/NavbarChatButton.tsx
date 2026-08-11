/**
 * Navbar trigger for Gram AI. No React Context, no shared
 * state - just dispatches a custom browser event that
 * ChatWidget.tsx listens for. This avoids any provider/
 * re-render issues entirely.
 */
import { motion } from "framer-motion";
import GramAiIcon from "@/components/icons/GramAiIcon";
import { cn } from "@/lib/utils";
import { OPEN_GRAM_AI_EVENT } from "@/components/chat/ChatWidget";

interface NavbarChatButtonProps {
  scrolled?: boolean;
}

export default function NavbarChatButton({ scrolled }: NavbarChatButtonProps) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent(OPEN_GRAM_AI_EVENT));
  };

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center whitespace-nowrap gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-all duration-300",
        "border border-bright-orange-500/40",
        "bg-transparent text-bright-orange-500/90 hover:text-bright-orange-500 hover:bg-bright-orange-500/10"
      )}
      aria-label="Open Gram AI chat"
    >
      <GramAiIcon size={16} />
      Gram AI
    </motion.button>
  );
}