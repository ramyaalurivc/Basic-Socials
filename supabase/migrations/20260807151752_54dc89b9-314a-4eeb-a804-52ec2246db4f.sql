CREATE TABLE public.job_applications (
  id uuid primary key default gen_random_uuid(),
  role_slug text not null,
  role_title text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  location text not null,
  experience text not null,
  notice_period text not null,
  portfolio_url text,
  linkedin_url text,
  current_company text,
  expected_ctc text,
  why_join text not null,
  creators jsonb not null default '[]'::jsonb,
  resume_path text,
  resume_filename text,
  status text not null default 'new',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

GRANT INSERT ON public.job_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_applications TO authenticated;
GRANT ALL ON public.job_applications TO service_role;

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an application"
  ON public.job_applications FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admins can read applications"
  ON public.job_applications FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can update applications"
  ON public.job_applications FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete applications"
  ON public.job_applications FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE TRIGGER job_applications_set_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX job_applications_created_idx ON public.job_applications (created_at DESC);

CREATE POLICY "Anyone can upload a resume"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Admins can read resumes"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'resumes' AND public.is_admin());

CREATE POLICY "Admins manage blog media"
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'media' AND public.is_admin())
  WITH CHECK (bucket_id = 'media' AND public.is_admin());