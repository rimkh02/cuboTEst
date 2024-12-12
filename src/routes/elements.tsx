import { Suspense, lazy, ElementType } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

// DASHBOARD
export const HomeCompany = Loadable(lazy(() => import('../pages/dashboard/home-company')));
export const SettingsPage = Loadable(lazy(() => import('../pages/dashboard/settings-page')));

//Employee
export const EmployeeCreatePage = Loadable(
  lazy(() => import('../pages/dashboard/employee-create-page'))
);
export const EmployeeEditPage = Loadable(
  lazy(() => import('../pages/dashboard/employee-edit-page'))
);
//Company
export const ResetPasswordCompanyPage = Loadable(
  lazy(() => import('../pages/dashboard/reset-password-page'))
);

//Rechargment
export const RechargmentPage = Loadable(
  lazy(() => import('../pages/dashboard/rechargement-meal-page'))
);
export const RechargmentHomePage = Loadable(
  lazy(() => import('../pages/dashboard/rechargement-home-page'))
);

export const RechargmentEventPage = Loadable(
  lazy(() => import('../pages/dashboard/rechargement-event-page'))
);
export const RechargmentEncouragementPage = Loadable(
  lazy(() => import('../pages/dashboard/rechargement-encouragement-page'))
);

//Categories
export const AdvantagesListPage = Loadable(
  lazy(() => import('../pages/dashboard/advantages-list-page'))
);

export const CagnotteListPage = Loadable(
  lazy(() => import('../pages/dashboard/categories-list-page'))
);
export const CagnotteCreatePage = Loadable(
  lazy(() => import('../pages/dashboard/category-create-page'))
);

export const CagnotteEditPage = Loadable(
  lazy(() => import('../pages/dashboard/category-edit-page'))
);
export const EmployeListOfCagnottePage = Loadable(
  lazy(() => import('../pages/dashboard/list-employe-of-category'))
);

// Reporting
export const ReportingPage = Loadable(lazy(() => import('../pages/dashboard/reporting-page')));
//facture
export const FacturePage = Loadable(lazy(() => import('../pages/dashboard/FacturePage')));
// Facturation
export const FacturationPage = Loadable(
  lazy(() => import('../pages/dashboard/invoice-datails-page'))
);
// transation
export const TransationsListPage = Loadable(
  lazy(() => import('../pages/dashboard/transations-list-page'))
);

export const TransationDetailsPage = Loadable(
  lazy(() => import('../pages/dashboard/transations-details-page'))
);
export const FacturationListPage = Loadable(
  lazy(() => import('../pages/dashboard/invoice_list_page'))
);
// Redirection page
export const PageRedirection = Loadable(lazy(() => import('../pages/dashboard/redirection-page')));

// MAIN
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));

export const MaintenancePage = Loadable(lazy(() => import('../pages/MaintenancePage')));
