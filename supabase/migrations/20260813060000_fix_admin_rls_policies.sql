-- Fix: Replace all private.is_admin() RLS policy references with inline
-- EXISTS checks so authenticated users can actually pass the admin gate.
--
-- The previous migration moved is_admin() into a `private` schema that
-- authenticated users cannot access, breaking every admin policy.

BEGIN;

-- ============================================================
-- 1. profiles
-- ============================================================
DROP POLICY IF EXISTS "Users read own profile" ON public.profiles;
CREATE POLICY "Users read own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (
    auth.uid() = id
    OR EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================
-- 2. user_roles  (read your own rows; no circular lookup)
-- ============================================================
DROP POLICY IF EXISTS "Users read own roles" ON public.user_roles;
CREATE POLICY "Users read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================
-- 3. posts
-- ============================================================
DROP POLICY IF EXISTS "Admins read all posts" ON public.posts;
CREATE POLICY "Admins read all posts" ON public.posts
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins write posts" ON public.posts;
CREATE POLICY "Admins write posts" ON public.posts
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins update posts" ON public.posts;
CREATE POLICY "Admins update posts" ON public.posts
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins delete posts" ON public.posts;
CREATE POLICY "Admins delete posts" ON public.posts
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================
-- 4. case_studies
-- ============================================================
DROP POLICY IF EXISTS "Admins read all case studies" ON public.case_studies;
CREATE POLICY "Admins read all case studies" ON public.case_studies
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins write case studies" ON public.case_studies;
CREATE POLICY "Admins write case studies" ON public.case_studies
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins update case studies" ON public.case_studies;
CREATE POLICY "Admins update case studies" ON public.case_studies
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins delete case studies" ON public.case_studies;
CREATE POLICY "Admins delete case studies" ON public.case_studies
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================
-- 5. media
-- ============================================================
DROP POLICY IF EXISTS "Admins read media" ON public.media;
CREATE POLICY "Admins read media" ON public.media
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins insert media" ON public.media;
CREATE POLICY "Admins insert media" ON public.media
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins update media" ON public.media;
CREATE POLICY "Admins update media" ON public.media
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins delete media" ON public.media;
CREATE POLICY "Admins delete media" ON public.media
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================
-- 6. site_settings
-- ============================================================
DROP POLICY IF EXISTS "Admins insert settings" ON public.site_settings;
CREATE POLICY "Admins insert settings" ON public.site_settings
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins update settings" ON public.site_settings;
CREATE POLICY "Admins update settings" ON public.site_settings
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins delete settings" ON public.site_settings;
CREATE POLICY "Admins delete settings" ON public.site_settings
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================
-- 7. job_applications
-- ============================================================
DROP POLICY IF EXISTS "Admins can read applications" ON public.job_applications;
CREATE POLICY "Admins can read applications" ON public.job_applications
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can update applications" ON public.job_applications;
CREATE POLICY "Admins can update applications" ON public.job_applications
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can delete applications" ON public.job_applications;
CREATE POLICY "Admins can delete applications" ON public.job_applications
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================
-- 8. storage.objects – media bucket
-- ============================================================
DROP POLICY IF EXISTS "Admins read media objects" ON storage.objects;
CREATE POLICY "Admins read media objects" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'media'
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins upload media objects" ON storage.objects;
CREATE POLICY "Admins upload media objects" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'media'
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins update media objects" ON storage.objects;
CREATE POLICY "Admins update media objects" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'media'
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    bucket_id = 'media'
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins delete media objects" ON storage.objects;
CREATE POLICY "Admins delete media objects" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'media'
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins manage blog media" ON storage.objects;
CREATE POLICY "Admins manage blog media" ON storage.objects
  FOR ALL TO authenticated
  USING (
    bucket_id = 'media'
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    bucket_id = 'media'
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================
-- 9. storage.objects – resumes bucket
-- ============================================================
DROP POLICY IF EXISTS "Admins can read resumes" ON storage.objects;
CREATE POLICY "Admins can read resumes" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'resumes'
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================
-- 10. Clean up: drop the unreachable private helpers & schema
-- ============================================================
DROP FUNCTION IF EXISTS private.is_admin();
DROP FUNCTION IF EXISTS private.has_role(uuid, public.app_role);
DROP SCHEMA IF EXISTS private;

COMMIT;
