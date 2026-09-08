# Change Management Dashboard – Project Reference

This file is meant to reduce repeated prompt setup. Use it as the default project context when asking for changes, fixes, or new features.

## Project summary
- Product: Change Management dashboard
- Stack: React, TypeScript, Vite-style app structure, CRA-compatible app under `my-react-app/my-app`
- Primary app folder: `my-react-app/my-app`
- Main source folder: `src/`
- Main UI entry points: `src/App.tsx`, `src/main.tsx`

## Working app location
- Workspace root: `c:\Users\Cynthia Rivera\Nextcloud2\Apps\ChangeManagement`
- Actual app directory: `c:\Users\Cynthia Rivera\Nextcloud2\Apps\ChangeManagement\my-react-app\my-app`
- Run the app from that folder:
  - `cd my-react-app/my-app`
  - `npm install`
  - `npm start`

## Key project structure
- `src/App.tsx` – main app shell
- `src/components/` – reusable app components
  - `layout/` – `MainLayout`, `Sidebar`, `TopBar`
  - `shared/` – `AiModal`, `DocumentUpload`, `GanttChart`, `RegisterTable`
  - `ui/` – shared UI primitives like `Badge`, `Button`, `Card`, `ProgressBar`, `Table`
  - `views/` – page-level views such as `OverviewView`, `StakeholdersView`, `EngagementView`, `ResistanceView`, `ImpactView`, `AdkarView`, `RegisterView`
- `src/context/` – app state context providers
  - `CommunicationsContext.tsx`
  - `RegisterContext.tsx`
  - `ToastContext.tsx`
- `src/data/` – sample data and seed content
- `src/utils/` – helper logic
  - `csvExport.ts`
  - `dateHelpers.ts`
  - `localStorage.ts`
  - `tfidf.ts`
- `src/styles/` – global styling
- `src/types/` – TypeScript types

## App purpose and patterns
This app appears to be a change-management dashboard for planning, stakeholder analysis, engagement tracking, resistance / adoption insights, and register management. It uses:
- React functional components
- Context providers for shared application state
- Component-based layout and views
- Utility modules for data export and date handling
- Reusable UI primitives under `src/components/ui`

## Typical development flow
When making changes:
1. Identify the relevant view in `src/components/views/` or the relevant shared component.
2. Check context providers in `src/context/` if state or data flows are involved.
3. Preserve the existing component conventions and naming style.
4. Reuse utility functions instead of creating duplicate logic.
5. Verify via local app run and relevant UI behavior checks.

## Important notes
- Root `package.json` is minimal and not the active app package.
- The actual React app is in `my-react-app/my-app`.
- The app is in a change-management domain, so feature work often relates to dashboards, stakeholder data, communication plans, registers, and AI-assisted review utilities.

## Recommended prompt starter
Use this as a reusable context starter in future prompts:

> I’m working in a Change Management dashboard app built with React and TypeScript. The active app is in `my-react-app/my-app`, with main source files under `src/`. It includes layout, view, context, and utility modules for stakeholder tracking, register data, engagement, resistance, impact, and AI-assisted features. Please make the requested change in the existing app structure and keep the current architecture and naming conventions.

## Quick command list
```bash
cd my-react-app/my-app
npm install
npm start
npm test
npm run build
```

## Keep this file updated
If the project structure changes, add the new modules, commands, or architecture notes here so future prompts do not require reintroducing the same setup.
