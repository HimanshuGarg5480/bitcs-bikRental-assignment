import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../feature/user/userSlice';
import bikeSlice from '../feature/bike/bikeSlice'

const store = configureStore({
  reducer: {
    user: userSlice, 
    bike:bikeSlice
  },
});

export default store;
