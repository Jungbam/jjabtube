import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/axios";

export const searchLabel = createAsyncThunk(
  "videoSlice/searchLabel",
  async (label, thunkAPI) => {
    try {
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const postVideo = createAsyncThunk(
  "videoSlice/postVideo",
  async (formData, thunkAPI) => {
    try {
      let values = formData.values();
      for (const pair of values) {
        console.log(pair);
      }
      const post = await client.post(`/post/`);
      console.log(post);
      if (post.status === 200) {
        return thunkAPI.fulfillWithValue();
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getAllVideo = createAsyncThunk(
  "videoSlice/getAllVideo",
  async (getAll, thunkAPI) => {
    try {
      return thunkAPI.rejectWithValue();
    } catch (err) {}
  }
);

export const getDetailVideo = createAsyncThunk(
  "videoSlice/getDetailVideo",
  async (videoId, thunkAPI) => {
    try {
      // const result = client.get(`/post/${videoId}`);
      // if (result.status === 2000) {
      //   return thunkAPI.fulfillWithValue(result.data)
      // } else {
      //   // #404 에러 처리
      // }
      const result = {
        post: {
          postId: videoId,
          title: "String",
          view: 2,
          content: "String",
          origVid: "https://www.youtube.com/watch?v=d9dUqJEl6Mk",
          tag: "영화",
          updatedAt: "2022-12-23",
          nickname: "닉네임",
          profile:
            "https://cdn.crowdpic.net/list-thumb/thumb_l_4291713E6EC8D22461618B2107D30880.jpg",
        },
      };
      return thunkAPI.fulfillWithValue({ ...result });
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deleteVideo = createAsyncThunk(
  "videoSlice/deleteVideo",
  async (videoId, thunkAPI) => {
    try {
      const post = await client.delete(`/post/${videoId}`);
      return thunkAPI.fulfillWithValue(videoId);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const patchVideo = createAsyncThunk(
  "videoSlice/patchVideo",
  async (videoId, thunkAPI) => {
    try {
      return thunkAPI.rejectWithValue();
    } catch (err) {}
  }
);

const initialState = {
  detailViedeo: null,
};

const videoSlice = createSlice({
  name: "videoSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [searchLabel.pending]: (state) => {},
    [searchLabel.fulfilled]: (state, action) => {},
    [searchLabel.rejected]: (state, action) => {},

    [postVideo.pending]: (state) => {},
    [postVideo.fulfilled]: (state, action) => {},
    [postVideo.rejected]: (state, action) => {},

    [getAllVideo.pending]: (state) => {},
    [getAllVideo.fulfilled]: (state, action) => {},
    [getAllVideo.rejected]: (state, action) => {},

    [getDetailVideo.pending]: (state) => {},
    [getDetailVideo.fulfilled]: (state, action) => {
      state.detailViedeo = action.payload.post;
    },
    [getDetailVideo.rejected]: (state, action) => {},

    [deleteVideo.pending]: (state) => {},
    [deleteVideo.fulfilled]: (state, action) => {},
    [deleteVideo.rejected]: (state, action) => {},

    [patchVideo.pending]: (state) => {},
    [patchVideo.fulfilled]: (state, action) => {},
    [patchVideo.rejected]: (state, action) => {},
  },
});
export default videoSlice.reducer;
