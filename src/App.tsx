import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RegisterProvider } from './context/RegisterContext';
import { CommunicationsProvider } from './context/CommunicationsContext';
import { ToastProvider } from './context/ToastContext';
import { MainLayout } from './components/layout/MainLayout/MainLayout';

// Lazy load views (optional but recommended)
const OverviewView = React.lazy(async () => {
  const module = await import('./components/views/OverviewView/OverviewView');
  return { default: module.OverviewView };
});
const StakeholdersView = React.lazy(async () => {
  const module = await import('./components/views/StakeholdersView/StakeholdersView');
  return { default: module.StakeholdersView };
});
const EngagementView = React.lazy(async () => {
  const module = await import('./components/views/EngagementView/EngagementView');
  return { default: module.EngagementView };
});
const ImpactView = React.lazy(async () => {
  const module = await import('./components/views/ImpactView/ImpactView');
  return { default: module.ImpactView };
});
const ResistanceView = React.lazy(async () => {
  const module = await import('./components/views/ResistanceView/ResistanceView');
  return { default: module.ResistanceView };
});
const AdkarView = React.lazy(async () => {
  const module = await import('./components/views/AdkarView/AdkarView');
  return { default: module.AdkarView };
});
const RegisterView = React.lazy(async () => {
  const module = await import('./components/views/RegisterView/RegisterView');
  return { default: module.RegisterView };
});

function App() {
  return (
    <ToastProvider>
      <RegisterProvider>
        <CommunicationsProvider>
          <MainLayout>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Navigate to="/overview" replace />} />
                <Route path="/overview" element={<OverviewView />} />
                <Route path="/stakeholders" element={<StakeholdersView />} />
                <Route path="/engagement" element={<EngagementView />} />
                <Route path="/impact" element={<ImpactView />} />
                <Route path="/resistance" element={<ResistanceView />} />
                <Route path="/adkar" element={<AdkarView />} />
                <Route path="/register" element={<RegisterView />} />
              </Routes>
            </React.Suspense>
          </MainLayout>
        </CommunicationsProvider>
      </RegisterProvider>
    </ToastProvider>
  );
}

export default App;