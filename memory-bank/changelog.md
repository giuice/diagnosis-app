# Changelog

This file tracks significant changes to the project.

## April 7, 2025
- Refactored ResumeButton to call centralized resumeSession utility
- Integrated T10 response processing with DeepSeek API call

## April 8, 2025
- Transitioned to EXECUTION phase
- Starting implementation of DeepSeek message format fix (Task T11)
- Starting implementation of empty session prevention (Task T16)
- Reason: Strategy planning completed, ready for execution
- Files affected: memorybankrules.md, activeContext.md
- Completed DeepSeek API message validation fix (Task T11)
- Reason: Prevent invalid message format errors
- Files affected: src/app/api/diagnose/route.ts

## 2025-04-08
- Completed implementation of Task T16: Prevent empty diagnostic sessions
- Modified `useSessionStore` to skip creating sessions with no messages
- Updated `NewDiagnosisButton` and layout buttons to block empty sessions
- Reason: Improve data quality and user experience by avoiding clutter
- Files affected: `useSessionStore.ts`, `NewDiagnosisButton.tsx`, `layout.tsx`

## 2025-04-08
- Implemented automatic switch to chat view after resuming a saved session
- Modified ResumeButton, SessionViewer, and layout to support this
- Reason: Improve UX by reducing extra clicks
- Files affected: ResumeButton.tsx, SessionViewer.tsx, layout.tsx