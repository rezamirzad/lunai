import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads as leadsTable } from '@workspace/db';
import { inArray, eq } from 'drizzle-orm';
import { serializeLeadsForAI } from '@/lib/serialize-leads';
import { analyzeLeadsWithGemini } from '@/lib/gemini';

/**
 * Lead Analysis API Handler
 * 
 * Implements Task 3.2: Gemini API Integration Pipeline.
 * Accepts leadIds, fetches them, analyzes with Gemini, and updates the database.
 */
export async function POST(req: NextRequest) {
  // 1. Mock Authentication
  const authHeader = req.headers.get('authorization');
  let user = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (token === 'admin-token') {
      user = { id: '00000000-0000-0000-0000-000000000000', email: 'admin@example.com', role: 'admin' };
    } else if (token === 'client-token') {
      user = { id: '11111111-1111-1111-1111-111111111111', email: 'client@example.com', role: 'client' };
    }
  }

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { leadIds } = body;

    if (!leadIds || !Array.isArray(leadIds) || leadIds.length === 0) {
      return NextResponse.json(
        { message: 'Invalid input: leadIds must be a non-empty array' },
        { status: 400 }
      );
    }

    // 2. Fetch leads from database
    const leadsToAnalyze = await db.select()
      .from(leadsTable)
      .where(inArray(leadsTable.id, leadIds));

    if (leadsToAnalyze.length === 0) {
      return NextResponse.json(
        { message: 'No leads found for the provided IDs' },
        { status: 404 }
      );
    }

    // 3. Serialize leads for AI
    // serializeLeadsForAI is imported from '@/lib/serialize-leads'
    const serializedLeads = serializeLeadsForAI(leadsToAnalyze);

    // 4. Call Gemini API
    // analyzeLeadsWithGemini is imported from '@/lib/gemini'
    const analysisResults = await analyzeLeadsWithGemini(serializedLeads);

    // 5. Update database records
    // We update each lead with its corresponding analysis result
    const updatePromises = analysisResults.map((result: any) => {
      const { id, relevanceScore, ...aiAnalysis } = result;
      
      // Ensure we only update leads that were actually in our input list
      if (!leadIds.includes(id)) {
        console.warn(`[Analyze API] Gemini returned analysis for unknown lead ID: ${id}`);
        return Promise.resolve();
      }

      return db.update(leadsTable)
        .set({
          status: 'analyzed',
          relevanceScore: Math.round(relevanceScore),
          aiAnalysis: aiAnalysis,
          updatedAt: new Date(),
        })
        .where(eq(leadsTable.id, id));
    });

    await Promise.all(updatePromises);

    console.log(`[Analyze API] Successfully analyzed ${analysisResults.length} leads for user ${user.id}`);

    return NextResponse.json({
      status: 'success',
      message: `Successfully analyzed ${analysisResults.length} leads`,
      data: {
        analyzedCount: analysisResults.length,
        timestamp: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('[Analyze API] Error:', error);
    
    // Specific error handling for JSON parsing or API issues
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        message: 'Failed to complete lead analysis', 
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}
