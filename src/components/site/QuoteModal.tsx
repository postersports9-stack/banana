'use client'

import { useEffect, useState } from "react";
import { translations, type Lang } from "@/lib/translations";

// Shared quote-request modal, lifted out of SiteHome so every page (home +
// service pages) renders the exact same dialog. `useQuoteModalState` owns the
// open/close state plus the Escape-to-close and body-scroll-lock behaviour, so
// each page just calls the hook and wires `openModal` to its CTAs.
export function useQuoteModalState() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);
  return {
    open,
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
  };
}

export default function QuoteModal({
  open,
  onClose,
  lang,
}: {
  open: boolean;
  onClose: () => void;
  lang: Lang;
}) {
  const t = translations[lang];
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Reset back to a blank form each time the modal is reopened.
  useEffect(() => {
    if (!open) setStatus("idle");
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      company: fd.get("company"),
      activity: fd.get("activity"),
      phone: fd.get("phone"),
      website: fd.get("website"), // honeypot
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-title"
    >
      {/* Backdrop — click to close */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-[#111] border border-white/15 rounded-2xl p-6 md:p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label={t.modal.close}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-lg text-white/60 hover:bg-banana hover:text-black transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <span className="inline-block bg-banana text-black rounded-md px-3 py-1 font-label-bold text-label-bold uppercase tracking-widest mb-4">
          {t.modal.badge}
        </span>
        <h2 id="quote-title" className="font-headline-lg text-2xl font-semibold text-white tracking-tight mb-2">
          {t.modal.title}
        </h2>
        <p className="font-body-md text-sm text-white/60 mb-6">
          {t.modal.subtitle}
        </p>
        {status === "sent" ? (
          <p className="font-body-md text-sm text-banana py-6 text-center">
            {t.modal.success}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Honeypot — hidden from users, catches bots. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="q-name" className="font-label-bold text-xs text-white/70 uppercase tracking-wider">{t.modal.nameLabel}</label>
              <input id="q-name" name="name" type="text" required placeholder={t.modal.namePlaceholder} className="w-full bg-black border border-white/15 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:border-banana focus:outline-none transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="q-company" className="font-label-bold text-xs text-white/70 uppercase tracking-wider">{t.modal.companyLabel}</label>
              <input id="q-company" name="company" type="text" required placeholder={t.modal.companyPlaceholder} className="w-full bg-black border border-white/15 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:border-banana focus:outline-none transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="q-activity" className="font-label-bold text-xs text-white/70 uppercase tracking-wider">{t.modal.activityLabel}</label>
              <input id="q-activity" name="activity" type="text" required placeholder={t.modal.activityPlaceholder} className="w-full bg-black border border-white/15 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:border-banana focus:outline-none transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="q-phone" className="font-label-bold text-xs text-white/70 uppercase tracking-wider">{t.modal.phoneLabel}</label>
              <input id="q-phone" name="phone" type="tel" required placeholder={t.modal.phonePlaceholder} className="w-full bg-black border border-white/15 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:border-banana focus:outline-none transition-colors" />
            </div>
            {status === "error" && (
              <p className="font-body-md text-sm text-red-400">{t.modal.error}</p>
            )}
            <button type="submit" disabled={status === "sending"} className="mt-2 inline-flex items-center justify-center rounded-lg bg-banana text-black font-label-bold text-label-bold uppercase tracking-tighter px-6 py-3 border-2 border-banana hover:bg-white hover:text-black hover:border-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
              {status === "sending" ? t.modal.sending : t.modal.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
