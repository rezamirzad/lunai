
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

async function run() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const migrationPath = 'memory/tasks/260603-02-fndr-queue-architecture/migration.sql';
  const migrationSql = fs.readFileSync(migrationPath, 'utf8');

  try {
    console.log('--- Applying Migration ---');
    // Split by ; but handle multi-line statements and DO blocks
    // This is naive, so we'll just run the whole thing as one block if possible, 
    // or try to run it statement by statement if it fails.
    
    // For safety, let's just try to run the whole string.
    await pool.query(migrationSql);
    console.log('Migration applied successfully!');
  } catch (err) {
    console.error('Error applying migration:', err);
  } finally {
    await pool.end();
  }
}

run();
