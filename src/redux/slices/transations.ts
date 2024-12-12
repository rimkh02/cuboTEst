import { createSlice } from '@reduxjs/toolkit';

import { ITransationsState } from 'src/@types/transations';

// ----------------------------------------------------------------------

const initialState: ITransationsState = {
  isLoading: false,
  error: null,
  success: false,
  transations: null,
  totalTransactions: 0,
};

const slice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    /*Pending*/
    getTransations(state, action) {
      state.isLoading = true;
    },

    /*Success*/
    getAllTransationsSuccess(state, action) {
      state.isLoading = false;
      state.transations = action.payload.transactions;
      state.totalTransactions = action.payload.total;
      state.error = null;
      state.success = true;
    },

    /*Failure*/
    getAllTransationsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getAllTransationsFailure, getAllTransationsSuccess, getTransations } = slice.actions;
