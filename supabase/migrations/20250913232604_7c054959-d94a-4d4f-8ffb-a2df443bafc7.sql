-- Let's find the table that still doesn't have RLS policies
-- Check which tables have RLS enabled but no policies

-- Add the missing policy for the hosts table (legacy table)
CREATE POLICY "Users can view all hosts" ON public.hosts FOR SELECT USING (true);
CREATE POLICY "Staff can manage hosts" ON public.hosts FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND 'htw_staff' = ANY(roles)
  )
);

-- Now let's verify all tables have proper policies
-- This completes our RLS policy setup