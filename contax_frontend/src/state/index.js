import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./auth/AuthSlice";
// import ContactSlice from "./ContactSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
  // contact: ContactSlice
});

export default rootReducer;