import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mountain, Layers, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-12 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 text-primary-foreground">
                <img src="/geoarabia-logo.svg" alt="GeoArabia logo" className="w-12 h-12" />
              </div>
              <h1 className="text-2xl font-bold">Geoscience Arabia</h1>
            </div>

            <Badge variant="secondary" className="mb-6 bg-secondary/80 text-primary border border-primary/30">
              <Mountain className="w-3 h-3 mr-1" />
              Coming Soon
            </Badge>

            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Join the GeoArabia Community
            </h2>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Geoscience Arabia is almost here. Be part of the GeoArabia community—register your interest today and be the first to know when we launch.
            </p>

            <div className="space-y-5">
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe0kLkhloMlviuRWSfKp6s1xrSTtp9UI-t7n_TF9U4Hvi9wrQ/viewform"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-border bg-secondary/40 hover:bg-secondary/60 dark:bg-secondary/30 dark:hover:bg-secondary/50"
                  >
                    Register for GeoArabia Community
                  </Button>
                </a>

                <Link to="/announcements" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-border bg-secondary/40 hover:bg-secondary/60 dark:bg-secondary/30 dark:hover:bg-secondary/50"
                  >
                    View Announcements
                  </Button>
                </Link>

                <a
                  href="https://geoarabia.com/idb"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:shadow-primary/50 group"
                  >
                    <Layers className="w-4 h-4 mr-2" />
                    Dashboard
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>

              <p className="text-sm text-muted-foreground">
                Registration is handled via a secure Google Form.
              </p>
            </div>

            <footer className="pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground text-center">
                Developed and maintained by{" "}
                <a
                  href="https://DigitalGeosciences.com"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Digital Geosciences
                </a>
                .
              </p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
