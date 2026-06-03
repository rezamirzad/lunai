
async function testReddit() {
  const keyword = 'Next.js';
  const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(keyword)}&sort=new&limit=2`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'LunAI/0.1.0 (by /u/rezamirzad)'
      }
    });
    
    if (!response.ok) {
      console.error(`Status: ${response.status}`);
      return;
    }
    
    const data = await response.json();
    console.log(JSON.stringify(data.data.children[0].data.title));
  } catch (e) {
    console.error(e);
  }
}

testReddit();
