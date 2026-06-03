
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const res = await pool.query('SELECT platform, raw_content, created_at FROM leads ORDER BY created_at DESC LIMIT 10');
    console.log('--- Latest 10 Leads in DB ---');
    res.rows.forEach((row, i) => {
      console.log(`${i+1}. [${row.platform}] ${row.raw_content.substring(0, 50)}... (${row.created_at})`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

run();
