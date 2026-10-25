"use client";

import { useState } from "react";

type State = "idle" | "sending" | "sent" | "offline" | "error";

export default function AdCheckForm() {
  const [state, setState] = useState<State>("idle");
  const [emailError, setEmailError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const website = String(form.get("website") || "").trim();
    const email = String(form.get("email") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Add a full email address, like you@yourbrand.com.");
      return;
    }
    setEmailError("");
    setState("sending");
    try {
      const res = await fetch("/api/ad-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website, email }),
      });
      if (res.ok) setState("sent");
      else if (res.status === 503) setState("offline");
      else setState("error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-md border border-gaffer p-8" role="status">
        <p className="slate text-gaffer">Request received</p>
        <p className="mt-4 text-[28px] font-extrabold leading-tight tracking-[-0.02em]">We're pulling your ads now.</p>
        <p className="mt-3 text-[16px] leading-[1.55] text-muted">You'll get your Free Ad Check by email from hello@creativedirectionhub.com.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <div className="grid gap-2">
        <label htmlFor="website" className="slate text-muted">Brand website</label>
        <input id="website" name="website" type="url" required placeholder="yourbrand.com" autoComplete="url"
          className="min-h-[52px] rounded-sm border border-line bg-surface px-4 text-[16px] text-ink placeholder:text-muted focus-visible:border-gaffer" />
        <span className="text-[14px] text-muted">We'll pull your three most recent ads.</span>
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="slate text-muted">Email</label>
        <input id="email" name="email" type="email" required placeholder="you@yourbrand.com" autoComplete="email"
          aria-invalid={emailError ? true : undefined} aria-describedby={emailError ? "email-error" : undefined}
          className={`min-h-[52px] rounded-sm border bg-surface px-4 text-[16px] text-ink placeholder:text-muted focus-visible:border-gaffer ${emailError ? "border-kill" : "border-line"}`} />
        {emailError && <span id="email-error" className="text-[14px] text-kill">{emailError}</span>}
      </div>
      <button type="submit" disabled={state === "sending"} className="btn-primary w-full disabled:opacity-70 sm:w-auto sm:justify-self-start">
        {state === "sending" ? "Sending" : "Get my Free Ad Check"}
      </button>
      {state === "offline" && (
        <p className="text-[15px] leading-[1.55] text-muted" role="status">
          The form isn't connected yet. Email your website to <span className="select-all text-ink">hello@creativedirectionhub.com</span> and we'll send your Ad Check.
        </p>
      )}
      {state === "error" && (
        <p className="text-[15px] leading-[1.55] text-kill" role="alert">
          That didn't go through. Try again, or email <span className="select-all">hello@creativedirectionhub.com</span>.
        </p>
      )}
    </form>
  );
}
