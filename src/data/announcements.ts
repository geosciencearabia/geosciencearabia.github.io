import welcomeContent from "@/content/announcements/welcome-to-geoarabia.md?raw";
import forumContent from "@/content/announcements/forum-development-update.md?raw";
import guidelinesContent from "@/content/announcements/community-guidelines.md?raw";

export interface Announcement {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string;
}

export const announcements: Announcement[] = [
  {
    id: "welcome-to-geoarabia",
    title: "Welcome to Geoscience Arabia",
    excerpt:
      "We're excited to announce the launch of Geoscience Arabia, a community-driven platform for geoscience professionals and enthusiasts across the Arabian Peninsula.",
    date: "2025-01-15",
    author: "Geoscience Arabia Team",
    content: welcomeContent,
  }

];
