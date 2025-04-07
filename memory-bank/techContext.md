# Technical Context

## Technology Stack
- **Frontend Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (built on Radix UI)
- **Icons**: Lucide-react
- **Animation**: Framer Motion (optional)
- **State Management**: Zustand
- **Data Fetching**: React Query
- **PDF Export**: html2pdf.js or jsPDF
- **AI Backend**: Next.js API Route + OpenAI API
- **Deployment**: Vercel

## Architecture Overview
- Web-based AI diagnosis assistant
- Conversational UI for doctor-patient interaction simulation
- Local storage for session history
- PDF export functionality

## Development Environment
- Next.js React framework
- Environment variables for API keys

## Key Technical Decisions
- Using Next.js for SSR and API routes
- Local storage for session persistence
- No backend database in MVP
- Using pre-tested system prompt for diagnostic logic

## API Integrations
- OpenAI API for AI-powered diagnosis

## Security Considerations
- Secure storage of OpenAI API key
- No user authentication in MVP (local storage only)

## Performance Considerations
- Fast and responsive UI
- Efficient API communication

## Future Technical Considerations
- Multi-language support
- Authentication for syncing across devices
- Analytics for chat sessions
- Voice-to-text functionality

# Tech Stack Overview

| Layer                | Technology                     | Purpose |
|----------------------|--------------------------------|---------|
| **Frontend Framework** | **Next.js (React)**             | Main app + serverless API routes |
| **Styling**          | **Tailwind CSS**                | Utility-first responsive styling |
| **UI Components**    | **shadcn/ui**                   | Pre-built modern components (built on Radix UI) |
| **Icons**            | **Lucide Icons**                | Sharp, clean icons (e.g., stethoscope, chat bubbles) |
| **Animations**       | **Framer Motion**               | Smooth UI transitions (optional) |
| **State Management** | **Zustand**                     | Manages in-session and saved diagnostics |
| **Data Fetching**    | **React Query**                 | Handles async API calls |
| **PDF Export**       | **html2pdf.js** or **jsPDF**    | Download chat as a PDF |
| **API**              | **Next.js API Route**           | Secure OpenAI integration |
| **Auth (optional)**  | **NextAuth.js**                 | Extendable for user login (if needed) |
| **Deployment**       | **Vercel**                      | Seamless deploy for Next.js projects |

---

## ✅ Updated Technical Implementation Checklist

#### 🧰 Project Setup
- [ ] Create new **Next.js** project
- [ ] Install UI & styling libs:
  - `shadcn-ui` (via CLI)
  - `tailwindcss`, `postcss`, `autoprefixer`
  - `lucide-react`
  - `framer-motion` (optional)
- [ ] Install core logic libs:
  - `zustand`, `react-query`, `html2pdf.js`
- [ ] Set up `.env.local` and Vercel secrets

#### 💬 UI & Chat
- [ ] Build chat layout using `shadcn/ui` components (`Card`, `Textarea`, `Button`)
- [ ] Add animated transitions with `framer-motion`
- [ ] Zustand store for current chat state
- [ ] Integrate API call with React Query

#### 🧠 API Integration
- [ ] Create `/api/diagnose` route
- [ ] Send system prompt + messages to OpenAI securely
- [ ] Return AI response
- [ ] Handle loading/error states

#### 🗂 Session Handling
- [ ] “New Diagnosis” button (clears current, saves old)
- [ ] Save sessions to localStorage
- [ ] Add timestamps/titles
- [ ] Zustand to manage history state

#### 🧾 History & PDF
- [ ] History view with previous sessions
- [ ] View mode with read-only past chats
- [ ] Export chat to PDF via `html2pdf.js`
- [ ] Toasts (`react-hot-toast`, optional)

