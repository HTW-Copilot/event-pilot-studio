-- Create enum types for roles and statuses
CREATE TYPE public.user_role AS ENUM ('event_host', 'htw_staff', 'venue_host');
CREATE TYPE public.event_status AS ENUM ('draft', 'submitted', 'in_review', 'changes_requested', 'resubmitted', 'approved', 'scheduled', 'published', 'completed', 'archived', 'declined');
CREATE TYPE public.venue_status AS ENUM ('pending_verification', 'approved', 'rejected', 'suspended');
CREATE TYPE public.event_type AS ENUM ('panel', 'mixer', 'masterclass', 'launch', 'workshop', 'networking', 'keynote');
CREATE TYPE public.audience_type AS ENUM ('founders', 'investors', 'students', 'developers', 'designers', 'marketers', 'general');

-- Users table (extends auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
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

-- Events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_user_id UUID REFERENCES public.users(id) NOT NULL,
  org TEXT,
  title TEXT NOT NULL,
  description TEXT,
  event_types public.event_type[] DEFAULT '{}',
  audience_types public.audience_type[] DEFAULT '{}',
  capacity_target INTEGER,
  venue_id UUID, -- Will reference venues table
  status public.event_status DEFAULT 'draft',
  start_at TIMESTAMP WITH TIME ZONE,
  end_at TIMESTAMP WITH TIME ZONE,
  time_flexible BOOLEAN DEFAULT false,
  marketing_stage TEXT,
  luma_url TEXT,
  attachments JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event status history
CREATE TABLE public.event_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  from_status public.event_status,
  to_status public.event_status NOT NULL,
  by_user_id UUID REFERENCES public.users(id),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Venues table
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

-- Venue availability rules
CREATE TABLE public.venue_availability_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE,
  rrule TEXT NOT NULL, -- RFC 5545 RRULE format
  timezone TEXT DEFAULT 'Pacific/Honolulu',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Venue blackouts
CREATE TABLE public.venue_blackouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE,
  start_at TIMESTAMP WITH TIME ZONE NOT NULL,
  end_at TIMESTAMP WITH TIME ZONE NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Submission windows
CREATE TABLE public.submission_windows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  late_policy TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES public.users(id),
  decision TEXT, -- approve, request_changes, decline
  comments TEXT,
  requested_changes JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Message threads
CREATE TABLE public.message_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  context_type TEXT NOT NULL, -- 'event' or 'venue'
  context_id UUID NOT NULL,
  participants UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES public.message_threads(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Templates
CREATE TABLE public.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- title, description, marketing, screening_qs, email_copy
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit log
CREATE TABLE public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES public.users(id),
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id UUID NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venue_availability_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venue_blackouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_windows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Create updated_at triggers
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
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

-- Create RLS policies (basic - can be refined later)
CREATE POLICY "Users can view all users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view approved venues" ON public.venues FOR SELECT USING (status = 'approved' OR auth.uid() IS NOT NULL);
CREATE POLICY "Venue hosts can manage their venues" ON public.venues FOR ALL USING (claimed_by_user_id = auth.uid());

CREATE POLICY "Event hosts can manage their events" ON public.events FOR ALL USING (host_user_id = auth.uid());
CREATE POLICY "Staff can view all events" ON public.events FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND 'htw_staff' = ANY(roles)
  )
);

-- Insert default submission window for 2025
INSERT INTO public.submission_windows (year, start_date, end_date) 
VALUES (2025, '2025-01-01', '2025-06-30');