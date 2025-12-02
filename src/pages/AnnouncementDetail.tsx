import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Mail, User, Link as LinkIcon } from "lucide-react";
import { announcements } from "@/data/announcements";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import clsx from "clsx";

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
          
          <article
            className={clsx(
              "bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-xl",
              announcement.classes
            )}
          >
            {announcement.image && (
              <div className="mb-8 overflow-hidden rounded-xl border border-border/50">
                <img
                  src={announcement.image}
                  alt={announcement.title}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </div>
            )}
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
                {(announcement.authorEmail || announcement.authorUrl || announcement.authorImage) && (
                  <div className="flex items-center gap-3">
                    {announcement.authorImage && (
                      <img
                        src={announcement.authorImage}
                        alt={announcement.author}
                        className="w-10 h-10 rounded-full border border-border/60 object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className="flex flex-col text-sm">
                      {announcement.authorEmail && (
                        <a
                          href={`mailto:${announcement.authorEmail}`}
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <Mail className="w-3 h-3" />
                          {announcement.authorEmail}
                        </a>
                      )}
                      {announcement.authorUrl && (
                        <a
                          href={announcement.authorUrl}
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <LinkIcon className="w-3 h-3" />
                          {announcement.authorUrl}
                        </a>
                      )}
                    </div>
                  </div>
                )}
                {announcement.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {announcement.tags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/announcements?tag=${encodeURIComponent(tag)}`}
                        className="inline-flex"
                      >
                        <Badge variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}
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
