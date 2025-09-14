-- Create test users in auth system
-- Note: We'll need to use the Supabase dashboard to create actual auth users
-- For now, let's ensure our user profiles are set up correctly

-- Update existing profiles to match what we'll create in auth
UPDATE users SET 
  email = 'admin@htwweek.org',
  roles = '{htw_staff}'
WHERE email = 'admin@htwweek.org';

-- Insert additional test user profiles that we'll create auth accounts for
INSERT INTO users (id, email, name, roles) VALUES 
  ('00000000-0000-0000-0000-000000000001', 'host@example.com', 'Demo Host', '{event_host}'),
  ('00000000-0000-0000-0000-000000000002', 'venue@example.com', 'Demo Venue', '{venue_host}')
ON CONFLICT (email) DO UPDATE SET
  roles = EXCLUDED.roles,
  name = EXCLUDED.name;