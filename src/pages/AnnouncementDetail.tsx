import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { announcements } from "@/data/announcements";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AnnouncementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const announcement = announcements.find(a => a.id === id);
  
  if (!announcement) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Announcement Not Found</h1>
            <Button onClick={() => navigate("/announcements")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Announcements
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/announcements")}
            className="mb-8 hover:bg-secondary/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Announcements
          </Button>
          
          <article className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-xl">
            <header className="mb-8 pb-8 border-b border-border/50">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {announcement.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <Badge variant="secondary" className="bg-secondary/50">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(announcement.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Badge>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {announcement.author}
                </div>
              </div>
            </header>
            
            <div className="markdown-content prose prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {announcement.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default AnnouncementDetail;
