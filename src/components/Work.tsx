import { projects } from "@/data/projects";
import WorkCard from "./WorkCard";

export default function Work() {
  return (
    <section id="work" className="page-x bg-panel py-[104px] text-[#f5f3ed]">
      <div className="mx-auto max-w-page">
        <p className="eyebrow">Selected work</p>
        <h2 className="m-0 mb-14 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em]">
          Design and quality, side by side.
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-7">
          {projects.map((p) => (
            <WorkCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
