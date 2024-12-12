import { createSlice } from '@reduxjs/toolkit';

import { IRechargementState } from '../../@types/rechargement';
// ----------------------------------------------------------------------

const initialState: IRechargementState = {
  isLoading: false,
  isLoadingReloadTicketResto: false,
  isLoadingReloadEncouragement: false,
  isLoadingEvent: false,
  error: null,
  success: false,
  products: [],
  product: null,
  rechargementData: {
    activeStep: 0,
    employees: [],
    month: '',
    cagnotte: '',
    total: 0,
    linesToSend: null,
  },
  rechargementEvent: {
    activeStep: 0,
    employees: [],
    month: '',
    cagnotte: '',
  },
  rechargementEncouragement: {
    activeStep: 0,
    cagnottes: [],
  },
};

const slice = createSlice({
  name: 'rechargement',
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

    backStep(state) {
      state.rechargementData.activeStep -= 1;
    },

    nextStep(state) {
      state.rechargementData.activeStep += 1;
    },

    gotoStep(state, action) {
      const step = action.payload;
      state.rechargementData.activeStep = step;
    },

    createEmployeList(state, action) {
      state.rechargementData.employees = action.payload;
    },

    getRechargement(state) {
      state.isLoading = false;
    },
    addMonth(state, action) {
      state.rechargementData.month = action.payload;
    },
    addCagnotte(state, action) {
      state.rechargementData.cagnotte = action.payload;
    },

    addLines(state, action) {
      state.rechargementData.linesToSend = action.payload;
    },
    resetRechargement(state) {
      state.rechargementData.activeStep = 0;
      state.rechargementData.employees = [];
      state.rechargementData.month = '';
      state.rechargementData.cagnotte = '';
    },

    // rechargement event
    backStepEvent(state) {
      state.rechargementEvent.activeStep -= 1;
    },

    nextStepEvent(state) {
      state.rechargementEvent.activeStep += 1;
    },

    setEmployeListEvent(state, action) {
      state.rechargementEvent.employees = action.payload;
    },
    resetRechargementEvent(state) {
      state.rechargementEvent.activeStep = 0;
      state.rechargementEvent.employees = [];
    },

    // rechargement Encouragement
    backStepEncouragement(state) {
      state.rechargementEncouragement.activeStep -= 1;
    },

    nextStepEncouragement(state) {
      state.rechargementEncouragement.activeStep += 1;
    },
    setCagnotte(state, action) {
      state.rechargementEncouragement.cagnottes = action.payload;
    },
    resetRechargementEncouragement(state) {
      state.rechargementEncouragement.activeStep = 0;
      state.rechargementEncouragement.cagnottes = [];
    },

    /* Pre - rechargement des tickets resto  */

    setTotalMeals(state, action) {
      state.rechargementData.total = action.payload;
    },
    preReloadTicketRestoRequest(state, action) {
      state.isLoadingReloadTicketResto = true;
    },

    preReloadTicketRestoSuccess(state, action) {
      state.isLoadingReloadTicketResto = false;
      state.success = action.payload;
    },

    preReloadTicketRestoFailed(state, action) {
      state.isLoadingReloadTicketResto = false;
      state.error = action.payload;
    },

    /* rechargement des tickets resto  */
    ReloadTicketRestoRequest(state, action) {
      state.isLoadingReloadTicketResto = true;
    },

    ReloadTicketRestoSuccess(state, action) {
      state.isLoadingReloadTicketResto = false;
      state.success = action.payload;
    },

    ReloadTicketRestoFailed(state, action) {
      state.isLoadingReloadTicketResto = false;
      state.error = action.payload;
    },

    /* rechargement des evenemnts  */
    ReloadEventRequest(state, action) {
      state.isLoadingEvent = true;
    },

    ReloadEventSuccess(state, action) {
      state.isLoadingEvent = false;
      state.success = action.payload;
    },

    ReloadEventFailed(state, action) {
      state.isLoadingEvent = false;
      state.error = action.payload;
    },

    /* rechargement d'encouragement */
    ReloadEncouragementRequest(state, action) {
      state.isLoadingReloadEncouragement = true;
    },

    ReloadEncouragementSuccess(state, action) {
      state.isLoadingReloadEncouragement = false;
      state.success = action.payload;
    },

    ReloadEncouragementFailed(state, action) {
      state.isLoadingReloadEncouragement = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  gotoStep,
  backStep,
  nextStep,
  getRechargement,
  createEmployeList,
  addMonth,
  addCagnotte,
  resetRechargement,
  nextStepEncouragement,
  nextStepEvent,
  backStepEncouragement,
  backStepEvent,
  setCagnotte,
  resetRechargementEncouragement,
  setEmployeListEvent,
  resetRechargementEvent,
  ReloadTicketRestoSuccess,
  ReloadTicketRestoFailed,
  ReloadTicketRestoRequest,
  ReloadEncouragementFailed,
  ReloadEncouragementRequest,
  ReloadEncouragementSuccess,
  ReloadEventFailed,
  ReloadEventRequest,
  ReloadEventSuccess,
  preReloadTicketRestoFailed,
  preReloadTicketRestoRequest,
  preReloadTicketRestoSuccess,
  addLines,
  setTotalMeals,
} = slice.actions;
