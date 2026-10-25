// Business settings for the site. Nothing secret lives here.
// The only secret, BREVO_API_KEY, is set in Vercel → Project → Settings → Environment Variables.

/** Where new Free Ad Check leads are emailed. */
export const NOTIFY_EMAIL = "hello@creativedirectionhub.com";

/** Sender for lead alerts and confirmations. Must be a verified sender in Brevo. */
export const SENDER = { name: "Creative Direction Hub", email: "hello@creativedirectionhub.com" };

/** Cal.com booking link for intro calls. Empty = "Book a call" buttons go to the Ad Check form. */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "";

/** Optional Brevo list for Ad Check leads (Brevo → Contacts → Lists → the list's ID). */
export const BREVO_LIST_ID = process.env.BREVO_LIST_ID ? Number(process.env.BREVO_LIST_ID) : undefined;
