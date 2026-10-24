import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";
import { MotionText } from "./MotionLayer";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function Counter({ to, suffix = "", duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  invert,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  align?: "center" | "left";
  invert?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={cn(
          "mt-4 text-3xl font-medium leading-tight sm:text-4xl md:text-5xl",
          invert ? "text-ink-foreground" : "text-foreground",
        )}
      >
          {typeof title === "string" ? <MotionText text={title} /> : title}
      </h2>
      {text && (
        <p className={cn("mt-4 text-base sm:text-lg", invert ? "text-ink-foreground/70" : "text-muted-foreground")}>
          {text}
        </p>
      )}
    </Reveal>
  );
}

export function Logo({ invert }: { invert?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 11.5 12 4l9 7.5M5.5 9.5V20h13V9.5" strokeLinejoin="round" />
          <path d="M10 20v-5h4v5" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={cn("leading-none", invert ? "text-ink-foreground" : "text-foreground")}>
        <span className="block font-display text-xl font-semibold tracking-tight">Aurelia</span>
        <span className="block text-[0.6rem] font-bold uppercase tracking-[0.3em] text-primary">Estates · AI</span>
      </span>
    </span>
  );
}
