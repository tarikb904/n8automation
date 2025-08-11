import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Toaster } from './components/ui/toaster';

// Page imports
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Workflows from './pages/Workflows';
import WorkflowsSearch from './pages/WorkflowsSearch';
import WorkflowView from './pages/WorkflowView';
import Pricing from './pages/Pricing';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import { AuthPage } from './components/auth/AuthPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/pricing" element={<Pricing />} />
        
        {/* Protected routes with dashboard layout */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/workflows" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Workflows />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/workflows/search" element={
          <ProtectedRoute>
            <DashboardLayout>
              <WorkflowsSearch />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/workflow/:id" element={
          <ProtectedRoute>
            <DashboardLayout>
              <WorkflowView />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/settings" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}

export default App;