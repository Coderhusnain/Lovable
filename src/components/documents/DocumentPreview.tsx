import { memo } from "react";

/* Renders a miniature first page of a legal document, generated from the
   document's title. Line widths are derived deterministically from the
   title, so every document gets a slightly different but stable page —
   no image files needed, crisp at any size. */

interface DocumentPreviewProps {
  title: string;
  docId?: string;
  className?: string;
}

/* Small deterministic PRNG seeded from the title so previews are stable. */
const seededWidths = (seed: string, count: number, min: number, max: number): number[] => {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const widths: number[] = [];
  for (let i = 0; i < count; i++) {
    h = Math.imul(h ^ (h >>> 15), 2246822519);
    h = Math.imul(h ^ (h >>> 13), 3266489917);
    const r = ((h ^ (h >>> 16)) >>> 0) / 4294967295;
    widths.push(Math.round(min + r * (max - min)));
  }
  return widths;
};

const Line = ({ w, dark = false }: { w: number; dark?: boolean }) => (
  <div
    className={`h-[3px] rounded-sm ${dark ? "bg-slate-400/80" : "bg-slate-300/80"}`}
    style={{ width: `${w}%` }}
  />
);

const DocumentPreview = memo(({ title, className = "" }: DocumentPreviewProps) => {
  const para1 = seededWidths(title, 4, 78, 100);
  const clauses = seededWidths(title + "b", 3, 62, 92);
  const para2 = seededWidths(title + "c", 4, 70, 98);

  return (
    <div className={`relative w-fit mx-auto ${className}`}>
      {/* Back page for stacked-paper depth */}
      <div className="absolute inset-0 translate-x-[6px] translate-y-[5px] rotate-[1.5deg] bg-white rounded-[4px] border border-slate-200 shadow-sm" />

      {/* Front page */}
      <div className="relative w-[158px] bg-white rounded-[4px] border border-slate-200 shadow-[0_6px_18px_rgba(15,23,42,0.14)] px-4 pt-3.5 pb-3 transition-all duration-300 group-hover:shadow-[0_14px_30px_rgba(15,23,42,0.2)] group-hover:-translate-y-1.5">
        {/* Folded corner */}
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[14px] border-l-[14px] border-t-slate-100 border-l-transparent rounded-tr-[4px]" />

        {/* Letterhead */}
        <p className="text-[5px] font-bold tracking-[0.28em] text-bright-orange-500/90 text-center uppercase mb-1.5">
          Legalgram
        </p>

        {/* Document title — fixed two-line box so every page is the same height */}
        <div className="h-[21px] mb-1 px-1 flex items-center justify-center">
          <p className="font-serif font-bold text-[8px] leading-[1.3] tracking-wide text-slate-900 text-center uppercase line-clamp-2">
            {title}
          </p>
        </div>
        {/* Double rule — classic legal heading */}
        <div className="h-[2px] bg-slate-700 mb-[2px]" />
        <div className="h-px bg-slate-300 mb-2" />

        {/* Opening paragraph */}
        <div className="space-y-[4px] mb-2">
          {para1.map((w, i) => (
            <Line key={`a${i}`} w={w} />
          ))}
        </div>

        {/* Section heading */}
        <div className="flex items-center gap-[4px] mb-[5px]">
          <Line w={8} dark />
          <Line w={38} dark />
        </div>

        {/* Numbered clauses */}
        <div className="space-y-[4px] mb-2">
          {clauses.map((w, i) => (
            <div key={`b${i}`} className="flex items-center gap-[4px] pl-[7px]">
              <div className="h-[3px] w-[7px] rounded-sm bg-slate-400/70 shrink-0" />
              <Line w={w - 14} />
            </div>
          ))}
        </div>

        {/* Closing paragraph */}
        <div className="space-y-[4px] mb-3">
          {para2.map((w, i) => (
            <Line key={`c${i}`} w={w} />
          ))}
        </div>

        {/* Signature block */}
        <div className="flex items-end justify-between gap-3 pt-1 border-t border-dashed border-slate-200">
          <div className="flex-1 pt-1.5">
            <div className="h-[3px] w-[85%] rounded-sm bg-slate-300/60 mb-[3px]" />
            <div className="h-px bg-slate-500 mb-[2px]" />
            <p className="text-[4.5px] text-slate-400 uppercase tracking-[0.15em]">Signature</p>
          </div>
          <div className="w-[32%] pt-1.5">
            <div className="h-[3px] w-[70%] rounded-sm bg-slate-300/60 mb-[3px]" />
            <div className="h-px bg-slate-500 mb-[2px]" />
            <p className="text-[4.5px] text-slate-400 uppercase tracking-[0.15em]">Date</p>
          </div>
        </div>
      </div>
    </div>
  );
});

DocumentPreview.displayName = "DocumentPreview";

export default DocumentPreview;
