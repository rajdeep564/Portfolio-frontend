"use client";

import { useEffect } from "react";

const ASLEEP_ICON = "/mochi-asleep.png";
const ASLEEP_TITLE = "Mochi misses you 💤";

// Mochi falls asleep in the tab while the visitor is away.
export default function TabNap() {
  useEffect(() => {
    let awakeTitle = document.title;
    let awakeIcons = new Map<HTMLLinkElement, string>();

    function onVisibilityChange() {
      const icons = Array.from(document.querySelectorAll<HTMLLinkElement>("link[rel~='icon']"));
      if (document.hidden) {
        awakeTitle = document.title;
        awakeIcons = new Map(icons.map((icon) => [icon, icon.href]));
        icons.forEach((icon) => (icon.href = ASLEEP_ICON));
        document.title = ASLEEP_TITLE;
        return;
      }
      awakeIcons.forEach((href, icon) => (icon.href = href));
      document.title = awakeTitle;
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return null;
}
