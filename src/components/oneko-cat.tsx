"use client";

// Movement and sprites adapted from oneko.js (https://github.com/adryd325/oneko.js),
// MIT License, Copyright (c) 2022 adryd. Pet interactions are specific to this site.
import { useEffect, useRef, useState } from "react";
import { Cat, EyeOff, Fish, Hand, Heart, PawPrint, Volleyball } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";

const PET_NAME = "Mochi";
const OWNER_NAME = DATA.name.split(" ")[0];
const STORAGE_KEY = "mochi-pet";
const MODE_STORAGE_KEY = "mochi-mode";

const WALK_SPEED = 10;
const RUN_SPEED = 16;
const FRAME_MS = 100;
const POINTER_IDLE_MS = 6000;
const WANDER_REST_FRAMES = 30;
const PHOTO_COOLDOWN_MS = 30000;
const THOUGHT_INTERVAL_MS = 40000;
const PLAY_TIMEOUT_MS = 12000;
const PLAY_THROWS = 4;

const SPRITES: Record<string, [number, number][]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]],
  E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]],
  SW: [[-5, -3], [-6, -1]],
  W: [[-4, -2], [-4, -3]],
  NW: [[-1, 0], [-1, -1]],
};

const SHY_THOUGHTS = ["Psst... touch me!", "Hello? Click me!", "Over here! I'm friendly."];
const THOUGHTS = ["I'm hungry...", "Pet me?", "Throw my ball!", "Don't forget me!"];
const PET_LINES = ["Prrrrr...", "More, please!", "Right behind the ear!"];
const FEED_LINES = ["Yum! Thank you!", "Delicious!", "Best fish ever!"];
const PHOTO_LINES = [
  `I love ${OWNER_NAME}!`,
  `${OWNER_NAME} is my human.`,
  `Hire ${OWNER_NAME}! My human needs cat food.`,
];

type Action = "pet" | "feed" | "play" | "toggleSit" | "hide" | "show";
type Actions = Record<Action, () => void>;
type PetMode = "active" | "sitting" | "hidden";
type SavedMode = { mode: PetMode; x: number; y: number };
type Item = { kind: "fish" | "ball"; x: number; y: number };
type FloatingHeart = { id: number; x: number; y: number; delay: number };

function pick(lines: string[]) {
  return lines[Math.floor(Math.random() * lines.length)];
}

function loveLevel(love: number) {
  if (love < 5) return "Curious about you";
  if (love < 15) return "Likes you";
  if (love < 30) return "Loves you";
  return "Best friends";
}

function readLove() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === null ? null : Number(stored) || 0;
  } catch {
    return null;
  }
}

function saveLove(love: number) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(love));
  } catch {
    // Storage can be blocked; the pet still works for this visit.
  }
}

function readMode(): SavedMode | null {
  try {
    const stored = window.localStorage.getItem(MODE_STORAGE_KEY);
    return stored === null ? null : (JSON.parse(stored) as SavedMode);
  } catch {
    return null;
  }
}

function saveMode(saved: SavedMode) {
  try {
    window.localStorage.setItem(MODE_STORAGE_KEY, JSON.stringify(saved));
  } catch {
    // Storage can be blocked; the choice then lasts for this visit only.
  }
}

function isPetElement(target: EventTarget | null) {
  return target instanceof Element && target.closest("[data-pet]") !== null;
}

