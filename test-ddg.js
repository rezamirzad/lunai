
async function testDuckDuckGo() {
  const keyword = 'Next.js';
  const url = `https://duckduckgo.com/html/?q=site:reddit.com%20"${encodeURIComponent(keyword)}"`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    console.log(`Status: ${response.status}`);
    const text = await response.text();
    if (text.includes('result__title')) {
      console.log('Success! Found results in HTML.');
    } else {
      console.log('No results found or blocked.');
    }
  } catch (e) {
    console.error(e);
  }
}

testDuckDuckGo();
