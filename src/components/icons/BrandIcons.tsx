/* ────────────────────────────────────────────────────────────────
   Legalgram bespoke duotone icon set.
   A crafted, premium alternative to generic icons: a navy primary
   shape with a signature orange accent. Colors are passed as explicit
   attributes (not currentColor) so the global stylesheet can't recolor
   the strokes. Drop any of these into <BrandIconTile>.
   ──────────────────────────────────────────────────────────────── */

const NAVY = "#1e2a4a";
const ORANGE = "#F18F01";
const ORANGE_SOFT = "#FBB040";

interface IconProps { size?: number; className?: string }

const base = (size: number, className: string) => ({
  width: size, height: size, viewBox: "0 0 48 48", fill: "none",
  xmlns: "http://www.w3.org/2000/svg", className, "aria-hidden": true as const,
});

/* Legal document — page with signature line + orange seal */
export const DocIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M12 6h16l8 8v28a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" fill="#fff" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M28 6v8h8" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M16 22h12M16 28h16M16 34h8" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="31" cy="35" r="6" fill={ORANGE} />
    <path d="M28.5 35.2l1.8 1.8 3.2-3.4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Business formation — building with an orange flag */
export const BusinessIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <rect x="10" y="16" width="20" height="26" rx="2" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
    <path d="M30 24h8v18h-8" fill="#fff" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M16 22h4M16 28h4M16 34h4M22 22h2M22 28h2M22 34h2M34 30h2M34 36h2" stroke={NAVY} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M20 16V8l10 3-10 3" fill={ORANGE} stroke={ORANGE} strokeWidth="2" strokeLinejoin="round" />
    <line x1="20" y1="8" x2="20" y2="16" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/* Legal resources — open book with orange bookmark */
export const ResourcesIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M24 14c-4-3-9-3-13-2v24c4-1 9-1 13 2 4-3 9-3 13-2V12c-4-1-9-1-13 2Z" fill="#fff" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M24 14v24" stroke={NAVY} strokeWidth="2.5" />
    <path d="M15 19h5M15 24h5M28 19h5M28 24h5" stroke={NAVY} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M30 8h8v12l-4-3-4 3V8Z" fill={ORANGE} stroke={ORANGE} strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

/* Legal plans — shield with an orange check */
export const PlanIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M24 6l14 5v11c0 9-6 16-14 20-8-4-14-11-14-20V11l14-5Z" fill="#fff" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M17 24l5 5 10-11" stroke={ORANGE} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Secure / confidential — lock with orange shackle */
export const SecureIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <rect x="11" y="21" width="26" height="20" rx="3" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
    <path d="M16 21v-5a8 8 0 0 1 16 0v5" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />
    <circle cx="24" cy="30" r="3" fill={ORANGE} />
    <line x1="24" y1="30" x2="24" y2="35" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* Scales of justice — attorney reviewed */
export const JusticeIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <line x1="24" y1="9" x2="24" y2="40" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 14h24" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="24" cy="9" r="2.5" fill={ORANGE} />
    <path d="M12 14l-5 10a5 5 0 0 0 10 0L12 14Z" fill={ORANGE_SOFT} stroke={NAVY} strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M36 14l-5 10a5 5 0 0 0 10 0L36 14Z" fill={ORANGE_SOFT} stroke={NAVY} strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M16 40h16" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/* Premium tile wrapper — soft tinted gradient, ring, subtle depth. */
export const BrandIconTile = ({
  children, className = "", size = "md",
}: { children: React.ReactNode; className?: string; size?: "md" | "lg" }) => (
  <div
    className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 to-amber-100/70 ring-1 ring-bright-orange-200/70 shadow-sm ${size === "lg" ? "w-16 h-16" : "w-14 h-14"} ${className}`}
  >
    {children}
  </div>
);
