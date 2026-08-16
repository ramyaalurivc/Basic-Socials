import graphicDesignerImg from "@/assets/role-graphic-designer.png";

export type Role = {
  slug: string;
  title: string;
  tagline: string;
  employmentType: string;
  location: string;
  workMode: string;
  img: string;
  intro: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  learn: string[];
};

export const roles: Role[] = [
  {
    slug: "social-media-intern",
    title: "Social Media Intern",
    tagline: "Live inside the feed and turn trends into brand moments.",
    employmentType: "Internship",
    location: "Hyderabad",
    workMode: "On-site",
    img: "https://static.wixstatic.com/media/2fce2b_c831c67ec9974085bd99e04a0ff73759~mv2.png",
    intro:
      "You scroll for a living anyway. Here you get paid to turn that instinct into content that real brands publish, and to watch the numbers tell you whether you were right.",
    overview:
      "As a Social Media Intern at Basic Socials you sit at the centre of a client's day-to-day presence. You plan the calendar, write the hooks, brief the edits, hit publish and read the data the next morning. Nothing gets stuck waiting for approval from four layers of people — you ship, you learn, you adjust.",
    responsibilities: [
      "Plan and maintain weekly content calendars across Instagram, LinkedIn and YouTube",
      "Write scroll-stopping hooks, captions and CTAs in each brand's voice",
      "Spot trends, sounds and formats early and adapt them for client brands",
      "Coordinate with editors and designers to get assets ready on time",
      "Schedule and publish posts, then track reach, saves, shares and watch time",
      "Turn weekly analytics into one clear page of what worked and what to change",
      "Engage with comments and DMs to keep community response times fast",
    ],
    requirements: [
      "Genuine, daily fluency with Instagram, LinkedIn and YouTube",
      "Strong written English and a feel for tone of voice",
      "Basic Canva and CapCut skills",
      "Organised — you can juggle several brands without dropping a deadline",
      "Available in Hyderabad, full-time internship hours",
    ],
    niceToHave: [
      "You run your own page or newsletter",
      "Comfort with Notion, Airtable or any content workflow tool",
      "Basic understanding of paid social and boosted posts",
      "You've used ChatGPT or similar tools for ideation",
    ],
    learn: [
      "How a content strategy is actually built, not just posted",
      "Hook writing frameworks that transfer to any platform",
      "Reading analytics like a strategist instead of a spectator",
      "AI-assisted research, ideation and repurposing workflows",
      "Client communication and how agencies really run",
    ],
  },
  {
    slug: "video-editor",
    title: "Video Editor",
    tagline: "Cut reels, ads and long-form that people actually finish.",
    employmentType: "Full-time",
    location: "Hyderabad",
    workMode: "On-site",
    img: "https://static.wixstatic.com/media/2fce2b_5b142d3f0e4a436ea736f4b3a55ecfa5~mv2.png",
    intro:
      "Pacing, sound and restraint. If you know why a cut lands two frames earlier than most people think, you'll enjoy it here.",
    overview:
      "You own the edit from rushes to final export. Short-form reels, performance ads, founder talking heads, event recaps and the occasional long-form piece. You'll work directly with strategists rather than through a queue, so your opinion on the cut actually changes the cut.",
    responsibilities: [
      "Edit short-form vertical content: reels, shorts and TikTok-style cuts",
      "Cut performance ad variants and iterate on hooks based on results",
      "Add motion graphics, subtitles, transitions and sound design",
      "Colour correct and grade footage for a consistent brand look",
      "Manage project files, rushes and version control cleanly",
      "Hit fast turnarounds without losing quality",
      "Use AI tools for rough cuts, transcription and asset generation",
    ],
    requirements: [
      "Strong command of Premiere Pro and After Effects (or DaVinci Resolve)",
      "A reel that shows short-form work you're proud of",
      "Real understanding of pacing, retention and sound",
      "Ability to take feedback fast and turn versions around same-day",
      "Available in Hyderabad, full-time",
    ],
    niceToHave: [
      "Motion design chops in After Effects",
      "Basic shooting and lighting experience",
      "Experience editing paid ads with performance feedback loops",
      "Familiarity with Runway, Topaz or similar AI video tools",
    ],
    learn: [
      "How editing decisions map to retention and revenue",
      "Building AI-assisted editing pipelines that cut turnaround in half",
      "Ad creative testing — why one hook beats another",
      "Working across brand, performance and founder-led content",
    ],
  },
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    tagline: "Make brands look expensive, on every surface.",
    employmentType: "Full-time",
    location: "Hyderabad",
    workMode: "On-site / Hybrid",
    img: graphicDesignerImg,
    intro:
      "Identity systems, ad creative, decks, packaging, thumbnails. You'll design across the whole surface area of a brand instead of resizing the same banner forever.",
    overview:
      "You're the person who makes everything look intentional. You'll build and extend brand systems, design static and motion-ready ad creative, and set the visual bar for everything we publish. We care about typography, grid discipline and taste — not template hopping.",
    responsibilities: [
      "Design brand identities: logos, type systems, colour and usage guidelines",
      "Produce social creative, carousels, thumbnails and static ad sets",
      "Design pitch decks, one-pagers and client-facing collateral",
      "Build reusable design systems and templates the team can run with",
      "Prepare layered files that hand off cleanly to editors and motion",
      "Keep every deliverable consistent with each brand's visual language",
    ],
    requirements: [
      "Strong portfolio showing branding and social/ad design",
      "Fluency in Figma plus Adobe Illustrator and Photoshop",
      "Real typography and layout fundamentals",
      "Speed — you can produce a full creative set in a day when needed",
      "Available in Hyderabad",
    ],
    niceToHave: [
      "Basic After Effects or Rive for simple motion",
      "Experience designing for performance marketing",
      "Packaging or print experience",
      "Comfort with AI image tools like Midjourney or Firefly",
    ],
    learn: [
      "Building brand systems from scratch, not just executing them",
      "How design choices affect click-through and conversion",
      "AI-assisted creative production at volume",
      "Presenting and defending design decisions to founders",
    ],
  },
  {
    slug: "screen-presenter",
    title: "Screen Presenter / Influencer",
    tagline: "Be the face. Carry the camera and the caption.",
    employmentType: "Full-time / Collaboration",
    location: "Hyderabad",
    workMode: "Hybrid",
    img: "https://static.wixstatic.com/media/2fce2b_4842310072e945b9b512f8f0b8e29a63~mv2.png",
    intro:
      "You're comfortable on camera, quick with a line, and you understand that presence is a craft rather than confidence alone.",
    overview:
      "You'll front content for Basic Socials and for client brands — street interviews, product explainers, founder-style pieces, event coverage and campaign spots. You'll also help shape scripts, because the best delivery starts before the camera rolls.",
    responsibilities: [
      "Present on camera for reels, ads, explainers and event coverage",
      "Collaborate on scripts, hooks and delivery for each format",
      "Host interviews, vox pops and on-ground activations",
      "Self-shoot when needed — phone, tripod, mic, good light",
      "Build and maintain your own audience alongside client work",
      "Attend shoots and campaign days across Hyderabad",
    ],
    requirements: [
      "Strong on-camera presence and clear delivery in English and Hindi/Telugu",
      "Sample videos of you presenting (any quality — we care about presence)",
      "Comfort with improvisation and multiple takes",
      "Reliable and punctual on shoot days",
      "Based in Hyderabad",
    ],
    niceToHave: [
      "An existing audience on any platform",
      "Basic self-editing skills",
      "Theatre, anchoring or public speaking background",
      "Experience with brand collaborations",
    ],
    learn: [
      "Script and delivery craft for short-form retention",
      "How to build a personal brand deliberately",
      "Working on professional sets with real clients",
      "Turning presence into a long-term creator career",
    ],
  },
];

