import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/axios";

const allVideos = {
  posts: [
    {
      postId: 1,
      title: "ㅋㅋㅋ",
      thumbnail:
        "https://search.pstatic.net/common?type=f&size=210x296&quality=75&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20121105_238%2F1352106839172YYGry_JPEG%2Fmovie_image.jpg",
      compVid: "https://www.youtube.com/watch?v=P1rpBQHMpro",
      nickname: "String",
      createdAt: "String",
    },
    {
      postId: 2,
      title: "젭 이런 개같은",
      thumbnail:
        "https://search.pstatic.net/common?type=f&size=210x296&quality=75&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20111222_204%2F1324527172471MFCPN_JPEG%2Fmovie_image.jpg",
      compVid: "https://www.youtube.com/watch?v=mpIMW4WWmuQ",
      nickname: "String",
      createdAt: "String",
    },
    {
      postId: 3,
      title: "심심해",
      thumbnail:
        "https://search.pstatic.net/common?type=f&size=210x296&quality=75&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20210528_277%2F1622186630686K5hnU_JPEG%2Fmovie_image.jpg",
      compVid: "https://www.youtube.com/watch?v=05iJK4Ug4rU",
      nickname: "String",
      createdAt: "String",
    },
    {
      postId: 4,
      title: "API가",
      thumbnail:
        "https://search.pstatic.net/common?type=f&size=210x296&quality=75&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20190328_130%2F1553738231369vV0Uh_JPEG%2Fmovie_image.jpg",
      compVid: "https://www.youtube.com/watch?v=y5s2PGU5IXc",
      nickname: "String",
      createdAt: "String",
    },
    {
      postId: 5,
      title: "서버가 필요해",
      thumbnail:
        "https://search.pstatic.net/common?type=f&size=210x296&quality=75&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20210430_210%2F1619758147201EvVcq_JPEG%2Fmovie_image.jpg",
      compVid: "https://www.youtube.com/watch?v=G1JQd78ZJ2I",
      nickname: "String",
      createdAt: "String",
    },
    {
      postId: 6,
      title: "뭐지",
      thumbnail:
        "https://search.pstatic.net/common?type=f&size=210x296&quality=75&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20111222_204%2F1324527172471MFCPN_JPEG%2Fmovie_image.jpg",
      compVid: "https://www.youtube.com/watch?v=Nr2XeOmjCH8",
      nickname: "String",
      createdAt: "String",
    },
  ],
};
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
      return thunkAPI.rejectWithValue();
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getAllVideo = createAsyncThunk(
  "videoSlice/getAllVideo",
  async (getAll, thunkAPI) => {
    try {
      // const result = client.get("/post");
      // if (result.status === 200) {
      //   return thunkAPI.rejectWithValue(result.data);
      // } else {
      //   return thunkAPI.rejectWithValue();
      // }
      console.log("dispatch");
      return thunkAPI.fulfillWithValue(allVideos.posts);
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
      // if (result.status === 200) {
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
      return thunkAPI.rejectWithValue();
    } catch (err) {}
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
  allVideos: [],
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
    [getAllVideo.fulfilled]: (state, action) => {
      console.log(action);
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
export default videoSlice.reducer;
