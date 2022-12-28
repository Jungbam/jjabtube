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
      // let values = formData.values();
      // for (const pair of values) {
      //   console.log(pair);
      // }
      const post = await client.post(`/post/`, formData);
      console.log(post);
      if (post.status === 200) {
        thunkAPI.dispatch(getAllVideo());
      } else if (post.status === 406) {
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
      const res = await client.get(`/post?lastId=`);

      if (res.status === 200) {
        return thunkAPI.fulfillWithValue(res.data.posts);
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
      const response = await client.delete(`/post/${videoId}`);
      console.log(response);
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

//찍고나서 -> 콘솔확인 -> 다음 코드 작업 ***
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
  detailViedeo: null,
  allVideo: [],
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
    [postVideo.fulfilled]: (state, action) => {
      state.videoSlice = action.payload;
    },
    [postVideo.rejected]: (state, action) => {},

    [getAllVideo.pending]: (state) => {},
    [getAllVideo.fulfilled]: (state, action) => {
      console.log(action);
      state.allVideo = action.payload;

      console.log(action.payload);
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
export default videoSlice.reducer;
