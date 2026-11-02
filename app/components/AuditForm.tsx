"use client";

import { useState } from "react";
import { trackLead } from "./Pixels";
import { site } from "../content/services";

type State = "idle" | "sending" | "sent" | "offline" | "error";

const LANES = ["Consumer brand", "Personal brand", "Hospitality", "Other"];
const NEEDS = ["Brand", "Campaigns and ads", "Content", "Website", "AI art direction", "Not sure"];
const BUDGETS = ["$5k to $15k", "$15k to $35k", "$35k to $75k", "$75k+", "Not sure yet"];
const TIMELINES = ["ASAP", "Within 1 month", "1 to 3 months", "3+ months"];

const field = "min-h-[52px] w-full rounded-sm border bg-surface px-4 text-[16px] text-ink placeholder:text-muted focus-visible:border-gaffer";

// kind="project" is the Start a project form: same intake, plus budget and timeline.
export default function AuditForm({ kind = "audit" }: { kind?: "audit" | "project" }) {
  const project = kind === "project";
  const id = (x: string) => (project ? `p-${x}` : x);
  const [state, setState] = useState<State>("idle");
  const [emailError, setEmailError] = useState("");
  const [siteError, setSiteError] = useState("");
  const [notes, setNotes] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(Array.from(form.entries()).map(([k, v]) => [k, String(v).trim()]));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "")) {
      setEmailError("Add a full email address, like you@yourbrand.com.");
      document.getElementById(id("email"))?.focus();
      return;
    }
    setEmailError("");
    if ((data.website || "").length < 3) {
      setSiteError("Add your website or Instagram so there's something to audit.");
      document.getElementById(id("website"))?.focus();
      return;
    }
    setSiteError("");
    setState("sending");
    try {
      const res = await fetch("/api/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) {
        trackLead();
        setState("sent");
      } else if (res.status === 503 || res.status === 429) setState("offline");
      else setState("error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-md border border-gaffer p-8" role="status">
        <p className="slate text-gaffer">{project ? "Project received" : "Request received"}</p>
        <p className="mt-4 text-[28px] font-extrabold leading-tight tracking-[-0.02em]">{project ? "Got it. We'll reply to set up a 30-minute call." : "Got it. Willie will send your audit within 3 business days."}</p>
        <p className="mt-3 text-[16px] leading-[1.55] text-muted">It comes from {site.email}. Reply to it with anything you want looked at first.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      {project && <input type="hidden" name="kind" value="project" />}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("company")}>Company</label>
        <input id={id("company")} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={id("name")} className="slate text-muted">Name</label>
          <input id={id("name")} name="name" type="text" placeholder="Your name" autoComplete="name" className={`${field} border-line`} />
        </div>
        <div className="grid gap-2">
          <label htmlFor={id("email")} className="slate text-muted">Email</label>
          <input id={id("email")} name="email" type="email" required placeholder="you@yourbrand.com" autoComplete="email"
            aria-invalid={emailError ? true : undefined} aria-describedby={emailError ? id("email-error") : undefined}
            className={`${field} ${emailError ? "border-kill" : "border-line"}`} />
          {emailError && <span id={id("email-error")} className="text-[14px] text-kill">{emailError}</span>}
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor={id("website")} className="slate text-muted">Business website or Instagram</label>
        <input id={id("website")} name="website" type="text" required placeholder="yourbrand.com or @yourbrand" autoComplete="url"
          aria-invalid={siteError ? true : undefined} aria-describedby={siteError ? id("website-error") : undefined}
          className={`${field} ${siteError ? "border-kill" : "border-line"}`} />
        {siteError && <span id={id("website-error")} className="text-[14px] text-kill">{siteError}</span>}
        <span className="text-[14px] text-muted">{project ? "So we can see where the brand is today." : "We'll review the brand, the site and your last three pieces."} Your details stay with us (<a href="/privacy" className="underline hover:text-gaffer">privacy</a>).</span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={id("lane")} className="slate text-muted">You are a</label>
          <select id={id("lane")} name="lane" defaultValue="" className={`${field} border-line`}>
            <option value="" disabled>Pick one</option>
            {LANES.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor={id("need")} className="slate text-muted">You need most</label>
          <select id={id("need")} name="need" defaultValue="" className={`${field} border-line`}>
            <option value="" disabled>Pick one</option>
            {NEEDS.map((n) => <option key={n}>{n}</option>)}
          </select>
        </div>
      </div>
      {project && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor={id("budget")} className="slate text-muted">Budget</label>
            <select id={id("budget")} name="budget" defaultValue="" className={`${field} border-line`}>
              <option value="" disabled>Pick a range</option>
              {BUDGETS.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor={id("timeline")} className="slate text-muted">Timeline</label>
            <select id={id("timeline")} name="timeline" defaultValue="" className={`${field} border-line`}>
              <option value="" disabled>Pick one</option>
              {TIMELINES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
      )}
      <div className="grid gap-2">
        <label htmlFor={id("notes")} className="slate text-muted">Anything else <span className="normal-case tracking-normal">(optional)</span></label>
        <textarea id={id("notes")} name="notes" rows={3} maxLength={500} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={project ? "What you're launching, what has to be true when it's done, and any dates that can't move." : "A launch date, a problem, a link to the ad that isn't working."} className={`${field} border-line py-3`} />
        <span className="text-[13px] text-muted">{500 - notes.length} characters left</span>
      </div>
      <button type="submit" disabled={state === "sending"} className="btn-primary w-full disabled:opacity-70 sm:w-auto sm:justify-self-start">
        {state === "sending" ? "Sending" : project ? "Send project details" : "Get my Free Creative Audit"}
      </button>
      {state === "offline" && (
        <p className="text-[15px] leading-[1.55] text-muted" role="status">
          The form isn't connected yet. Email your website to <span className="select-all text-ink">{site.email}</span> and we'll send your audit.
        </p>
      )}
      {state === "error" && (
        <p className="text-[15px] leading-[1.55] text-kill" role="alert">
          That didn't go through. Try again, or email <span className="select-all">{site.email}</span>.
        </p>
      )}
    </form>
  );
}
