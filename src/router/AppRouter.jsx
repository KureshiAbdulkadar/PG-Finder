import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

// Layout Components - eager loaded
import MainLayout from '../components/layout/MainLayout/MainLayout';
import AdminLayout from '../components/layout/AdminLayout/AdminLayout';

// User Pages - eager loaded for fast first paint
import HomePage from '../pages/user/HomePage';
import SearchResultsPage from '../pages/user/SearchResultsPage';
import PropertyDetailPage from '../pages/user/PropertyDetailPage';
import WishlistPage from '../pages/user/WishlistPage';
import ContactPage from '../pages/user/ContactPage';
import LoginPage from '../pages/auth/LoginPage';

// Admin Pages - lazy loaded to isolate errors
const DashboardPage = lazy(() => import('../pages/admin/DashboardPage'));
const ManagePropertiesPage = lazy(() => import('../pages/admin/ManagePropertiesPage'));
const AddPropertyPage = lazy(() => import('../pages/admin/AddPropertyPage'));
const EditPropertyPage = lazy(() => import('../pages/admin/EditPropertyPage'));
const LeadsPage = lazy(() => import('../pages/admin/LeadsPage'));

import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const AdminFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-border border-t-brand-red rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-text-secondary">Loading admin panel...</p>
    </div>
  </div>
);

const ProtectedAdminRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/login" state={{ from: location, mode: 'admin' }} replace />;
  }

  return children;
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes with Main Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.SEARCH} element={<SearchResultsPage />} />
        <Route path={ROUTES.PROPERTY_DETAIL} element={<PropertyDetailPage />} />
        <Route path={ROUTES.WISHLIST} element={<WishlistPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Admin Routes with Admin Layout - lazy loaded */}
      <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
        <Route index element={
          <Suspense fallback={<AdminFallback />}>
            <DashboardPage />
          </Suspense>
        } />
        <Route path="properties" element={
          <Suspense fallback={<AdminFallback />}>
            <ManagePropertiesPage />
          </Suspense>
        } />
        <Route path="properties/add" element={
          <Suspense fallback={<AdminFallback />}>
            <AddPropertyPage />
          </Suspense>
        } />
        <Route path="properties/edit/:id" element={
          <Suspense fallback={<AdminFallback />}>
            <EditPropertyPage />
          </Suspense>
        } />
        <Route path="leads" element={
          <Suspense fallback={<AdminFallback />}>
            <LeadsPage />
          </Suspense>
        } />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
