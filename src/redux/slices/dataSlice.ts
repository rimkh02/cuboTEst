import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the types for state
interface DataState {
  data: any[];
  loading: boolean;
  error: string | null;
  updateLoading: false, // Track if update is in progress
  updateStatus: '', // Track update success or failure
}

// Initial state
const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
  updateLoading: false, // Track if update is in progress
  updateStatus: '', // Track update success or failure
};

// Create a slice for data fetching
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchDataStart: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateDataStart: (
      state,
      action: PayloadAction<{ id: number; amountAccepted: number; status: string }>
    ) => {
      state.loading = true;
      state.error = null;
      
    },
    updateDataSuccess: (state, action: PayloadAction<{ id: number; amountAccepted: number; status: string }>) => {
      state.loading = false;
      const { id, amountAccepted, status } = action.payload;
      const index = state.data.findIndex((item) => item.expenseId === id);
      if (index !== -1) {
        state.data[index].amountAccepted = amountAccepted;
        state.data[index].EmployerStatus = status;
      }
    },
    updateDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  updateDataStart,
  updateDataSuccess,
  updateDataFailure,
} = dataSlice.actions;

export default dataSlice.reducer;
