import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import { announcements } from "@/data/announcements";

const Announcements = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Announcements & Updates
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay up to date with the latest news from Geoscience Arabia
            </p>
          </div>
          
          <div className="grid gap-6">
            {announcements.map((announcement) => (
              <Link 
                key={announcement.id} 
                to={`/announcements/${announcement.id}`}
                className="block group"
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader>
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
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {announcement.author}
                      </div>
                    </div>
                  </CardContent>
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
