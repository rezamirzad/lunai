Task Description: Responsive UI Parity & Component Normalization
TaskID: 260601-08-responsive-parity
Objective: Achieve 100% UI and functional parity between desktop, tablet, and mobile layouts by refactoring @workspace/ui components to be "responsive-native."
Instructions:
Component Normalization:
Audit components that are hidden on mobile (e.g., language selector, secondary navigation, advanced search).
Refactor these components to use Responsive Containers instead of conditional rendering (i.e., hide/show based on viewport state rather than isMobile logic).
Ensure all components—including the language selector—are integrated into the responsive Navbar and Footer layouts.
Navigation & Interaction Refactoring:
Design a Mobile Drawer / Hamburger Menu pattern that retains all desktop functionalities (Language Switcher, User Profile, SaaS Navigation).
Ensure that the AdminPanel and future project dashboards use a ResponsiveGrid that collapses columns logically on tablets and stacks them on mobile.
Atomic Responsive Design:
Update the @workspace/ui library to enforce standard touch targets (44x44px minimum) even for complex interactive elements.
Refactor CSS to use Fluid Typography and Dynamic Grid Spacing that scales across viewport widths, ensuring consistent look-and-feel without duplicating code.
Canonical Patterns & Documentation:
Update Canonical Patterns: Draft rules for "Mobile-First Component Anatomy" in docs/canonical-patterns.md, emphasizing the "Never-Hide-Functionality" principle.
API/Contract Updates: Update API-Contract-Analysis.md to ensure state transitions (like opening the mobile menu) are handled through atomic prop drills.
Quality Gate:
Modification Impact Statement: Detail the refactoring of Navbar.tsx and Footer.tsx to include the language selector and hidden navigation items.
Human Approval Gate:
Pause execution after the Responsive Audit and Component Contract Analysis are ready. Do not deploy the refactored @workspace/ui library until I reply with [APPROVED].
Suggested Agent Allocation:
ArchitectAgent: To design the "Mobile Drawer" architecture that includes the language selector.
DocumentationAgent: To document the responsive protocol in docs/canonical-patterns.md.
ProjectManagerAgent: To oversee the integration of the unified menu structure across apps/web.
