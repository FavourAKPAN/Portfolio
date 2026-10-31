import Link from "next/link";
import { MAILTO, SITE } from "@/config/site";
import Year from "./Year";

export default function Footer() {
  const links = [
    { label: "LinkedIn", href: SITE.links.linkedin },
    { label: "GitHub", href: SITE.links.github },
    { label: "Behance", href: SITE.links.behance },
    { label: "X", href: SITE.links.x },
  ];
  return (
    <footer className="page-x border-t border-[#3b403a] bg-night py-10 text-[#f5f3ed]">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-6 text-[15px]">
        <Link href="/#home" className="font-display text-xl font-bold no-underline">
          {SITE.name}
          <span className="text-brand" aria-hidden="true">.</span>
        </Link>
        <nav aria-label="Footer" className="flex flex-wrap gap-6">
          <a href={MAILTO} className="hover:underline">Email</a>
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener" className="hover:underline">
              {l.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </nav>
        <p className="m-0 text-[#b5b9ae]">
          © <Year /> {SITE.name}. All rights reserved.
          <br />
          {SITE.location} · WAT (GMT+1)
        </p>
      </div>
    </footer>
  );
}
