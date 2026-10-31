"use client";

import { useSyncExternalStore } from "react";
import { SITE } from "@/config/site";

const timeFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: SITE.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});
const dateFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: SITE.timeZone,
  weekday: "long",
  day: "numeric",
  month: "long",
});

let now: number | null = null;

function subscribe(onChange: () => void) {
  now = Date.now();
  onChange();
  const id = setInterval(() => {
    now = Date.now();
    onChange();
  }, 1000);
  return () => clearInterval(id);
}
const getSnapshot = () => now;
const getServerSnapshot = () => null;

export function useNow() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function ClockTime() {
  const t = useNow();
  return (
    <time
      role="timer"
      aria-live="off"
      dateTime={t ? new Date(t).toISOString() : undefined}
      className="block font-display font-semibold leading-none tracking-[-0.02em] text-[clamp(2.5rem,7vw,5.5rem)] [font-variant-numeric:tabular-nums]"
    >
      {t ? timeFmt.format(t) : "––:––:––"}
    </time>
  );
}

export function ClockDate() {
  const t = useNow();
  return <p className="m-0 min-h-[1.7em] text-[#b5b9ae]">{t ? dateFmt.format(t) : ""}</p>;
}
