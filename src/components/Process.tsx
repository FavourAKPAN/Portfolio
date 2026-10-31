import { designSteps, testingSteps } from "@/data/skills";

function Row({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div>
      <h3 className="m-0 mb-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-muted">{title}</h3>
      <ol className="proc">
        {steps.map((s, i) => (
          <li key={s} className={`pcard${i === steps.length - 1 ? " plast" : ""}`}>
            <span className="pnum">{String(i + 1).padStart(2, "0")}</span>
            <span className="pname">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Process() {
  return (
    <section id="process" className="page-x bg-soft py-[104px]">
      <div className="mx-auto max-w-page">
        <h2 className="m-0 mb-16 font-display text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em]">
          How I work
        </h2>
        <div className="flex flex-col gap-12">
          <Row title="Design" steps={designSteps} />
          <Row title="Testing" steps={testingSteps} />
        </div>
        <p className="m-0 mt-12 text-sm text-muted">A general framework — not every project followed every step.</p>
      </div>
    </section>
  );
}
