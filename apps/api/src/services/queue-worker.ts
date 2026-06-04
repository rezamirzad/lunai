import { db } from '../lib/db';
import { sql } from 'drizzle-orm';
import { DiscoveryService } from '@workspace/db';

export class QueueWorker {
  private discoveryService: DiscoveryService;
  private isRunning = false;
  private pollInterval = 5000; // 5 seconds
  private jobDelay = 2000; // 2 seconds between jobs

  constructor() {
    this.discoveryService = new DiscoveryService(db);
  }

  async start() {
    if (this.isRunning) return;
    this.isRunning = true;
    console.log('[QueueWorker] Started');
    this.run();
  }

  stop() {
    this.isRunning = false;
    console.log('[QueueWorker] Stopped');
  }

  private async run() {
    while (this.isRunning) {
      try {
        const job = await this.getNextJob();
        if (job) {
          await this.processJob(job);
          // Mandatory delay between jobs to stay within rate limits
          console.log(`[QueueWorker] Waiting ${this.jobDelay}ms before next job...`);
          await new Promise(resolve => setTimeout(resolve, this.jobDelay));
        } else {
          // No jobs, wait for poll interval
          await new Promise(resolve => setTimeout(resolve, this.pollInterval));
        }
      } catch (error) {
        console.error('[QueueWorker] Error in run loop:', error);
        await new Promise(resolve => setTimeout(resolve, this.pollInterval));
      }
    }
  }

  private async getNextJob() {
    return await db.transaction(async (tx: any) => {
      // Find one pending job that is scheduled for now or in the past
      // Use FOR UPDATE SKIP LOCKED to handle concurrency
      const result = await tx.execute(sql`
        SELECT * FROM job_queue 
        WHERE status = 'pending' AND scheduled_at <= NOW()
        ORDER BY scheduled_at ASC
        LIMIT 1
        FOR UPDATE SKIP LOCKED
      `);

      if (result.rows.length === 0) return null;

      const job = result.rows[0];

      // Mark as processing immediately
      await tx.execute(sql`
        UPDATE job_queue 
        SET status = 'processing', updated_at = NOW()
        WHERE id = ${job.id}
      `);

      return job;
    });
  }

  private async processJob(job: any) {
    console.log(`[QueueWorker] Processing job ${job.id} for keyword "${job.keyword}" on ${job.platform}`);

    try {
      // Call the DiscoveryService logic
      // We pass the userId, the keyword, and the jobId
      await this.discoveryService.processDiscovery(job.user_id, [job.keyword], job.id);

      // Success
      await db.execute(sql`
        UPDATE job_queue 
        SET status = 'completed', updated_at = NOW()
        WHERE id = ${job.id}
      `);
      console.log(`[QueueWorker] Job ${job.id} completed successfully`);
    } catch (error) {
      console.error(`[QueueWorker] Job ${job.id} failed:`, error);
      
      const retryCount = (job.retry_count || 0) + 1;
      const maxRetries = 5;

      if (retryCount >= maxRetries) {
        // Mark as failed permanently
        await db.execute(sql`
          UPDATE job_queue 
          SET status = 'failed', updated_at = NOW()
          WHERE id = ${job.id}
        `);
        console.error(`[QueueWorker] Job ${job.id} reached max retries and is marked as failed`);
      } else {
        // Exponential backoff: 2^retryCount * 5000 ms
        const backoffMs = Math.pow(2, retryCount) * 5000;
        const nextRun = new Date(Date.now() + backoffMs);

        await db.execute(sql`
          UPDATE job_queue 
          SET 
            status = 'pending', 
            retry_count = ${retryCount}, 
            scheduled_at = ${nextRun},
            updated_at = NOW()
          WHERE id = ${job.id}
        `);
        console.log(`[QueueWorker] Job ${job.id} rescheduled for ${nextRun.toISOString()} (Retry #${retryCount})`);
      }
    }
  }
}

export const queueWorker = new QueueWorker();
