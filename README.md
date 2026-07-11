# 🚀  CRM (Frontend)

This project is a production-ready **CRM Web Application** built to manage leads efficiently. It features a high-end SaaS aesthetic, interactive AI-powered CSV imports, and a mobile-first responsive architecture.

---

## 🎥 Project Walkthrough & Features

The application is built with a premium **Dark Mode** interface and navigated via a sleek sidebar containing two main pages:

### 1. Manage Leads
- **Data Table**: Displays lead data (currently mocked) with a custom-designed scrollbar for a polished look.
- **Loading State**: Features a premium shimmer skeleton effect that prevents layout shifts while the table is loading.
- **Smart Filtering**: Built-in filters for lead status (e.g., All, Sale, Sale Done).
- **Visual Badges**: Dynamic, color-coded badges applied to the `Lead Status` and `Source` columns for quick visual scanning.

### 2. Import CSV
- **Guided Flow**: A step-by-step UI guiding the user through the upload process.
- **Strict Validation**: Drag-and-drop zone that exclusively accepts `.csv` files. Invalid files trigger immediate error toasts.
- **Interactive Preview**: Users can preview their file data before finalizing the import.
- **Error Handling**: If a CSV is uploaded without headers or valid data, the system gracefully handles it by displaying a "no rows found" warning instead of crashing.
- **Reusability**: Users can easily reset the state to upload another file seamlessly.

---

## 🏗️ Architectural Decisions & Trade-offs

### 1. Modular Directory Structure
The project follows a clean architecture using the **Next.js App Router** (`app/`). Reusable parts are separated into specific domains like `components/import-csv` and `components/manage-leads`.
- **Decision**: Ensures the codebase remains scalable and easy to navigate as the CRM grows.
- **Trade-off**: Requires slightly more planning when creating new files, but prevents messy code in larger projects.

### 2. Hybrid State Management (Zustand + TanStack Query)
I utilized **TanStack Query (React Query)** for server-state (fetching data, caching) and **Zustand** for global UI state (managing leads in the frontend).
- **Decision**: TanStack Query automatically handles loading states and cache, while Zustand provides a simple way to share data across different components without heavy setup.
- **Trade-off**: Moves away from Redux, which has more tools but requires too much boilerplate code for an app of this size.

### 3. Performance & UX Optimizations
To ensure a premium, production-ready feel, I implemented several user experience improvements:
- **Optimistic UI & Skeletons**: Custom skeleton loaders are shown while fetching data so the screen doesn't "jump" unexpectedly.
- **Smooth Animations**: Uses **Framer Motion** for elegant page transitions and micro-interactions (like the upload progress bar).
- **Real-time Feedback**: Interactive toast notifications alert the user instantly upon success or failure.

---

## ✨ Key Features & Requirements Met

- [x] **AI CSV Importer**: Interactive drag-and-drop uploader with real-time progress tracking.
- [x] **Data Table**: Manage leads efficiently with built-in search and filtering capabilities.
- [x] **Responsive UI**: Adaptive layouts that work flawlessly on both desktop and mobile devices.
- [x] **Clean Codebase**: Strictly separated components, stores, and utility functions.

---

## 🛠️ Technical Stack (Modern Stack)

| Category | Technology |
| :--- | :--- |
| **Framework** | **Next.js (App Router)** |
| **Styling** | **Tailwind CSS** |
| **State Management** | **Zustand** |
| **Data Fetching** | **TanStack Query + Axios** |
| **Animations** | **Framer Motion** |
| **Icons & UI** | **Lucide React / Shadcn UI** |

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
# API Base URL (Backend Connection)
NEXT_PUBLIC_API_URL=http://localhost:5000
```
*(Note: Replace this with your production backend URL when deploying to Vercel).*

---

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
frontend/
├── app/                # Next.js App Router pages and layouts
├── components/         # Universal UI components (Layout, Base UI)
│   ├── import-csv/     # File upload and progress components
│   ├── manage-leads/   # Data tables and search filters
│   └── ui/             # Base design system components
├── constants/          # Static data and configuration constants
├── lib/                # Shared utilities and icons
├── public/             # Static assets (images, icons)
├── store/              # Zustand global state management
├── testing_files/      # Sample files for testing CSV imports
├── .env.local          # Environment variables (API URL)
├── .gitignore          # Files to ignore in Git
├── jsconfig.json       # JS path mapping configuration
├── next.config.ts      # Next.js application configuration
├── package.json        # Project metadata and dependencies list
└── package-lock.json   # Exact versions of installed packages
```

---

## 🤝 Submission Checklist

- [x] Responsive & accessible UI.
- [x] Frontend validation with clear error responses.
- [x] Loading indicators & Toast notifications.
- [x] Detailed README with architectural overview.
