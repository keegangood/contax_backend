import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ContactSlice from "./ContactSlice";
import NoteSlice from "./NoteSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
  contacts: ContactSlice,
  notes: NoteSlice
});

export default rootReducer;