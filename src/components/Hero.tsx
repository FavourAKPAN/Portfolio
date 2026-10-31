import Link from "next/link";
import { SITE } from "@/config/site";

export default function Hero() {
  return (
    <section id="home" className="page-x mx-auto max-w-[1328px] pb-28 pt-[72px]">
      <p className="m-0 mb-7 text-[13px] font-semibold tracking-[0.18em]">
        <span className="rounded-full bg-brand-fill px-3 py-1.5 text-white">UX DESIGN · SOFTWARE QA</span>
      </p>
      <h1 className="h-display m-0 max-w-[1100px] text-[clamp(2.25rem,8vw,7rem)] leading-none">
        I design <span className="text-accent">thoughtful digital experiences</span> and test them for quality.
      </h1>
      <p className="mb-0 mt-10 max-w-[640px] text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
        I’m a Computer Engineering graduate and multidisciplinary digital product practitioner working across UX design
        and software QA. I combine user-centred thinking, technical understanding and structured testing to help make
        digital products intuitive, useful and reliable.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="#work" className="btn btn-solid">
          Explore my work
        </Link>
        <Link href="#contact" className="btn btn-outline">
          Let’s connect
        </Link>
      </div>
      <p className="mb-0 mt-8 text-sm text-muted">
        Based in {SITE.location} · WAT (GMT+1)
      </p>
    </section>
  );
}
