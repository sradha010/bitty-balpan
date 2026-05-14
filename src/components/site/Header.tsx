import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/preschool", label: "Programs" },
  { to: "/franchise", label: "Franchise" },
  { to: "/admission", label: "Admission" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
  { to: "/career", label: "Career" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  // Hero image is only on the home route — force white text there until scrolled
  const isHome = path === "/";
  const heroMode = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`flex items-center justify-between gap-6 rounded-full px-4 lg:px-6 h-14 lg:h-16 transition-all duration-500 ${
            scrolled
              ? "glass shadow-[0_8px_30px_-10px_rgba(0,0,0,0.12)]"
              : heroMode
              ? "bg-black/20 backdrop-blur-md border border-white/15"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src={logo}
              alt="Bitty Balpan logo"
              className="h-12 w-12 rounded-2xl border border-border bg-white/90 p-2"
            />
            <div className="flex flex-col leading-none">
              <span
                className={`font-display font-extrabold text-base tracking-tight transition-colors duration-300 ${
                  heroMode ? "text-white" : "text-primary"
                }`}
              >
                BITTY BALPAN
              </span>
              <span
                className={`text-[9px] font-mono uppercase tracking-[0.25em] transition-colors duration-300 ${
                  heroMode ? "text-white/70" : "text-muted-foreground"
                }`}
              >
                Play School
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active = path === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-3 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                    active
                      ? heroMode
                        ? "text-white"
                        : "text-primary"
                      : heroMode
                      ? "text-white/80 hover:text-white"
                      : "text-foreground/65 hover:text-primary"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span
                      className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full transition-colors duration-300 ${
                        heroMode ? "bg-white" : "bg-coral"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-2">
            <Link
              to="/admission"
              className={`hidden sm:inline-flex items-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 rounded-full text-sm font-semibold font-display hover:scale-105 transition-all duration-300 ${
                heroMode
                  ? "bg-white text-primary hover:bg-sun hover:shadow-lg"
                  : "bg-primary text-primary-foreground hover:shadow-glow"
              }`}
            >
              Apply Now
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className={`lg:hidden size-10 inline-flex items-center justify-center rounded-full border transition-colors duration-300 ${
                heroMode
                  ? "bg-white/20 border-white/30 text-white"
                  : "bg-white/70 border-border text-foreground"
              }`}
              aria-label="Menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu — same glass style regardless of hero mode */}
        {open && (
          <div className="lg:hidden mt-3 glass rounded-3xl p-4 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-4 py-3 rounded-2xl text-sm font-medium ${
                  path === item.to
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/60 text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}