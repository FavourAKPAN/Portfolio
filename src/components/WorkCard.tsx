import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export function ExternalLinks({ project }: { project: Project }) {
  return (
    <>
      {project.links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener"
          className="font-semibold text-brand hover:underline"
        >
          {l.label} <span aria-hidden="true">→</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
    </>
  );
}

function CardImage({ project, sizes }: { project: Project; sizes: string }) {
  const { image } = project;
  if (image.fit === "cover") {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className="block h-auto w-full rounded-xl"
      />
    );
  }
  return (
    <div className="flex aspect-[16/10] items-center justify-center rounded-xl border border-[#3b403a] bg-night p-3">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className="h-auto max-h-full w-full rounded-lg object-contain"
      />
    </div>
  );
}

export default function WorkCard({ project }: { project: Project }) {
  if (project.featured) {
    return (
      <article className="col-span-full flex flex-wrap gap-8 rounded-[20px] border border-brand p-5">
        <div className="flex min-w-0 flex-[1_1_380px] items-center">
          <CardImage project={project} sizes="(max-width: 1024px) 100vw, 600px" />
        </div>
        <div className="flex min-w-0 flex-[1_1_380px] flex-col justify-center gap-[18px]">
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            Featured · {project.eyebrow}
          </p>
          <h3 className="m-0 font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.1]">
            <Link href={`/work/${project.slug}`} className="no-underline hover:underline">
              {project.title}
            </Link>
          </h3>
          <p className="m-0 leading-relaxed text-[#d3d6cc]">{project.summary}</p>
          {project.highlights && (
            <ul className="m-0 list-none p-0 leading-[1.9] text-[#f5f3ed]">
              {project.highlights.map((h) => (
                <li key={h}>
                  <span className="text-brand" aria-hidden="true">—</span> {h}
                </li>
              ))}
            </ul>
          )}
          <p className="m-0 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#b5b9ae]">
            {project.note && <span>{project.note}</span>}
            <ExternalLinks project={project} />
            <Link href={`/work/${project.slug}`} className="font-semibold text-brand hover:underline">
              Project details <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="flex min-w-0 flex-col gap-[18px] rounded-[20px] border border-[#3b403a] p-5">
      <CardImage project={project} sizes="(max-width: 760px) 100vw, 560px" />
      <p className="m-0 text-xs font-semibold uppercase tracking-[0.16em] text-brand">{project.eyebrow}</p>
      <h3 className="m-0 font-display text-[28px] leading-tight">
        <Link href={`/work/${project.slug}`} className="no-underline hover:underline">
          {project.title}
        </Link>
      </h3>
      <p className="m-0 leading-relaxed text-[#d3d6cc]">
        {project.summary}
        {project.result ? ` ${project.result}` : ""}
      </p>
      <p className="m-0 mt-auto flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#b5b9ae]">
        <ExternalLinks project={project} />
        <Link href={`/work/${project.slug}`} className="font-semibold text-brand hover:underline">
          Project details <span aria-hidden="true">→</span>
        </Link>
      </p>
    </article>
  );
}
