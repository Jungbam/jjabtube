import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "../modules/commentSlice";
import liveSlice from "../modules/liveSlice";
import signSlice from "../modules/signSlice";
import videoSlice from "../modules/videoSlice";

const store = configureStore({
  reducer: { videoSlice, signSlice, liveSlice, commentSlice },
});

export default store;
