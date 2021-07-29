import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  contacts: [], // logged in user's current access token
  contactsLoadingStatus: "PENDING", // status of async operation ['IDLE', 'PENDING', 'SUCCESS', 'FAIL']
};

const BASE_URL = "http://localhost:8000/contacts";
const headers = {
  "Content-Type": "application/json",
};

axios.defaults.withCredentials = true;

// get all contacts for a given user
export const getContacts = createAsyncThunk(
  "contacts/getContacts",
  async ({user}, { rejectWithValue }) => {
    console.log(user)
    const url = BASE_URL + "/";
    const response = axios
      .post(url, user, {
        headers: headers,
      })
      .then((res) => res.data)
      .catch((err) => JSON.stringify(err));

    return response;
  }
);


// create a new contact
export const createContact = createAsyncThunk(
  "contacts/create",
  async (formData, { rejectWithValue }) => {
    const url = BASE_URL + "/";

    const response = await axios
      .post(url, {
        headers: headers,
        data: { ...formData },
      })
      .then((res) => res.data)
      .catch((err) => err.response.data);

    return response;
  }
);


// update a given contact 
export const updateContact = createAsyncThunk(
  "contacts/update",
  async (formData, { rejectWithValue }) => {
    const url = BASE_URL + "/login/";
    const response = axios
      .post(url, formData, {
        headers: headers,
      })
      .then((res) => res.data)
      .catch((err) => JSON.stringify(err));

    return response;
  }
);

// delete a contact from the database
export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (formData, { rejectWithValue }) => {
    const url = BASE_URL + "/";

    const response = await axios
      .post(url, {
        headers: headers,
        data: { ...formData },
      })
      .then((res) => res.data)
      .catch((err) => err.response.data);

    return response;
  }
);

const ContactSlice = createSlice({
  name: "contacts",
  initialState: initialState,
  reducers: {
    setContacts: (state,action) => {
      return {
        contacts: state.contacts.concat(action.payload.contacts)
      }
    }
  },
  extraReducers: {
    // GET CONTACTS
    [getContacts.pending]: (state,action) => {
      
    },
    [getContacts.rejected]: (state,action) => {

    },
    [getContacts.fulfilled]: (state,action) => {

    },

    [createContact.pending]: (state,action) => {
    
    // CREATE CONTACT
    },
    [createContact.rejected]: (state,action) => {

    },
    [createContact.fulfilled]: (state,action) => {

    },
    
    // UPDATE CONTACT
    [updateContact.pending]: (state,action) => {
      
    },
    [updateContact.rejected]: (state,action) => {

    },
    [updateContact.fulfilled]: (state,action) => {

    },

    // DELETE CONTACT
    [deleteContact.pending]: (state,action) => {
      
    },
    [deleteContact.rejected]: (state,action) => {

    },
    [deleteContact.fulfilled]: (state,action) => {

    },

  },
});

export const { setContacts } = ContactSlice.actions;

export default ContactSlice.reducer;
