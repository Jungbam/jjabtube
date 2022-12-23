import { configureStore } from "@reduxjs/toolkit";
import signSlice from "../modules/signSlice";
import videoSlice from "../modules/videoSlice";

const store = configureStore({
  reducer: { videoSlice, signSlice },
});

export default store;
