import { createSlice } from '@reduxjs/toolkit';
import { IEmployeeState } from 'src/@types/employee';

// ----------------------------------------------------------------------

const initialState: IEmployeeState = {
  isLoading: false,
  isEmployeeLoading: false,
  isLoadingReprting: false,
  error: null,
  success: false,
  employee: null,
  employees: null,
  totalEmployees: 0,
  refresh: 0,
  importEmployees: null,
  reporting: null,
};

const slice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    /*Pending*/
    getAllEmployee(state, action) {
      state.isLoading = true;
    },

    /*Success*/
    getAllEmployeeSuccess(state, action) {
      state.isLoading = false;
      state.employees = action.payload;
      //  state.totalEmployees = action.payload.total;
      state.error = null;
      state.success = true;
    },

    /*Failure*/
    getAllEmployeeFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getInfoEmployee(state, action) {
      state.isLoading = true;
    },

    getInfoEmployeeSuccess(state, action) {
      state.isLoading = false;
      state.employee = action.payload;
      state.error = null;
      state.success = true;
    },

    getInfoEmployeeFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    createEmployeeRequest(state, action) {
      state.isEmployeeLoading = true;
    },

    createEmployeeSuccess(state, action) {
      state.isEmployeeLoading = false;
      state.error = null;
      state.success = true;
      state.refresh = state.refresh + 1;
    },

    createEmployeeFailed(state, action) {
      state.isEmployeeLoading = false;
      state.error = action.payload;
      state.success = false;
    },

    editEmployeeRequest(state, action) {
      state.isEmployeeLoading = true;
    },

    editEmployeeSuccess(state, action) {
      state.isEmployeeLoading = false;
      state.error = null;
      state.success = true;
      state.refresh = state.refresh + 1;
    },

    editEmployeeWithoutCategoryFailed(state, action) {
      state.isEmployeeLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    editEmployeeWithoutCategoryRequest(state, action) {
      state.isEmployeeLoading = true;
    },

    editEmployeWithoutCategoryeSuccess(state, action) {
      state.isEmployeeLoading = false;
      state.error = null;
      state.success = true;
      state.refresh = state.refresh + 1;
    },

    editEmployeeFailed(state, action) {
      state.isEmployeeLoading = false;
      state.error = action.payload;
      state.success = false;
    },

    deleteEmployeeRequest(state, action) {
      state.isEmployeeLoading = true;
    },

    deleteEmployeeSuccess(state, action) {
      state.isEmployeeLoading = false;
      state.error = null;
      state.success = true;
      state.refresh = state.refresh + 1;
    },

    deleteEmployeeFailed(state, action) {
      state.isEmployeeLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    disableEmployeeRequest(state, action) {
      state.isEmployeeLoading = true;
    },

    disableEmployeeSuccess(state, action) {
      state.isEmployeeLoading = false;
      state.refresh = state.refresh + 1;
      state.error = null;
      state.success = true;
    },

    disableEmployeeFailed(state, action) {
      state.isEmployeeLoading = false;
      state.error = action.payload;
      state.success = false;
    },

    // for import employees from exel
    addEmployeesRequest(state, action) {
      state.isEmployeeLoading = true;
    },
    addEmployeesSuccess(state, action) {
      state.isEmployeeLoading = false;
      state.error = null;
      state.success = true;
      state.importEmployees = action.payload;
      state.refresh = state.refresh + 1;
    },
    addEmployeesFailed(state, action) {
      state.isEmployeeLoading = false;
      state.error = action.payload;
      state.success = false;
    },

    // Employees reporting
    getEmployeesReportingRequest(state, action) {
      state.isLoadingReprting = true;
    },

    getEmployeesReportingSuccess(state, action) {
      state.isLoadingReprting = false;
      state.error = null;
      state.reporting = action.payload;
    },

    getEmployeesReportingFailure(state, action) {
      state.isLoadingReprting = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  startLoading,
  hasError,
  getAllEmployee,
  getAllEmployeeSuccess,
  getAllEmployeeFailure,
  createEmployeeFailed,
  createEmployeeSuccess,
  createEmployeeRequest,
  editEmployeeFailed,
  editEmployeeRequest,
  editEmployeeSuccess,
  deleteEmployeeFailed,
  deleteEmployeeRequest,
  deleteEmployeeSuccess,
  disableEmployeeFailed,
  disableEmployeeRequest,
  disableEmployeeSuccess,
  editEmployeWithoutCategoryeSuccess,
  editEmployeeWithoutCategoryFailed,
  editEmployeeWithoutCategoryRequest,
  addEmployeesFailed,
  addEmployeesRequest,
  addEmployeesSuccess,
  getInfoEmployee,
  getInfoEmployeeFailure,
  getInfoEmployeeSuccess,
  getEmployeesReportingFailure,
  getEmployeesReportingRequest,
  getEmployeesReportingSuccess,
} = slice.actions;
