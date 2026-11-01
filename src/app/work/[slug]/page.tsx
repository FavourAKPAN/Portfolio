import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLinks } from "@/components/WorkCard";
import { getProject, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.image.src, width: project.image.width, height: project.image.height, alt: project.image.alt }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const { image } = project;

  return (
    <article className="page-x mx-auto max-w-[1328px] pb-24 pt-6">
      <Link href="/#work" className="inline-block py-2 font-medium text-accent hover:underline">
        <span aria-hidden="true">←</span> Back to selected work
      </Link>

      <p className="mb-4 mt-8 text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">{project.eyebrow}</p>
      <h1 className="h-display m-0 max-w-[900px] text-[clamp(2rem,6vw,4.5rem)] leading-[1.05]">{project.title}</h1>
      <p className="mb-0 mt-8 max-w-[680px] text-xl leading-relaxed text-muted">{project.summary}</p>
      {project.note && <p className="mb-0 mt-4 text-sm text-muted">{project.note}</p>}

      {(project.role || project.period) && (
        <dl className="mb-0 mt-8 flex flex-wrap gap-x-12 gap-y-4">
          {project.role && (
            <div>
              <dt className="text-sm text-muted">Role</dt>
              <dd className="m-0 font-semibold">{project.role}</dd>
            </div>
          )}
          {project.period && (
            <div>
              <dt className="text-sm text-muted">Period</dt>
              <dd className="m-0 font-semibold">{project.period}</dd>
            </div>
          )}
        </dl>
      )}

      <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-night p-3 sm:p-5">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 1328px) 100vw, 1216px"
          priority
          className={`mx-auto block h-auto rounded-lg ${image.fit === "contain" ? "w-full object-contain" : "max-h-[720px] w-auto max-w-full"}`}
        />
      </div>

      {project.result && (
        <p className="mb-0 mt-10 max-w-[680px] border-l-4 border-brand pl-5 font-display text-xl font-semibold leading-snug">
          {project.result}
        </p>
      )}

      <section aria-labelledby="covers" className="mt-14">
        <h2 id="covers" className="m-0 mb-4 font-display text-2xl font-semibold">What it covers</h2>
        <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
          {project.covers.map((c) => (
            <li key={c} className="rounded-full border-[1.5px] border-ink bg-surf px-[18px] py-2.5 font-medium">
              {c}
            </li>
          ))}
        </ul>
      </section>
      
{project.negativeExample && (
        <section aria-labelledby="negative" className="mt-14">
          <h2 id="negative" className="m-0 mb-4 font-display text-2xl font-semibold">Example negative test</h2>
          <dl className="m-0 grid max-w-[680px] gap-4 rounded-2xl border border-line bg-surf p-6">
            <div>
              <dt className="text-sm text-muted">Scenario</dt>
              <dd className="m-0 font-medium">{project.negativeExample.scenario}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Expected</dt>
              <dd className="m-0 font-medium">{project.negativeExample.expected}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Actual</dt>
              <dd className="m-0 font-medium">{project.negativeExample.actual}</dd>
            </div>
          </dl>
        </section>
      )}
      
      {project.testCases && project.testCases.length > 0 && (
        <section aria-labelledby="cases" className="mt-14">
          <h2 id="cases" className="m-0 mb-4 font-display text-2xl font-semibold">Test cases</h2>
          <div className="overflow-x-auto">
            <table className="qa-table w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th scope="col">Test ID</th>
                  <th scope="col">Scenario</th>
                  <th scope="col">Expected</th>
                  <th scope="col">Actual</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {project.testCases.map((t) => (
                  <tr key={t.id}>
                    <th scope="row">{t.id}</th>
                    <td>{t.scenario}</td>
                    <td>{t.expected}</td>
                    <td>{t.actual}</td>
                    <td>{t.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <p className="mb-0 mt-14 flex flex-wrap gap-x-8 gap-y-3 [&_a]:!text-accent">
        <ExternalLinks project={project} />
      </p>

      <nav aria-label="More work" className="mt-20 border-t border-line pt-8">
        <p className="m-0 text-sm text-muted">Next project</p>
        <Link href={`/work/${next.slug}`} className="font-display text-2xl font-semibold hover:underline">
          {next.title} <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </article>
  );
}
