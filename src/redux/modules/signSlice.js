import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const __dupEmailCheck = createAsyncThunk(
  "signSlice/dupEmailCheck",
  async (email, thunkAPI) => {
    try {
      const response = await client.post(`/signup/emailcheck`, email);
      window.alert(response.data);
      return thunkAPI.fulfillWithValue();
    } catch (err) {
      window.alert(err.data);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __signUp = createAsyncThunk(
  "signSlice/signUp",
  async (formData, thunkAPI) => {
    try {
      const {data} = await client.post('/signup', formData);
      // window.alert(data);
      return thunkAPI.fulfillWithValue();
    } catch (err) {
      window.alert(err.data);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __logIn = createAsyncThunk(
  "signSlice/logIn",
  async (inputData, thunkAPI) => {
    try {
      console.log(inputData);
      const {data} = await client.post('/login', inputData);
      // cookie.set('token', data.token, { 
      //   path: '/',
      //   expires: Math.floor(Date.now() / 1000) + (60 * 60) }
      // );
      // window.alert(data);
      return thunkAPI.fulfillWithValue();
    } catch (err) {
      window.alert(err.data);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const auth = createAsyncThunk(
  "signSlice/auth",
  async (logData, thunkAPI) => {
    try {
      // const response = await client.get("/auth");
      return thunkAPI.rejectWithValue();
    } catch (err) {}
  }
);

const initialState = {
  isLogedIn: false,
  isSignUp: false,
  dupCheck: false,
  error: false,
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
    [__dupEmailCheck.pending]: (state) => {},
    [__dupEmailCheck.fulfilled]: (state, action) => {
      state.dupEmailCheck = true;
    },
    [__dupEmailCheck.rejected]: (state, action) => {
      state.error = true;
    },         

    [__signUp.pending]: (state) => {},
    [__signUp.fulfilled]: (state, action) => {
      state.isSignUp = true;
    },
    [__signUp.rejected]: (state, action) => {
      state.error = true;
    },

    [__logIn.pending]: (state) => {},
    [__logIn.fulfilled]: (state, action) => {
      state.isLogedIn = true;
    },
    [__logIn.rejected]: (state, action) => {
      state.error = true;
    },

    [auth.pending]: (state) => {},
    [auth.fulfilled]: (state, action) => {},
    [auth.rejected]: (state, action) => {
      state.error = true;
    },
  },
});

export default signSlice.reducer;
export const { logOut } = signSlice.actions;
