-- Create hosts table
CREATE TABLE IF NOT EXISTS public.hosts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  org TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID REFERENCES public.hosts(id) ON DELETE SET NULL,
  idea_text TEXT,
  ai_output JSONB,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  comments TEXT,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.hosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW Level SECURITY;

-- Create permissive policies for hackathon (allows all operations)
CREATE POLICY "Allow all operations on hosts" ON public.hosts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on events" ON public.events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on reviews" ON public.reviews FOR ALL USING (true) WITH CHECK (true);