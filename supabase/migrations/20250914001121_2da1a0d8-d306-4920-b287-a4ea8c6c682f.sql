-- Allow users to create their own profile securely
CREATE POLICY IF NOT EXISTS "Users can create own profile" 
ON public.users 
FOR INSERT 
WITH CHECK (id = auth.uid());