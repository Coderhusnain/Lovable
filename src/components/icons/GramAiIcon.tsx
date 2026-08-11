/* Custom Gram AI mark: a chat bubble holding the scales of justice.
   Unique to Legalgram — reads as "legal help, in a conversation".

   Color is passed explicitly (not via currentColor) because the global
   stylesheet's universal `*` rule overrides inherited colors on svg paths. */

interface GramAiIconProps {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

const GramAiIcon = ({ size = 16, color = "#F18F01", className = "", strokeWidth = 1.7 }: GramAiIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Rounded-square message bubble */}
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    {/* Scales of justice: post, base, crossbar, two hanging pans */}
    <path d="M12 6.4v7.2" />
    <path d="M9.8 13.6h4.4" />
    <path d="M7.6 8.2h8.8" />
    <path d="M7.6 8.2 5.9 11.2h3.4Z" fill={color} stroke="none" />
    <path d="M16.4 8.2l-1.7 3h3.4Z" fill={color} stroke="none" />
  </svg>
);

export default GramAiIcon;
