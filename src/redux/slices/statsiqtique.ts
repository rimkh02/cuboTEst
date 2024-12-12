import { createSlice } from '@reduxjs/toolkit';
import { IStatistiquesState } from 'src/@types/statistiques';

// ----------------------------------------------------------------------

const initialState: IStatistiquesState = {
  isLoading: false,
  error: null,
  success: false,
  adminsCount: 0,
  managersCount: 0,
  employeesCount: 0,
  categoriesCount: 0,
  usageEmployees: null,
  usageCategory: null,
};

const slice = createSlice({
  name: 'statistiques',
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
    getStatisquesCompanyRequest(state) {
      state.isLoading = true;
    },

    /*Success*/
    getStatisquesCompanySuccess(state, action) {
      state.isLoading = false;
      state.managersCount = action.payload.managersCount;
      state.adminsCount = action.payload.adminsCount;
      state.employeesCount = action.payload.employeesCount;
      state.categoriesCount = action.payload.categoriesCount;
      state.error = null;
    },

    /*Failure*/
    getStatisquesCompanyFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // usage for all employees
    getStatsUsageAllEmployees(state) {
      state.isLoading = true;
    },

    getStatsUsageAllEmployeesSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.usageEmployees = action.payload;
    },

    getStatsUsageAllEmployeesFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // usage for category
    getStatsUsageCategory(state, action) {
      state.isLoading = true;
    },

    getStatsUsageCategorySuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.usageCategory = action.payload;
    },

    getStatsUsageCategoryFailure(state, action) {
      state.isLoading = false;
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
  getStatisquesCompanyFailure,
  getStatisquesCompanyRequest,
  getStatisquesCompanySuccess,
  getStatsUsageAllEmployees,
  getStatsUsageAllEmployeesFailure,
  getStatsUsageAllEmployeesSuccess,
  getStatsUsageCategory,
  getStatsUsageCategoryFailure,
  getStatsUsageCategorySuccess,
} = slice.actions;
