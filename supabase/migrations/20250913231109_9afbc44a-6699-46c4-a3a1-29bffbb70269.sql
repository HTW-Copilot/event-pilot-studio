-- Create enum types for the new system
CREATE TYPE public.user_role AS ENUM ('event_host', 'htw_staff', 'venue_host');
CREATE TYPE public.event_status AS ENUM ('draft', 'submitted', 'in_review', 'changes_requested', 'resubmitted', 'approved', 'scheduled', 'published', 'completed', 'archived', 'declined');
CREATE TYPE public.venue_status AS ENUM ('pending_verification', 'approved', 'rejected', 'suspended');
CREATE TYPE public.event_type AS ENUM ('panel', 'mixer', 'masterclass', 'launch', 'workshop', 'networking', 'keynote');
CREATE TYPE public.audience_type AS ENUM ('founders', 'investors', 'students', 'developers', 'designers', 'marketers', 'general');

-- Create users table (extends existing hosts)
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  roles public.user_role[] DEFAULT '{}',
  org TEXT,
  phone TEXT,
  bio TEXT,
  avatar_url TEXT,
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Migrate existing hosts to users table
INSERT INTO public.users (id, name, email, org, phone, bio, created_at, updated_at)
SELECT id, name, email, org, phone, bio, created_at, updated_at 
FROM public.hosts 
WHERE name IS NOT NULL AND email IS NOT NULL;

-- Update users who are hosts to have event_host role
UPDATE public.users SET roles = ARRAY['event_host']::public.user_role[] WHERE id IN (SELECT id FROM public.hosts);

-- Add new columns to events table
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS event_types public.event_type[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS audience_types public.audience_type[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS capacity_target INTEGER,
ADD COLUMN IF NOT EXISTS venue_id UUID,
ADD COLUMN IF NOT EXISTS start_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS end_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS time_flexible BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS marketing_stage TEXT,
ADD COLUMN IF NOT EXISTS luma_url TEXT,
ADD COLUMN IF NOT EXISTS attachments JSONB DEFAULT '[]';

-- Update status column to use enum (we'll keep it as text for backward compatibility initially)
-- Convert host_id to host_user_id for consistency  
ALTER TABLE public.events RENAME COLUMN host_id TO host_user_id;

-- Create venues table
CREATE TABLE public.venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  neighborhood TEXT,
  capacity INTEGER,
  amenities TEXT[] DEFAULT '{}',
  contact_email TEXT,
  claimed_by_user_id UUID REFERENCES public.users(id),
  status public.venue_status DEFAULT 'pending_verification',
  photos TEXT[] DEFAULT '{}',
  listing_visibility BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key for venue_id in events
ALTER TABLE public.events ADD CONSTRAINT fk_events_venue_id 
  FOREIGN KEY (venue_id) REFERENCES public.venues(id);

-- Add foreign key for host_user_id in events
ALTER TABLE public.events ADD CONSTRAINT fk_events_host_user_id 
  FOREIGN KEY (host_user_id) REFERENCES public.users(id);

-- Create other missing tables
CREATE TABLE public.event_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  from_status TEXT,
  to_status TEXT NOT NULL,
  by_user_id UUID REFERENCES public.users(id),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.venue_availability_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE,
  rrule TEXT NOT NULL,
  timezone TEXT DEFAULT 'Pacific/Honolulu',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.venue_blackouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE,
  start_at TIMESTAMP WITH TIME ZONE NOT NULL,
  end_at TIMESTAMP WITH TIME ZONE NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.submission_windows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  late_policy TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.message_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  context_type TEXT NOT NULL,
  context_id UUID NOT NULL,
  participants UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES public.message_threads(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES public.users(id),
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id UUID NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venue_availability_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venue_blackouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_windows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Add updated_at triggers for new tables
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_venues_updated_at
  BEFORE UPDATE ON public.venues
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_message_threads_updated_at
  BEFORE UPDATE ON public.message_threads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create basic RLS policies
CREATE POLICY "Users can view all users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Anyone can view approved venues" ON public.venues FOR SELECT USING (status = 'approved');
CREATE POLICY "Venue hosts can manage their venues" ON public.venues FOR ALL USING (claimed_by_user_id = auth.uid());

-- Insert some sample venues
INSERT INTO public.venues (name, address, neighborhood, capacity, amenities, status) VALUES
('The Sandbox', '685 Auahi St, Honolulu, HI 96813', 'Kakaako', 150, ARRAY['WiFi', 'Projector', 'Audio System', 'Parking'], 'approved'),
('Hub Coworking', '307 Kamani St, Honolulu, HI 96813', 'Kakaako', 100, ARRAY['WiFi', 'Conference Rooms', 'Kitchen'], 'approved'),
('Impact Hub Honolulu', '1050 Queen St, Honolulu, HI 96814', 'Kakaako', 75, ARRAY['WiFi', 'Event Space', 'Networking Area'], 'approved'),
('Purple Koii', '930 Waimanu St, Honolulu, HI 96814', 'Kakaako', 200, ARRAY['Full Bar', 'Kitchen', 'Outdoor Space', 'Parking'], 'approved'),
('UH Innovation Lab', '1680 East-West Rd, Honolulu, HI 96822', 'Manoa', 120, ARRAY['Labs', 'Presentation Equipment', 'Student Access'], 'approved');

-- Insert default submission window for 2025
INSERT INTO public.submission_windows (year, start_date, end_date) 
VALUES (2025, '2025-01-01', '2025-06-30');