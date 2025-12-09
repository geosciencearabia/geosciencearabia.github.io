import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import { announcements } from "@/data/announcements";
import clsx from "clsx";

const Announcements = () => {
  const [searchParams] = useSearchParams();
  const activeTag = searchParams.get("tag");

  const filtered = activeTag
    ? announcements.filter((a) => a.tags.map((t) => t.toLowerCase()).includes(activeTag.toLowerCase()))
    : announcements;

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Announcements & Updates
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Stay up to date with the latest news from Geoscience Arabia
            </p>
            {activeTag && (
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
                <span className="font-medium">Filtered by tag:</span>
                <Badge variant="outline" className="border-primary/30 text-primary">{activeTag}</Badge>
                <Link to="/announcements" className="underline hover:text-foreground">Clear</Link>
              </div>
            )}
          </div>
          
          <div className="grid gap-6">
            {filtered.length === 0 && (
              <div className="text-center text-muted-foreground border border-dashed border-border rounded-xl py-12">
                No announcements yet. Please check back soon.
              </div>
            )}

            {filtered.map((announcement) => (
              <Link 
                key={announcement.id} 
                to={`/announcements/${announcement.id}`}
                className="block group"
              >
                <Card
                  className={clsx(
                    "bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10",
                    announcement.classes
                  )}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {announcement.image && (
                      <div className="md:w-48 flex-shrink-0 overflow-hidden rounded-xl border border-border/60">
                        <img
                          src={announcement.image}
                          alt={announcement.title}
                          className="w-full h-full object-cover aspect-[4/3]"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                            {announcement.title}
                          </CardTitle>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                        <CardDescription className="text-base">
                          {announcement.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <Badge variant="secondary" className="bg-secondary/50">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(announcement.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </Badge>
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {announcement.author}
                            </div>
                            {announcement.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {announcement.tags.map((tag) => (
                                  <Link
                                    key={tag}
                                    to={`/announcements?tag=${encodeURIComponent(tag)}`}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Badge variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                                      {tag}
                                    </Badge>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Announcements;
