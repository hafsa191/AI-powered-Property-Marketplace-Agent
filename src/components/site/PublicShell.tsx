import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MotionLayer, MotionText } from "./MotionLayer";

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="public-experience min-h-screen bg-background">
      <MotionLayer />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image: string }) {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-40 text-ink-foreground">
      <img src={image} data-parallax alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <p className="eyebrow animate-fade-up">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-tight sm:text-6xl"><MotionText text={title} /></h1>
        <p className="mt-5 max-w-xl animate-fade-up text-lg text-ink-foreground/75">{text}</p>
      </div>
    </section>
  );
}
