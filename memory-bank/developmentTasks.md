# Development Tasks

This file tracks the development tasks for the Diagnosis Web App project.

## Project Setup Tasks
- [ ] Initialize Next.js project
- [ ] Set up Tailwind CSS
- [ ] Configure shadcn/ui components
- [ ] Set up project structure
- [ ] Configure environment variables

## Frontend Development
- [ ] Create layout and basic UI components
- [ ] Implement chat interface
- [ ] Create state management with Zustand
- [ ] Build session history functionality 
- [ ] Implement PDF export feature

## Backend Development
- [ ] Create API route for OpenAI integration
- [ ] Implement secure handling of OpenAI API key
- [ ] Set up error handling for API calls

## Testing
- [ ] Unit testing for components
- [ ] Integration testing for API routes
- [ ] End-to-end testing for user flows

## Deployment
- [ ] Configure Vercel deployment
- [ ] Set up environment variables in Vercel

## Documentation
- [ ] Update project documentation
- [ ] Create user guide

**Task Breakdown and Timeline**.

---

🧩 **Purpose of this Step:**  
We’ll take the user stories from each epic and break them into **concrete development tasks**. Then we’ll suggest a logical **development order** and estimate how long each phase might take (assuming a solo dev or small team).


### 🟦 Epic 1: Chat Interface & Diagnostics

| Task | Est. Time |
|------|-----------|
| Build chat UI (input box, message bubbles, scroll view) | 1 day |
| Integrate Zustand to manage in-session chat state | 0.5 day |
| Handle user input and render AI responses | 0.5 day |
| Loading states, error handling | 0.5 day |
| Style with basic responsive layout | 1 day |

⏱️ Total: ~3.5 days

---

### 🟩 Epic 2: Session Management

| Task | Est. Time |
|------|-----------|
| Implement “New Diagnosis” button | 0.5 day |
| On click, clear current state and store session in localStorage | 0.5 day |
| Tag session with timestamp/title | 0.25 day |

⏱️ Total: ~1.25 days

---

### 🟨 Epic 3: Diagnostic History

| Task | Est. Time |
|------|-----------|
| Build “History” tab or view | 1 day |
| Load sessions from localStorage | 0.5 day |
| Display as list with titles & timestamps | 0.5 day |
| Allow user to view past session (read-only) | 0.5 day |
| Implement “Export to PDF” button | 0.5 day |

⏱️ Total: ~3 days

---

### 🟫 Epic 4: API & AI Integration

| Task | Est. Time |
|------|-----------|
| Create Next.js API route for OpenAI requests | 0.5 day |
| Handle system prompt + user messages (chat context) | 0.5 day |
| Securely load API key via environment variables | 0.25 day |
| Handle streaming or full responses | 0.5 day |

⏱️ Total: ~1.75 days

---

### ⏱️ Overall Timeline Summary

| Phase | Time |
|-------|------|
| Core Chat Experience | 3.5 days |
| Session + History | 4.25 days |
| API Integration | 1.75 days |
| **Total Estimated MVP** | **~9.5 working days (~2 weeks)** |

