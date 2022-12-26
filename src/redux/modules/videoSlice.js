import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/axios";

export const searchTag = createAsyncThunk(
  "videoSlice/searchTag",
  async (tag, thunkAPI) => {
    try {
      const result = await client.get(`/post/search?tag=${tag}`);
      console.log(result);
      if (result.status === 200)
        return thunkAPI.fulfillWithValue(result.data.posts);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const searchTitle = createAsyncThunk(
  "videoSlice/searchTitle",
  async (keyword, thunkAPI) => {
    try {
      const result = await client.get(`/post/search?keyword=${keyword}`);
      if (result.status === 200)
        return thunkAPI.fulfillWithValue(result.data.posts);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const postVideo = createAsyncThunk(
  "videoSlice/postVideo",
  async (formData, thunkAPI) => {
    try {
      const response = await client.post("/post", formData);
      if (response.status === 200) {
        await thunkAPI.dispatch(getAllVideo());
      } else if (response.status === 406) {
        return thunkAPI.rejectWithValue(406);
      } else {
        return thunkAPI.rejectWithValue(501);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getAllVideo = createAsyncThunk(
  "videoSlice/getAllVideo",
  async (getAll, thunkAPI) => {
    try {
      const result = await client.get("/post");
      if (result.status === 200) {
        return thunkAPI.fulfillWithValue(result.data.posts);
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const getDetailVideo = createAsyncThunk(
  "videoSlice/getDetailVideo",
  async (videoId, thunkAPI) => {
    try {
      const result = await client.get(`/post/${videoId}`);
      if (result.status === 200) {
        return thunkAPI.fulfillWithValue(result.data);
      } else {
        return thunkAPI.rejectWithValue(404);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const deleteVideo = createAsyncThunk(
  "videoSlice/deleteVideo",
  async (videoId, thunkAPI) => {
    try {
      const response = await client.delete(`/post/${videoId}`);
      if (response.status === 200) {
        await thunkAPI.dispatch(getAllVideo());
      } else if (response.status === 403) {
        return thunkAPI.rejectWithValue(403);
      } else if (response.status === 404) {
        return thunkAPI.rejectWithValue(404);
      } else {
        return thunkAPI.rejectWithValue(501);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const patchVideo = createAsyncThunk(
  "videoSlice/patchVideo",
  async (updateData, thunkAPI) => {
    const { videoId, updatement } = updateData;
    try {
      const response = await client.patch(`/post/${videoId}`, {
        title: updatement.title,
        tag: updatement.tag,
        content: updatement.content,
      });
      if (response.status === 200) {
        await thunkAPI.dispatch(getDetailVideo(videoId));
      } else if (response.status === 403) {
        return thunkAPI.rejectWithValue(403);
      } else if (response.status === 404) {
        return thunkAPI.rejectWithValue(404);
      } else {
        return thunkAPI.rejectWithValue(501);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  allVideos: null,
  detailViedeo: null,
  searchedVideo: null,
};
const videoSlice = createSlice({
  name: "videoSlice",
  initialState,
  reducers: {
    initSearch: (state, payload) => {
      state.searchedVideo = null;
    },
  },
  extraReducers: {
    [searchTag.pending]: (state) => {},
    [searchTag.fulfilled]: (state, action) => {
      state.searchedVideo = action.payload;
    },
    [searchTag.rejected]: (state, action) => {},

    [searchTitle.pending]: (state) => {},
    [searchTitle.fulfilled]: (state, action) => {
      console.log("풀필드");
      state.searchedVideo = action.payload;
    },
    [searchTitle.rejected]: (state, action) => {},

    [postVideo.pending]: (state) => {},
    [postVideo.fulfilled]: (state, action) => {},
    [postVideo.rejected]: (state, action) => {},

    [getAllVideo.pending]: (state) => {},
    [getAllVideo.fulfilled]: (state, action) => {
      state.allVideos = action.payload;
    },
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
export const { initSearch } = videoSlice.actions;
export default videoSlice.reducer;
