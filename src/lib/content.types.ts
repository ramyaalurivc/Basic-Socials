export type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  category: string | null;
  tags: string[];
  author: string;
  published_at: string | null;
  read_minutes: number;
  seo_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  related_slugs: string[];
  status: string;
  created_at: string;
  updated_at: string;
};

export type CaseStudyRow = {
  id: string;
  slug: string;
  title: string;
  cover_image: string | null;
  client_name: string | null;
  industry: string | null;
  overview: string;
  challenge: string;
  solution: string;
  process: string;
  results: string;
  images: string[];
  video_url: string | null;
  testimonial_quote: string | null;
  testimonial_author: string | null;
  technologies: string[];
  cta_title: string | null;
  cta_body: string | null;
  seo_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  published_at: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type MediaRow = {
  id: string;
  path: string;
  url: string;
  filename: string;
  mime_type: string | null;
  size_bytes: number | null;
  alt_text: string | null;
  created_at: string;
};
