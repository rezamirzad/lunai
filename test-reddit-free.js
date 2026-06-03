
async function testRedditFree() {
  const keyword = 'Next.js';
  // Use the search JSON endpoint
  const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(keyword)}&sort=new&limit=3`;
  
  try {
    const response = await fetch(url, {
      headers: {
        // A very specific User-Agent often bypasses basic blocks
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      }
    });
    
    console.log(`Status: ${response.status}`);
    if (response.ok) {
      const data = await response.json();
      console.log('Success! Found ' + data.data.children.length + ' posts.');
    }
  } catch (e) {
    console.error(e);
  }
}

testRedditFree();
