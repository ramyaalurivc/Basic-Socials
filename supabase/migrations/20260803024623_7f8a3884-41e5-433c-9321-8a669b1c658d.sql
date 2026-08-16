-- roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

CREATE POLICY "Users read own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "Users read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.is_admin());

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- posts
CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  featured_image text,
  category text,
  tags text[] NOT NULL DEFAULT '{}',
  author text NOT NULL DEFAULT 'Basic Socials',
  published_at timestamptz,
  read_minutes integer NOT NULL DEFAULT 4,
  seo_title text,
  meta_description text,
  og_image text,
  related_slugs text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT SELECT ON public.posts TO anon;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published posts are public" ON public.posts
  FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "Admins read all posts" ON public.posts
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins write posts" ON public.posts
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins update posts" ON public.posts
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins delete posts" ON public.posts
  FOR DELETE TO authenticated USING (public.is_admin());
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON public.posts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- case studies
CREATE TABLE public.case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  cover_image text,
  client_name text,
  industry text,
  overview text NOT NULL DEFAULT '',
  challenge text NOT NULL DEFAULT '',
  solution text NOT NULL DEFAULT '',
  process text NOT NULL DEFAULT '',
  results text NOT NULL DEFAULT '',
  images text[] NOT NULL DEFAULT '{}',
  video_url text,
  testimonial_quote text,
  testimonial_author text,
  technologies text[] NOT NULL DEFAULT '{}',
  cta_title text,
  cta_body text,
  seo_title text,
  meta_description text,
  og_image text,
  published_at timestamptz,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.case_studies TO authenticated;
GRANT SELECT ON public.case_studies TO anon;
GRANT ALL ON public.case_studies TO service_role;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published case studies are public" ON public.case_studies
  FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "Admins read all case studies" ON public.case_studies
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins write case studies" ON public.case_studies
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins update case studies" ON public.case_studies
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins delete case studies" ON public.case_studies
  FOR DELETE TO authenticated USING (public.is_admin());
CREATE TRIGGER case_studies_updated_at BEFORE UPDATE ON public.case_studies
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- media library
CREATE TABLE public.media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  url text NOT NULL,
  filename text NOT NULL,
  mime_type text,
  size_bytes bigint,
  alt_text text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media TO authenticated;
GRANT ALL ON public.media TO service_role;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read media" ON public.media
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins insert media" ON public.media
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins update media" ON public.media
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins delete media" ON public.media
  FOR DELETE TO authenticated USING (public.is_admin());

-- site settings
CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT SELECT ON public.site_settings TO anon;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Settings are public" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins insert settings" ON public.site_settings
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins update settings" ON public.site_settings
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins delete settings" ON public.site_settings
  FOR DELETE TO authenticated USING (public.is_admin());
CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.site_settings (key, value) VALUES
  ('seo', '{"site_title":"Basic Socials · Grow with Content + AI","default_description":"A content and AI studio in Hyderabad. Content that gets your business noticed, AI systems that keep it running.","default_og_image":""}'::jsonb),
  ('general', '{"email":"socials@basicsocials.com","phone":"+91 79935 57180"}'::jsonb);

CREATE INDEX posts_status_published_idx ON public.posts (status, published_at DESC);
CREATE INDEX case_studies_status_published_idx ON public.case_studies (status, published_at DESC);