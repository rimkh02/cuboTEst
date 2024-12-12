import { createSlice } from '@reduxjs/toolkit';
import { IAccountState } from 'src/@types/account';

// ----------------------------------------------------------------------

const initialState: IAccountState = {
  isLoading: false,
  error: null,
  success: false,
  account: null,
  accounts: null,
  refresh: 0,
  isLoadingData: false,
};

const slice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    /* All Collabrators*/
    getAllaccounts(state) {
      state.isLoadingData = true;
    },

    getAllAccountsSuccess(state, action) {
      state.isLoadingData = false;
      state.accounts = action.payload.accounts;
      state.error = null;
      state.success = true;
    },

    getAllAccountsFailure(state, action) {
      state.isLoadingData = false;
      state.error = action.payload;
    },

    /* Create Collabrator*/
    createAccountRequest(state, action) {
      state.isLoading = true;
    },

    createAccountSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.success = true;
      state.refresh = state.refresh + 1;
    },

    createAccountFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },

    /* Update Collabrator*/

    updateAccountRequest(state, action) {
      state.isLoading = true;
    },

    updateAccountSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.success = true;
      state.refresh = state.refresh + 1;
    },

    updateAccountFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },

    /* Delete Collabrator*/
    deleteAccountRequest(state, action) {
      state.isLoading = true;
    },

    deleteAccountSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.success = true;
      state.refresh = state.refresh + 1;
    },

    deleteAccountFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },

    /* Disable - enable Collabrator*/
    disableAccountRequest(state, action) {
      state.isLoading = true;
    },

    disableAccountSuccess(state, action) {
      state.isLoading = false;
      state.refresh = state.refresh + 1;
      state.error = null;
      state.success = true;
    },

    disableAccountFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },

    /* Disable - enable Collabrator*/
    enableAccountRequest(state, action) {
      state.isLoading = true;
    },

    enableAccountSuccess(state, action) {
      state.isLoading = false;
      state.refresh = state.refresh + 1;
      state.error = null;
      state.success = true;
    },

    enableAccountFailed(state, action) {
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
  getAllAccountsFailure,
  getAllAccountsSuccess,
  getAllaccounts,
  createAccountFailed,
  createAccountRequest,
  createAccountSuccess,
  updateAccountFailed,
  updateAccountRequest,
  updateAccountSuccess,
  deleteAccountFailed,
  deleteAccountRequest,
  deleteAccountSuccess,
  disableAccountFailed,
  disableAccountRequest,
  disableAccountSuccess,
  enableAccountFailed,
  enableAccountRequest,
  enableAccountSuccess,
  hasError,
} = slice.actions;
