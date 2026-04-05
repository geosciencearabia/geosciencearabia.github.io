import { Suspense, lazy, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AppLoadFallback } from "@/components/AppLoadFallback";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const AuthorDetail = lazy(() => import("./pages/AuthorDetail"));
const Help = lazy(() => import("./pages/Help"));
const AuthorNetwork = lazy(() => import("./pages/AuthorNetwork"));
const PublicationsPage = lazy(() => import("./pages/Publications"));
const Members = lazy(() => import("./pages/Members"));
const TopicsPage = lazy(() => import("./pages/Topics"));
const InstitutionsPage = lazy(() => import("./pages/Institutions"));
const InsightsPage = lazy(() => import("./pages/Insights"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const withRouteFallback = (node: ReactNode, variant: "home" | "page" = "page") => (
  <Suspense fallback={<AppLoadFallback variant={variant} />}>{node}</Suspense>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={withRouteFallback(<Index />, "home")} />
            <Route path="/help" element={withRouteFallback(<Help />)} />
            <Route path="/authors" element={<Navigate to="/help" replace />} />
            <Route path="/members" element={withRouteFallback(<Members />)} />
            <Route path="/topics" element={withRouteFallback(<TopicsPage />)} />
            <Route path="/institutions" element={withRouteFallback(<InstitutionsPage />)} />
            <Route path="/author/:id" element={withRouteFallback(<AuthorDetail />)} />
            <Route path="/author/:id/network" element={withRouteFallback(<AuthorNetwork />)} />
            <Route
              path="/publications"
              element={withRouteFallback(<PublicationsPage mode="publications" />)}
            />
            <Route
              path="/citations"
              element={withRouteFallback(<PublicationsPage mode="citations" />)}
            />
            <Route path="/insights" element={withRouteFallback(<InsightsPage />)} />
            <Route path="/about" element={withRouteFallback(<About />)} />
            <Route path="/contact" element={withRouteFallback(<Help />)} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={withRouteFallback(<NotFound />)} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
