import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the types for state
interface DataState {
  data: any[];
  loading: boolean;
  error: string | null;
  updateLoading: false; // Track if update is in progress
  updateStatus: '';
  snackbar: {
    open: boolean;
    message: string;
  }; // New stat // Track update success or failure
}

// Initial state
const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
  updateLoading: false, // Track if update is in progress
  updateStatus: '',
  snackbar: {
    open: false,
    message: '',
  },
};
// New stat

// Create a slice for data fetching
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchDataStart: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
      state.loading = false;
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
    updateDataStart: (state, action: PayloadAction<{ id: number; status: string }>) => {
      state.loading = true;
      state.error = null;
    },
    updateDataSuccess: (state, action: PayloadAction<{ id: number; status: string }>) => {
      console.log('Before update:', state.data); // Debugging the current state
      state.loading = false;
      const { id, status } = action.payload;
      const index = state.data.findIndex((item) => item.expenseId === id);
      if (index !== -1) {
        state.data[index].EmployerStatus = status;
      }
      console.log('After update:', state.data); // Debugging the updated state
    },
    updateDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchDatacsvStart: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
      state.loading = false;
      state.error = null;
    },
    fetchDatacsvSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDatacsvFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    notificationSend: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
      state.loading = false;
      state.error = null;
    },
    notificationSendSuccess: (
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) => {
      state.loading = false;
      const { startDate, endDate } = action.payload;
    },
    notificationSendFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchDatapdfStart: (state) => {
      state.loading = false;
      state.error = null; // Clear any previous errors
    },
    fetchDatapdfSuccess: (state) => {
      state.loading = false; // Loading is complete
      state.error = null;
    },
    fetchDatapdfFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    showSnackbar: (state, action: PayloadAction<string>) => {
      state.snackbar.open = true;
      state.snackbar.message = action.payload;
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
      state.snackbar.message = '';
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
  fetchDatacsvStart,
  fetchDatacsvSuccess,
  fetchDatacsvFailure,
  notificationSend,
  notificationSendSuccess,
  notificationSendFailure,
  fetchDatapdfStart,
  fetchDatapdfSuccess,
  fetchDatapdfFailure,
  showSnackbar,
  hideSnackbar,
} = dataSlice.actions;

export default dataSlice.reducer;
