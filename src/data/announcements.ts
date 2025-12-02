export interface Announcement {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string;
  tags: string[];
  classes: string[];
  image: string;
  authorEmail: string;
  authorUrl: string;
  authorImage: string;
}

const parseFrontmatter = (raw: string) => {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);

  if (!match) {
    return { metadata: {} as Record<string, string>, body: raw };
  }

  const [, frontmatter] = match;
  const metadata: Record<string, string> = {};

  frontmatter
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const [key, ...rest] = line.split(":");
      if (!key || rest.length === 0) return;
      const value = rest.join(":").trim().replace(/^["']|["']$/g, "");
      metadata[key.trim()] = value;
    });

  const body = raw.slice(match[0].length).trim();
  return { metadata, body };
};

const parseAnnouncement = (raw: string, id: string): Announcement => {
  const { metadata, body } = parseFrontmatter(raw);

  return {
    id,
    title: metadata.title ?? "Untitled announcement",
    excerpt: metadata.excerpt ?? "",
    date: metadata.date ?? "",
    author: metadata.author ?? "",
    content: body,
    image: metadata.image ?? "",
    authorEmail: metadata.authorEmail ?? "",
    authorUrl: metadata.authorUrl ?? "",
    authorImage: metadata.authorImage ?? "",
    tags: metadata.tags
      ? metadata.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [],
    classes: metadata.classes
      ? metadata.classes
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean)
      : [],
  };
};

const markdownModules = import.meta.glob<string>("@/content/announcements/*.md", {
  eager: true,
  as: "raw",
});

export const announcements: Announcement[] = Object.entries(markdownModules).map(([path, raw]) => {
  const id = path.split("/").pop()?.replace(".md", "") ?? "announcement";
  return parseAnnouncement(raw as string, id);
});
