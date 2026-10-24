import { Palette, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { THEMES, useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeSelector({ invert, full }: { invert?: boolean; full?: boolean }) {
  const { theme, setTheme } = useTheme();
  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];
  return (
    <Popover>
      <PopoverTrigger
        aria-label="Change brand theme"
        className={cn(
          "flex h-10 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-colors",
          invert
            ? "border-ink-foreground/20 text-ink-foreground hover:bg-ink-foreground/10"
            : "border-border text-foreground hover:border-primary",
        )}
      >
        <span className="h-4 w-4 rounded-full ring-2 ring-background" style={{ background: current.swatch }} />
        <Palette className="h-4 w-4" />
        {full && <span>{current.name}</span>}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 rounded-2xl p-2">
        <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Brand theme</p>
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm transition-colors hover:bg-muted",
              theme === t.id && "bg-primary-soft",
            )}
          >
            <span className="relative flex h-7 w-10 shrink-0 overflow-hidden rounded-lg">
              <span className="w-1/2" style={{ background: t.ink }} />
              <span className="w-1/2" style={{ background: t.swatch }} />
            </span>
            <span className="flex-1 font-medium">{t.name}</span>
            {theme === t.id && <Check className="h-4 w-4 text-primary" />}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
