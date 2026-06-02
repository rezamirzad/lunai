# API Contract Definition: Post Detail Fetching

## 1. Fetch Post by Slug
**Action**: `getPostBySlug(slug: string, locale: string)`

### Interface: BlogPostDetail
```typescript
interface BlogPostDetail {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  category: string;
  coverImage: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  featured: boolean;
  viewCount: number;
  readingTime: number; // Calculated on server
  toc: Array<{ id: string, text: string, level: number }>; // Parsed from content
}
```

### Database Mapping
- **Table**: `contents` (joins with `content_localizations` based on locale).
- **Slug**: Look up in `contents.slug`.
- **Author**: Join with `users` table or extracted from JSON metadata.
- **View Count**: Fetch from `contents.view_count`.

## 2. Increment View Count
**Action**: `incrementPostViews(slug: string)`

### Logic
- Update `view_count` in `contents` table where `slug = ?`.
- Execute asynchronously (no block on main page load).
