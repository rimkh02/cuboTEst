import { createSlice } from '@reduxjs/toolkit';
import { ICategoryState } from 'src/@types/category';

// ----------------------------------------------------------------------

const initialState: ICategoryState = {
  isLoading: false,
  isLoadingAction: false,
  isEmployeeLoading: false,
  error: null,
  success: false,
  cagnotte: null,
  category: null,
  categories: [],
  refresh: 0,
};

const slice = createSlice({
  name: 'cagnotte',
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
    getAllCategoriesRequest(state, action) {
      state.isLoading = true;
    },

    /*Success*/
    getAllCagnotteSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
      state.error = null;
      state.success = true;
    },

    /*Failure*/
    getAllCagnotteFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getCategoryRequest(state, action) {
      state.isLoading = true;
    },

    getCategorySuccess(state, action) {
      state.isLoading = false;
      state.category = action.payload;
      state.error = null;
      state.success = true;
    },

    getCategoryFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCagnotteRequest(state, action) {
      state.isLoadingAction = true;
    },

    createCagnotteSuccess(state, action) {
      state.isLoadingAction = false;
      state.error = null;
      state.success = true;
    },

    createCagnotteFailed(state, action) {
      state.isLoadingAction = false;
      state.error = action.payload;
      state.success = false;
    },

    editCagnotteRequest(state, action) {
      state.isLoadingAction = true;
    },

    editCagnotteSuccess(state, action) {
      state.isLoadingAction = false;
      state.success = true;
    },

    editCagnotteFailed(state, action) {
      state.isLoadingAction = false;
      state.error = action.payload;
      state.success = false;
    },

    deleteCategoryRequest(state, action) {
      state.isEmployeeLoading = true;
    },

    deleteCategorySuccess(state, action) {
      state.isEmployeeLoading = false;
      state.error = null;
      state.success = true;
      state.refresh = state.refresh + 1;
    },

    deleteCategoryFailed(state, action) {
      state.isEmployeeLoading = false;
      state.error = action.payload;
      state.success = false;
    },

    AssignEmployeeToCagnotteRequest(state, action) {
      state.isLoading = true;
    },

    AssignEmployeeToCagnotteSuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.refresh = state.refresh + 1;
    },

    AssignEmployeeToCagnotteFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    UnAssignEmployeeToCagnotteRequest(state, action) {
      state.isLoading = true;
    },

    UnAssignEmployeeToCagnotteSuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.refresh = state.refresh + 1;
    },

    UnAssignEmployeeToCagnotteFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  startLoading,
  hasError,
  getAllCategoriesRequest,
  getAllCagnotteSuccess,
  getAllCagnotteFailure,
  createCagnotteRequest,
  createCagnotteFailed,
  createCagnotteSuccess,
  editCagnotteFailed,
  editCagnotteRequest,
  editCagnotteSuccess,
  deleteCategoryFailed,
  deleteCategoryRequest,
  deleteCategorySuccess,
  AssignEmployeeToCagnotteFailed,
  AssignEmployeeToCagnotteRequest,
  AssignEmployeeToCagnotteSuccess,
  UnAssignEmployeeToCagnotteFailed,
  UnAssignEmployeeToCagnotteRequest,
  UnAssignEmployeeToCagnotteSuccess,
  getCategoryFailure,
  getCategoryRequest,
  getCategorySuccess,
} = slice.actions;
