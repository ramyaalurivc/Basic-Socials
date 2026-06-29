import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const SHEET_ID = "1H4FDaQCtw0EinKSLeyLD7a4R3KUZPfTmRZGakpZGzt8";
const NOTIFY_EMAIL = "helloramyaaluri@gmail.com";
const GATEWAY = "https://connector-gateway.lovable.dev";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  brand: z.string().trim().min(1).max(160),
  phone: z
    .string()
    .trim()
    .min(4)
    .max(32)
    .regex(/^[+0-9()\-\s]+$/),
  need: z.string().trim().max(80).optional().nullable(),
  notes: z.string().trim().max(2000).optional().nullable(),
});

function b64url(s: string) {
  return btoa(unescape(encodeURIComponent(s)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function appendToSheet(values: string[]) {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
  if (!LOVABLE_API_KEY || !GOOGLE_SHEETS_API_KEY) {
    throw new Error("Sheets credentials missing");
  }
  const url = `${GATEWAY}/google_sheets/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": GOOGLE_SHEETS_API_KEY,
    },
    body: JSON.stringify({ values: [values] }),
  });
  if (!res.ok) {
    throw new Error(`Sheets append failed [${res.status}]: ${await res.text()}`);
  }
}

async function sendNotificationEmail(data: z.infer<typeof ContactSchema>) {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const GOOGLE_MAIL_API_KEY = process.env.GOOGLE_MAIL_API_KEY;
  if (!LOVABLE_API_KEY || !GOOGLE_MAIL_API_KEY) {
    throw new Error("Gmail credentials missing");
  }
  const subject = `New Lead Enquiry — ${data.name} (${data.brand})`;
  const body = [
    `New lead enquiry from basicsocials.com`,
    ``,
    `Name:    ${data.name}`,
    `Brand:   ${data.brand}`,
    `Phone:   ${data.phone}`,
    `Need:    ${data.need || "—"}`,
    `Notes:   ${data.notes || "—"}`,
    ``,
    `Logged at: ${new Date().toISOString()}`,
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
  if (!res.ok) {
    throw new Error(`Gmail send failed [${res.status}]: ${await res.text()}`);
  }
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const parsed = ContactSchema.safeParse(payload);
        if (!parsed.success) {
          return Response.json(
            { error: "Invalid input", details: parsed.error.flatten() },
            { status: 400 },
          );
        }
        const d = parsed.data;
        const timestamp = new Date().toISOString();
        try {
          await appendToSheet([timestamp, d.name, d.brand, d.phone, d.need || "", d.notes || ""]);
        } catch (err) {
          console.error(err);
          return Response.json({ error: "Could not save submission" }, { status: 502 });
        }
        try {
          await sendNotificationEmail(d);
        } catch (err) {
          // Sheet saved is good enough — don't fail the user request on email
          console.error(err);
        }
        return Response.json({ ok: true });
      },
    },
  },
});
