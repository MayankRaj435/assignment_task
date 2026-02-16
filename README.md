<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:7F00FF,100:E100FF&height=200&section=header&text=Smart%20Bookmarks&fontSize=48&fontColor=ffffff&animation=fadeIn" />
</p>

<h3 align="center">🔖 Intelligent Bookmark Manager • Next.js 15 • Supabase • Tailwind CSS</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?logo=supabase" />
  <img src="https://img.shields.io/badge/Auth-Google%20OAuth-blue" />
  <img src="https://img.shields.io/badge/Realtime-Enabled-success" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/UI-Tailwind-38bdf8?logo=tailwindcss" />
</p>

---

# ✨ Smart Bookmarks — Intelligent Bookmark Manager

A modern, fast, and secure bookmark manager built with **Next.js 15**, **Supabase**, and **Tailwind CSS**.  
Save, tag, and organize your links with real-time sync and secure authentication.

Built with production-ready architecture using **Next.js App Router**, **Supabase Realtime**, and **Row Level Security (RLS)**.

---

# 🌐 Live Demo

🔗 **Working App:**  
https://assignment-task-ag93.vercel.app/

---

# 🚀 Core Features

- 🔐 Google OAuth authentication
- 🏷 Smart tag-based bookmark organization
- ⚡ Real-time sync across tabs & devices
- 🔒 Row Level Security (RLS) data isolation
- 🎨 Responsive Tailwind UI
- 🧠 Type-safe TypeScript codebase
- 🧭 Next.js 15 App Router architecture
- ☁️ Vercel-ready deployment

---

# 🛠 Tech Stack

| Layer | Technology |
|--------|----------------|
Framework | Next.js 15 (App Router) |
Language | TypeScript |
Database | Supabase PostgreSQL |
Auth | Supabase Auth (Google OAuth) |
Realtime | Supabase Channels |
Styling | Tailwind CSS |
Deploy | Vercel |

---

# 🧱 Architecture Diagram

```mermaid
flowchart LR

User --> NextUI[Next.js App Router UI]
NextUI --> ClientComp[Client Components]
ClientComp --> Auth[Supabase Auth]
ClientComp --> DB[(Supabase Postgres)]
ClientComp --> RT[Supabase Realtime]

Auth --> DB

subgraph Security
RLS[Row Level Security Policies]
end

DB --> RLS
RT --> ClientComp
Architecture Flow

User interacts with Next.js frontend

Google OAuth handled by Supabase Auth

Bookmarks stored in Supabase PostgreSQL

RLS enforces per-user data access

Realtime channels push DB updates to UI

📂 Project Structure
app/
├── login/
├── dashboard/
├── api/

components/
├── BookmarkList.tsx
├── BookmarkForm.tsx

lib/
├── supabaseClient.ts

supabase/
├── schema.sql

walkthrough.md
⚙️ Setup Instructions
1️⃣ Clone Repository
git clone <your-repo-url>
cd smart-bookmarks
2️⃣ Install Dependencies
npm install
3️⃣ Environment Variables
Create a file:

.env.local
Add:

NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
4️⃣ Database Schema
Run the SQL script:

supabase/schema.sql
Inside Supabase SQL Editor. This will:

Create tables

Enable Row Level Security

Add access policies

5️⃣ Google OAuth Setup
Supabase Dashboard → Authentication → Providers

Enable Google

Add Client ID and Client Secret

Configure Redirect URI (see walkthrough.md)

6️⃣ Run Locally
npm run dev
Open:

http://localhost:3000
🔐 Security Model
This project uses Supabase Row Level Security:

Users only read/write their own bookmarks

Policies enforced at database layer

No cross-user access possible

Secure-by-default queries

⚡ Realtime Updates
Bookmarks update instantly using Supabase realtime subscriptions.

supabase
  .channel('bookmarks')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'bookmarks' },
    handler
  )
  .subscribe()
Supported events:

INSERT

DELETE

UPDATE

No polling. No refresh.

🧩 Challenges & Solutions
1️⃣ "Email signups are disabled" Error
Problem:
During initial development, we encountered:

AuthApiError: Email signups are disabled
Solution:
Supabase default security settings disabled Email provider.

Fix:

Authentication → Providers → Email → Enable provider (ON)
Even if Confirm Email is OFF, provider must be ON.

2️⃣ Next.js 15 searchParams Breaking Change
Problem:
Login page crashed when accessing searchParams.error.

Solution:
Next.js 15 changed searchParams to a Promise.
Refactored login page:

const params = await props.searchParams
3️⃣ Realtime Updates
Problem:
Bookmark list did not update without page refresh.

Solution:

Moved rendering to client component (BookmarkList)

Subscribed to Supabase realtime channel

Listened for INSERT and DELETE events

Updated local state instantly

🚀 Deployment — Vercel
Push repository to GitHub

Import project in Vercel

Add environment variables

Deploy

📈 Future Enhancements
AI tag suggestions

Bookmark metadata previews

Folder/group collections

Full-text search

Shareable bookmark lists

Browser extension

Bulk import/export

👨‍💻 Developer Notes
App Router best practices followed

Strict TypeScript typing

Realtime handled in client layer

RLS tested with multi-user access

Clean DB/UI separation

⭐ Support
If this project helped you:

Star ⭐ the repo

Fork 🍴 and extend

Suggest improvements 💡

<p align="center"> Built with ❤️ using Next.js + Supabase + Tailwind CSS </p> <p align="center"> <img src="https://capsule-render.vercel.app/api?type=waving&color=0:E100FF,100:7F00FF&height=120&section=footer"/> </p> ```
