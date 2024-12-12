import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts

import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
//import { PATH_AFTER_LOGIN } from '../config';
//
import {
  // Auth
  LoginPage,
  NewPasswordPage,
  ResetPasswordPage,
  // Dashboard: WAWASHI
  HomeCompany,
  // setting
  SettingsPage,
  // facturation
  FacturationPage,
  ReportingPage,
  FacturationListPage,
  // employee
  EmployeeCreatePage,
  EmployeeEditPage,
  // categories
  CagnotteListPage,
  CagnotteEditPage,
  CagnotteCreatePage,
  EmployeListOfCagnottePage,
  // advantages
  AdvantagesListPage,
  // rechargements
  RechargmentPage,
  RechargmentHomePage,
  RechargmentEventPage,
  RechargmentEncouragementPage,
  // others pages
  Page500,
  Page403,
  Page404,
  MaintenancePage,
  // transations
  TransationsListPage,
  TransationDetailsPage,
  // rdurection
  PageRedirection,
} from './elements';
import BaseGuard from 'src/auth/BaseGuard';
import EmployeeListPage from 'src/pages/dashboard/employee-list-page';
import NewPasswordCompanyPage from 'src/pages/dashboard/reset-password-page';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },

        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password', element: <NewPasswordPage /> },
          ],
        },
      ],
    },

    // Dashboard
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={'/dashboard/home'} replace />, index: true },
        {
          path: 'home',
          element: (
            <BaseGuard>
              <HomeCompany />
            </BaseGuard>
          ),
        },
        {
          path: 'employee',
          children: [
            {
              element: (
                <BaseGuard>
                  <Navigate to="/dashboard/employee/list" replace />, index: true
                </BaseGuard>
              ),
            },
            {
              path: 'list',
              element: (
                <BaseGuard>
                  <EmployeeListPage />
                </BaseGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <BaseGuard>
                  <EmployeeCreatePage />
                </BaseGuard>
              ),
            },
            {
              path: ':id/edit',
              element: (
                <BaseGuard>
                  <EmployeeEditPage />
                </BaseGuard>
              ),
            },
          ],
        },
        {
          path: 'cagnotte',
          children: [
            {
              element: (
                <BaseGuard>
                  <Navigate to="/dashboard/cagnotte/list" replace />, index: true{' '}
                </BaseGuard>
              ),
            },
            {
              path: 'list',
              element: (
                <BaseGuard>
                  <CagnotteListPage />
                </BaseGuard>
              ),
            },

            {
              path: ':id/edit',
              element: (
                <BaseGuard>
                  <CagnotteEditPage />
                </BaseGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <BaseGuard>
                  <CagnotteCreatePage />
                </BaseGuard>
              ),
            },
            {
              path: ':id/listEmployees',
              element: (
                <BaseGuard>
                  <EmployeListOfCagnottePage />
                </BaseGuard>
              ),
            },
          ],
        },

        {
          path: 'rechargement',
          children: [
            {
              element: (
                <BaseGuard>
                  <Navigate to="/dashboard/rechargement" replace />, index: true{' '}
                </BaseGuard>
              ),
            },

            {
              path: '',
              element: (
                <BaseGuard>
                  <RechargmentHomePage />
                </BaseGuard>
              ),
            },
            {
              path: 'mealTicket',
              element: (
                <BaseGuard>
                  <RechargmentPage />
                </BaseGuard>
              ),
            },
            {
              path: 'exceptionalEvents',
              element: (
                <BaseGuard>
                  <RechargmentEventPage />
                </BaseGuard>
              ),
            },
            {
              path: 'exceptionalEncouragement',
              element: (
                <BaseGuard>
                  <RechargmentEncouragementPage />
                </BaseGuard>
              ),
            },
          ],
        },
        {
          path: 'reporting',
          element: (
            <BaseGuard>
              <ReportingPage />
            </BaseGuard>
          ),
        },
        {
          path: 'transations',
          children: [
            {
              element: (
                <BaseGuard>
                  <Navigate to="/dashboard/transations/list" replace />, index: true
                </BaseGuard>
              ),
            },
            {
              path: 'list',
              element: (
                <BaseGuard>
                  <TransationsListPage />
                </BaseGuard>
              ),
            },
            {
              path: ':id/details',
              element: (
                <BaseGuard>
                  <TransationDetailsPage />
                </BaseGuard>
              ),
            },
          ],
        },
        {
          path: 'invoice',
          children: [
            {
              element: (
                <BaseGuard>
                  <Navigate to="/dashboard/invoice/list" replace />, index: true
                </BaseGuard>
              ),
            },
            {
              path: 'list',
              element: (
                <BaseGuard>
                  <FacturationListPage />
                </BaseGuard>
              ),
            },
            {
              path: ':id/details',
              element: (
                <BaseGuard>
                  <FacturationPage />
                </BaseGuard>
              ),
            },
          ],
        },

        {
          path: 'category',
          children: [
            {
              element: (
                <BaseGuard>
                  <Navigate to="/dashboard/category/list" replace />, index: true{' '}
                </BaseGuard>
              ),
            },
            {
              path: 'list',
              element: (
                <BaseGuard>
                  <AdvantagesListPage />
                </BaseGuard>
              ),
            },
          ],
        },

        { path: 'settings', element: <SettingsPage /> },
      ],
    },

    // Main Routes
    {
      children: [
        {
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
          index: true,
        },
      ],
    },

    {
      element: <CompactLayout />,
      children: [
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        {
          path: 'redirection',
          element: <PageRedirection />,
        },
        {
          path: 'reset_password',
          element: (
            <BaseGuard>
              <NewPasswordCompanyPage />
            </BaseGuard>
          ),
        },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
