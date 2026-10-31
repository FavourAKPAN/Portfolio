import { MAILTO, SITE } from "@/config/site";
import { ClockDate, ClockTime } from "./Clock";

const external = [
  { label: "LinkedIn", href: SITE.links.linkedin },
  { label: "GitHub", href: SITE.links.github },
  { label: "Behance", href: SITE.links.behance },
  { label: "X", href: SITE.links.x },
];

export default function Contact() {
  return (
    <section id="contact" className="page-x border-t border-[#3b403a] bg-night py-32 text-[#f5f3ed]">
      <div className="mx-auto max-w-page">
        <h2 className="h-display m-0 max-w-[900px] text-[clamp(2.25rem,7vw,6rem)] leading-none">
          Have a product worth making better?
        </h2>
        <p className="mb-12 mt-8 max-w-[600px] text-xl leading-relaxed text-[#d3d6cc]">
          I’d like to hear from recruiters, designers, developers and collaborators building products that deserve both
          thoughtful design and rigorous testing.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href={MAILTO} className="btn btn-brand">
            Send me an email
          </a>
          {external.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener" className="btn btn-on-dark">
              {l.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
          <a href={SITE.resumePath} target="_blank" rel="noopener" className="btn btn-on-dark">
            Resume
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-x-14 gap-y-6 border-t border-[#3b403a] pt-8">
          <div>
            <p className="m-0 mb-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-brand">
              Local time · Port Harcourt, Nigeria
            </p>
            <ClockTime />
          </div>
          <div className="text-base leading-[1.7] text-[#d3d6cc]">
            <p className="m-0">Based in {SITE.location}</p>
            <p className="m-0">Timezone: {SITE.timezoneLabel}</p>
            <ClockDate />
          </div>
        </div>
      </div>
    </section>
  );
}
