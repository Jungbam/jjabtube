import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/axios";
import { getDetailVideo } from "./videoSlice";

export const postComment = createAsyncThunk(
  "commentSlice/postComment",
  async (commentData, thunkAPI) => {
    const { comment, postId } = commentData;
    try {
      const result = await client.post(`/comment/post/${postId}`, { comment });
      if (result.status === 200) thunkAPI.dispatch(getDetailVideo(postId));
      else thunkAPI.rejectWithValue(406);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const patchComment = createAsyncThunk(
  "commentSlice/patchComment",
  async (patchData, thunkAPI) => {
    const { commentId, postId, comment } = patchData;
    try {
      const result = await client.patch(
        `/comment/${commentId}/post/${postId}`,
        {
          comment,
        }
      );
      if (result.status === 200) thunkAPI.dispatch(getDetailVideo(postId));
      else thunkAPI.rejectWithValue(406);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const deleteComment = createAsyncThunk(
  "commentSlice/deleteComment",
  async (deleteData, thunkAPI) => {
    const { commentId, postId } = deleteData;
    try {
      const result = await client.delete(
        `/comment/${commentId}/post/${postId}`
      );
      if (result.status === 200) thunkAPI.dispatch(getDetailVideo(postId));
      else thunkAPI.rejectWithValue(406);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
const initialState = {};
const commentSlice = createSlice({
  name: "liveSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [postComment.pending]: (state) => {},
    [postComment.fulfilled]: (state, action) => {},
    [postComment.rejected]: (state, action) => {},

    [patchComment.pending]: (state) => {},
    [patchComment.fulfilled]: (state, action) => {},
    [patchComment.rejected]: (state, action) => {},

    [deleteComment.pending]: (state) => {},
    [deleteComment.fulfilled]: (state, action) => {},
    [deleteComment.rejected]: (state, action) => {},
  },
});
export default commentSlice.reducer;
