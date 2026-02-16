# Smart Bookmarks App

A modern, intelligent bookmark manager built with **Next.js 15**, **Supabase**, and **Tailwind CSS**.

## Features

-   **Google OAuth Authentication**: Secure sign-in without passwords.
-   **Smart Tagging**: Organize your bookmarks with custom tags.
-   **Real-time Updates**: Bookmarks sync instantly across multiple tabs/devices using Supabase Realtime.
-   **Row Level Security**: Your data is private and only accessible by you.

## Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **Database**: Supabase (PostgreSQL)
-   **Auth**: Supabase Auth (Google Provider)
-   **Styling**: Tailwind CSS
-   **Language**: TypeScript

## Setup Instructions

### 1. Environment Variables
Create a file named `.env.local` in the root directory and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Database Schema
Run the SQL script located in `supabase/schema.sql` in your Supabase SQL Editor. This enables **Row Level Security (RLS)** and creates the necessary tables.

### 3. Google OAuth Setup
1.  Go to Supabase Dashboard -> Authentication -> Providers.
2.  Enable **Google**.
3.  Add your **Client ID** and **Client Secret** from Google Cloud Console.
4.  **Important**: detailed instructions on setting up the Redirect URI are in `walkthrough.md`.

### 4. Run Locally
```bash
npm install
npm run dev
```

## Deployment to Vercel

1.  Push this code to a GitHub repository.
2.  Go to [Vercel](https://vercel.com) and "Import Project".
3.  Select your GitHub repository.
4.  **Environment Variables**: Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Vercel dashboard during import.
5.  Click **Deploy**.

## Challenges & Solutions

### 1. "Email signups are disabled" Error
**Problem**: During initial development, we encountered `AuthApiError: Email signups are disabled`.
**Solution**: This was due to Supabase's default security settings. We had to navigate to `Authentication -> Providers -> Email` and ensure the provider was actually **Enabled** (toggled ON), even if "Confirm Email" was toggled OFF.

### 2. Next.js 15 `searchParams` Breaking Change
**Problem**: The application crashed on the login page with a runtime error accessing `searchParams.error`.
**Solution**: Next.js 15 changed `searchParams` from a synchronous object to a **Promise**. We refactored `app/login/page.tsx` to `await props.searchParams` before using it.

### 3. Realtime Updates
**Problem**: We needed the bookmark list to update without a page refresh.
**Solution**: We moved the list rendering to a client component (`BookmarkList`) and used `supabase.channel().on('postgres_changes', ...)` to listen for `INSERT` and `DELETE` events, updating the local state instantly.
