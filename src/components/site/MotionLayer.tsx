import { useEffect, useRef } from "react";

export function MotionLayer() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    let cleanup = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]).then(([{ gsap }, { ScrollTrigger }, { default: Lenis }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: true });
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      lenis.on("scroll", ScrollTrigger.update);
      const context = gsap.context(() => {
        gsap.to(progress.current, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } });
        gsap.utils.toArray<HTMLElement>(".public-experience [data-parallax]").forEach((image) => {
          gsap.fromTo(image, { yPercent: -4, scale: 1.12 }, { yPercent: 8, scale: 1.02, ease: "none", scrollTrigger: { trigger: image.parentElement, start: "top top", end: "bottom top", scrub: 1 } });
        });
        gsap.utils.toArray<HTMLElement>(".public-experience .motion-heading").forEach((heading) => {
          gsap.from(heading.querySelectorAll(".word-inner"), { yPercent: 115, rotate: 3, duration: 1.1, stagger: 0.055, ease: "power4.out", scrollTrigger: { trigger: heading, start: "top 92%", once: true } });
        });
        gsap.fromTo(".public-experience .circuit-trace", { strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 5, stagger: 0.2, repeat: -1, ease: "none" });
      });
      const listeners: (() => void)[] = [];
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const ringX = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3.out" });
        const ringY = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3.out" });
        const dotX = gsap.quickTo(dot.current, "x", { duration: 0.08 });
        const dotY = gsap.quickTo(dot.current, "y", { duration: 0.08 });
        const move = (e: MouseEvent) => {
          ringX(e.clientX); ringY(e.clientY); dotX(e.clientX); dotY(e.clientY);
          ring.current?.classList.add("is-active"); dot.current?.classList.add("is-active");
          const target = e.target instanceof Element ? e.target : null;
          ring.current?.classList.toggle("is-link", Boolean(target?.closest("a, button, input, label, [role=button]")));
        };
        const leave = () => { ring.current?.classList.remove("is-active"); dot.current?.classList.remove("is-active"); };
        window.addEventListener("mousemove", move); document.addEventListener("mouseleave", leave);
        listeners.push(() => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseleave", leave); });
        document.querySelectorAll<HTMLElement>(".public-experience [data-slot=button], .public-experience [data-magnetic]").forEach((element) => {
          const enter = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            gsap.to(element, { x: (e.clientX - rect.left - rect.width / 2) * 0.16, y: (e.clientY - rect.top - rect.height / 2) * 0.18, duration: 0.5, ease: "power3.out" });
          };
          const exit = () => { gsap.to(element, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" }); };
          element.addEventListener("mousemove", enter); element.addEventListener("mouseleave", exit);
          listeners.push(() => { element.removeEventListener("mousemove", enter); element.removeEventListener("mouseleave", exit); gsap.killTweensOf(element); });
        });
        document.querySelectorAll<HTMLElement>(".public-experience [data-tilt]").forEach((element) => {
          const moveCard = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            gsap.to(element, { rotationY: ((e.clientX - rect.left) / rect.width - 0.5) * 7, rotationX: ((e.clientY - rect.top) / rect.height - 0.5) * -5, transformPerspective: 1000, duration: 0.5 });
          };
          const exit = () => { gsap.to(element, { rotationX: 0, rotationY: 0, duration: 0.8 }); };
          element.addEventListener("mousemove", moveCard); element.addEventListener("mouseleave", exit);
          listeners.push(() => { element.removeEventListener("mousemove", moveCard); element.removeEventListener("mouseleave", exit); gsap.killTweensOf(element); });
        });
      }
      ScrollTrigger.refresh();
      cleanup = () => { listeners.forEach((off) => off()); context.revert(); gsap.killTweensOf([ring.current, dot.current]); gsap.ticker.remove(tick); lenis.destroy(); };
    });
    return () => { disposed = true; cleanup(); };
  }, []);
  return <>
    <div ref={progress} className="motion-progress" aria-hidden="true" />
    <div ref={ring} className="motion-cursor-ring" aria-hidden="true" />
    <div ref={dot} className="motion-cursor-dot" aria-hidden="true" />
  </>;
}

export function CircuitField() {
  return <svg className="circuit-field" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
    {[0, 1, 2, 3, 4, 5].map((i) => <g key={i}>
      <path className="circuit-base" d={`M0 ${150 + i * 115} H${80 + i * 12} l45 -45 h90 l45 45 h70`} />
      <path className="circuit-trace" d={`M0 ${150 + i * 115} H${80 + i * 12} l45 -45 h90 l45 45 h70`} />
      <path className="circuit-base" d={`M1440 ${110 + i * 115} h-${80 + i * 12} l-45 45 h-90 l-45 -45 h-70`} />
      <path className="circuit-trace" d={`M1440 ${110 + i * 115} h-${80 + i * 12} l-45 45 h-90 l-45 -45 h-70`} />
    </g>)}
  </svg>;
}

export function MotionText({ text, className = "" }: { text: string; className?: string }) {
  return <span className={`motion-heading ${className}`} aria-label={text}>
    {text.split(" ").map((word, i) => <span key={i} className="word-mask" aria-hidden="true"><span className="word-inner">{word}</span>{" "}</span>)}
  </span>;
}