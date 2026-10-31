"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

// Three.js is large, so it loads separately from the rest of the page.
const BackgroundCubesGrid = dynamic(
  () => import("@/components/ui/background-cubes-grid").then((mod) => mod.BackgroundCubesGrid),
  { ssr: false }
);

const GLOW_COLOR = "#0f9488";
const DARK_FACES = { topColor: "#111111", leftColor: "#1c1c1c", rightColor: "#262626" };
const LIGHT_FACES = { topColor: "#ffffff", leftColor: "#f0f0f0", rightColor: "#e5e5e5" };

export default function ContactCubes() {
  const { resolvedTheme } = useTheme();
  // The theme is only known in the browser, so skip this during hydration.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  if (!mounted) return null;

  return (
    <div className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 [mask-image:linear-gradient(to_bottom,transparent,black_30%)]">
      <BackgroundCubesGrid
        {...(resolvedTheme === "dark" ? DARK_FACES : LIGHT_FACES)}
        glowColor={GLOW_COLOR}
      />
    </div>
  );
}
