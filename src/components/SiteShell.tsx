import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Award } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import siteInfo from "../../data/config/siteinfo.json";
import announcement from "../../data/config/announcement.json";
import { Button } from "@/components/ui/button";

interface SiteShellProps {
  children: ReactNode;
}

interface AnnouncementConfig {
  enabled: boolean;
  id: string;
  message: string;
  bgClass?: string;
  textClass?: string;
  linkText?: string;
  linkHref?: string;
}

type NavLink = { label: string; href: string };
type SiteInfoConfig = {
  navLinks?: NavLink[];
  shortTitle?: string;
  title?: string;
  description?: string;
  author?: string;
  logoSrc?: string;
  faviconSrc?: string;
};

const typedAnnouncement = announcement as AnnouncementConfig;
const siteInfoConfig = siteInfo as SiteInfoConfig;

export const SiteShell = ({ children }: SiteShellProps) => {
  const assetBase =
    typeof import.meta.env.BASE_URL === "string" ? import.meta.env.BASE_URL : "/";
  const normalizedLogoPath = siteInfo.logoSrc?.replace(/^\//, "") ?? "";
  const logoSrc = normalizedLogoPath
    ? `${assetBase.replace(/\/$/, "/")}${normalizedLogoPath}`
    : "";

  const location = useLocation();

  const [showAnnouncement, setShowAnnouncement] = useState(false);

  const lastUpdated = new Date();
  const formattedLastUpdated = lastUpdated.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    if (!typedAnnouncement.enabled) return;
    if (typeof window === "undefined") return;

    const key = `announcementDismissed:${typedAnnouncement.id}`;
    const dismissed = window.localStorage.getItem(key);
    if (!dismissed) {
      setShowAnnouncement(true);
    }
  }, []);

  // NEW: sync title/meta/favicon from siteinfo.json
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (siteInfo.title) {
      document.title = siteInfo.title;
    }

    const setMeta = (name: string, value?: string) => {
      if (!value) return;
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = value;
    };

    setMeta("description", siteInfo.description);
    setMeta("author", siteInfo.author);

    if (siteInfo.faviconSrc) {
      const base =
        typeof import.meta.env.BASE_URL === "string" ? import.meta.env.BASE_URL : "/";
      const href = `${base.replace(/\/$/, "/")}${siteInfo.faviconSrc.replace(/^\//, "")}`;

      const link =
        document.querySelector<HTMLLinkElement>('link[rel="icon"]') ??
        document.createElement("link");
      link.rel = "icon";
      link.href = href;
      if (!link.parentElement) {
        document.head.appendChild(link);
      }
    }
  }, []);

  const navLinks: NavLink[] =
    Array.isArray(siteInfoConfig.navLinks) && siteInfoConfig.navLinks.length
      ? siteInfoConfig.navLinks
      : [
          { label: "Dashboard", href: "/" },
          { label: "Help", href: "/help" },
          { label: "About", href: "/about" },
        ];

  const isActiveLink = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  const handleDismissAnnouncement = () => {
    if (typeof window !== "undefined") {
      const key = `announcementDismissed:${typedAnnouncement.id}`;
      window.localStorage.setItem(key, "1");
    }
    setShowAnnouncement(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/"
              className="min-w-0 text-base font-semibold text-foreground hover:text-primary sm:text-lg"
            >
              {siteInfo.shortTitle || siteInfo.title}
            </Link>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
              <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                {navLinks.map((item: { label: string; href: string }) => {
                  const active = isActiveLink(item.href);
                  const isExternal = /^https?:\/\//i.test(item.href);
                  return (
                    <Button
                      key={`${item.href}-${item.label}`}
                      asChild
                      size="xs"
                      variant={active ? "secondary" : "ghost"}
                      className="min-w-0"
                    >
                      {isExternal ? (
                        <a href={item.href} target="_blank" rel="noreferrer">
                          {item.label}
                        </a>
                      ) : (
                        <Link to={item.href}>{item.label}</Link>
                      )}
                    </Button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {showAnnouncement && (
        <div
          className={`border-b border-border/60 ${typedAnnouncement.bgClass || "bg-red-50"
            } ${typedAnnouncement.textClass || "text-red-900"}`}
        >
          <div className="container mx-auto flex flex-col gap-3 px-4 py-2.5 text-xs sm:flex-row sm:items-start sm:justify-between sm:text-sm">
            <p className="leading-snug">
              {typedAnnouncement.message}
              {typedAnnouncement.linkText && typedAnnouncement.linkHref && (
                <>
                  {" "}
                  <a
                    href={typedAnnouncement.linkHref}
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-semibold"
                  >
                    {typedAnnouncement.linkText}
                  </a>
                  .
                </>
              )}
            </p>
            <button
              type="button"
              onClick={handleDismissAnnouncement}
              className="self-start rounded-full px-3 py-1 text-sm font-semibold leading-none hover:bg-red-100 sm:ml-2"
              aria-label="Dismiss announcement"
            >
              X
            </button>
          </div>
        </div>
      )}

      <div className="flex-1">{children}</div>

      <footer className="border-t border-border/60 bg-card/40 mt-4">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt={siteInfo.title}
                  className="h-8 w-auto"
                />
              ) : (
                <Award className="h-8 w-8 text-primary" />
              )}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  {siteInfo.title}
                </span>
                <p className="text-xs text-muted-foreground">
                  {siteInfo.tagline}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-1 text-xs text-muted-foreground">
              <span>Last update: {formattedLastUpdated}</span>
              <div className="flex items-center gap-1">
                <span>Developed by</span>
                <a
                  href="https://digitalgeosciences.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline"
                >
                  Digital Geosciences
                </a>
              </div>
              <span className="text-muted-foreground">
                Version 0.3.0
              </span>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
};
