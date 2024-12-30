import { takeLeading } from 'redux-saga/effects';
import {
  createAccountRequest,
  deleteAccountRequest,
  disableAccountRequest,
  enableAccountRequest,
  getAllaccounts,
  updateAccountRequest,
} from '../slices/accounts';

//redux
import {
  getUserFetch,
  resetPassword,
  updatePorfilRequest,
  updateFacialValueRequest,
  getInfoCompanyRequest,
  updatePorfilCompanyRequest,
  ForgotPasswordStepOneRequest,
  requestForgotPasswordStepTwo,
  getUserByTokenBowi,
} from '../slices/auth';
import {
  getAllCategoriesRequest,
  createCagnotteRequest,
  editCagnotteRequest,
  UnAssignEmployeeToCagnotteRequest,
  deleteCategoryRequest,
  AssignEmployeeToCagnotteRequest,
  getCategoryRequest,
} from '../slices/categories';
import {
  createEmployeeRequest,
  getAllEmployee,
  editEmployeeRequest,
  deleteEmployeeRequest,
  disableEmployeeRequest,
  editEmployeeWithoutCategoryRequest,
  getInfoEmployee,
  addEmployeesRequest,
  getEmployeesReportingRequest,
} from '../slices/employee';
import { getAllInvoices } from '../slices/invoice';
import { fetchDatacsvStart, fetchDatapdfStart, fetchDataStart, notificationSend } from '../slices/dataSlice'
import { updateDataStart } from '../slices/dataSlice'

import {
  preReloadTicketRestoRequest,
  ReloadEncouragementRequest,
  ReloadEventRequest,
  ReloadTicketRestoRequest,
} from '../slices/rechargement';
import { getPlafondsAdvantagesRequest, getTextsAdvantagesRequest } from '../slices/settings';
import {
  getStatisquesCompanyRequest,
  getStatsUsageAllEmployees,
  getStatsUsageCategory,
} from '../slices/statsiqtique';
import { getTransations } from '../slices/transations';
import {
  handleCreateAccount,
  handleDeleteAccount,
  handleDisableAccount,
  handleEnableAccount,
  handleGetAllAccounts,
  handleUpdateAccount,
} from './handlers/account';
import {
  handleForgotPasswordStepOne,
  handleForgotPasswordStepTwo,
  handleGetInfoCompany,
  handleLogin,
  handleLoginByTokenBowi,
  handleResetPassword,
  handleUpdateFacialValue,
  handleUpdateProfil,
  handleUpdateProfilCompany,
} from './handlers/auth';
import {
  handleGetAllCategories,
  handleCreateCategory,
  handleEditCategory,
  handleAssignEmpoyeeToCategory,
  handleAssignEmployeeToCategoryStandard,
  handleDeleteCategory,
  handleGetCategory,
} from './handlers/categories';

import {
  handleGetAllEmployees,
  handleCreateEmployee,
  handleEditEmployee,
  handleDeleteEmployee,
  // handleDisableEmployee,
  handleEditEmployeeWithoutCategory,
  handleGetInfoEmployee,
  handleAddEmployees,
  // handleChangeStatusContract,
  // handleDisableEmployee,
  handleChangeStatusContract,
  handleReportingEmployees,
} from './handlers/employee';
import { handleGetAllInvoices } from './handlers/invoice';
import { handleGetAllData, handleGetAllDatacsv, handleGetAllDatapdf, handlenotificationSend, handleUpdateData} from './handlers/dataSaga';
import {
  handleEncouragement,
  handleEvent,
  handlePreReloadTicketResto,
  handleReloadTicketResto,
} from './handlers/rechargement';
import { handleGetPlafondsAdvantages, handleGetTextsAdvantages } from './handlers/settings';
import {
  handleGetStatCatgeory,
  handleGetStatComany,
  handleGetStatEmployee,
} from './handlers/statistiques';
import { handleGetAllTransations } from './handlers/transations';

