// frontend/src/lib/blog.ts
import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content/blog");

export function getSortedPostsData() {
  try {
    console.log("Current working directory:", process.cwd());
    console.log("Resolved blog directory:", blogDirectory);
    
    if (!fs.existsSync(blogDirectory)) {
      console.error("Blog directory does not exist!");
      return [];
    }

    const fileNames = fs.readdirSync(blogDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".md")) // Only process .md files
      .map((fileName) => {
        const fullPath = path.join(blogDirectory, fileName);
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

    // Sort posts by date descending
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}
