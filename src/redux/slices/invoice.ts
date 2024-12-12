import { createSlice } from '@reduxjs/toolkit';

import { IInvoiceState } from 'src/@types/invoice';

// ----------------------------------------------------------------------

const initialState: IInvoiceState = {
  isLoading: false,
  error: null,
  success: false,
  invoice: null,
  invoices: null,
  refresh: 0,
};

const slice = createSlice({
  name: 'invoice',
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
    getAllInvoices(state) {
      state.isLoading = true;
    },

    /*Success*/
    getAllInvoicesSuccess(state, action) {
      state.isLoading = false;
      state.invoices = action.payload;
      state.error = null;
      state.success = true;
    },

    /*Failure*/
    getAllInvoicesFailure(state, action) {
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
  getAllInvoices,
  getAllInvoicesFailure,
  getAllInvoicesSuccess,
} = slice.actions;
