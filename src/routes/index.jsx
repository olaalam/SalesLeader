import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { isAuthenticated } from '@/utils/auth';
import { LoginPage } from '@/components/LoginPage';
import Home from '@/Pages/Home';
import Visits from '@/Pages/Visits/Visits';
import VisitsAdd from '@/Pages/Visits/VisitsAdd';
import SalesAdd from '@/Pages/Sales/SalesAdd';
import Sales from '@/Pages/Sales/Sales';


// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Router Configuration
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (<ProtectedRoute><MainLayout /></ProtectedRoute>),
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <Home /> },

      // مثال لصفحة visits
      { path: 'visits', element: <Visits /> },
      { path: 'visits/add', element: <VisitsAdd /> },
      { path: 'visits/:id/edit', element: <VisitsAdd /> },

      // كرري نفس النمط لباقي الصفحات
      { path: 'sales', element: <Sales /> },
      { path: 'sales/add', element: <SalesAdd /> },
      { path: 'sales/:id/edit', element: <SalesAdd /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);