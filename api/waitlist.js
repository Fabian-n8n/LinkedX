const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appMFtEQOyXyopr8l';
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Waitlist Signups';

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
    return res.status(500).json({ error: 'Server configuration is incomplete.' });
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

  return res.status(201).json({ ok: true });
}
