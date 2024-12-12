import { createSlice } from '@reduxjs/toolkit';
import { ISettingsState } from 'src/@types/settings';

const initialState: ISettingsState = {
  isLoading: false,
  plafonds: null,
  texts: null,
  error: null,
  success: '',
  refresh: 0,
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // get plafonds advantages
    getPlafondsAdvantagesRequest(state) {
      state.isLoading = true;
    },

    getPlafondsAdvantagesSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
      state.error = null;
      state.plafonds = action.payload;
    },

    getPlafondsAdvantagesFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // get texts advantages
    getTextsAdvantagesRequest(state) {
      state.isLoading = true;
    },

    getTextsAdvantagesSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
      state.error = null;
      state.texts = action.payload;
    },

    getTextsAdvantagesFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const {
  getPlafondsAdvantagesFailure,
  getPlafondsAdvantagesRequest,
  getPlafondsAdvantagesSuccess,
  getTextsAdvantagesRequest,
  getTextsAdvantagesSuccess,
  getTextsAdvantagesFailure,
} = slice.actions;

export default slice.reducer;
