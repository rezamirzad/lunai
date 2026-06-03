
import { db } from './apps/fndr/src/lib/db.js'; // This might not work due to imports
import { leads } from './packages/db/src/schema/leads.js';
import { count } from 'drizzle-orm';

async function checkLeads() {
  try {
    const result = await db.select({ value: count() }).from(leads);
    console.log(`Total leads in DB: ${result[0].value}`);
  } catch (e) {
    console.error(e);
  }
}

checkLeads();
