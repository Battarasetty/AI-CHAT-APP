**AI Chat App — Asymmetri Assignment**
A modern AI-powered chat application built with Next.js App Router, featuring OAuth authentication, tool-based AI responses, and a production-ready architecture.

**Tech Stack :-**
Next.js (App Router)
TypeScript
Tailwind CSS
shadcn/ui
NextAuth.js
MongoDB
Vercel AI SDK
Public APIs (Weather, Stocks)

## **Key Features :-**
Google & GitHub OAuth authentication
Protected /chat route
Real-time AI chat interface
Tool-based intent routing
Weather, Stock & F1 response cards
Typing indicator & input locking
Auto-scroll to latest message
Persistent chat state
Clean, production-style UI

## **How the App Works :-**
User logs in using Google or GitHub OAuth
Authenticated users access /chat
Messages are sent to /api/messages
Intent is detected:
Weather → Calls Weather API
Stock → Calls Stock API
F1 → Calls F1 API
Otherwise → Text response
Structured response is returned as a chat card
UI locks input while AI responds
All AI messages are prefixed with stock, weather, or F1 to indicate the type
Auto-scroll to newest message
⚠️ Note: Due to OpenAI/Vercel AI billing constraints, LLM responses are mocked. The API flow, architecture, and intent routing fully simulate a production system.

**Note:-**
Due to OpenAI billing constraints, LLM responses are mocked.
The API flow, architecture, and intent routing exactly match production systems.


## ** Implemented Functionality (Summary) :- **
OAuth authentication (NextAuth)
Secure route protection
AI loading state management
Typing indicator
Input lock during AI response
Auto-scroll to newest message
Error handling & fallback responses

## ** How to Run Locally :-**
npm install
npm run dev

Open:-
👉 http://localhost:3000/login