# 🍲 Tasteorama (Recipe Sharing Platform)

## 📖 About the Project
**Tasteorama** is a modern web application for finding, saving, and creating culinary recipes. 

**Problem it solves:** The project helps users easily find meal ideas by name, category, or ingredients. Thanks to the authentication system, users can create their own digital cookbook (save favorite recipes) and share their own culinary masterpieces with detailed instructions, photos, and calorie calculations.

---

## 🛠 Technologies Used

### Frontend:
* **Framework:** Next.js 15 (App Router)
* **Library:** React (using Server and Client Components)
* **Styling:** CSS Modules, responsive and fluid layout (Mobile-First)
* **Style Normalizer:** `modern-normalize`
* **Image Optimization:** `next/image`

### State & Data Management:
* **Global State:** Zustand
* **API & Caching:** React Query (TanStack Query)
* **HTTP Client:** Axios (with configured Interceptors)

### Form Handling:
* **Form Management:** Formik
* **Data Validation:** Yup

### Other:
* **Routing:** Protection of private and public routes
* **Notifications:** `iziToast` for displaying errors and statuses
* **SEO:** Dynamic metadata generation (`generateMetadata`) and OG tags

---

## ✨ Core Features

### 📱 UI / UX & Responsiveness
* **Mobile-first approach:** Fluid layout from 320px, responsive adaptation for 393px, 768px (Tablet), and 1440px (Desktop).
* Interactive elements feature hover effects and cursor changes.
* Global error pages (`error.tsx`, `not-found.tsx`).
* Global loading indicators (Loaders) during API requests.

### 🔐 Authentication & Routing
* **Public routes:** Registration, Login.
* **Private routes:** Add Recipe, Profile (own recipes and favorites).
* **Global routes:** Home Page, Recipe Details (with restricted functionality for unauthenticated users).

### 📋 Pages & Capabilities
1. **Main Page:**
   * Search recipes by keyword.
   * Filter by category and ingredient.
   * Pagination via "Load More" button.
2. **Recipe View Page:**
   * Detailed information, instructions, ingredients, calorie count.
   * Ability to add/remove from favorites.
3. **Profile Page:**
   * View and manage personal added recipes.
   * View favorite recipes list.
4. **Add Recipe Page:**
   * Dynamic form with validation.
   * Dish image upload (preview).
   * Dynamic addition/removal of ingredients list.
