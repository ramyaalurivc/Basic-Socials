import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const SHEET_ID = "1H4FDaQCtw0EinKSLeyLD7a4R3KUZPfTmRZGakpZGzt8";
const NOTIFY_EMAIL = "helloramyaaluri@gmail.com";
const GATEWAY = "https://connector-gateway.lovable.dev";

const CreatorSchema = z.object({
  name: z.string().trim().min(1).max(120),
  link: z.string().trim().url().max(400),
});

const ApplicationSchema = z.object({
  role_slug: z.string().trim().min(1).max(80),
  role_title: z.string().trim().min(1).max(120),
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(32).regex(/^[+0-9()\-\s]+$/),
  location: z.string().trim().min(2).max(120),
  experience: z.string().trim().min(1).max(80),
  notice_period: z.string().trim().min(1).max(80),
  portfolio_url: z.string().trim().url().max(400),
  linkedin_url: z.string().trim().url().max(400).optional().or(z.literal("")),
  current_company: z.string().trim().max(160).optional().or(z.literal("")),
  expected_ctc: z.string().trim().max(80).optional().or(z.literal("")),
  why_join: z.string().trim().min(20).max(3000),
  creators: z.array(CreatorSchema).length(5),
  resume_path: z.string().trim().min(1).max(500),
  resume_filename: z.string().trim().min(1).max(255),
});

type Application = z.infer<typeof ApplicationSchema>;

function b64url(s: string) {
  return btoa(unescape(encodeURIComponent(s)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function appendToSheet(values: string[]) {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
  if (!LOVABLE_API_KEY || !GOOGLE_SHEETS_API_KEY) throw new Error("Sheets credentials missing");

  const attempt = async (tab: string) => {
    const url = `${GATEWAY}/google_sheets/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(
      `${tab}!A1`,
    )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": GOOGLE_SHEETS_API_KEY,
      },
      body: JSON.stringify({ values: [values] }),
    });
  };

  let res = await attempt("Applications");
  if (!res.ok) res = await attempt("Sheet1");
  if (!res.ok) throw new Error(`Sheets append failed [${res.status}]: ${await res.text()}`);
}

async function sendNotificationEmail(d: Application, resumeUrl: string) {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const GOOGLE_MAIL_API_KEY = process.env.GOOGLE_MAIL_API_KEY;
  if (!LOVABLE_API_KEY || !GOOGLE_MAIL_API_KEY) throw new Error("Gmail credentials missing");
  const subject = `New Application — ${d.role_title} — ${d.full_name}`;
  const body = [
    `New job application from basicsocials.com`,
    ``,
    `Role:            ${d.role_title}`,
    `Name:            ${d.full_name}`,
    `Email:           ${d.email}`,
    `Phone:           ${d.phone}`,
    `Location:        ${d.location}`,
    `Experience:      ${d.experience}`,
    `Notice period:   ${d.notice_period}`,
    `Portfolio:       ${d.portfolio_url}`,
    `LinkedIn:        ${d.linkedin_url || "—"}`,
    `Current company: ${d.current_company || "—"}`,
    `Expected CTC:    ${d.expected_ctc || "—"}`,
    ``,
    `Why Basic Socials:`,
    d.why_join,
    ``,
    `Top 5 creators:`,
    ...d.creators.map((c, i) => `  ${i + 1}. ${c.name} — ${c.link}`),
    ``,
    `Resume (${d.resume_filename}): ${resumeUrl}`,
    ``,
    `Received: ${new Date().toISOString()}`,
  ].join("\n");
  const raw = [
    `To: ${NOTIFY_EMAIL}`,
    `Subject: ${subject}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    ``,
    body,
  ].join("\r\n");
  const res = await fetch(`${GATEWAY}/google_mail/gmail/v1/users/me/messages/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": GOOGLE_MAIL_API_KEY,
    },
    body: JSON.stringify({ raw: b64url(raw) }),
  });
  if (!res.ok) throw new Error(`Gmail send failed [${res.status}]: ${await res.text()}`);
}

export const Route = createFileRoute("/api/public/job-application")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const parsed = ApplicationSchema.safeParse(payload);
        if (!parsed.success) {
          return Response.json(
            { error: "Invalid input", details: parsed.error.flatten() },
            { status: 400 },
          );
        }
        const d = parsed.data;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { error } = await supabaseAdmin.from("job_applications").insert({
          role_slug: d.role_slug,
          role_title: d.role_title,
          full_name: d.full_name,
          email: d.email,
          phone: d.phone,
          location: d.location,
          experience: d.experience,
          notice_period: d.notice_period,
          portfolio_url: d.portfolio_url,
          linkedin_url: d.linkedin_url || null,
          current_company: d.current_company || null,
          expected_ctc: d.expected_ctc || null,
          why_join: d.why_join,
          creators: d.creators,
          resume_path: d.resume_path,
          resume_filename: d.resume_filename,
        });
        if (error) {
          console.error("application insert failed", error);
          return Response.json({ error: "Could not save your application" }, { status: 502 });
        }

        let resumeUrl = d.resume_path;
        try {
          const { data: signed } = await supabaseAdmin.storage
            .from("resumes")
            .createSignedUrl(d.resume_path, 60 * 60 * 24 * 30);
          if (signed?.signedUrl) resumeUrl = signed.signedUrl;
        } catch (err) {
          console.error(err);
        }

        try {
          await appendToSheet([
            new Date().toISOString(),
            d.role_title,
            d.full_name,
            d.email,
            d.phone,
            d.location,
            d.experience,
            d.notice_period,
            d.portfolio_url,
            d.linkedin_url || "",
            d.current_company || "",
            d.expected_ctc || "",
            d.why_join,
            d.creators.map((c) => `${c.name} (${c.link})`).join(" | "),
            resumeUrl,
          ]);
        } catch (err) {
          console.error(err);
        }

        try {
          await sendNotificationEmail(d, resumeUrl);
        } catch (err) {
          console.error(err);
        }

        return Response.json({ ok: true });
      },
    },
  },
});