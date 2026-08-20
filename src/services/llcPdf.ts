import jsPDF from "jspdf";

/* ────────────────────────────────────────────────────────────────
   Legalgram branded PDF engine for LLC formation documents.
   Mirrors the look of the source Word/PDF templates: LEGALGRAM
   letterhead, navy section headings, orange accents, page footer.
   ──────────────────────────────────────────────────────────────── */

const NAVY: [number, number, number] = [26, 43, 74];
const ORANGE: [number, number, number] = [241, 143, 1];
const INK: [number, number, number] = [40, 40, 50];
const GRAY: [number, number, number] = [130, 130, 140];

export class DocBuilder {
  doc: jsPDF;
  pageW: number;
  pageH: number;
  margin = 20;
  y = 0;
  footerLabel: string;

  constructor(footerLabel: string) {
    this.doc = new jsPDF({ unit: "mm", format: "letter" });
    this.pageW = this.doc.internal.pageSize.getWidth();
    this.pageH = this.doc.internal.pageSize.getHeight();
    this.footerLabel = footerLabel;
    this.letterhead();
    this.y = 28;
  }

  private setColor(c: [number, number, number]) { this.doc.setTextColor(c[0], c[1], c[2]); }
  private get textW() { return this.pageW - this.margin * 2; }

  private letterhead() {
    const d = this.doc;
    d.setFont("helvetica", "bold"); d.setFontSize(9);
    this.setColor(ORANGE); d.setCharSpace(1.2);
    d.text("LEGALGRAM", this.pageW - this.margin, 14, { align: "right" });
    d.setCharSpace(0);
    d.setFont("helvetica", "italic"); d.setFontSize(7.5);
    this.setColor(GRAY);
    d.text("legalgram.co", this.pageW - this.margin, 18, { align: "right" });
    d.setDrawColor(ORANGE[0], ORANGE[1], ORANGE[2]); d.setLineWidth(0.6);
    d.line(this.margin, 21, this.pageW - this.margin, 21);
    d.setLineWidth(0.2);
  }

  footer(pageNum: number, pageCount: number) {
    const d = this.doc;
    d.setFont("helvetica", "normal"); d.setFontSize(7.5);
    this.setColor(GRAY);
    d.text(`Legalgram · ${this.footerLabel} · Page ${pageNum} of ${pageCount}`,
      this.pageW / 2, this.pageH - 12, { align: "center" });
  }

  private ensure(space: number) {
    if (this.y + space > this.pageH - 20) { this.doc.addPage(); this.letterhead(); this.y = 28; }
  }

  gap(mm = 3) { this.y += mm; }

  /** Centered document title block. */
  titleBlock(stateLine: string, title: string, subtitle: string) {
    const d = this.doc;
    d.setFont("helvetica", "bold"); d.setFontSize(10);
    this.setColor(ORANGE); d.setCharSpace(2);
    d.text(stateLine.toUpperCase(), this.pageW / 2, this.y, { align: "center" });
    d.setCharSpace(0); this.y += 8;
    d.setFontSize(19); this.setColor(NAVY);
    d.text(title.toUpperCase(), this.pageW / 2, this.y, { align: "center" });
    this.y += 7;
    d.setFont("helvetica", "italic"); d.setFontSize(11); this.setColor(GRAY);
    d.text(subtitle, this.pageW / 2, this.y, { align: "center" });
    this.y += 5;
    d.setDrawColor(NAVY[0], NAVY[1], NAVY[2]); d.setLineWidth(0.5);
    d.line(this.margin, this.y, this.pageW - this.margin, this.y);
    d.setLineWidth(0.2); this.y += 8;
  }

  /** Simple centered heading (e.g. "ARTICLE I"). Auto-shrinks to fit width. */
  centerHeading(text: string) {
    this.ensure(12);
    const d = this.doc;
    const upper = text.toUpperCase();
    d.setFont("helvetica", "bold"); this.setColor(ORANGE);
    let size = 11.5, cs = 1.2;
    // shrink font/char-spacing until the spaced text fits the content width
    for (; size >= 7; size -= 0.5) {
      d.setFontSize(size);
      const w = d.getTextWidth(upper) + cs * Math.max(0, upper.length - 1);
      if (w <= this.textW) break;
      if (size <= 9) cs = 0.4;
    }
    d.setCharSpace(cs);
    d.text(upper, this.pageW / 2, this.y, { align: "center" });
    d.setCharSpace(0); this.y += 6;
  }

  /** Clean two-line article heading: orange kicker over a navy title + rule. */
  articleHeading(kicker: string, title: string) {
    this.ensure(24);
    const d = this.doc;
    this.gap(4);
    if (kicker) {
      d.setFont("helvetica", "bold"); d.setFontSize(9); this.setColor(ORANGE);
      d.setCharSpace(2.5);
      d.text(kicker.toUpperCase(), this.pageW / 2, this.y, { align: "center" });
      d.setCharSpace(0); this.y += 6;
    }
    const upper = title.toUpperCase();
    d.setFont("helvetica", "bold"); this.setColor(NAVY);
    let size = 13, cs = 0.6;
    for (; size >= 9; size -= 0.5) {
      d.setFontSize(size);
      if (d.getTextWidth(upper) + cs * Math.max(0, upper.length - 1) <= this.textW - 6) break;
      if (size <= 10.5) cs = 0.2;
    }
    d.setCharSpace(cs);
    d.text(upper, this.pageW / 2, this.y, { align: "center" });
    d.setCharSpace(0); this.y += 4.5;
    const ruleW = Math.min(this.textW, 130);
    d.setDrawColor(NAVY[0], NAVY[1], NAVY[2]); d.setLineWidth(0.4);
    d.line(this.pageW / 2 - ruleW / 2, this.y, this.pageW / 2 + ruleW / 2, this.y);
    d.setLineWidth(0.2); this.y += 6.5;
  }

