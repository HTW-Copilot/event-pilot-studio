-- Fix the foreign key constraint issue
-- First, let's check and update the foreign key constraints for events table

-- Drop the problematic constraint and recreate it properly
ALTER TABLE public.events DROP CONSTRAINT IF EXISTS events_host_id_fkey;
ALTER TABLE public.events DROP CONSTRAINT IF EXISTS fk_events_host_user_id;

-- Add the correct foreign key constraint pointing to users table
ALTER TABLE public.events ADD CONSTRAINT fk_events_host_user_id 
  FOREIGN KEY (host_user_id) REFERENCES public.users(id);

-- Create dummy admin account and sample data
-- Insert dummy admin profile 
INSERT INTO public.users (id, name, email, roles, org, verified_at, created_at, updated_at) 
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'HTW Admin',
  'admin@htwweek.org',
  ARRAY['htw_staff']::public.user_role[],
  'Honolulu Tech Week',
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  roles = ARRAY['htw_staff']::public.user_role[],
  updated_at = NOW();

-- Create sample event host user
INSERT INTO public.users (id, name, email, roles, org, created_at, updated_at) 
VALUES (
  '00000000-0000-0000-0000-000000000002',
  'Demo Host',
  'host@example.com',
  ARRAY['event_host']::public.user_role[],
  'Demo Company',
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  roles = ARRAY['event_host']::public.user_role[],
  updated_at = NOW();

-- Now create sample events with proper foreign key references
INSERT INTO public.events (id, host_user_id, title, description, status, event_types, audience_types, capacity_target, start_at, end_at, created_at, updated_at) 
VALUES 
(
  '10000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  'AI & Machine Learning Summit',
  'Join us for an in-depth exploration of AI and ML technologies shaping Hawaii''s tech landscape. We''ll cover practical applications, ethics, and the future of AI in the Pacific.',
  'submitted',
  ARRAY['panel', 'workshop']::public.event_type[],
  ARRAY['developers', 'founders']::public.audience_type[],
  150,
  '2025-04-15 14:00:00+00',
  '2025-04-15 17:00:00+00',
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '2 days'
),
(
  '10000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000002',
  'Startup Pitch Night',
  'Local startups present their innovations to investors and the community. Network with entrepreneurs and discover the next big thing in Hawaiian tech.',
  'in_review',
  ARRAY['networking']::public.event_type[],
  ARRAY['founders', 'investors']::public.audience_type[],
  100,
  '2025-04-18 18:00:00+00',
  '2025-04-18 21:00:00+00',
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day'
),
(
  '10000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000002',
  'Ocean Tech Innovation Lab',
  'Hands-on workshop exploring technology solutions for ocean conservation and marine research. Perfect for developers interested in environmental impact.',
  'draft',
  ARRAY['workshop']::public.event_type[],
  ARRAY['developers', 'students']::public.audience_type[],
  75,
  '2025-04-20 10:00:00+00',
  '2025-04-20 15:00:00+00',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Insert email templates for notifications
INSERT INTO public.templates (type, content, tags, created_at)
VALUES 
(
  'email_copy',
  'Your event "{{event_title}}" has been {{decision}}. {{#if comments}}Staff comments: {{comments}}{{/if}}',
  ARRAY['event_decision', 'host_notification'],
  NOW()
),
(
  'email_copy', 
  'New event submission "{{event_title}}" by {{host_name}} requires your review.',
  ARRAY['event_submission', 'staff_notification'],
  NOW()
) ON CONFLICT DO NOTHING;