export default function* rootSaga() {
  //Auth
  yield takeLeading(getUserFetch.type, handleLogin);
  yield takeLeading(resetPassword.type, handleResetPassword);
  yield takeLeading(ForgotPasswordStepOneRequest.type, handleForgotPasswordStepOne);
  yield takeLeading(requestForgotPasswordStepTwo.type, handleForgotPasswordStepTwo);
  yield takeLeading(updatePorfilRequest.type, handleUpdateProfil);
  yield takeLeading(updateFacialValueRequest.type, handleUpdateFacialValue);
  yield takeLeading(getInfoCompanyRequest.type, handleGetInfoCompany);
  yield takeLeading(updatePorfilCompanyRequest.type, handleUpdateProfilCompany);
  // login super admin bowi with token
  yield takeLeading(getUserByTokenBowi.type, handleLoginByTokenBowi);

  // Collaborators -- Accounts
  yield takeLeading(getAllaccounts.type, handleGetAllAccounts);
  yield takeLeading(createAccountRequest.type, handleCreateAccount);
  yield takeLeading(updateAccountRequest.type, handleUpdateAccount);
  yield takeLeading(deleteAccountRequest.type, handleDeleteAccount);
  yield takeLeading(disableAccountRequest.type, handleDisableAccount);
  yield takeLeading(enableAccountRequest.type, handleEnableAccount);

  //Employee
  yield takeLeading(getAllEmployee.type, handleGetAllEmployees);
  yield takeLeading(getInfoEmployee.type, handleGetInfoEmployee);
  yield takeLeading(createEmployeeRequest.type, handleCreateEmployee);
  yield takeLeading(editEmployeeRequest.type, handleEditEmployee);
  yield takeLeading(editEmployeeWithoutCategoryRequest.type, handleEditEmployeeWithoutCategory);
  yield takeLeading(deleteEmployeeRequest, handleDeleteEmployee);
  yield takeLeading(AssignEmployeeToCagnotteRequest.type, handleAssignEmpoyeeToCategory);
  yield takeLeading(addEmployeesRequest.type, handleAddEmployees);
  // yield takeLeading(disableEmployeeRequest, handleDisableEmployee);
  yield takeLeading(disableEmployeeRequest, handleChangeStatusContract);
  yield takeLeading(getEmployeesReportingRequest, handleReportingEmployees);

  //  Cagnotte
  yield takeLeading(getAllCategoriesRequest.type, handleGetAllCategories);
  yield takeLeading(createCagnotteRequest.type, handleCreateCategory);
  yield takeLeading(editCagnotteRequest.type, handleEditCategory);
  yield takeLeading(UnAssignEmployeeToCagnotteRequest.type, handleAssignEmployeeToCategoryStandard);
  yield takeLeading(deleteCategoryRequest.type, handleDeleteCategory);
  yield takeLeading(getCategoryRequest.type, handleGetCategory);

  //stats
  yield takeLeading(getStatisquesCompanyRequest.type, handleGetStatComany);
  yield takeLeading(getStatsUsageAllEmployees.type, handleGetStatEmployee);
  yield takeLeading(getStatsUsageCategory.type, handleGetStatCatgeory);

  //rechargement
  yield takeLeading(preReloadTicketRestoRequest.type, handlePreReloadTicketResto);
  yield takeLeading(ReloadTicketRestoRequest.type, handleReloadTicketResto);
  yield takeLeading(ReloadEncouragementRequest.type, handleEncouragement);
  yield takeLeading(ReloadEventRequest.type, handleEvent);
  // invoice
  yield takeLeading(getAllInvoices.type, handleGetAllInvoices);
  //data
  yield takeLeading(fetchDataStart.type, handleGetAllData );
  yield takeLeading(fetchDatacsvStart.type, handleGetAllDatacsv );
  yield takeLeading(updateDataStart.type, handleUpdateData );
  yield takeLeading(notificationSend.type, handlenotificationSend );
  yield takeLeading(fetchDatapdfStart.type, handleGetAllDatapdf );
  // transations
  yield takeLeading(getTransations.type, handleGetAllTransations);

  // settings
  yield takeLeading(getPlafondsAdvantagesRequest.type, handleGetPlafondsAdvantages);
  yield takeLeading(getTextsAdvantagesRequest.type, handleGetTextsAdvantages);
}
