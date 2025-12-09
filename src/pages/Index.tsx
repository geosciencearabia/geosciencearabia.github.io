import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mountain, Layers, ArrowRight } from "lucide-react";

const Index = () => {
  const primaryButtonClass =
    "w-full bg-secondary text-foreground border border-border transition-all shadow-sm hover:bg-primary hover:text-primary-foreground hover:shadow-primary/40";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
      <main className="w-full">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 text-primary-foreground">
              <img src="/geoarabia-logo.svg" alt="GeoArabia logo" className="w-12 h-12" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Geoscience Arabia</h1>
          </div>

          <Badge
            variant="secondary"
            className="inline-flex items-center gap-1 mb-6 bg-secondary/80 text-primary border border-primary/30"
          >
            <Mountain className="w-3 h-3" />
            Coming Soon
          </Badge>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
            Join the GeoArabia Community
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
            Geoscience Arabia is almost here. Be part of the GeoArabia community: register your interest today and be the
            first to know when we launch.
          </p>

          <div className="space-y-5">
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe0kLkhloMlviuRWSfKp6s1xrSTtp9UI-t7n_TF9U4Hvi9wrQ/viewform"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" className={primaryButtonClass}>
                  Join GeoArabia Community
                </Button>
              </a>
              <a href="https://geoarabia.com/idb" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className={`${primaryButtonClass} group`}>
                  <Layers className="w-4 h-4 mr-2" />
                  Dashboard
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>

            <p className="text-sm text-muted-foreground">Registration is handled via a secure Google Form.</p>
          </div>

          <footer className="pt-8 border-t border-border/50 mt-10">
            <p className="text-sm text-muted-foreground text-center">
              Developed and maintained by{" "}
              <a href="https://DigitalGeosciences.com" className="text-primary hover:underline" target="_blank" rel="noreferrer">
                Digital Geosciences
              </a>
              .
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Index;
