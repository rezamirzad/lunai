// frontend/src/lib/blog.ts
import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getBlogDirectory() {
  const cwd = process.cwd();
  const pathsToTry = [
    path.join(cwd, "content/blog"),            // App root
    path.join(cwd, "apps/web/content/blog"),   // Monorepo root
  ];

  for (const p of pathsToTry) {
    if (fs.existsSync(p)) {
      return p;
    }
  }
  return null;
}

export function getSortedPostsData() {
  try {
    const finalDirectory = getBlogDirectory();
    if (!finalDirectory) {
      console.error("CRITICAL: Blog directory not found!");
      return [];
    }

    const fileNames = fs.readdirSync(finalDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const fullPath = path.join(finalDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        return {
          slug: fileName.replace(/\.md$/, ""),
          title: data.title || "Untitled",
          date: data.date || "",
          description: data.description || "",
          category: data.category || "General",
          coverImage: data.coverImage || "",
          author: data.author || data.Author || "Lunaris Team",
          featured: data.featured === true,
          content,
        };
      });

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export function getPostData(slug: string) {
  try {
    const finalDirectory = getBlogDirectory();
    if (!finalDirectory) return null;

    const fullPath = path.join(finalDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Basic TOC extraction
    const headingLines = content.split("\n").filter((line: string) => line.startsWith("## "));
    const toc = headingLines.map((line: string) => {
      const text = line.replace(/^##\s+/, "");
      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      return { id, text, level: 2 };
    });

    // Simple reading time calculation (approx 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || "",
      description: data.description || "",
      category: data.category || "General",
      coverImage: data.coverImage || "",
      author: data.author || data.Author || "Lunaris Team",
      featured: data.featured === true,
      content,
      toc,
      readingTime,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}
