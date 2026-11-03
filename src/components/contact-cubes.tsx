"use client";

import dynamic from "next/dynamic";
import { useInView } from "motion/react";
import { useTheme } from "next-themes";
import { useRef } from "react";

// Three.js is large, so it only loads as the visitor nears the Contact section.
const BackgroundCubesGrid = dynamic(
  () => import("@/components/ui/background-cubes-grid").then((mod) => mod.BackgroundCubesGrid),
  { ssr: false }
);

const GLOW_COLOR = "#4a8c3a";
const DARK_FACES = { topColor: "#121827", leftColor: "#1a2132", rightColor: "#222a3d" };
const LIGHT_FACES = { topColor: "#fdfefb", leftColor: "#f1f4ec", rightColor: "#e6ebdf" };

export default function ContactCubes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isNearby = useInView(containerRef, { once: true, margin: "600px" });
  const { resolvedTheme } = useTheme();

  return (
    <div
      ref={containerRef}
      className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2"
    >
      {isNearby && (
        <BackgroundCubesGrid
          {...(resolvedTheme === "dark" ? DARK_FACES : LIGHT_FACES)}
          glowColor={GLOW_COLOR}
        />
      )}
      <div className="absolute inset-x-0 top-0 h-[30%] bg-linear-to-b from-background to-transparent" />
    </div>
  );
}
