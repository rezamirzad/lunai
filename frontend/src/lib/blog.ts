// frontend/src/lib/blog.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "src/content/blog");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(blogDirectory);
  return fileNames.map((fileName) => {
    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug: fileName.replace(/\.md$/, ""),
      title: data.title,
      date: data.date,
      description: data.description,
      content,
    };
  });
}
