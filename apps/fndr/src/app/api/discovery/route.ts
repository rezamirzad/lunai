import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { keywords as keywordsTable } from '@workspace/db';
import { discoveryService } from '@/services/discovery-service';

/**
 * Lead Discovery API Handler
 * 
 * Implements Task 2.2 & 2.3: Lead Discovery API Implementation and Integration Service.
 * Accepts keywords for discovery, saves them, and triggers the discovery process.
 */
export async function POST(req: NextRequest) {
  // 1. Mock Authentication
  // Consistent with apps/api/src/index.ts patterns
  const authHeader = req.headers.get('authorization');
  let user = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (token === 'admin-token') {
      // Use valid UUID for mock admin
      user = { id: '00000000-0000-0000-0000-000000000000', email: 'admin@example.com', role: 'admin' };
    } else if (token === 'client-token') {
      // Use valid UUID for mock client
      user = { id: '11111111-1111-1111-1111-111111111111', email: 'client@example.com', role: 'client' };
    }
  }

  // Placeholder for real Supabase auth:
  // const supabase = createRouteHandlerClient({ cookies });
  // const { data: { session } } = await supabase.auth.getSession();
  // if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  // const user = session.user;

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // 2. Validate Input
  try {
    const body = await req.json();
    const { keywords } = body;

    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return NextResponse.json(
        { message: 'Invalid input: keywords must be a non-empty array of strings' },
        { status: 400 }
      );
    }

    if (!keywords.every((k: any) => typeof k === 'string')) {
      return NextResponse.json(
        { message: 'Invalid input: all keywords must be strings' },
        { status: 400 }
      );
    }

    // 3. Save "discovery request"
    // We save each keyword to the keywords table as a "discovery request"
    const insertPromises = keywords.map((term: string) => 
      db.insert(keywordsTable).values({
        userId: user.id,
        term: term,
      })
    );

    await Promise.all(insertPromises);

    // 4. Trigger Discovery Service
    // For MVP, we wait for it, but in production this should be a background job
    await discoveryService.processDiscovery(user.id, keywords);

    console.log(`[Discovery API] Completed discovery for user ${user.id} with keywords: ${keywords.join(', ')}`);

    // 5. Return structured JSON response
    return NextResponse.json({
      status: 'success',
      message: 'Discovery completed',
      data: {
        userId: user.id,
        keywordsCount: keywords.length,
        timestamp: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('[Discovery API] Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
