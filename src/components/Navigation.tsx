import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 shadow-sm backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25 transition group-hover:scale-105">
              <img src="/geoarabia-logo.svg" alt="GeoArabia logo" className="h-7 w-7" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Geoscience Arabia</span>
          </Link>
          
          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link
                to="/"
                className={cn(
                  "transition-colors hover:text-primary",
                  location.pathname === "/" ? "text-primary" : "text-muted-foreground"
                )}
              >
                Home
              </Link>
              <Link
                to="/announcements"
                className={cn(
                  "transition-colors hover:text-primary",
                  location.pathname.startsWith("/announcements") ? "text-primary" : "text-muted-foreground"
                )}
              >
                Announcements
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};
