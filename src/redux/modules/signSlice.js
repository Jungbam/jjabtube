import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogedIn: false,
};
const signSlice = createSlice({
  name: "introSlice",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default signSlice.reducer;
