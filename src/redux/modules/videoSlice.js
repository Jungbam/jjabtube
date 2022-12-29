import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VideoAPI } from "../../api/axios";

export const searchTag = createAsyncThunk(
  "videoSlice/searchTag",
  async (tag, thunkAPI) => {
    try {
      const result = await VideoAPI.searchTag(tag);
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
      const result = await VideoAPI.sarchTitle(keyword);
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
      const response = await VideoAPI.postVideo(formData);
      if (response.status === 200) {
        await thunkAPI.dispatch(getAllVideo());
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
      const result = await VideoAPI.getAllVideo(getAll);
      if (result.status === 200) {
        return thunkAPI.fulfillWithValue(result.data.posts);
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
      const result = await VideoAPI.getDetailVideo(videoId);
      if (result.status === 200) {
        return thunkAPI.fulfillWithValue(result.data);
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
      const response = await VideoAPI.deleteVideo(videoId);
      if (response.status === 200) {
        await thunkAPI.dispatch(getAllVideo());
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
      const response = await VideoAPI.patchVideo(videoId, updatement);
      if (response.status === 200) {
        await thunkAPI.dispatch(getDetailVideo(videoId));
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  allVideos: [],
  detailViedeo: null,
  searchedVideo: null,
  isLoading: false,
  isError: false,
  hasNextPage: false
};
const videoSlice = createSlice({
  name: "videoSlice",
  initialState,
  reducers: {
    initSearch: (state, payload) => {
      state.searchedVideo = null;
    },
    filterView: (state, payload) => {
      state.searchedVideo = state.searchedVideo?.sort(
        (a, b) => b.view - a.view
      );
    },
    fitlerTitle: (state, payload) => {
      state.searchedVideo = state.searchedVideo?.sort(
        (a, b) => b.title - a.title
      );
    },
    filterDate: (state, payload) => {
      state.searchedVideo = state.searchedVideo;
    },
    changeIsLoaded: (state, payload) => {
      state.isLoaded = false;
    }
  },
  extraReducers: {
    [searchTag.fulfilled]: (state, action) => {
      state.searchedVideo = action.payload;
    },
    [searchTag.rejected]: (state, action) => {},

    [searchTitle.fulfilled]: (state, action) => {
      state.searchedVideo = action.payload;
    },
    [searchTitle.rejected]: (state, action) => {},

    [postVideo.rejected]: (state, action) => {},

    [getAllVideo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allVideos = [...state.allVideos, ...action.payload];
      state.hasNextPage = state.allVideos.leng
    },
    [getAllVideo.rejected]: (state, action) => {},

    [getDetailVideo.fulfilled]: (state, action) => {
      state.detailViedeo = action.payload.post;
    },
    [getDetailVideo.rejected]: (state, action) => {},

    [deleteVideo.rejected]: (state, action) => {},

    [patchVideo.rejected]: (state, action) => {},
  },
});
export const { initSearch, filterNick, filterDate, filterView, fitlerTitle, changeIsLoaded } =
  videoSlice.actions;
export default videoSlice.reducer;
