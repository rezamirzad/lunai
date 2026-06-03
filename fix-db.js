
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('--- Applying Fixed Migration ---');

    // 1. Rename existing leads to legacy_leads if it exists and hasn't been renamed yet
    await pool.query('ALTER TABLE IF EXISTS leads RENAME TO legacy_leads');
    console.log('Renamed leads to legacy_leads (if existed)');

    // 2. Create job_queue table (without Supabase-specific RLS functions)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS job_queue (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL,
          keyword TEXT NOT NULL,
          platform TEXT NOT NULL,
          status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
          retry_count INTEGER NOT NULL DEFAULT 0,
          scheduled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log('Created job_queue table');

    // 3. Create new leads table matching the current schema code
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL,
          platform TEXT NOT NULL,
          source_url TEXT NOT NULL,
          raw_content TEXT,
          job_id UUID,
          metadata JSONB,
          author_metadata JSONB,
          keyword_id UUID,
          status TEXT NOT NULL DEFAULT 'new',
          relevance_score INTEGER,
          ai_analysis JSONB,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log('Created new leads table');

    // 4. Create keywords table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS keywords (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL,
          term TEXT NOT NULL,
          last_run TIMESTAMPTZ,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log('Created keywords table');

    // 5. Add indexes
    await pool.query('CREATE INDEX IF NOT EXISTS job_queue_user_id_idx ON job_queue(user_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS job_queue_status_scheduled_at_idx ON job_queue(status, scheduled_at)');
    await pool.query('CREATE INDEX IF NOT EXISTS leads_user_id_idx ON leads(user_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS leads_platform_idx ON leads(platform)');
    await pool.query('CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status)');
    await pool.query('CREATE INDEX IF NOT EXISTS leads_job_id_idx ON leads(job_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS keywords_user_id_idx ON keywords(user_id)');
    console.log('Created indexes');

    console.log('Migration applied successfully!');
  } catch (err) {
    console.error('Error applying migration:', err);
  } finally {
    await pool.end();
  }
}

run();
