import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ContactSlice from "./ContactSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
  contacts: ContactSlice
});

export default rootReducer;