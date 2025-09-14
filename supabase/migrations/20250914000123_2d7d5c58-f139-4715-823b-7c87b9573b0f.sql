-- Fix critical security vulnerability: Restrict users table access
-- Remove the overly permissive policy that allows anyone to view all users
DROP POLICY IF EXISTS "Users can view all users" ON public.users;

-- Create a more secure policy that only allows:
-- 1. Users to view their own profile data
-- 2. HTW staff to view all user data for administrative purposes
CREATE POLICY "Users can view own profile and staff can view all" 
ON public.users 
FOR SELECT 
USING (
  auth.uid() = id OR 
  EXISTS (
    SELECT 1 FROM public.users u 
    WHERE u.id = auth.uid() 
    AND 'htw_staff'::user_role = ANY(u.roles)
  )
);