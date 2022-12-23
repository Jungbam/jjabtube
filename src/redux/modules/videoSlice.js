import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchLabel = createAsyncThunk(
  "videoSlice/searchLabel",
  async (category, thunkAPI) => {
    try {
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {};
const videoSlice = createSlice({
  name: "introSlice",
  initialState,
  reducers: {},
  extraReducers: {},
});
export default videoSlice.reducer;
