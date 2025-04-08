# T6_3_MobileResponsiveness Instructions

## Objective
Improve the mobile user experience of the diagnosis app by implementing responsive design patterns and optimizing touch interactions.

## Context
The app currently has basic mobile support, but could benefit from mobile-first optimizations to provide a better experience on smaller screens and touch devices.

[Implementation Plan: IP6_LayoutAndBugFixes]

## Dependencies
- src/app/layout.tsx
- src/components/ui/*.tsx
- src/components/chat/ChatContainer.tsx
- src/components/history/HistoryView.tsx

## Steps

### 1. Implement Responsive Typography
- Create a responsive typography system that scales based on viewport size
- Ensure readability on small screens by optimizing line height and font sizes
- Use relative units (rem/em) instead of fixed pixel values

### 2. Optimize Touch Targets
- Ensure all interactive elements are at least 44×44px on mobile
- Add appropriate touch feedback (active states)
- Increase spacing between interactive elements on smaller screens

### 3. Create Bottom Navigation for Mobile
- Implement a mobile-friendly bottom navigation bar
- Include primary actions: Chat, History, New Diagnosis
- Make the navigation persistent and easily accessible

### 4. Implement Swipe Gestures
- Add swipe gestures for common actions (e.g., swipe between views)
- Implement pull-to-refresh for message lists
- Add haptic feedback for important interactions

### 5. Optimize Mobile Input Experience
- Enhance the chat input area for mobile keyboards
- Auto-resize text input based on content
- Add quick action buttons for common phrases or responses

### 6. Fix Mobile-Specific Layout Issues
- Resolve any overflow issues on small screens
- Ensure content is properly contained without horizontal scrolling
- Test and fix landscape orientation layouts

## Expected Output
- Significantly improved mobile user experience
- Touch-optimized interface that feels native on mobile devices
- Responsive layout that adapts to different screen sizes and orientations
- Intuitive navigation that works well with one-handed use

## Notes
- Test on various mobile devices (both iOS and Android)
- Consider implementing device-specific optimizations
- Ensure all mobile enhancements maintain functionality on desktop
