"use client";

import { useRef, useState } from "react";

const tabs = [
  {
    id: "ux",
    label: "UX Design",
    sub: "How it feels to use",
    heading: "Does it make sense to the user?",
    body: "I consider usability, information hierarchy, user flows and how clearly an interface communicates its purpose. My goal is to make digital experiences intuitive, useful and easy to navigate.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M9 9v11" />
      </>
    ),
  },
  {
    id: "qa",
    label: "Software QA",
    sub: "How well it works",
    heading: "Does it behave as expected?",
    body: "I examine requirements, test different scenarios, validate API responses and document defects clearly. My goal is to identify issues that could affect functionality, reliability or the user experience.",
    icon: (
      <>
        <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </>
    ),
  },
];

function Icon({ size, children }: { size: number; children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export default function Perspectives() {
  const [selected, setSelected] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent) {
    const last = tabs.length - 1;
    let next: number;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = selected === last ? 0 : selected + 1;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = selected === 0 ? last : selected - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }
    e.preventDefault();
    setSelected(next);
    refs.current[next]?.focus();
  }

  return (
    <section id="perspective" className="page-x bg-panel py-28 text-[#f5f3ed]">
      <div className="mx-auto max-w-page">
        <p className="eyebrow">Two perspectives</p>
        <h2 className="m-0 mb-6 max-w-[900px] font-display text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em]">
          How I Think About Products
        </h2>
        <p className="m-0 mb-14 max-w-[640px] text-xl leading-relaxed text-[#d3d6cc]">
          I look at products from two perspectives: how they feel to use and how well they work.
        </p>

        <div className="tabs" role="tablist" aria-label="Product perspective" onKeyDown={onKeyDown}>
          {tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={selected === i}
              aria-controls={`panel-${t.id}`}
              tabIndex={selected === i ? 0 : -1}
              className="tabbtn"
              onClick={() => setSelected(i)}
            >
              <Icon size={28}>{t.icon}</Icon>
              <span>
                <span className="block font-display text-2xl font-semibold">{t.label}</span>
                <span className="tsub mt-1 block text-[15px]">{t.sub}</span>
              </span>
            </button>
          ))}
        </div>

        {tabs.map((t, i) => (
          <div
            key={t.id}
            className="tpanel"
            role="tabpanel"
            id={`panel-${t.id}`}
            aria-labelledby={`tab-${t.id}`}
            hidden={selected !== i}
          >
            <div className="ticon">
              <Icon size={28}>{t.icon}</Icon>
            </div>
            <div className="min-w-0 flex-[1_1_320px]">
              <p className="m-0 mb-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-brand">{t.label}</p>
              <h3 className="m-0 mb-5 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.01em]">
                {t.heading}
              </h3>
              <p className="m-0 max-w-[640px] text-lg leading-[1.7] text-[#d3d6cc] sm:text-xl sm:leading-[1.7]">{t.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
