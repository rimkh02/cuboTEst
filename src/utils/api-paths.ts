export const apiUrl = process.env.REACT_APP_HOST_API_KEY;
export enum ServicePaths {
  //Access Request
  login = '/auth/login',
  ResetPassword = '/auth/update-password',
  forgetPasswordStepOn = '/auth/reset-my-password/step-1',
  forgetPasswordStepTwo = '/auth/reset-my-password/step-2',

  // Profil
  updateProfil = '/accounts/my-profile',

  // Employees
  employees = '/employees',
  createEmployee = '/employees',
  editEmployee = '/employees',
  deleteEmployee = '/employees',
  disableEmployee = '/employees',
  infoEmployee = '/employees',
  importEmployees = '/employees/import/csv',
  changeStatusContract = '/contract',
  updateContract = '/contracts',
  reportingEmployees = '/expenses/export-zip',

  // Catégories
  getAllCategories = '/categories',
  createCategory = '/categories',
  editCategory = '/categories',
  deleteCategory = '/categories',
  assignEmployeeToCategory = '/categories',
  assignEmployeeToCategoryStandard = '/categories/employees',
  getCategory = '/categories',

  //unassignEmployeeToCagnotte = '/employees',
  statCompany = '/stats',
  statEmployees = '/stats/usage-all-employees',
  statCatgeory = '/stats/usage-category-employees',
  statSuperAdmin = '/stats/super-admin',
  updateFacialValue = '/company/ticket-restaurant',
  getInfoCompany = '/company/info',
  updateProfilCompany = '/company/info',

  // colaborators
  allAccounts = '/accounts',
  createAccounts = '/accounts',
  updateAccounts = '/accounts',
  deleteAccounts = '/accounts',
  disableAccount = '/accounts',

  // rechargement
  reloadTicketResto = '/wallets/reload-ticket-restaurants',
  preReloadTicketResto = '/wallets/reload-ticket-restaurants',
  reloadEncouragement = '/wallets/reload-categories',
  reloadEvent = '/wallets/reload-for-employees',

  // invoice
  getAlliInvoices = '/invoices',

  // transations
  getAllTransations = '/transactions',

  // login with token bowi
  refreshToken = '/auth/refresh',

  // settings
  plafondsAdvantages = '/configurations/advantages-limits',
  textsAdvantages = '/configurations/advantages-texts',

  //test
  tmp_test = '/employees-expenses',
  tmp_testt = '/export/employees-expenses/csv',
  tmp_notif = '/employees-expenses/staff/notifications',
  tmp_pdf = '/monthly-invoice',
  // post_test = '/employees-expenses/:expenseId=${/respond',
}