export const perks = [
  { t: "Real ownership", d: "Your work ships to real brands with real audiences from week one." },
  { t: "AI-first tooling", d: "Full access to the AI stack we build client systems with." },
  { t: "Flexible hours", d: "We care about output and shoot days, not clock-ins." },
  { t: "Learning budget", d: "Courses, gear and software we'll pay for if it makes you better." },
  { t: "Fast growth", d: "Small team, no ladder. Do the work, take the scope." },
  { t: "Team days", d: "Shoots, offsites and the occasional questionable playlist." },
];

export const whyJoin = [
  "We're small enough that your ideas get built the same week you have them.",
  "Every workflow here runs on AI, so you leave with skills most teams haven't touched.",
  "You'll work across branding, content, performance and video instead of one narrow lane.",
  "No politics, no ladder, no one taking credit for your work.",
];

export function getRole(slug: string) {
  return roles.find((r) => r.slug === slug);
}

export const APPLICATION_STATUSES = [
  "new",
  "reviewing",
  "shortlisted",
  "interview",
  "rejected",
  "hired",
] as const;

export const STATUS_LABELS: Record<string, string> = {
  new: "New",
  reviewing: "Reviewing",
  shortlisted: "Shortlisted",
  interview: "Interview Scheduled",
  rejected: "Rejected",
  hired: "Hired",
};