const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('--- Database Investigation ---');

    // 1. How many leads are currently in the leads table?
    const leadsCountRes = await pool.query('SELECT COUNT(*) FROM leads');
    console.log(`1. Total leads: ${leadsCountRes.rows[0].count}`);

    // 2. List the last 5 leads (id, platform, keyword_id, createdAt).
    const lastLeadsRes = await pool.query('SELECT id, platform, keyword_id, created_at FROM leads ORDER BY created_at DESC LIMIT 5');
    console.log('2. Last 5 leads:');
    lastLeadsRes.rows.forEach(row => {
      console.log(`   ID: ${row.id}, Platform: ${row.platform}, Keyword ID: ${row.keyword_id}, Created At: ${row.created_at}`);
    });

    // 3. How many jobs are in the job_queue table?
    const jobsCountRes = await pool.query('SELECT COUNT(*) FROM job_queue');
    console.log(`3. Total jobs in job_queue: ${jobsCountRes.rows[0].count}`);

    // 4. What are their statuses?
    const jobStatusesRes = await pool.query('SELECT status, COUNT(*) FROM job_queue GROUP BY status');
    console.log('4. Job statuses:');
    jobStatusesRes.rows.forEach(row => {
      console.log(`   Status: ${row.status}, Count: ${row.count}`);
    });

  } catch (err) {
    console.error('Error investigating database:', err);
  } finally {
    await pool.end();
  }
}

run();
