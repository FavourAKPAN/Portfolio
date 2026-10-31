"use client";

import { useEffect, useRef } from "react";

const TRAIL = 12;
const INTERACTIVE = "a, button, [role='tab'], .bubble";

/** Decorative brush cursor: purple dot + fading trail. Fine pointers only, off for reduced motion. */
export default function BrushCursor() {
  const tipRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tip = tipRef.current;
    const trailBox = trailRef.current;
    if (!tip || !trailBox || !fine.matches || reduce.matches) return;

    const dots = Array.from(trailBox.children) as HTMLElement[];
    const root = document.documentElement;
    let x = 0;
    let y = 0;
    let moved = false;
    let over = false;
    let down = false;
    let visible = false;
    let raf = 0;
    let lastShift = 0;
    let history: { x: number; y: number }[] = [];

    root.classList.add("brush-on");

    function paintTip() {
      if (!tip) return;
      const size = over ? 40 : down ? 26 : 14;
      tip.style.display = visible ? "block" : "none";
      tip.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      tip.style.width = `${size}px`;
      tip.style.height = `${size}px`;
      tip.style.background = over ? "transparent" : "#B76BFF";
      tip.style.border = over ? "2px solid #B76BFF" : "2px solid #fff";
    }

    function paintTrail() {
      const n = history.length;
      dots.forEach((dot, i) => {
        const p = history[i];
        if (!p) {
          dot.style.display = "none";
          return;
        }
        const k = (i + 1) / n;
        const size = Math.round(4 + k * 16);
        dot.style.display = "block";
        dot.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.opacity = (0.08 + k * 0.4).toFixed(2);
      });
    }

    function frame(now: number) {
      raf = 0;
      if (moved) {
        history.push({ x, y });
        if (history.length > TRAIL) history.shift();
        moved = false;
        lastShift = now;
      } else if (history.length > 0 && now - lastShift > 40) {
        history.shift();
        lastShift = now;
      }
      paintTip();
      paintTrail();
      if (visible && (moved || history.length > 0)) raf = requestAnimationFrame(frame);
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(frame);
    }

    function onMove(e: MouseEvent) {
      x = e.clientX;
      y = e.clientY;
      moved = true;
      visible = true;
      const t = e.target;
      over = t instanceof Element && !!t.closest(INTERACTIVE);
      schedule();
    }
    function onLeave() {
      visible = false;
      history = [];
      paintTip();
      paintTrail();
    }
    function onDown() {
      down = true;
      paintTip();
    }
    function onUp() {
      down = false;
      paintTip();
    }
    function disable() {
      root.classList.remove("brush-on");
      onLeave();
      cleanup();
    }
    function cleanup() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      root.removeEventListener("mouseleave", onLeave);
      reduce.removeEventListener("change", onReduce);
      if (raf) cancelAnimationFrame(raf);
    }
    function onReduce() {
      if (reduce.matches) disable();
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    root.addEventListener("mouseleave", onLeave);
    reduce.addEventListener("change", onReduce);

    return () => {
      root.classList.remove("brush-on");
      cleanup();
    };
  }, []);

  const base: React.CSSProperties = {
    position: "fixed",
    left: 0,
    top: 0,
    pointerEvents: "none",
    borderRadius: "50%",
    display: "none",
  };

  return (
    <div aria-hidden="true">
      <div ref={trailRef}>
        {Array.from({ length: TRAIL }, (_, i) => (
          <div key={i} style={{ ...base, zIndex: 9998, background: "#B76BFF" }} />
        ))}
      </div>
      <div
        ref={tipRef}
        style={{
          ...base,
          zIndex: 9999,
          boxSizing: "border-box",
          boxShadow: "0 0 0 1px #171917",
          transition: "width .15s, height .15s, background .15s",
        }}
      />
    </div>
  );
}
