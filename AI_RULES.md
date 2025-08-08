# AI Rules for This Application

## Tech Stack Overview

- React with TypeScript for building the user interface.
- React Router for client-side routing and navigation.
- Tailwind CSS for styling and responsive design.
- shadcn/ui component library built on Radix UI for accessible, customizable UI components.
- Supabase for backend services including authentication and database.
- React Query (@tanstack/react-query) for data fetching and caching.
- Lucide-react for icons.
- Sonner and custom toast system for notifications.
- Vite as the build tool and development server.
- Additional libraries: zod for validation, date-fns for date utilities, clsx and tailwind-merge for className management.

## Library Usage Rules

- **UI Components:**  
  Use shadcn/ui components exclusively for UI elements (buttons, inputs, cards, modals, dropdowns, etc.) to maintain consistent styling and accessibility. Do not replace these with other UI libraries.

- **Styling:**  
  Use Tailwind CSS utility classes for all styling needs. Avoid inline styles or other CSS frameworks. Use the `cn` utility for conditional class merging.

- **Icons:**  
  Use lucide-react icons only. Do not introduce other icon libraries.

- **Routing:**  
  Use React Router exclusively for routing. Keep all routes defined in `src/App.tsx`.

- **State and Data Fetching:**  
  Use React Query for server state management and data fetching. Avoid other data fetching libraries.

- **Authentication and Backend:**  
  Use Supabase client for all backend interactions including auth, database queries, and subscriptions.

- **Notifications:**  
  Use the existing toast system (`use-toast` hook and `Toaster` components) and Sonner for user notifications. Do not add other notification libraries.

- **Forms and Validation:**  
  Use react-hook-form with zod for form handling and validation.

- **Avoid Overengineering:**  
  Keep code simple and maintainable. Do not add complex error handling or fallback mechanisms unless explicitly requested.

- **File Organization:**  
  Keep source code inside the `src` folder. Place pages in `src/pages` and components in `src/components`. Create new components in separate files.

- **No Additional UI Libraries:**  
  Do not add or use other UI libraries besides shadcn/ui and Radix UI components.

---

Following these rules ensures consistency, maintainability, and a smooth developer experience across the project.