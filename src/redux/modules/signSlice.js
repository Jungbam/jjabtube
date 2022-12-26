import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const dupEmailCheck = createAsyncThunk(
  "signSlice/dupEmailCheck",
  async (email, thunkAPI) => {

    const response = await client.post(`/signup/emailcheck`, {email});

    if(response.status === 200){
      const succeedMsg = response.data.message;
      window.alert(succeedMsg);
      return thunkAPI.fulfillWithValue();
    } else {
      const errorMsg = response.response.data.errorMessage;
      window.alert(errorMsg);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const signUp = createAsyncThunk(
  "signSlice/signUp",
  async (formData, thunkAPI) => {
    formData.append('emailValidate', true);
    
    const response = await client.post('/signup', formData);
    console.log(response);

    if(response.status === 200){
      const succeedMsg = response.data.message;
      window.alert(succeedMsg);
      return thunkAPI.fulfillWithValue();
    } else {
      const errorMsg = response.response.data.errorMessage;
      window.alert(errorMsg);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logIn = createAsyncThunk(
  "signSlice/logIn",
  async (loginData, thunkAPI) => {

    const response = await client.post('/login', loginData);
    console.log(response);

    if(response.status === 200){
      window.alert("로그인 성공");
      return thunkAPI.fulfillWithValue();
    } else {
      const errorMsg = response.response.data.errorMessage;
      window.alert(errorMsg);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const auth = createAsyncThunk(
  "signSlice/auth",
  async (logData, thunkAPI) => {
    try {
      // const response = await client.get("/auth");
      return thunkAPI.rejectWithValue();
    } catch (err) {
      
    }
  }
);

const initialState = {

  isLogedIn: false,
  isSignUp: false,
  error: false,
  dupEmailCheck: false,

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
    [dupEmailCheck.pending]: (state) => {},
    [dupEmailCheck.fulfilled]: (state, action) => {
      state.dupEmailCheck = true;
    },
    [dupEmailCheck.rejected]: (state, action) => {
      state.error = true;
    },         

    [signUp.pending]: (state) => {},
    [signUp.fulfilled]: (state, action) => {
      state.isSignUp = true;
    },
    [signUp.rejected]: (state, action) => {
      state.error = true;
    },

    [logIn.pending]: (state) => {},
    [logIn.fulfilled]: (state, action) => {
      state.isLogedIn = true;
    },
    [logIn.rejected]: (state, action) => {
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