export default function OnekoCat() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<Actions | null>(null);
  const toggleMenuRef = useRef<(() => void) | null>(null);

  const [speech, setSpeech] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [petMode, setPetMode] = useState<PetMode>("active");
  const [inviting, setInviting] = useState(false);
  const [love, setLove] = useState(0);
  const [item, setItem] = useState<Item | null>(null);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const button = buttonRef.current;
    const sprite = spriteRef.current;
    const panel = panelRef.current;
    if (
      !button ||
      !sprite ||
      !panel ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const storedLove = readLove();
    const savedMode = readMode();
    let currentLove = storedLove ?? 0;
    let currentMode: PetMode = savedMode?.mode ?? "active";
    let x = Math.min(Math.max(32, savedMode?.x ?? 32), window.innerWidth - 32);
    let y = Math.min(Math.max(32, savedMode?.y ?? 32), window.innerHeight - 32);
    let targetX = x;
    let targetY = y;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: "sleeping" | "scratchSelf" | null = null;
    let idleAnimationFrame = 0;
    let lastPointerAt = -Infinity;
    let lastPointerType = "mouse";
    let lastFrameAt = 0;
    let lastPhotoAt = performance.now();
    let nextThoughtAt = performance.now() + THOUGHT_INTERVAL_MS;
    let animationId = 0;
    let heartId = 0;
    let isMenuOpen = false;
    let isInviting = false;
    let touched = storedLove !== null;
    let goal: { x: number; y: number; onArrive: (now: number) => void } | null = null;
    let pose: { name: string; until: number } | null = null;
    let throwsLeft = 0;
    let playDeadline = 0;
    let speechTimer: number | undefined;

    function applyMode(mode: PetMode) {
      currentMode = mode;
      setPetMode(mode);
      saveMode({ mode, x, y });
      button!.style.display = mode === "hidden" ? "none" : "grid";
    }

    function say(text: string, duration = 3500) {
      window.clearTimeout(speechTimer);
      setSpeech(text);
      speechTimer = window.setTimeout(() => setSpeech(""), duration);
    }

    function addLove(amount: number) {
      currentLove += amount;
      setLove(currentLove);
      saveLove(currentLove);
    }

    function spawnHearts(count: number, heartX = x, heartY = y) {
      const created = Array.from({ length: count }, (_, index) => ({
        id: heartId++,
        x: heartX + (Math.random() - 0.5) * 48,
        y: heartY - 16 - Math.random() * 16,
        delay: index * 90,
      }));
      setHearts((current) => [...current, ...created]);
    }

    function clampX(value: number) {
      return Math.min(Math.max(32, value), window.innerWidth - 32);
    }

    function clampY(value: number) {
      return Math.min(Math.max(32, value), window.innerHeight - 32);
    }

    function setSprite(name: string, frame: number) {
      const sprites = SPRITES[name];
      const [spriteX, spriteY] = sprites[frame % sprites.length];
      sprite!.style.backgroundPosition = `${spriteX * 32}px ${spriteY * 32}px`;
    }

    function placePet() {
      button!.style.transform = `translate(${x - 22}px, ${y - 22}px)`;
    }

    function placePanel() {
      const width = panel!.offsetWidth;
      const height = panel!.offsetHeight;
      if (!height) return;
      const left = Math.min(Math.max(8, x - width / 2), window.innerWidth - width - 8);
      const top = y - height - 30 >= 8 ? y - height - 30 : y + 30;
      panel!.style.transform = `translate(${left}px, ${top}px)`;
    }

    function stopInviting() {
      isInviting = false;
      setInviting(false);
    }

    function closeMenu() {
      isMenuOpen = false;
      setMenuOpen(false);
    }

    function endPlay() {
      throwsLeft = 0;
      goal = null;
      setItem(null);
    }

    function throwBall(ballX: number, ballY: number) {
      setItem({ kind: "ball", x: ballX, y: ballY });
      playDeadline = performance.now() + PLAY_TIMEOUT_MS;
      goal = {
        x: ballX,
        y: ballY,
        onArrive: (now) => {
          throwsLeft -= 1;
          playDeadline = now + PLAY_TIMEOUT_MS;
          if (throwsLeft > 0) {
            say("Got it! Throw again!");
            return;
          }
          endPlay();
          pose = { name: "scratchSelf", until: now + 1500 };
          addLove(3);
          spawnHearts(5);
          say("That was so fun!");
        },
      };
    }

    function visitPhoto(now: number) {
      const photo = document.querySelector("#hero img");
      if (!photo) return false;
      const rect = photo.getBoundingClientRect();
      if (rect.top < 0 || rect.bottom + 40 > window.innerHeight) return false;
      lastPhotoAt = now;
      goal = {
        x: rect.left + rect.width / 2,
        y: rect.bottom + 20,
        onArrive: (arrivedAt) => {
          pose = { name: "sleeping", until: arrivedAt + 4000 };
          spawnHearts(4, rect.left + rect.width / 2, rect.top + rect.height / 2);
          spawnHearts(3);
          say(pick(PHOTO_LINES), 4000);
        },
      };
      return true;
    }

    actionsRef.current = {
      pet() {
        closeMenu();
        pose = { name: "sleeping", until: performance.now() + 2000 };
        addLove(1);
        spawnHearts(4);
        say(pick(PET_LINES));
      },
      feed() {
        closeMenu();
        const side = x > window.innerWidth / 2 ? -1 : 1;
        const fishX = clampX(x + side * 140);
        const fishY = clampY(y);
        setItem({ kind: "fish", x: fishX, y: fishY });
        say("Is that for me?!");
        goal = {
          x: fishX,
          y: fishY,
          onArrive: (now) => {
            setItem(null);
            pose = { name: "scratchSelf", until: now + 1500 };
            addLove(2);
            spawnHearts(5);
            say(pick(FEED_LINES));
          },
        };
      },
      play() {
        closeMenu();
        throwsLeft = PLAY_THROWS;
        playDeadline = performance.now() + PLAY_TIMEOUT_MS;
        setItem({ kind: "ball", x: clampX(x + 56), y: clampY(y) });
        say("Click anywhere to throw my ball!", 5000);
      },
      toggleSit() {
        closeMenu();
        if (currentMode === "sitting") {
          targetX = x;
          targetY = y;
          applyMode("active");
          say("Yay, I'm free!");
        } else {
          applyMode("sitting");
          say("Okay, I'll stay right here.");
        }
      },
      hide() {
        closeMenu();
        endPlay();
        stopInviting();
        pose = null;
        window.clearTimeout(speechTimer);
        setSpeech("");
        applyMode("hidden");
      },
      show() {
        targetX = x;
        targetY = y;
        applyMode("active");
        say("I'm back! Did you miss me?");
      },
    };

    toggleMenuRef.current = () => {
      if (isMenuOpen) {
        closeMenu();
        return;
      }
      endPlay();
      setItem(null);
      pose = null;
      stopInviting();
      isMenuOpen = true;
      setMenuOpen(true);
      if (!touched) {
        touched = true;
        addLove(1);
        spawnHearts(3);
        say(`You found me! I'm ${PET_NAME}.`, 6000);
      } else {
        setLove(currentLove);
      }
    };

    function idle() {
      idleTime += 1;
      if (idleTime > 10 && idleAnimation === null && Math.random() < 0.01) {
        idleAnimation = Math.random() < 0.5 ? "sleeping" : "scratchSelf";
      }

      if (idleAnimation === "sleeping") {
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
        } else {
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        }
        if (idleAnimationFrame > 192) idleAnimation = null;
      } else if (idleAnimation === "scratchSelf") {
        setSprite("scratchSelf", idleAnimationFrame);
        if (idleAnimationFrame > 9) idleAnimation = null;
      } else {
        idleAnimationFrame = 0;
        setSprite("idle", 0);
        return;
      }
      idleAnimationFrame += 1;
    }

    function frame(now: number) {
      frameCount += 1;
      if (currentMode === "hidden") return;
      if (isMenuOpen) {
        setSprite("idle", 0);
        return;
      }
      if (pose) {
        if (now < pose.until) {
          const step = pose.name === "sleeping" ? Math.floor(frameCount / 4) : frameCount;
          setSprite(pose.name, step);
          return;
        }
        pose = null;
        if (isInviting) stopInviting();
      }

      const playing = throwsLeft > 0;
      if (playing && now > playDeadline) {
        endPlay();
        say("Maybe later then...");
      }
      if (currentMode === "sitting" && !goal && throwsLeft === 0) {
        idle();
        return;
      }
      if (!goal && !playing && now > nextThoughtAt) {
        nextThoughtAt = now + THOUGHT_INTERVAL_MS;
        say(pick(touched ? THOUGHTS : SHY_THOUGHTS));
      }

      const pointerActive = now - lastPointerAt < POINTER_IDLE_MS;
      if (goal) {
        targetX = goal.x;
        targetY = goal.y;
      } else if (
        !pointerActive &&
        !playing &&
        idleAnimation === null &&
        idleTime > WANDER_REST_FRAMES
      ) {
        const wantsPhoto =
          now - lastPhotoAt > PHOTO_COOLDOWN_MS && Math.random() < 0.25;
        if (!wantsPhoto || !visitPhoto(now)) {
          targetX = 16 + Math.random() * (window.innerWidth - 32);
          targetY = 16 + Math.random() * (window.innerHeight - 32);
        }
      }

      const diffX = x - targetX;
      const diffY = y - targetY;
      const distance = Math.hypot(diffX, diffY);
      if (distance < (goal ? 14 : 48)) {
        if (goal) {
          const { onArrive } = goal;
          goal = null;
          idleTime = 0;
          onArrive(now);
        } else {
          idle();
        }
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7) - 1;
        return;
      }

      let direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction, frameCount);

      const speed = Math.min(distance, goal ? RUN_SPEED : WALK_SPEED);
      x = Math.min(Math.max(16, x - (diffX / distance) * speed), window.innerWidth - 16);
      y = Math.min(Math.max(16, y - (diffY / distance) * speed), window.innerHeight - 16);
      placePet();
    }

    function onAnimationFrame(now: number) {
      if (now - lastFrameAt > FRAME_MS) {
        lastFrameAt = now;
        frame(now);
      }
      placePanel();
      animationId = window.requestAnimationFrame(onAnimationFrame);
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      followPointer(event);
    }

    function followPointer({ clientX, clientY }: MouseEvent) {
      if (throwsLeft > 0 || isMenuOpen || currentMode !== "active") return;
      targetX = clientX;
      targetY = clientY;
      lastPointerAt = performance.now();
    }

    function onPress(event: MouseEvent) {
      if (isMenuOpen) closeMenu();
      if (throwsLeft > 0) {
        throwBall(event.clientX, event.clientY);
        return;
      }
      followPointer(event);
    }

    function onPointerDown(event: PointerEvent) {
      lastPointerType = event.pointerType;
      // A touch may be the start of a scroll, so wait for its click.
      if (event.pointerType !== "touch" && !isPetElement(event.target)) onPress(event);
    }

    // A throw should not also follow a link under the pointer.
    function onClickCapture(event: MouseEvent) {
      if (isPetElement(event.target)) return;
      const playing = throwsLeft > 0;
      if (lastPointerType === "touch") onPress(event);
      if (playing) {
        event.preventDefault();
        event.stopPropagation();
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isMenuOpen) closeMenu();
    }

    function onPageHide() {
      saveMode({ mode: currentMode, x, y });
    }

    const introTimer = window.setTimeout(() => {
      if (currentMode !== "active") return;
      if (touched) {
        say("You're back! I missed you.");
        return;
      }
      say("Psst... hey!", 3000);
      goal = {
        x: clampX(lastPointerAt > 0 ? targetX : window.innerWidth / 2),
        y: clampY(lastPointerAt > 0 ? targetY + 56 : window.innerHeight / 2),
        onArrive: (now) => {
          isInviting = true;
          setInviting(true);
          pose = { name: "idle", until: now + 12000 };
          nextThoughtAt = now + THOUGHT_INTERVAL_MS;
          say("Hey you! Touch me, I won't bite.", 12000);
        },
      };
    }, 2500);

    applyMode(currentMode);
    placePet();
    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("click", onClickCapture, true);
    document.addEventListener("keydown", onKeyDown);
    animationId = window.requestAnimationFrame(onAnimationFrame);

    return () => {
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("click", onClickCapture, true);
      document.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(animationId);
      window.clearTimeout(introTimer);
      window.clearTimeout(speechTimer);
    };
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        data-pet
        aria-label={`${PET_NAME} the cat. Open pet menu`}
        aria-expanded={menuOpen}
        onClick={() => toggleMenuRef.current?.()}
        className="fixed left-0 top-0 z-50 hidden size-11 cursor-pointer place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {inviting && (
          <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping" />
        )}
        <div
          ref={spriteRef}
          className="size-8 [image-rendering:pixelated]"
          style={{ backgroundImage: "url(/oneko.gif)" }}
        />
      </button>

      <div
        ref={panelRef}
        data-pet
        className="fixed left-0 top-0 z-50 flex w-max max-w-56 flex-col gap-2 pointer-events-none"
      >
        <p aria-live="polite" className={speech ? "rounded-xl border bg-card px-3 py-2 text-xs font-medium text-card-foreground shadow-md" : "sr-only"}>
          {speech}
        </p>
        {menuOpen && (
          <div className="pointer-events-auto flex flex-col gap-2 rounded-xl border bg-card p-3 text-card-foreground shadow-md">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="font-semibold">{PET_NAME}</span>
              <span className="flex items-center gap-1 text-red-500">
                <Heart className="size-3 fill-current" aria-hidden />
                {love}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{loveLevel(love)}</p>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" className="cursor-pointer gap-1 px-2" onClick={() => actionsRef.current?.pet()}>
                <Hand className="size-3.5" aria-hidden />
                Pet
              </Button>
              <Button size="sm" variant="outline" className="cursor-pointer gap-1 px-2" onClick={() => actionsRef.current?.feed()}>
                <Fish className="size-3.5" aria-hidden />
                Feed
              </Button>
              <Button size="sm" variant="outline" className="cursor-pointer gap-1 px-2" onClick={() => actionsRef.current?.play()}>
                <Volleyball className="size-3.5" aria-hidden />
                Play
              </Button>
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" className="flex-1 cursor-pointer gap-1 px-2" onClick={() => actionsRef.current?.toggleSit()}>
                <PawPrint className="size-3.5" aria-hidden />
                {petMode === "sitting" ? "Let's go" : "Sit"}
              </Button>
              <Button size="sm" variant="ghost" className="flex-1 cursor-pointer gap-1 px-2" onClick={() => actionsRef.current?.hide()}>
                <EyeOff className="size-3.5" aria-hidden />
                Hide
              </Button>
            </div>
          </div>
        )}
      </div>

      {petMode === "hidden" && (
        <Button
          data-pet
          size="icon"
          variant="outline"
          aria-label={`Bring ${PET_NAME} back`}
          title={`Bring ${PET_NAME} back`}
          onClick={() => actionsRef.current?.show()}
          className="fixed bottom-20 right-4 z-40 cursor-pointer rounded-full text-primary shadow-md"
        >
          <Cat className="size-5" aria-hidden />
        </Button>
      )}

      <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {item && (
          <div
            className="absolute left-0 top-0 text-primary transition-transform duration-300"
            style={{ transform: `translate(${item.x - 12}px, ${item.y - 12}px)` }}
          >
            {item.kind === "fish" ? <Fish className="size-6" /> : <Volleyball className="size-6" />}
          </div>
        )}
        {hearts.map((heart) => (
          <Heart
            key={heart.id}
            className="pet-heart absolute size-4 fill-red-500 text-red-500"
            style={{ left: heart.x, top: heart.y, animationDelay: `${heart.delay}ms` }}
            onAnimationEnd={() =>
              setHearts((current) => current.filter(({ id }) => id !== heart.id))
            }
          />
        ))}
      </div>
    </>
  );
}
