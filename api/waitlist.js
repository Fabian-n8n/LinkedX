const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appMFtEQOyXyopr8l';
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Waitlist Signups';
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'LinkedX <onboarding@resend.dev>';
const RESEND_REPLY_TO = process.env.RESEND_REPLY_TO || 'Fabian <fabianwong1995@gmail.com>';

function sanitizeText(value, maxLength) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, maxLength);
}

function normalizeLinkedInUrl(value) {
  const trimmed = sanitizeText(value, 500);

  if (!trimmed) {
    return '';
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    return new URL(withProtocol).toString();
  } catch {
    return '';
  }
}

function parseJsonBody(body) {
  if (!body) {
    return {};
  }

  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }

  return body;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getFirstName(name) {
  return name.split(/\s+/)[0] || 'there';
}

function buildWelcomeEmail({ name, role }) {
  const firstName = escapeHtml(getFirstName(name));
  const roleLine = role
    ? `<p style="margin:0 0 18px;color:#334155;line-height:1.7;">I saw you joined as <strong>${escapeHtml(role)}</strong>. That helps me shape the early product around real LinkedIn workflows, not generic social media fluff.</p>`
    : '';

  const text = `Hey ${getFirstName(name)},

Thanks for joining the LinkedX waitlist.

I am building LinkedX for people who want to show up on LinkedIn more consistently without turning it into a second job.

While you wait, the best thing you can do is keep posting once or twice a week. The early version is being shaped around that exact habit: make consistency easier, make ideas easier to capture, and make the whole thing feel less forced.

I will send early access details when your spot is ready.

Fabian
LinkedX`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;background:#f6f8fb;font-family:Inter,Arial,sans-serif;color:#0f172a;">
    <div style="display:none;max-height:0;overflow:hidden;">Thanks for joining the LinkedX waitlist. Early access details are coming soon.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f8fb;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 8px;">
                <div style="display:inline-block;background:#0A66C2;color:#ffffff;border-radius:10px;padding:8px 10px;font-weight:800;font-size:13px;letter-spacing:.02em;">LinkedX</div>
                <h1 style="margin:24px 0 12px;font-size:28px;line-height:1.15;color:#0f172a;">You're on the list, ${firstName}.</h1>
                <p style="margin:0 0 18px;color:#334155;line-height:1.7;">Thanks for jumping in early. I am building LinkedX for people who want to show up on LinkedIn more consistently without turning it into a second job.</p>
                ${roleLine}
                <p style="margin:0 0 18px;color:#334155;line-height:1.7;">While you wait, the best thing you can do is keep posting once or twice a week. The early version is being shaped around that exact habit: make consistency easier, make ideas easier to capture, and make the whole thing feel less forced.</p>
                <p style="margin:0;color:#334155;line-height:1.7;">I will send early access details when your spot is ready.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px 30px;">
                <p style="margin:0;color:#64748b;line-height:1.7;">Fabian<br />LinkedX</p>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;color:#94a3b8;font-size:12px;">You are receiving this because you joined the LinkedX waitlist.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { html, text };
}

async function sendWelcomeEmail({ name, email, role, recordId }) {
  if (!process.env.RESEND_API_KEY) {
    console.error('LinkedX welcome email skipped: RESEND_API_KEY is missing.');
    return false;
  }

  const { html, text } = buildWelcomeEmail({ name, role });
  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `linkedx-waitlist-${recordId || email}`,
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [email],
      reply_to: RESEND_REPLY_TO,
      subject: 'You are on the LinkedX waitlist',
      html,
      text,
      tags: [
        {
          name: 'source',
          value: 'linkedx_waitlist',
        },
      ],
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error('LinkedX welcome email failed:', errorText);
    return false;
  }

  return true;
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'OPTIONS, POST');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'OPTIONS, POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!process.env.AIRTABLE_API_TOKEN) {
    console.error('Airtable waitlist insert failed: AIRTABLE_API_TOKEN is missing.');
    return res.status(500).json({ error: 'Unable to save your waitlist entry right now.' });
  }

  const payload = parseJsonBody(req.body);
  const name = sanitizeText(payload.name, 120);
  const email = sanitizeText(payload.email, 160).toLowerCase();
  const linkedin = normalizeLinkedInUrl(payload.linkedin);
  const role = sanitizeText(payload.role, 80);
  const useCase = sanitizeText(payload.useCase, 5000);
  const signupSource = sanitizeText(payload.signupSource, 500) || 'https://linkedx-app.vercel.app/waitlist';

  if (!name || !email || !role) {
    return res.status(400).json({ error: 'Name, email, and role are required.' });
  }

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailIsValid) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const airtableResponse = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          'Full Name': name,
          'Email Address': email,
          'LinkedIn Profile URL': linkedin,
          Role: role,
          'LinkedIn Goals': useCase,
          'Signup Source': signupSource,
        },
      }),
    },
  );

  if (!airtableResponse.ok) {
    const errorText = await airtableResponse.text();
    console.error('Airtable waitlist insert failed:', errorText);
    return res.status(502).json({ error: 'Unable to save your waitlist entry right now.' });
  }

  const airtableRecord = await airtableResponse.json().catch(() => ({}));
  const emailSent = await sendWelcomeEmail({
    name,
    email,
    role,
    recordId: airtableRecord.id,
  });

  return res.status(201).json({ ok: true, emailSent });
}
