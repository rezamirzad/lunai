
import { neon } from '@neondatabase/serverless';

async function run() {
  const sql = neon(process.env.DATABASE_URL);

  try {
    const res = await sql`DELETE FROM leads WHERE raw_content LIKE 'MOCK:%'`;
    console.log(`Deleted mock leads.`);
  } catch (err) {
    console.error(err);
  }
}

run();
