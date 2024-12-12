import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from 'src/@types/auth';

const initialState: IAuthState = {
  isLoading: false,
  isLoadingUpdate: false,
  isLoadingForget: false,
  user: null,
  company: null,
  configurations: null,
  isInitialized: false,
  isAuthenticated: false,
  error: null,
  errorForget: false,
  success: '',
  refresh: 0,
  temporal: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    init(state, action) {
      // console.log('init', action.payload.user);
      state.isInitialized = true;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.temporal = action.payload.temporal;
    },
    // GET User
    getUserFetch(state, action) {
      state.isLoading = true;
    },
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload.account;
      //state.user = action.payload.user;
      //state.company = action.payload.company;
      state.company = action.payload.account.company;
      state.isAuthenticated = true;
      state.error = null;
    },

    getUserFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    /* Update profil de l'admin */
    updatePorfilRequest(state, action) {
      state.isLoading = true;
    },

    updatePorfilSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
      state.error = null;
    },

    updatePorfilFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    /* Update profil de l'entreprise */
    updatePorfilCompanyRequest(state, action) {
      state.isLoadingUpdate = true;
    },

    updatePorfilCompanySuccess(state, action) {
      state.isLoadingUpdate = false;
      state.success = action.payload;
      state.error = null;
      state.user.company = action.payload;
      state.company = action.payload;
    },

    updatePorfilCompanyFailure(state, action) {
      state.isLoadingUpdate = false;
      state.error = action.payload;
    },

    forgotPassword(state, action) {
      state.isLoading = true;
    },

    resetPassword(state, action) {
      state.isLoading = true;
      state.error = null;
      state.refresh = state.refresh + 1;
    },

    /* -------------- Forgot  Password STEP 1 --------------- */
    ForgotPasswordStepOneRequest(state, action) {
      state.isLoadingForget = true;
    },

    ForgotPasswordStepOneSuccess(state, action) {
      state.isLoadingForget = false;
      state.success = action.payload;
      state.errorForget = false;
    },

    ForgotPasswordStepOneFailure(state, action) {
      state.isLoadingForget = false;
      state.errorForget = action.payload;
    },

    /* -------------- Forgot  Password STEP 2 --------------- */

    requestForgotPasswordStepTwo(state, action) {
      state.isLoadingForget = true;
    },

    ForgotPasswordStepTwoSuccess(state, action) {
      state.isLoadingForget = false;
      state.success = action.payload;
      state.errorForget = false;
    },

    ForgotPasswordStepTwoFailure(state, action) {
      state.isLoadingForget = false;
      state.errorForget = action.payload;
    },

    /*Configuration */
    updateFacialValueRequest(state, action) {
      state.isLoading = true;
    },

    updateFacialValueSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
      state.company = action.payload.company;
      state.user.company = action.payload.company;
      state.error = null;
      state.refresh = state.refresh + 1;
    },

    updateFacialValueFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    /* Company Info --- offre */
    getInfoCompanyRequest(state) {
      state.isLoading = true;
    },

    getInfoCompanySuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
      state.error = null;
      state.company = action.payload.company;
      state.configurations = action.payload.configurations;
    },

    getInfoCompanyFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Login with token bowi for super-admin
    getUserByTokenBowi(state, action) {
      state.isLoading = true;
    },
    getUserByTokenBowiSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload.account;
      state.company = action.payload.account.company;
      state.temporal = true;
      state.isAuthenticated = true;
      state.error = null;
    },

    getUserByTokenBowiFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Success Message
    successMessage(state, action) {
      state.isLoading = false;
      state.success = action.payload;
      state.error = null;
    },
    logout: (state) => {
      state.isLoading = false;
      state.user = null;
    },
  },
});
export const {
  getUserFetch,
  getUserSuccess,
  getUserFailure,
  forgotPassword,
  init,
  hasError,
  successMessage,
  resetPassword,
  logout,
  updatePorfilFailure,
  updatePorfilRequest,
  updatePorfilSuccess,
  updateFacialValueFailure,
  updateFacialValueRequest,
  updateFacialValueSuccess,
  getInfoCompanyFailure,
  getInfoCompanyRequest,
  getInfoCompanySuccess,
  updatePorfilCompanyRequest,
  updatePorfilCompanyFailure,
  updatePorfilCompanySuccess,
  ForgotPasswordStepOneFailure,
  ForgotPasswordStepOneSuccess,
  ForgotPasswordStepTwoFailure,
  ForgotPasswordStepTwoSuccess,
  ForgotPasswordStepOneRequest,
  requestForgotPasswordStepTwo,
  getUserByTokenBowi,
  getUserByTokenBowiFailure,
  getUserByTokenBowiSuccess,
} = slice.actions;

export default slice.reducer;
