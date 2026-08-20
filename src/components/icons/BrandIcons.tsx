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

/* Save time — clock with an orange sweep */
export const TimeIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <circle cx="24" cy="25" r="16" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
    <path d="M24 25V15" stroke={NAVY} strokeWidth="2.6" strokeLinecap="round" />
    <path d="M24 25l7 4" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />
    <path d="M24 9V6M39 25h3M9 25H6" stroke={ORANGE} strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="24" cy="25" r="2.4" fill={ORANGE} />
  </svg>
);

/* Expert support — headset with an orange dot */
export const SupportIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M11 27v-4a13 13 0 0 1 26 0v4" stroke={NAVY} strokeWidth="2.6" strokeLinecap="round" />
    <rect x="7" y="26" width="7" height="12" rx="3" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
    <rect x="34" y="26" width="7" height="12" rx="3" fill={ORANGE} />
    <path d="M37.5 38v1a5 5 0 0 1-5 5h-4" stroke={ORANGE} strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="27" cy="44" r="2.6" fill={ORANGE} />
  </svg>
);

/* Trusted nationwide — globe with an orange marker */
export const NationwideIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <circle cx="22" cy="24" r="15" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
    <path d="M7 24h30M22 9c5 4 5 26 0 30M22 9c-5 4-5 26 0 30" stroke={NAVY} strokeWidth="2.2" />
    <path d="M37 20c3 0 5 2 5 5 0 4-5 9-5 9s-5-5-5-9c0-3 2-5 5-5Z" fill={ORANGE} />
    <circle cx="37" cy="25" r="2" fill="#fff" />
  </svg>
);

/* Affordable — wallet with an orange coin */
export const MoneyIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <rect x="8" y="14" width="32" height="24" rx="4" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
    <path d="M8 20h32" stroke={NAVY} strokeWidth="2.2" />
    <circle cx="32" cy="28" r="5" fill={ORANGE} />
    <path d="M32 25.5v5M30.5 27h2.2a1.3 1.3 0 0 1 0 2.6h-2.4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

/* Cancel anytime — calendar with an orange minus */
export const CalendarIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <rect x="9" y="12" width="30" height="28" rx="4" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
    <path d="M9 20h30" stroke={NAVY} strokeWidth="2.4" />
    <path d="M17 8v7M31 8v7" stroke={ORANGE} strokeWidth="2.8" strokeLinecap="round" />
    <path d="M19 30h10" stroke={ORANGE} strokeWidth="3.2" strokeLinecap="round" />
  </svg>
);

/* Sign & share — pen signing an orange swoosh */
export const SignIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M8 34c6 2 8-6 12-6s3 5 7 3" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />
    <path d="M40 12l-4-4-18 18-1 6 6-1 18-18-1-1Z" fill="#fff" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M32 12l4 4" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M8 40h32" stroke={NAVY} strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

/* Find a document — page with an orange magnifier */
export const SearchDocIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M12 6h14l8 8v14" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" fill="#fff" />
    <path d="M34 28v12a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2" stroke={NAVY} strokeWidth="2.5" fill="#fff" />
    <path d="M26 6v8h8" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M16 20h8M16 26h6" stroke={NAVY} strokeWidth="2.3" strokeLinecap="round" />
    <circle cx="28" cy="32" r="6" fill="#fff" stroke={ORANGE} strokeWidth="3" />
    <path d="M32.5 36.5l5 5" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* Customize — page with an orange pen edit */
export const EditDocIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M12 6h14l8 8v9" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" fill="#fff" />
    <path d="M34 23v17a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2" stroke={NAVY} strokeWidth="2.5" fill="#fff" />
    <path d="M26 6v8h8" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M16 22h6M16 28h4" stroke={NAVY} strokeWidth="2.3" strokeLinecap="round" />
    <path d="M38 24l4 4-11 11-5 1 1-5 11-11Z" fill={ORANGE} stroke={ORANGE} strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

/* Guarantee / badge — rosette with an orange check */
export const BadgeIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <circle cx="24" cy="20" r="13" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
    <path d="M18 30l-4 12 10-5 10 5-4-12" fill="#fff" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M18 20l4 4 8-8" stroke={ORANGE} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Family / care — heart with an orange pulse */
export const HeartIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M24 40S8 30 8 19a9 9 0 0 1 16-5 9 9 0 0 1 16 5c0 11-16 21-16 21Z" fill="#fff" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M14 24h6l3-5 3 9 3-4h4" stroke={ORANGE} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Account — user with an orange ring */
export const UserIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <circle cx="24" cy="18" r="8" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
    <path d="M10 40c0-8 6-12 14-12s14 4 14 12" fill="#fff" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="35" cy="14" r="6" fill={ORANGE} />
    <path d="M32.3 14l1.8 1.8 3.4-3.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Download — tray with an orange arrow */
export const DownloadIcon = ({ size = 28, className = "" }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M10 30v6a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4v-6" fill="#fff" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 8v20" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />
    <path d="M15 21l9 9 9-9" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
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
