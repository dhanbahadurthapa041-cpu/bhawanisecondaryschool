# Build Instructions: Bhawani Secondary School Website
**Audience: AI coding agent. Follow this document as the build spec. Ask the human before deviating from any decision marked (LOCKED).**

## 1. Project Summary
Rebuild the Bhawani Secondary School website from scratch (not migrating old content). Two parts:
- A public marketing/informational site (no login).
- A single authenticated admin panel to manage news/announcements shown on the public site.

Explicitly OUT OF SCOPE (do not build): student login, parent login, grades, attendance.

## 2. Tech Stack (LOCKED)
| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js (App Router), React | SSR for public pages = SEO + fast load; same React component model for admin UI |
| Backend/DB | Supabase (Postgres + Auth + Storage) | Already decided by project owner |
| Styling | Tailwind CSS | Fast, consistent, easy for an agent to apply predictably — confirm with human if they have a brand kit/colors first |
| Hosting | Vercel | Zero-config Next.js deploys |

## 3. Public Site — Pages
| Page | Route | Content source |
|---|---|---|
| Home | `/` | Static content + latest 3 news items |
| About / Our School | `/about` | Static |
| News & Announcements | `/news` and `/news/[slug]` | Supabase `news_posts` table, published only |
| Academics | `/academics` | Static (confirm structure with human) |
| Staff | `/staff` | Static or Supabase `staff` table (ask human which) |
| Admissions | `/admissions` | Static |
| Contact | `/contact` | Static, include a contact form (no backend needed — mailto or simple form service) |

Ask the human: does the site need bilingual (Nepali/English) support, or English only? Don't assume.

## 4. Admin Panel
- Route: `/admin/login` (public), `/admin/*` (protected)
- Single role: `admin`. No multi-role system needed.
- Auth: Supabase Auth, email + password. **No public sign-up** — admin accounts are created manually via the Supabase dashboard, not through the app.
- Protect all `/admin/*` routes with Next.js middleware that checks for a valid Supabase session and redirects to `/admin/login` if absent.
- Admin capabilities (v1): Create, edit, delete, publish/unpublish news posts. Upload a cover image per post.

## 5. Data Model
| Table | Key columns | Notes |
|---|---|---|
| `news_posts` | id, title, slug, body, cover_image_url, is_published (bool), published_at, created_by, created_at | `body` should support rich text or Markdown — sanitize before render |
| `admins` | user_id (FK → auth.users), created_at | Do NOT treat every authenticated Supabase user as admin — gate on membership in this table |
| `staff` (optional) | id, name, role, photo_url, bio | Only build if human confirms staff directory should be dynamic |

## 6. Row Level Security (LOCKED — do not skip)
- `news_posts`: `SELECT` allowed to `anon` role only where `is_published = true`. `INSERT`/`UPDATE`/`DELETE` allowed only to authenticated users present in the `admins` table.
- `admins`: no client access at all (service-role or dashboard-only).
- Write and test these policies before wiring up the frontend — do not rely on frontend checks alone to hide admin actions.

## 7. Security & Data Handling
- The Supabase **anon key** is safe in client code. The **service role key** must never appear in client-side code or be committed to the repo — server-side only, via environment variables.
- Sanitize all admin-submitted HTML/Markdown before storing or rendering (prevents stored XSS).
- Validate file uploads (type, size) before sending to Supabase Storage.
- News images bucket: public read, admin-only write.

## 8. Quality Bar
- Mobile-first responsive layout — assume a large share of parent traffic is on phones.
- Basic SEO: per-page `<title>`/meta description, Open Graph tags on news posts, `sitemap.xml`, `robots.txt`.
- Accessibility: semantic HTML, alt text on all images, admin forms keyboard-navigable.
- Loading and error states for every Supabase-backed page (don't let a failed fetch render a blank page).
- Use `next/image` for image optimization.

## 9. Build Order
1. Scaffold Next.js + Tailwind project.
2. Set up Supabase project: create schema, RLS policies, `admins` table, storage bucket.
3. Build static public pages with placeholder content.
4. Build `/news` list + detail pages (read-only, wired to Supabase).
5. Build `/admin/login` + session-protected `/admin` shell.
6. Build admin CRUD UI for news posts, including image upload.
7. SEO + accessibility pass.
8. Deploy to Vercel, connect domain.

## 10. Open Questions for the Human (ask before assuming)
- Bilingual (Nepali/English) support: yes/no?
- Does the Staff page need to be admin-editable, or is a static page fine for now?
- Brand colors/logo/fonts to use, or is full creative freedom okay?
- Existing domain name to connect, or is that still pending?

## 11. Addendum — Corrections to the Agent's Phase Plan (LOCKED, apply these)
1. **No fabricated content.** Do not invent specific facts for a real institution — admission criteria, fees, deadlines, staff names, addresses, phone numbers. For each public page, request the real text/data from the human before treating that page as done. Placeholder structure is fine; placeholder *facts* are not.
2. **Build order fix.** Move Supabase schema + RLS setup to immediately after the project scaffold (before any public pages are built), not after Phase 2. Build the News pages against the real (even empty) Supabase tables from the start instead of mock data — building it twice is wasted work.
3. **Middleware bug risk.** `/admin/login` sits under `/admin/*`. If the middleware protects everything under that path indiscriminately, the login page will redirect to itself in a loop. Explicitly exclude `/admin/login` from the session-required check.
4. **Contact form needs a real delivery mechanism**, decided now, not left implicit: either an email-delivery service (e.g. Resend, Formspree) or a `contact_messages` Supabase table the admin can view. A form with no backend wired to it is not done.
5. **Key handling must be explicit in Task 3.2**: `NEXT_PUBLIC_SUPABASE_ANON_KEY` is client-safe; `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be bundled into client code or committed to the repo.
6. **Verification plan must include an RLS test**: confirm an anonymous write attempt to `news_posts` fails, and confirm an authenticated user who is NOT in the `admins` table also fails to write.
