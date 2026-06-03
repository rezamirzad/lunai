
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('--- Table Schema Investigation ---');

    // List all tables
    const tablesRes = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('Tables:', tablesRes.rows.map(r => r.table_name));

    // List columns for leads
    const leadsColumnsRes = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'leads'
    `);
    console.log('Leads Columns:');
    leadsColumnsRes.rows.forEach(row => {
      console.log(`   ${row.column_name} (${row.data_type})`);
    });

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

run();
