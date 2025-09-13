-- HTW Host Copilot: Enhanced Database Schema
-- This migration extends the existing schema with additional tables for full functionality

-- Knowledge base for grounded Q&A (from FAQ/Playbook)
create table if not exists kb_chunks (
  id uuid primary key default gen_random_uuid(),
  source text not null,        -- 'faq' | 'playbook' | 'guidelines'
  heading text not null,
  content text not null,
  created_at timestamptz not null default now()
);

-- Prompt templates for reusable flows (panel, mixer, workshop)
create table if not exists prompt_templates (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  title text not null,
  body text not null,
  variables jsonb default '[]'::jsonb,  -- array of variable names used in template
  created_at timestamptz not null default now()
);

-- Action/event log for auditability and demo timeline
create table if not exists actions_log (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  actor text not null,         -- 'host'|'reviewer'|'system'
  action text not null,        -- 'generate_plan'|'approve'|'request_changes'|'luma_export'|...
  payload jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Add indexes for better performance
create index if not exists idx_kb_chunks_source on kb_chunks(source);
create index if not exists idx_kb_chunks_content_search on kb_chunks using gin(to_tsvector('english', content));
create index if not exists idx_prompt_templates_key on prompt_templates(key);
create index if not exists idx_actions_log_event_id on actions_log(event_id);
create index if not exists idx_actions_log_actor on actions_log(actor);
create index if not exists idx_actions_log_created_at on actions_log(created_at desc);

-- Add full-text search capability to kb_chunks
create index if not exists idx_kb_chunks_fts on kb_chunks using gin(
  to_tsvector('english', coalesce(heading, '') || ' ' || coalesce(content, ''))
);

-- Update existing tables with any missing columns or constraints
alter table hosts add column if not exists phone text;
alter table hosts add column if not exists bio text;
alter table hosts add column if not exists linkedin_url text;

-- Add constraints to ensure data quality
alter table events add constraint if not exists events_status_check 
  check (status in ('draft', 'submitted', 'approved', 'changes_requested', 'published'));

alter table reviews add constraint if not exists reviews_status_check 
  check (status in ('approved', 'changes_requested'));

-- Add updated_at timestamps with triggers
alter table events add column if not exists updated_at timestamptz default now();
alter table hosts add column if not exists updated_at timestamptz default now();
alter table reviews add column if not exists updated_at timestamptz default now();

-- Create or replace function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at (only if they don't exist)
do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'update_events_updated_at') then
    create trigger update_events_updated_at
      before update on events
      for each row execute function update_updated_at_column();
  end if;
  
  if not exists (select 1 from pg_trigger where tgname = 'update_hosts_updated_at') then
    create trigger update_hosts_updated_at
      before update on hosts
      for each row execute function update_updated_at_column();
  end if;
  
  if not exists (select 1 from pg_trigger where tgname = 'update_reviews_updated_at') then
    create trigger update_reviews_updated_at
      before update on reviews
      for each row execute function update_updated_at_column();
  end if;
end
$$;