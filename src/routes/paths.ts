// ----------------------------------------------------------------------

import FacturePage from "src/pages/dashboard/FacturePage";

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  maintenance: '/maintenance',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  ResetPasswordPage: '/reset_password',
  redirection: '/redirection',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    homeComany: path(ROOTS_DASHBOARD, '/home'),
    setting: path(ROOTS_DASHBOARD, '/settings'),
  },

  company: {
    root: path(ROOTS_DASHBOARD, '/company/list'),
    new: path(ROOTS_DASHBOARD, '/company/new'),
    list: path(ROOTS_DASHBOARD, '/company/list'),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/company/${id}/edit`),
  },
  cagnotte: {
    root: path(ROOTS_DASHBOARD, '/cagnotte/list'),
    new: path(ROOTS_DASHBOARD, '/cagnotte/new'),
    list: path(ROOTS_DASHBOARD, '/cagnotte/list'),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/cagnotte/${name}/edit`),
    assign: (id: string) => path(ROOTS_DASHBOARD, `/cagnotte/${id}`),
    listAssign: (id: string) => path(ROOTS_DASHBOARD, `/cagnotte/${id}/listEmployees`),
  },
  rechargement: {
    root: path(ROOTS_DASHBOARD, '/rechargement'),
    mealTicket: path(ROOTS_DASHBOARD, '/rechargement/mealTicket'),
    exceptionalEvents: path(ROOTS_DASHBOARD, '/rechargement/exceptionalEvents'),
    exceptionalEncouragement: path(ROOTS_DASHBOARD, '/rechargement/exceptionalEncouragement'),
  },
  category: {
    root: path(ROOTS_DASHBOARD, '/category/list'),
    new: path(ROOTS_DASHBOARD, '/category/new'),
    list: path(ROOTS_DASHBOARD, '/category/list'),
  },

  employee: {
    root: path(ROOTS_DASHBOARD, '/employee/list'),
    new: path(ROOTS_DASHBOARD, '/employee/new'),
    list: path(ROOTS_DASHBOARD, '/employee/list'),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/employee/${id}/edit`),
  },
  reporting: {
    root: path(ROOTS_DASHBOARD, '/reporting'),
  },
  FacturePage: {
    root: path(ROOTS_DASHBOARD,'/facture'),
    list: path(ROOTS_DASHBOARD, '/facture/list')
  },
  facturation: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/details`),
  },

  transations: {
    root: path(ROOTS_DASHBOARD, '/transations'),
    list: path(ROOTS_DASHBOARD, `/transations/list`),
    view: (id: string) => path(ROOTS_DASHBOARD, `/transations/${id}/details`),
  },

  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
  },

};
