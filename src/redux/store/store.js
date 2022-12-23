import { configureStore } from "@reduxjs/toolkit";
import liveSlice from "../modules/liveSlice";
import signSlice from "../modules/signSlice";
import videoSlice from "../modules/videoSlice";

const store = configureStore({
  reducer: { videoSlice, signSlice, liveSlice },
});

export default store;
