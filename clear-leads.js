
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const res = await pool.query("DELETE FROM leads");
    console.log(`Deleted ${res.rowCount} leads.`);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

run();
