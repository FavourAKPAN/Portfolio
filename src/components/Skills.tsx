import { designSkills, qaSkills, toolGroups } from "@/data/skills";

function Group({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t-2 border-ink pt-5">
      <h3 className="m-0 mb-4 font-display text-xl font-semibold">{title}</h3>
      <ul className="m-0 flex list-none flex-wrap items-center gap-3 p-0">
        {items.map((s) => (
          <li key={s} className="contents">
            <span className="bubble">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="page-x py-[104px]">
      <div className="mx-auto max-w-page">
        <h2 className="m-0 mb-14 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em]">
          Skills
        </h2>
        <div className="skillgrid grid grid-cols-1 gap-12 md:grid-cols-2">
          <Group title="UI/UX Design" items={designSkills} />
          <Group title="Software Quality Assurance" items={qaSkills} />
        </div>
        <h3 className="mb-6 mt-[72px] font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.01em]">
          Tools in my workflow
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-10">
          {toolGroups.map((g) => (
            <div key={g.title} className="border-t-2 border-brand pt-5">
              <h4 className="m-0 mb-4 text-[13px] font-semibold uppercase tracking-[0.14em]">{g.title}</h4>
              <ul className="m-0 flex list-none flex-wrap items-center gap-2.5 p-0">
                {g.items.map((s) => (
                  <li key={s} className="contents">
                    <span className="bubble">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
