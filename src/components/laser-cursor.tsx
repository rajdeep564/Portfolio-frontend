"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], label, summary, select";
const TYPING = "input, textarea, [contenteditable='true']";

// A laser dot for Mochi to chase. Mouse and pen only; touch keeps the system behaviour.
export default function LaserCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!dot || !finePointer.matches || reducedMotion.matches) return;

    const root = document.documentElement;
    let x = 0;
    let y = 0;
    let frameId = 0;

    function draw() {
      frameId = 0;
      dot!.style.transform = `translate(${x}px, ${y}px)`;
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      x = event.clientX;
      y = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      dot!.dataset.state = target?.closest(TYPING)
        ? "hidden"
        : target?.closest(INTERACTIVE)
          ? "hover"
          : "idle";
      if (!frameId) frameId = window.requestAnimationFrame(draw);
    }

    function onPointerDown() {
      dot!.dataset.pressed = "true";
    }

    function onPointerUp() {
      delete dot!.dataset.pressed;
    }

    function onLeave() {
      dot!.dataset.state = "hidden";
    }

    root.classList.add("laser-cursor");
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      root.classList.remove("laser-cursor");
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return <div ref={dotRef} className="laser-dot" data-state="hidden" aria-hidden />;
}
