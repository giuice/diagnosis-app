## 📝 Product Requirements Document (PRD) – Diagnosis Web App

---

### 1. Overview  
A web-based AI diagnosis assistant that simulates a doctor-patient interaction. Users describe their health issues via a chat interface, and the AI guides them through a conversational diagnostic process using a predefined, high-performing system prompt. Sessions can be exported to PDF and are stored locally for future access.

---

### 2. Goals and Objectives  
- **Primary Goal**: Help users get an intelligent, guided diagnosis using natural conversation.
- **Secondary Goals**:
  - Provide a modern, fast, and responsive UI.
  - Enable users to export diagnostic sessions to PDF.
  - Allow multiple diagnostic sessions with local history.
- **Success Metrics**:
  - High user engagement and satisfaction
  - Reliable AI response relevance
  - Smooth UX with minimal user friction

---

### 3. Target Users  
- Anyone needing a health diagnostic without seeing a doctor immediately.
- Users seeking private, fast, and interactive evaluations.
- No medical or technical expertise required.

---

### 4. Features

| Feature                 | Description |
|--------------------------|-------------|
| **Chat Interface**       | Conversational UI for entering symptoms and receiving responses. |
| **Conversational Memory**| AI maintains context within each session for relevant responses. |
| **New Diagnosis**        | Users can start a fresh session anytime. |
| **Local History**        | Previous sessions are saved to browser storage and viewable later. |
| **Export to PDF**        | Users can download any session as a formatted PDF. |
| **Secure API Integration**| Backend API routes handle OpenAI communication securely. |

---

### 5. User Flow

1. User lands on the app.
2. Enters symptoms in the chat UI.
3. AI begins the diagnostic conversation.
4. User can:
   - Start a new session (saving the current one to history)
   - Export any session to PDF
   - Browse and view past diagnostic sessions from the History tab

---

### 6. Technical Requirements

| Category              | Technology / Stack           | Purpose |
|------------------------|-------------------------------|---------|
| **Frontend Framework** | **Next.js (React)**            | SSR + API routes + fast development |
| **Styling**            | **Tailwind CSS**               | Utility-first CSS framework for responsive design |
| **UI Components**      | **shadcn/ui**                  | Modern component system (built on Radix UI) |
| **Icons**              | **Lucide-react**               | Clean, lightweight icons |
| **Animation**          | **Framer Motion** (optional)   | UI animations and smooth transitions |
| **State Management**   | **Zustand**                    | In-memory state and localStorage for sessions |
| **Data Fetching**      | **React Query**                | Manage API requests and caching |
| **PDF Export**         | **html2pdf.js** or **jsPDF**   | Generate downloadable PDF of chat |
| **AI Backend**         | **Next.js API Route + OpenAI API** | Secure connection to AI using your custom prompt |
| **Environment Secrets**| `.env.local` & Vercel secrets  | Store `OPENAI_API_KEY` securely |
| **Deployment**         | **Vercel**                     | One-click deploy, serverless API support |

---

### 7. Constraints and Assumptions
- Diagnostic logic is handled entirely by a pre-tested system prompt.
- No user authentication required in MVP.
- All sessions are stored locally (no backend DB).
- LocalStorage is sufficient for history in MVP.
- PDF export is manually triggered by user.

---

### 8. Future Considerations
- Multi-language support
- Authentication for syncing across devices
- Chat session analytics or feedback scoring
- Audio input (voice-to-text)
- Integration with real doctors for review

Perfect—so now we’re introducing **persistent diagnostic history** stored *locally* (e.g., in browser local storage). That allows users to:

- Start as many diagnostic sessions as they like
- Revisit and export old ones via a **“History” tab**

Got it. Let’s update the use cases again before moving to Step 5.

---

### ✅ Final Use Case Addition

6. **View Diagnostic History**
   - Actor: User  
   - Flow:
     1. Each time a user finishes or starts a new diagnostic, the previous one is saved in local storage.
     2. User can access a “History” tab.
     3. Each saved session is listed with timestamp or title.
     4. User can view, continue, or export any past session.


### 🧠 Epics and User Stories

#### 🟦 Epic 1: Chat Interface & Diagnostics
- 🧩 As a user, I want to enter my health problem so I can get a diagnosis.
- 🧩 As a user, I want the AI to remember my previous messages during the session.
- 🧩 As a user, I want to see responses quickly and clearly.

#### 🟩 Epic 2: Session Management
- 🧩 As a user, I want to start a new diagnostic session at any time.
- 🧩 As a user, I want my current session to be saved before starting a new one.

#### 🟨 Epic 3: Diagnostic History
- 🧩 As a user, I want to view a list of all my past diagnostic sessions.
- 🧩 As a user, I want to load and view a previous session’s conversation.
- 🧩 As a user, I want to export any session to PDF.

#### 🟫 Epic 4: API & AI Integration
- 🧩 As a system, I want to securely send chat messages to OpenAI via an API route.
- 🧩 As a system, I want to apply a predefined system prompt to guide the AI's behavior.
- 🧩 As a system, I want to return AI responses back to the frontend efficiently.

