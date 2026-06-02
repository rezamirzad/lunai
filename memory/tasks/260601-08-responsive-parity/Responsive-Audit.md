# Responsive Audit: Navbar & Footer

## Current State Analysis

### Navbar.tsx
- **Functional Density**: High. The navbar attempts to display 5+ nav links, a login button, and a 4-option language switcher on all screen sizes.
- **Scaling Method**: Font size reduction (`text-[10px]` on mobile) and reduced gaps.
- **Issues**:
  - **Usability**: Text is too small on mobile.
  - **Layout**: Crowded header makes it difficult for the user to focus on primary actions.
  - **Consistency**: Some links are commented out but should be available if needed.
  - **Responsive Strategy**: "Shrink-to-fit" instead of "Reorganize-for-viewport."

### Footer.tsx
- **Scaling Method**: `flex-wrap` and centered text.
- **Issues**:
  - Navigation links in footer should stay in sync with the main Navbar links.

## Component Normalization Plan

### Navbar Refactoring
1. **Desktop View (md+)**:
   - Retain horizontal layout.
   - Standard font sizes.
2. **Mobile/Tablet View (<md)**:
   - Hide horizontal links and language switcher.
   - Introduce **Hamburger Toggle** (44x44px minimum).
   - Implement **Mobile Drawer** that contains:
     - Navigation Links (Services, Contact, Blog, About).
     - Full Language Switcher.
     - Login/User profile actions.

### Global Responsive Rules
- **Never-Hide-Functionality**: All features (like language switching) must remain accessible.
- **Touch Parity**: 44x44px minimum touch targets for all interactive elements.
- **Responsive-Native**: Use CSS Grid/Flex for layout state changes instead of JS-based `isMobile` logic where possible.
