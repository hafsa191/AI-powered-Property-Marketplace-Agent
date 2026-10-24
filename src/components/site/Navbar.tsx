import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, LogIn, UserRound } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "./primitives";
import { ThemeSelector } from "./ThemeSelector";
import { cn } from "@/lib/utils";
import { useSessionUser } from "@/hooks/use-session";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const user = useSessionUser();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const invert = overHero && !scrolled;

  return (
    <header
      className={cn(
        "motion-nav fixed inset-x-0 top-0 z-50 transition-all duration-500",
        invert ? "py-5" : "glass py-3 shadow-soft",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:flex lg:justify-between">
        <Link to="/" className="min-w-0">
          <Logo invert={invert} />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className={cn(
                "nav-link px-4 py-2 text-sm font-medium",
                invert ? "text-ink-foreground/80 hover:text-ink-foreground" : "text-muted-foreground hover:text-foreground",
              )}
              activeProps={{ className: invert ? "!text-ink-foreground bg-ink-foreground/10" : "!text-primary bg-primary-soft" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeSelector invert={invert} />
          <Button asChild variant={invert ? "glass" : "default"} className="hidden sm:inline-flex">
            {user ? (
              <Link to="/account"><UserRound /> My Account</Link>
            ) : (
              <Link to="/login"><LogIn /> Login / Sign up</Link>
            )}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={invert ? "glass" : "outline"} size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-6 flex flex-col gap-1">
                <Logo />
                <div className="mt-6" />
                {NAV.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    activeOptions={{ exact: n.to === "/" }}
                    className="rounded-xl px-4 py-3 font-medium hover:bg-muted"
                    activeProps={{ className: "bg-primary-soft text-primary" }}
                  >
                    {n.label}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  {user ? <Link to="/account">My Account</Link> : <Link to="/login">Login / Sign up</Link>}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
