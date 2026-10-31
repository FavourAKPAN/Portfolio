"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/config/site";
import ThemeToggle from "./ThemeToggle";

const OBSERVED = ["home", "about", "work", "skills", "process", "perspective", "contact"];

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Highlight the section currently in view (home page only).
  useEffect(() => {
    if (!onHome) return;
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        const current = OBSERVED.find((id) => visible.get(id));
        setActive(current ?? null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of OBSERVED) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [onHome]);

  // Close the mobile menu when the viewport grows to the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function openMenu() {
    setOpen(true);
    // Move focus into the menu once it is rendered visible.
    requestAnimationFrame(() => firstLinkRef.current?.focus());
  }

  function closeMenu(returnFocus: boolean) {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }

  const linkClass = (id: string) =>
    `pb-1 border-b-2 no-underline hover:underline ${
      onHome && active === id ? "border-brand" : "border-transparent"
    }`;

  return (
    <header
      className="relative mx-auto max-w-[1328px]"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          closeMenu(true);
        }
      }}
    >
      <div className="page-x flex items-center justify-between gap-4 py-6">
        <Link href="/#home" className="font-display text-[22px] font-bold no-underline">
          {SITE.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 text-[15px] font-medium md:flex">
          {NAV.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              aria-current={onHome && active === item.id ? "location" : undefined}
              className={linkClass(item.id)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/#contact" className="rounded-full bg-ink px-[22px] py-3 text-canvas no-underline">
            Contact
          </Link>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="themebtn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? closeMenu(false) : openMenu())}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="page-x pb-6 md:hidden"
      >
        <ul className="m-0 flex list-none flex-col gap-1 rounded-2xl border border-line bg-surf p-3 text-lg font-medium">
          {[...NAV, { id: "contact", label: "Contact" }].map((item, i) => (
            <li key={item.id}>
              <Link
                ref={i === 0 ? firstLinkRef : undefined}
                href={`/#${item.id}`}
                className="block rounded-xl px-4 py-3 no-underline hover:bg-soft"
                onClick={() => closeMenu(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
