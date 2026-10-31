export const SITE = {
  name: "Favour Akpan",
  tagline: "I design thoughtful digital experiences and test them for quality.",
  description:
    "Favour Akpan is a Computer Engineering graduate working across UX/UI design and software QA, including manual testing and REST API testing.",
  location: "Port Harcourt, Nigeria",
  timezoneLabel: "Lagos, WAT (GMT+1)",
  timeZone: "Africa/Lagos",
  email: "akpanfavoura4@gmail.com",
  resumePath: "/Favour_Akpan_Resume.pdf",
  links: {
    linkedin: "https://www.linkedin.com/in/favourakpan23",
    github: "https://github.com/FavourAKPAN",
    behance: "https://www.behance.net/favourakpan5",
    x: "https://x.com/favour_akpan_",
  },
} as const;

export const MAILTO = `mailto:${SITE.email}?subject=Portfolio%20enquiry`;

/** Resolved at build time on Vercel without any env vars; override with NEXT_PUBLIC_SITE_URL. */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
] as const;
