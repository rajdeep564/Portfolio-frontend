"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const FIELD_CLASS =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const BUTTON_LABELS = {
  idle: "Send message",
  sending: "Sending...",
  success: "Sent!",
  error: "Try again",
};

type Status = keyof typeof BUTTON_LABELS;

function ButtonIcon({ status }: { status: Status }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return status === "success" ? <Check className="size-4" /> : <Send className="size-4" />;
  }

  return (
    <span className="relative size-4" aria-hidden>
      <AnimatePresence initial={false}>
        {status === "success" ? (
          <motion.span
            key="sent"
            className="absolute inset-0"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 18 }}
          >
            <Check className="size-4" />
          </motion.span>
        ) : status === "sending" ? (
          <motion.span
            key="flying"
            className="absolute inset-0"
            initial={{ x: 0, y: 0 }}
            animate={{ x: [0, 22, -18, 0], y: [0, -22, 18, 0], opacity: [1, 0, 0, 1] }}
            exit={{ x: 26, y: -26, opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut", repeat: Infinity }}
          >
            <Send className="size-4" />
          </motion.span>
        ) : (
          <motion.span
            key="ready"
            className="absolute inset-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            initial={{ x: -18, y: 18, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ x: 26, y: -26, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Send className="size-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    // Without a key, hand the message to the visitor's own mail app.
    if (!accessKey) {
      const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n${data.get("email")}`);
      window.location.href = `mailto:${DATA.contact.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(data),
          access_key: accessKey,
          subject: `Portfolio message from ${data.get("name")}`,
          from_name: "Portfolio contact form",
        }),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    }
  }

  return (
    <div className="border rounded-xl bg-background p-6 sm:p-10 flex flex-col gap-6 shadow-lg">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Get in Touch
        </h2>
        <p className="text-sm text-muted-foreground text-pretty">
          Open to full stack and GenAI engineering roles. Send a message below
          or email{" "}
          <a
            href={`mailto:${DATA.contact.email}`}
            className="text-primary underline underline-offset-4"
          >
            {DATA.contact.email}
          </a>
          .
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        onChange={() => setStatus((current) => (current === "sending" ? current : "idle"))}
        className="flex flex-col gap-4"
      >
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Name
            <input
              required
              name="name"
              autoComplete="name"
              maxLength={100}
              className={FIELD_CLASS}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Email
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              className={FIELD_CLASS}
            />
          </label>
        </div>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Message
          <textarea
            required
            name="message"
            rows={5}
            maxLength={5000}
            className={FIELD_CLASS}
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="submit"
            disabled={status === "sending"}
            className="group cursor-pointer gap-2 overflow-hidden disabled:opacity-100"
          >
            <ButtonIcon status={status} />
            {BUTTON_LABELS[status]}
          </Button>
          <p role="status" className="text-sm text-muted-foreground">
            {status === "success" &&
              "Thank you, I will get back to you as soon as possible."}
            {status === "error" &&
              "Something went wrong. Please email me directly instead."}
          </p>
        </div>
      </form>
    </div>
  );
}
