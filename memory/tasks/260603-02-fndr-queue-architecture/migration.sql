-- Migration: FNDR Queue Architecture
-- Task: 260603-02-fndr-queue-architecture

-- Create job_queue table
CREATE TABLE IF NOT EXISTS job_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- Reference to auth.users (Supabase)
    keyword TEXT NOT NULL,
    platform TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
    retry_count INTEGER NOT NULL DEFAULT 0,
    scheduled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS job_queue_user_id_idx ON job_queue(user_id);
CREATE INDEX IF NOT EXISTS job_queue_status_scheduled_at_idx ON job_queue(status, scheduled_at);

-- Enable RLS
ALTER TABLE job_queue ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Note: auth.uid() is specific to Supabase Auth
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'job_queue' AND policyname = 'Users can only see their own jobs'
    ) THEN
        CREATE POLICY "Users can only see their own jobs" ON job_queue
            FOR SELECT USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'job_queue' AND policyname = 'Users can only insert their own jobs'
    ) THEN
        CREATE POLICY "Users can only insert their own jobs" ON job_queue
            FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'job_queue' AND policyname = 'Users can only update their own jobs'
    ) THEN
        CREATE POLICY "Users can only update their own jobs" ON job_queue
            FOR UPDATE USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'job_queue' AND policyname = 'Users can only delete their own jobs'
    ) THEN
        CREATE POLICY "Users can only delete their own jobs" ON job_queue
            FOR DELETE USING (auth.uid() = user_id);
    END IF;
END
$$;

-- Update leads table to include job_id for tracking
ALTER TABLE leads ADD COLUMN IF NOT EXISTS job_id UUID;
-- We don't strictly enforce FK here in case jobs are purged, 
-- but we index it for performance.
CREATE INDEX IF NOT EXISTS leads_job_id_idx ON leads(job_id);

-- Trigger for updated_at if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'update_job_queue_updated_at'
    ) THEN
        CREATE TRIGGER update_job_queue_updated_at
            BEFORE UPDATE ON job_queue
            FOR EACH ROW
            EXECUTE PROCEDURE update_updated_at_column();
    END IF;
END
$$;
