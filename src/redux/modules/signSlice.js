import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/axios";
import { Cookies } from "react-cookie";
import axios from 'axios';

const cookie = new Cookies();

export const dupEmailCheck = createAsyncThunk(
  "signSlice/dupEmailCheck",
  async (email, thunkAPI) => {

    const response = await client.post(`/signup/emailcheck`, {email});

    if(response.status === 200){
      const fulfilledMsg = response.data.message;
      return thunkAPI.fulfillWithValue(fulfilledMsg);
    } else {
      const errorMsg = response.response.data.errorMessage;
      return thunkAPI.rejectWithValue(errorMsg);
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
      const fulfiledMsg = response.data.message;
      return thunkAPI.fulfillWithValue(fulfiledMsg);
    } else {
      const errorMsg = response.response.data.errorMessage;
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const logIn = createAsyncThunk(
  "signSlice/logIn",
  async (loginData, thunkAPI) => {

    const response = await client.post('/login', loginData);
    console.log(response);

    if(response.status === 200){
      const fulfiledMsg = '로그인 성공';
      return thunkAPI.fulfillWithValue(fulfiledMsg);
    } else {
      const errorMsg = response.response.data.errorMessage;
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const auth = createAsyncThunk(
  "signSlice/auth",
  async (logData, thunkAPI) => {
    const response = await client.get("/auth");

    if(response.status === 200){

      return thunkAPI.fulfillWithValue();
    } else {
      const errorMsg = response.response.data.errorMessage;
      window.alert(errorMsg);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const kakaoLogin = createAsyncThunk(
  'signSlice/kakaoLogin',
  async (code, thunkAPI) => {
    try{
      // redirect uri 프론트로 연결 auth code 백엔드로 전달
      console.log(code);
      //
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/login/kakao?code=${code}`);
      console.log(response);

      if(response.status === 200){
        console.log('status 200');
        return thunkAPI.fulfillWithValue();
      } else {
        // const errorMsg = response.response.data.errorMessage;
        console.log('kakao error');
        window.alert(response);
        return thunkAPI.rejectWithValue("kakao error");
      // }
      }
    } catch (err) {
      console.log("에러에러에러");
      return thunkAPI.rejectWithValue("kakao error");
    }
  }
);

const initialState = {
  isLogedIn: false,
  isSignUp: false,
  error: false,
  errorMsg: '',
  fulfiledMsg: '',
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
      state.fulfiledMsg = action.payload;
    },
    [dupEmailCheck.rejected]: (state, action) => {
      state.error = true;
      state.errorMsg = action.payload;
    },         

    [signUp.pending]: (state) => {},
    [signUp.fulfilled]: (state, action) => {
      state.isSignUp = true;
      state.fulfiledMsg = action.payload;
    },
    [signUp.rejected]: (state, action) => {
      state.error = true;
      state.errorMsg = action.payload;
    },

    [logIn.pending]: (state) => {},
    [logIn.fulfilled]: (state, action) => {
      state.isLogedIn = true;
      state.fulfiledMsg = action.payload;
    },
    [logIn.rejected]: (state, action) => {
      state.error = true;
      state.errorMsg = action.payload;
    },

    [auth.pending]: (state) => {},
    [auth.fulfilled]: (state, action) => {},
    [auth.rejected]: (state, action) => {
      state.error = false;
      // state.errorMsg = action.payload;
    },

    [kakaoLogin.pending]: (state) => {},
    [kakaoLogin.fulfilled]: (state, action) => {},
    [kakaoLogin.rejected]: (state, action) => {
      state.error = false;
      state.errorMsg = action.payload;
    },
  },
});

export default signSlice.reducer;
export const { logOut } = signSlice.actions;
