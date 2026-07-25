"use client";

import { ArrowUpRight, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/content";

type FormStatus = "idle" | "ready";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setStatus("ready");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Your name</span>
        <input name="name" autoComplete="name" placeholder="What should I call you?" required />
      </label>
      <label>
        <span>Email address</span>
        <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
      </label>
      <label>
        <span>Tell me a little about it</span>
        <textarea name="message" rows={4} placeholder="A project, role, idea..." required />
      </label>
      <button className="button button-primary form-submit" type="submit">
        <span>{status === "ready" ? "Opening your email app" : "Send message"}</span>
        {status === "ready" ? <ArrowUpRight size={17} /> : <Send size={16} />}
      </button>
      <p className="form-note">This opens your preferred email app — no form data is stored.</p>
    </form>
  );
}
