-- Add missing RLS policies for all tables that need them

-- Templates policies
CREATE POLICY "Anyone can view templates" ON public.templates FOR SELECT USING (true);
CREATE POLICY "Staff can manage templates" ON public.templates FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND 'htw_staff' = ANY(roles)
  )
);

-- Message threads policies  
CREATE POLICY "Users can view their message threads" ON public.message_threads FOR SELECT USING (
  auth.uid() = ANY(participants) OR
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND 'htw_staff' = ANY(roles)
  )
);

CREATE POLICY "Users can create message threads" ON public.message_threads FOR INSERT WITH CHECK (
  auth.uid() = ANY(participants)
);

-- Messages policies
CREATE POLICY "Users can view messages in their threads" ON public.messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.message_threads 
    WHERE id = thread_id AND (
      auth.uid() = ANY(participants) OR
      EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND 'htw_staff' = ANY(roles)
      )
    )
  )
);

CREATE POLICY "Users can send messages in their threads" ON public.messages FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.message_threads 
    WHERE id = thread_id AND auth.uid() = ANY(participants)
  )
);

-- Audit log policies
CREATE POLICY "Staff can view audit log" ON public.audit_log FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND 'htw_staff' = ANY(roles)
  )
);

CREATE POLICY "System can insert audit log" ON public.audit_log FOR INSERT WITH CHECK (true);

-- Venue availability rules policies
CREATE POLICY "Anyone can view venue availability" ON public.venue_availability_rules FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.venues 
    WHERE id = venue_id AND status = 'approved'
  )
);

CREATE POLICY "Venue hosts can manage their availability" ON public.venue_availability_rules FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.venues 
    WHERE id = venue_id AND claimed_by_user_id = auth.uid()
  )
);

-- Venue blackouts policies
CREATE POLICY "Anyone can view venue blackouts" ON public.venue_blackouts FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.venues 
    WHERE id = venue_id AND status = 'approved'
  )
);

CREATE POLICY "Venue hosts can manage their blackouts" ON public.venue_blackouts FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.venues 
    WHERE id = venue_id AND claimed_by_user_id = auth.uid()
  )
);

-- Submission windows policies
CREATE POLICY "Anyone can view submission windows" ON public.submission_windows FOR SELECT USING (true);

CREATE POLICY "Staff can manage submission windows" ON public.submission_windows FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND 'htw_staff' = ANY(roles)
  )
);

-- Reviews policies (this table already existed)
CREATE POLICY "Users can view relevant reviews" ON public.reviews FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.events 
    WHERE id = event_id AND (
      host_user_id = auth.uid() OR 
      EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND 'htw_staff' = ANY(roles)
      )
    )
  )
);

CREATE POLICY "Staff can create reviews" ON public.reviews FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND 'htw_staff' = ANY(roles)
  )
);