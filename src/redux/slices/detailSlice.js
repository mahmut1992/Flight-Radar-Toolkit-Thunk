import { createSlice } from "@reduxjs/toolkit";
import { getDetail } from "../actions";

const initialState = {
  flightId: null,
  isLoading: false,
  error: null,
  info: null,
  route: [],
  popupOpen: false,
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    open: (state, action) => {
      state.flightId = action.payload;
    },
    close: (state) => {
      state.flightId = null;
    },
    openPopup: (state) => {
      state.popupOpen = true;
    },
    closePopup: (state) => {
      state.popupOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDetail.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    });
    builder.addCase(getDetail.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.info = payload;
      state.route = payload.trail;
    });
  },
});
export const { open, close, openPopup, closePopup } = detailSlice.actions;

export default detailSlice.reducer;
