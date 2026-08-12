
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO postgres, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION private.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT private.has_role(auth.uid(), 'admin')
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION private.is_admin() FROM PUBLIC, anon, authenticated;

DROP POLICY "Users read own profile" ON public.profiles;
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id OR private.is_admin());

DROP POLICY "Users read own roles" ON public.user_roles;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id OR private.is_admin());

DROP POLICY "Admins read all posts" ON public.posts;
CREATE POLICY "Admins read all posts" ON public.posts FOR SELECT TO authenticated USING (private.is_admin());
DROP POLICY "Admins write posts" ON public.posts;
CREATE POLICY "Admins write posts" ON public.posts FOR INSERT TO authenticated WITH CHECK (private.is_admin());
DROP POLICY "Admins update posts" ON public.posts;
CREATE POLICY "Admins update posts" ON public.posts FOR UPDATE TO authenticated USING (private.is_admin()) WITH CHECK (private.is_admin());
DROP POLICY "Admins delete posts" ON public.posts;
CREATE POLICY "Admins delete posts" ON public.posts FOR DELETE TO authenticated USING (private.is_admin());

DROP POLICY "Admins read all case studies" ON public.case_studies;
CREATE POLICY "Admins read all case studies" ON public.case_studies FOR SELECT TO authenticated USING (private.is_admin());
DROP POLICY "Admins write case studies" ON public.case_studies;
CREATE POLICY "Admins write case studies" ON public.case_studies FOR INSERT TO authenticated WITH CHECK (private.is_admin());
DROP POLICY "Admins update case studies" ON public.case_studies;
CREATE POLICY "Admins update case studies" ON public.case_studies FOR UPDATE TO authenticated USING (private.is_admin()) WITH CHECK (private.is_admin());
DROP POLICY "Admins delete case studies" ON public.case_studies;
CREATE POLICY "Admins delete case studies" ON public.case_studies FOR DELETE TO authenticated USING (private.is_admin());

DROP POLICY "Admins read media" ON public.media;
CREATE POLICY "Admins read media" ON public.media FOR SELECT TO authenticated USING (private.is_admin());
DROP POLICY "Admins insert media" ON public.media;
CREATE POLICY "Admins insert media" ON public.media FOR INSERT TO authenticated WITH CHECK (private.is_admin());
DROP POLICY "Admins update media" ON public.media;
CREATE POLICY "Admins update media" ON public.media FOR UPDATE TO authenticated USING (private.is_admin()) WITH CHECK (private.is_admin());
DROP POLICY "Admins delete media" ON public.media;
CREATE POLICY "Admins delete media" ON public.media FOR DELETE TO authenticated USING (private.is_admin());

DROP POLICY "Admins insert settings" ON public.site_settings;
CREATE POLICY "Admins insert settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (private.is_admin());
DROP POLICY "Admins update settings" ON public.site_settings;
CREATE POLICY "Admins update settings" ON public.site_settings FOR UPDATE TO authenticated USING (private.is_admin()) WITH CHECK (private.is_admin());
DROP POLICY "Admins delete settings" ON public.site_settings;
CREATE POLICY "Admins delete settings" ON public.site_settings FOR DELETE TO authenticated USING (private.is_admin());

DROP POLICY "Admins can read applications" ON public.job_applications;
CREATE POLICY "Admins can read applications" ON public.job_applications FOR SELECT TO authenticated USING (private.is_admin());
DROP POLICY "Admins can update applications" ON public.job_applications;
CREATE POLICY "Admins can update applications" ON public.job_applications FOR UPDATE TO authenticated USING (private.is_admin()) WITH CHECK (private.is_admin());
DROP POLICY "Admins can delete applications" ON public.job_applications;
CREATE POLICY "Admins can delete applications" ON public.job_applications FOR DELETE TO authenticated USING (private.is_admin());

DROP POLICY "Admins read media objects" ON storage.objects;
CREATE POLICY "Admins read media objects" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'media' AND private.is_admin());
DROP POLICY "Admins upload media objects" ON storage.objects;
CREATE POLICY "Admins upload media objects" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND private.is_admin());
DROP POLICY "Admins update media objects" ON storage.objects;
CREATE POLICY "Admins update media objects" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media' AND private.is_admin()) WITH CHECK (bucket_id = 'media' AND private.is_admin());
DROP POLICY "Admins delete media objects" ON storage.objects;
CREATE POLICY "Admins delete media objects" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND private.is_admin());
DROP POLICY "Admins can read resumes" ON storage.objects;
CREATE POLICY "Admins can read resumes" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'resumes' AND private.is_admin());
DROP POLICY "Admins manage blog media" ON storage.objects;
CREATE POLICY "Admins manage blog media" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'media' AND private.is_admin()) WITH CHECK (bucket_id = 'media' AND private.is_admin());

DROP FUNCTION IF EXISTS public.is_admin();
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
