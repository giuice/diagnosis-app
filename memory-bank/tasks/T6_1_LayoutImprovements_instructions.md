# T6_1_LayoutImprovements Instructions

## Objective
Improve the layout, responsiveness, and visual consistency of the diagnosis app across different screen sizes and states.

## Context
The app currently has some inconsistencies in layout, particularly in mobile view, and has duplicate controls in different parts of the UI. This task focuses on creating a more cohesive and user-friendly interface.

[Implementation Plan: IP6_LayoutAndBugFixes]

## Dependencies
- src/app/layout.tsx
- src/components/chat/ChatContainer.tsx
- src/components/navigation/SessionNavigation.tsx
- src/components/ui/button.tsx

## Steps

### 1. Consolidate Control Actions
- Remove duplicate "Export" and "New Diagnosis" buttons from ChatContainer
- Update the sidebar and mobile navigation to be the single source for these actions
- Add appropriate callbacks and state handling

### 2. Improve Mobile Navigation
- Create a collapsible/expandable mobile navigation menu
- Implement a hamburger menu for smaller screens
- Ensure touch targets are at least 44px for better accessibility

### 3. Enhance Navigation Breadcrumbs
- Create a consistent breadcrumb component that shows the current path in the application
- Implement this in the header area above the main content
- Show: Home > History > Session Viewer or Home > Chat as appropriate

### 4. Standardize Layout Spacing and Alignment
- Apply consistent padding and margins across all views
- Ensure chat messages, history items, and session viewer have consistent spacing
- Standardize card styles and background colors

### 5. Integrate Dark Mode Toggle
- Redesign the dark mode toggle to be more visually appealing
- Use an icon (sun/moon) instead of text
- Position it consistently across desktop and mobile views

### 6. Make UI Elements More Accessible
- Increase contrast for better readability
- Add proper ARIA roles and labels to interactive elements
- Ensure focus states are visible for keyboard navigation

## Expected Output
- Improved responsive layout that works well on mobile and desktop
- Consistent navigation experience with clear breadcrumbs
- Visually cohesive design with standardized spacing
- Better accessibility for all users

## Notes
- Test on various screen sizes (mobile, tablet, desktop)
- Ensure transitions between views are smooth
- Maintain existing functionality while improving the UI
