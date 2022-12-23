import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const signUp = createAsyncThunk(
  "signSlice/signUp",
  async (category, thunkAPI) => {
    try {
      return thunkAPI.rejectWithValue();
    } catch (err) {}
  }
);
export const logIn = createAsyncThunk(
  "signSlice/logIn",
  async (useData, thunkAPI) => {
    try {
      return thunkAPI.rejectWithValue();
    } catch (err) {}
  }
);
export const auth = createAsyncThunk(
  "signSlice/auth",
  async (logData, thunkAPI) => {
    try {
      const res = await client.get("/auth");
      return thunkAPI.rejectWithValue();
    } catch (err) {}
  }
);
const initialState = {
  isLogedIn: false,
};
const signSlice = createSlice({
  name: "introSlice",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.isLogedIn = false;
      cookie.remove("token");
    },
  },
  extraReducers: {
    [signUp.pending]: (state) => {},
    [signUp.fulfilled]: (state, action) => {},
    [signUp.rejected]: (state, action) => {},

    [logIn.pending]: (state) => {},
    [logIn.fulfilled]: (state, action) => {},
    [logIn.rejected]: (state, action) => {},

    [auth.pending]: (state) => {},
    [auth.fulfilled]: (state, action) => {},
    [auth.rejected]: (state, action) => {},
  },
});

export default signSlice.reducer;
export const { logOut } = signSlice.actions;
