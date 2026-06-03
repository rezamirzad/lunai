import { leads as leadsTable } from '../schema/leads';

export interface LeadMetadata {
  postDate?: string;
  engagement?: {
    likes?: number;
    comments?: number;
    shares?: number;
  };
  tags?: string[];
  [key: string]: any;
}

export interface AuthorMetadata {
  name?: string;
  handle?: string;
  avatar?: string;
  bio?: string;
  profileLink?: string;
  [key: string]: any;
}

export interface DiscoveryResult {
  platform: 'linkedin' | 'reddit';
  sourceUrl: string;
  rawContent: string;
  metadata: LeadMetadata;
  authorMetadata: AuthorMetadata;
}

export class DiscoveryService {
  private serperApiKey = process.env.SERPER_API_KEY;

  constructor(private db: any) {}

  /**
   * Real LinkedIn Lead Discovery via Serper.dev (Google Search)
   * This searches for recent posts on LinkedIn containing the keyword.
   */
  async discoverLinkedIn(keyword: string): Promise<DiscoveryResult[]> {
    if (!this.serperApiKey) {
      console.warn('[DiscoveryService] SERPER_API_KEY not found, using mock LinkedIn data');
      return this.getMockLinkedIn(keyword);
    }

    try {
      const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': this.serperApiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: `site:linkedin.com/posts "${keyword}"`,
          tbs: 'qdr:w' // Past week
        })
      });

      const data = await response.json();
      const results: DiscoveryResult[] = (data.organic || []).map((item: any) => ({
        platform: 'linkedin' as const,
        sourceUrl: item.link,
        rawContent: item.snippet,
        metadata: {
          postDate: new Date().toISOString(),
          title: item.title,
          engagement: { likes: 0, comments: 0, shares: 0 }
        },
        authorMetadata: {
          name: item.title.split('|')[0].trim(),
          handle: 'linkedin_user',
          profileLink: item.link.split('/posts/')[0]
        }
      }));

      console.log(`[DiscoveryService] Found ${results.length} real LinkedIn leads via Serper`);
      return results;
    } catch (error) {
      console.error('[DiscoveryService] LinkedIn (Serper) Error:', error);
      return [];
    }
  }

  /**
   * Reddit Lead Discovery
   * Uses the RSS feed which is more reliable and doesn't require keys.
   */
  async discoverReddit(keyword: string): Promise<DiscoveryResult[]> {
    try {
      // Reddit RSS search is very reliable for "free" scraping
      const url = `https://www.reddit.com/search.rss?q=${encodeURIComponent(keyword)}&sort=new`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });

      if (response.ok) {
        const xml = await response.text();
        
        // Simple XML parsing using regex for zero-dependency parsing
        // We filter for entries whose ID starts with 't3_' (which indicates a post, whereas 't5_' is a subreddit)
        const entries = xml.split('<entry>').slice(1).filter(entry => {
          const id = entry.match(/<id>([^<]+)<\/id>/)?.[1] || '';
          return id.startsWith('t3_');
        });
        
        const results: DiscoveryResult[] = entries.map(entry => {
          const title = entry.match(/<title>([^<]+)<\/title>/)?.[1] || 'Reddit Post';
          const link = entry.match(/<link href="([^"]+)"/)?.[1] || '';
          const author = entry.match(/<name>\/u\/([^<]+)<\/name>/)?.[1] || 'reddit_user';
          const updated = entry.match(/<updated>([^<]+)<\/updated>/)?.[1] || new Date().toISOString();
          
          // Content is usually in <content type="html">
          let content = entry.match(/<content[^>]*>([\s\S]+?)<\/content>/)?.[1] || '';
          // Clean up HTML entities
          content = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
          // Strip HTML tags for rawContent
          const rawContent = content.replace(/<[^>]*>/g, ' ').substring(0, 1000).trim();

          return {
            platform: 'reddit' as const,
            sourceUrl: link,
            rawContent: rawContent || title,
            metadata: {
              postDate: updated,
              title: title,
              engagement: { likes: 0, comments: 0 }
            },
            authorMetadata: {
              name: `u/${author}`,
              handle: author,
              profileLink: `https://www.reddit.com/user/${author}`
            }
          };
        });

        if (results.length > 0) {
          console.log(`[DiscoveryService] Found ${results.length} REAL Reddit leads via RSS for "${keyword}"`);
          return results;
        }
      } else {
        console.warn(`[DiscoveryService] Reddit RSS returned status: ${response.status}`);
      }
    } catch (error) {
      console.error('[DiscoveryService] Reddit RSS Error:', error);
    }

    console.warn(`[DiscoveryService] Reddit real discovery failed for "${keyword}", using mock data`);
    return this.getMockReddit(keyword);
  }

  /**
   * Process discovery for all keywords and persist results
   */
  async processDiscovery(userId: string, keywords: string[], jobId?: string): Promise<void> {
    console.log(`[DiscoveryService] Processing REAL discovery for user ${userId} with keywords: ${keywords.join(', ')}`);

    for (const keyword of keywords) {
      const [linkedInResults, redditResults] = await Promise.all([
        this.discoverLinkedIn(keyword),
        this.discoverReddit(keyword)
      ]);

      const allResults = [...linkedInResults, ...redditResults];

      // Deduplicate results based on sourceUrl
      const uniqueResults = allResults.filter((result, index, self) =>
        index === self.findIndex((t) => t.sourceUrl === result.sourceUrl)
      );

      if (uniqueResults.length > 0) {
        console.log(`[DiscoveryService] Found ${uniqueResults.length} REAL leads for keyword "${keyword}" (after deduplication)`);
        
        await this.db.insert(leadsTable).values(
          uniqueResults.map(result => ({
            userId,
            platform: result.platform,
            sourceUrl: result.sourceUrl,
            rawContent: result.rawContent,
            metadata: result.metadata,
            authorMetadata: result.authorMetadata,
            jobId,
            status: 'new'
          }))
        );
      } else {
        console.log(`[DiscoveryService] No real leads found for keyword "${keyword}"`);
      }
    }
  }

  // --- Mock Fallbacks (Keeping them as fallback if keys are missing) ---

  private getMockLinkedIn(keyword: string): DiscoveryResult[] {
    return [
      {
        platform: 'linkedin' as const,
        sourceUrl: 'https://www.linkedin.com/posts/activity-7123456789012345678',
        rawContent: `MOCK: I'm looking for a senior Next.js developer to help us scale our LunAI platform. We need someone who understands Drizzle and Neon. #hiring #nextjs #typescript`,
        metadata: {
          postDate: new Date().toISOString(),
          engagement: { likes: 12, comments: 4, shares: 2 },
          tags: ['hiring', 'nextjs', 'typescript']
        },
        authorMetadata: {
          name: 'Jane Doe',
          handle: 'janedoe',
          bio: 'CTO at Tech Innovators',
          profileLink: 'https://www.linkedin.com/in/janedoe'
        }
      }
    ].filter(post => post.rawContent.toLowerCase().includes(keyword.toLowerCase()));
  }

  private getMockReddit(keyword: string): DiscoveryResult[] {
    return [
      {
        platform: 'reddit' as const,
        sourceUrl: 'https://www.reddit.com/r/nextjs/comments/17abcde/how_to_set_up_drizzle_with_neon/',
        rawContent: `MOCK: How to set up Drizzle with Neon? I'm struggling with the connection string in my Next.js app. Is there a specific driver I should use for serverless?`,
        metadata: {
          postDate: new Date().toISOString(),
          engagement: { likes: 45, comments: 20 },
          tags: ['nextjs', 'drizzle', 'neon']
        },
        authorMetadata: {
          name: 'u/dev_enthusiast',
          handle: 'dev_enthusiast',
          profileLink: 'https://www.reddit.com/user/dev_enthusiast'
        }
      }
    ].filter(post => post.rawContent.toLowerCase().includes(keyword.toLowerCase()));
  }
}
