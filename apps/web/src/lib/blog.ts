// frontend/src/lib/blog.ts
import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content/blog");

export function getSortedPostsData() {
  try {
    const cwd = process.cwd();
    // Try both possible locations in a Vercel monorepo
    const pathsToTry = [
      path.join(cwd, "content/blog"),            // App root
      path.join(cwd, "apps/web/content/blog"),   // Monorepo root
    ];

    let finalDirectory = "";
    for (const p of pathsToTry) {
      console.log(`Checking path: ${p}`);
      if (fs.existsSync(p)) {
        finalDirectory = p;
        break;
      }
    }

    if (!finalDirectory) {
      console.error("CRITICAL: Blog directory not found in any of the expected locations!");
      console.error("CWD was:", cwd);
      return [];
    }

    console.log("Using blog directory:", finalDirectory);

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
          content,
        };
      });

    console.log(`Successfully loaded ${allPostsData.length} blog posts.`);
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}
