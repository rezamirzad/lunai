import { db, schema } from "../lib/db";
import { and, eq, gte, or, desc, sql } from "drizzle-orm";

export class FndrService {
  async search(keyword: string, platform: string, userId: string) {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // 1. Cache Check: check the leads table for existing data associated with that keyword and platform from the last 24 hours.
    // We join with job_queue to filter by keyword.
    const existingLeads = await db
      .select({
        lead: schema.leads,
      })
      .from(schema.leads)
      .innerJoin(schema.jobQueue, eq(schema.leads.jobId, schema.jobQueue.id))
      .where(
        and(
          eq(schema.jobQueue.keyword, keyword),
          eq(schema.leads.platform, platform),
          gte(schema.leads.createdAt, twentyFourHoursAgo)
        )
      )
      .limit(100);

    if (existingLeads.length > 0) {
      return {
        status: "cached",
        leads: existingLeads.map((el: any) => el.lead),
        count: existingLeads.length,
      };
    }

    // 2. Check job_queue for an existing pending or processing job for this user/keyword/platform to avoid duplicates.
    const existingJob = await db.query.jobQueue.findFirst({
      where: and(
        eq(schema.jobQueue.userId, userId),
        eq(schema.jobQueue.keyword, keyword),
        eq(schema.jobQueue.platform, platform),
        or(
          eq(schema.jobQueue.status, "pending"),
          eq(schema.jobQueue.status, "processing")
        )
      ),
      orderBy: [desc(schema.jobQueue.createdAt)],
    });

    if (existingJob) {
      return {
        status: "already_queued",
        jobId: existingJob.id,
        jobStatus: existingJob.status,
      };
    }

    // 3. If no job exists, insert a new pending job into job_queue.
    const [newJob] = await db
      .insert(schema.jobQueue)
      .values({
        userId,
        keyword,
        platform,
        status: "pending",
      })
      .returning();

    if (!newJob) {
      throw new Error("Failed to create discovery job");
    }

    return {
      status: "queued",
      jobId: newJob.id,
    };
  }

  async getJobStatus(jobId: string) {
    const job = await db.query.jobQueue.findFirst({
      where: eq(schema.jobQueue.id, jobId),
    });

    if (!job) {
      return null;
    }

    let leadCount = 0;
    if (job.status === "completed") {
      const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(schema.leads)
        .where(eq(schema.leads.jobId, jobId));
      leadCount = Number(result[0]?.count || 0);
    }

    return {
      id: job.id,
      status: job.status,
      keyword: job.keyword,
      platform: job.platform,
      leadCount,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
    };
  }
}

export const fndrService = new FndrService();
