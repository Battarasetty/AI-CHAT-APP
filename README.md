AI Chat App

A modern AI-powered chat application built with Next.js App Router, featuring OAuth authentication, tool-based AI responses, and a production-ready architecture.

Tech Stack

Next.js (App Router)

TypeScript

Tailwind CSS

shadcn/ui

NextAuth.js

MongoDB

Vercel AI SDK

Public APIs (Weather, Stocks)

Key Features

Google & GitHub OAuth authentication

Protected /chat route

Real-time AI chat interface

Tool-based intent routing

Weather, Stock & F1 response cards

Typing indicator & input locking

Auto-scroll to latest message

Persistent chat state

Clean, production-style UI

How the App Works

User logs in using Google or GitHub OAuth

Authenticated users access the /chat page

Messages are sent to /api/messages

The system detects user intent:

Weather → Calls Weather API

Stock → Calls Stock API

F1 → Calls F1 API

Otherwise → Returns a text response

A structured response is returned as a chat card

UI locks input while AI processes the response

AI messages are prefixed with stock, weather, or F1 to indicate the response type

Chat automatically scrolls to the newest message

⚠️ Note:
Due to OpenAI/Vercel AI billing constraints, LLM responses are mocked. The API flow, architecture, and intent routing simulate a production-ready system.

Implemented Functionality

OAuth authentication (NextAuth)

Secure route protection

AI loading state management

Typing indicator

Input lock during AI response

Auto-scroll to newest message

Error handling and fallback responses

How to Run Locally
npm install
npm run dev

Open in browser:
👉 http://localhost:3000/login
