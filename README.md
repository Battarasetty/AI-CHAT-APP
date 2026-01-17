🤖 AI Chat App – Asymmetri Assignment

A modern AI-powered chat application built with Next.js (App Router), featuring OAuth authentication, tool-based AI responses, and a production-style architecture.

🚀 Tech Stack

Next.js 16 (App Router)

TypeScript

Tailwind CSS

shadcn/ui

NextAuth.js

MongoDB

Vercel AI SDK

Public APIs (Weather, Stocks)

📌 Features Overview

Google & GitHub OAuth authentication

Protected chat route (/chat)

AI chat interface with real-time responses

Intent-based tool calling

Weather, Stock, and F1 tool cards

Message persistence (localStorage)

Logout functionality

Clean, production-ready UI

🪜 Step-by-Step Implementation
✅ Step 1: Project Setup & UI Foundation

Goal: Initialize a modern Next.js + TypeScript project with Tailwind CSS and reusable UI components.

Implemented

Created app using create-next-app with TypeScript

Installed and configured Tailwind CSS

Added shadcn/ui for reusable UI components

Prepared folder structure for login, chat, components, and backend utilities

📂 Core structure:

app/
├── login/
├── chat/
├── api/
├── components/
└── lib/

✔ Result: A fully working frontend foundation

✅ Step 2: Authentication UI & Routing (Frontend Only)

Goal: Implement login → chat navigation using temporary auth logic.

Implemented

Login page with email & password fields

Temporary authentication using localStorage

Protected /chat route

Redirect unauthenticated users to /login

⚠️ Note: This step used fake auth, later replaced by real OAuth.

✅ Step 3: Chat UI Layout

Goal: Build a real chat interface (UI + UX).

Implemented

Message bubble components (User / AI)

Chat input with send button

Scrollable chat area

Auto-scroll to latest message

Dummy AI response for testing UI

✔ Result: Chat UI behaves like a real messaging app

✅ Step 4: Backend AI Integration

Goal: Connect frontend chat to a backend AI API.

Implemented

/api/chat API route using App Router

Vercel AI SDK integration

OpenAI model configuration

Frontend → Backend → AI → Frontend flow

⚠️ AI Provider Note

Due to OpenAI billing constraints, the LLM response layer is mocked.
However, the architecture, API flow, and intent routing exactly match production systems.

✅ Step 5: Tool Cards & Intent Routing

Goal: Enhance chat with structured tool responses.

Tools Implemented

🌦 Weather Tool (real public API)

📈 Stock Tool (Alpha Vantage – real API)

🏎 F1 Tool (mocked)

Features

Intent detection (weather / stock / f1 / fallback)

Tool-specific card components

Clean card-based responses inside chat

Fallback AI text responses for unknown intents

✅ Step 6: Polishing & Persistence

Goal: Make the app professional and submission-ready.

Implemented

Chat message persistence using localStorage

Logout button

Auto-scroll improvements

Loading / typing indicator

README documentation for architecture & mock logic

✔ Result: Stable, user-friendly chat experience

✅ Step 7: Real Authentication (Google & GitHub OAuth)

Goal: Replace fake auth with real OAuth and protected routes.

Implemented

NextAuth.js authentication

Google OAuth provider

GitHub OAuth provider

MongoDB adapter for user persistence

JWT-based sessions

Protected /chat route

Custom login page (/login)

Secure session handling

Expected OAuth Behavior

Google may prompt account selection

GitHub may auto-login due to existing SSO session

Both behaviors are correct and production-accurate

🔐 Environment Variables

Create a .env.local file:

OPENAI_API_KEY=your_key_here
ALPHA_VANTAGE_KEY=your_key_here
MONGODB_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_secret
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

⚠️ .env.local is not committed to GitHub.

🏎 F1 Tool API Note

The Ergast F1 API is currently unavailable (HTTP 441).
For demonstration purposes, the F1 tool response is mocked.

✔ Architecture
✔ Intent routing
✔ Card rendering logic

remain identical to production.

🧪 How to Run Locally
npm install
npm run dev

Open:
👉 http://localhost:3000/login
