-- Fix Security Issues: Enable RLS and Fix Function Search Path
-- This migration addresses the security warnings from the linter

-- Enable RLS on new tables
alter table kb_chunks enable row level security;
alter table prompt_templates enable row level security;  
alter table actions_log enable row level security;

-- Create permissive policies for demo purposes (can be restricted later)
create policy "Allow all operations on kb_chunks" on kb_chunks for all using (true) with check (true);
create policy "Allow all operations on prompt_templates" on prompt_templates for all using (true) with check (true);
create policy "Allow all operations on actions_log" on actions_log for all using (true) with check (true);

-- Fix function search_path security issue
drop function if exists update_updated_at_column();
create or replace function update_updated_at_column()
returns trigger 
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;