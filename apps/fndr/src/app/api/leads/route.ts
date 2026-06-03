import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads as leadsTable } from '@workspace/db';
import { desc, eq } from 'drizzle-orm';

/**
 * Leads API Handler
 * 
 * Fetches leads for the current user.
 */
export async function GET(req: NextRequest) {
  // 1. Mock Authentication (consistent with discovery route)
  const authHeader = req.headers.get('authorization');
  let user = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (token === 'admin-token') {
      user = { id: '00000000-0000-0000-0000-000000000000' };
    } else if (token === 'client-token') {
      user = { id: '11111111-1111-1111-1111-111111111111' };
    }
  }

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 2. Fetch leads from database
    const leads = await db.query.leads.findMany({
      where: eq(leadsTable.userId, user.id),
      orderBy: [desc(leadsTable.createdAt)],
    });

    return NextResponse.json({
      status: 'success',
      data: leads,
    });
  } catch (error) {
    console.error('[Leads API] Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
