import { NextResponse } from "next/server";

// Quote-request handler for the contact modal (QuoteModal.tsx).
// POSTs a submission, emails it via Resend's REST API (no SDK dependency).
// Not cached: POST handlers never are, and we never want a stale response here.

type Payload = {
  name?: unknown;
  company?: unknown;
  activity?: unknown;
  phone?: unknown;
  // Honeypot: real users leave this empty; bots tend to fill every field.
  website?: unknown;
};

function clean(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot tripped — pretend success so bots don't learn anything.
  if (clean(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name);
  const company = clean(body.company);
  const activity = clean(body.activity);
  const phone = clean(body.phone);

  if (!name || !company || !activity || !phone) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  if (!apiKey || !to) {
    console.error("Contact form misconfigured: RESEND_API_KEY or CONTACT_TO_EMAIL missing.");
    return NextResponse.json({ error: "Email service unavailable." }, { status: 500 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Company", company],
    ["Industry", activity],
    ["Phone", phone],
  ];
  const html = `
    <h2>New quote request</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="font-weight:bold">${k}</td><td>${escapeHtml(v)}</td></tr>`
        )
        .join("")}
    </table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Banana Studio <${from}>`,
      to: [to],
      subject: `New quote request — ${name}${company ? ` (${company})` : ""}`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend send failed:", res.status, detail);
    return NextResponse.json({ error: "Could not send your request." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