  /** Sub-section: bold navy label on its own line, then body paragraph. */
  clause(label: string, body: string) {
    this.ensure(11);
    const d = this.doc;
    d.setFont("helvetica", "bold"); d.setFontSize(10.5); this.setColor(NAVY);
    (d.splitTextToSize(label, this.textW) as string[]).forEach((ln) => {
      this.ensure(6); d.text(ln, this.margin, this.y); this.y += 5;
    });
    this.para(body, { gapAfter: 3.5 });
  }

  /** Numbered/lettered section heading: orange marker + navy title. */
  heading(marker: string, text: string) {
    this.ensure(12);
    const d = this.doc;
    d.setFont("helvetica", "bold"); d.setFontSize(11);
    this.setColor(ORANGE);
    d.text(marker, this.margin, this.y);
    const mx = this.margin + d.getTextWidth(marker + " ");
    this.setColor(NAVY);
    d.text(text.toUpperCase(), mx, this.y);
    this.y += 6.5;
  }

  para(text: string, opts: { bold?: boolean; size?: number; indent?: number; gapAfter?: number } = {}) {
    const d = this.doc;
    d.setFont("helvetica", opts.bold ? "bold" : "normal");
    d.setFontSize(opts.size ?? 10.5);
    this.setColor(INK);
    const indent = opts.indent ?? 0;
    const lines = d.splitTextToSize(text, this.textW - indent) as string[];
    lines.forEach((ln) => {
      this.ensure(6);
      d.text(ln, this.margin + indent, this.y);
      this.y += 5.2;
    });
    this.y += opts.gapAfter ?? 2.5;
  }

  bullet(text: string) {
    const d = this.doc;
    this.ensure(6);
    this.setColor(ORANGE); d.setFont("helvetica", "bold"); d.setFontSize(10.5);
    d.text("•", this.margin + 3, this.y);
    this.setColor(INK); d.setFont("helvetica", "normal");
    const lines = d.splitTextToSize(text, this.textW - 8) as string[];
    lines.forEach((ln, i) => {
      this.ensure(6);
      d.text(ln, this.margin + 8, this.y);
      if (i < lines.length - 1) this.y += 5.2;
    });
    this.y += 5.2;
  }

  /** "Label: value" with the value underlined. */
  labeled(label: string, value: string) {
    const d = this.doc;
    this.ensure(7);
    d.setFont("helvetica", "bold"); d.setFontSize(10.5); this.setColor(INK);
    d.text(label, this.margin, this.y);
    const vx = this.margin + d.getTextWidth(label + " ");
    d.setFont("helvetica", "normal");
    d.text(value || "", vx, this.y);
    this.y += 6.5;
  }

  /** Signature + date lines side by side. */
  signature(leftLabel = "Signature", rightLabel = "Date") {
    this.ensure(18);
    const d = this.doc;
    this.y += 8;
    const half = (this.textW - 15) / 2;
    d.setDrawColor(80, 80, 90); d.setLineWidth(0.3);
    d.line(this.margin, this.y, this.margin + half, this.y);
    d.line(this.margin + half + 15, this.y, this.pageW - this.margin, this.y);
    this.y += 4;
    d.setFont("helvetica", "italic"); d.setFontSize(9); this.setColor(GRAY);
    d.text(leftLabel, this.margin, this.y);
    d.text(rightLabel, this.margin + half + 15, this.y);
    this.setColor(INK); this.y += 8;
  }

  /** Tinted note/callout box (navy or orange accent). */
  noteBox(title: string, body: string, accent: "navy" | "orange" = "navy") {
    const d = this.doc;
    const c = accent === "orange" ? ORANGE : NAVY;
    d.setFont("helvetica", "normal"); d.setFontSize(9.5);
    const lines = d.splitTextToSize(body, this.textW - 10) as string[];
    const boxH = 10 + lines.length * 4.6 + 4;
    this.ensure(boxH + 4);
    const top = this.y;
    d.setFillColor(accent === "orange" ? 255 : 245, accent === "orange" ? 247 : 247, accent === "orange" ? 236 : 252);
    d.rect(this.margin, top, this.textW, boxH, "F");
    d.setFillColor(c[0], c[1], c[2]);
    d.rect(this.margin, top, 1.5, boxH, "F");
    this.y = top + 7;
    d.setFont("helvetica", "bold"); d.setFontSize(9); this.setColor(c);
    d.setCharSpace(0.8);
    d.text(title.toUpperCase(), this.margin + 6, this.y); d.setCharSpace(0);
    this.y += 5;
    d.setFont("helvetica", "normal"); d.setFontSize(9.5); this.setColor(INK);
    lines.forEach((ln) => { d.text(ln, this.margin + 6, this.y); this.y += 4.6; });
    this.y = top + boxH + 5;
  }

  /** Finalize: stamp footers on every page and return the jsPDF doc. */
  finish(): jsPDF {
    const total = this.doc.getNumberOfPages();
    for (let i = 1; i <= total; i++) { this.doc.setPage(i); this.footer(i, total); }
    return this.doc;
  }
}
