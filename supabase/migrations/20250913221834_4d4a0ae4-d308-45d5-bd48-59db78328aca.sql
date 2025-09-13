-- Fix Security Issues: Enable RLS and Update Function (Fixed)

-- Enable RLS on new tables
alter table kb_chunks enable row level security;
alter table prompt_templates enable row level security;  
alter table actions_log enable row level security;

-- Create permissive policies for demo purposes (can be restricted later)
create policy "Allow all operations on kb_chunks" on kb_chunks for all using (true) with check (true);
create policy "Allow all operations on prompt_templates" on prompt_templates for all using (true) with check (true);
create policy "Allow all operations on actions_log" on actions_log for all using (true) with check (true);

-- Fix function search_path security issue by recreating with CASCADE
drop function if exists update_updated_at_column() cascade;

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

-- Recreate the triggers after function recreation
create trigger update_events_updated_at
  before update on events
  for each row execute function update_updated_at_column();

create trigger update_hosts_updated_at
  before update on hosts
  for each row execute function update_updated_at_column();

create trigger update_reviews_updated_at
  before update on reviews
  for each row execute function update_updated_at_column();