
async function testRedditRSS() {
  const keyword = 'Next.js';
  const url = `https://www.reddit.com/search.rss?q=${encodeURIComponent(keyword)}&sort=new`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    const xml = await response.text();
    const entries = xml.split('<entry>').slice(1);
    entries.forEach((entry, i) => {
      const id = entry.match(/<id>([^<]+)<\/id>/)?.[1] || '';
      const link = entry.match(/<link href="([^"]+)"/)?.[1] || '';
      console.log(`Entry ${i}: ID=${id}, Link=${link}`);
    });
  } catch (e) {
    console.error(e);
  }
}

testRedditRSS();
