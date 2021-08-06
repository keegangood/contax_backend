import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000/contacts";
const headers = {
  "Content-Type": "application/json",
};

axios.defaults.withCredentials = true;

// get all contacts for a given user
export const getContacts = createAsyncThunk(
  "contacts/getContacts",
  async ({ accessToken, orderBy }, { rejectWithValue }) => {
    const url = BASE_URL + "/";
    const response = axios
      .get(
        url,
        {
          params: {order_by:orderBy},
          headers: { ...headers, Authorization: `token ${accessToken}` },
        }
      )
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));

    return response;
  }
);

// create a new contact
export const createContact = createAsyncThunk(
  "contacts/create",
  async ({ formData, accessToken }, { rejectWithValue }) => {
    const url = BASE_URL + "/";

    const response = await axios
      .post(
        url,
        {
          formData,
        },
        {
          headers: { ...headers, Authorization: `token ${accessToken}` },
        }
      )
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));

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
      .catch((err) => rejectWithValue(err.response.data));

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
      .catch((err) => rejectWithValue(err.response.data));

    return response;
  }
);

const initialState = {
  contacts: [], // logged in user's current access token
  currentContact: null,
  orderBy: "firstName",
  contactLoadingStatus: "PENDING", // status of async operation ['IDLE', 'PENDING', 'SUCCESS', 'FAIL']
};

const ContactSlice = createSlice({
  name: "contacts",
  initialState: initialState,
  reducers: {
    setContacts: (state, action) => {
      return {
        contacts: state.contacts.concat(action.payload.contacts),
      };
    },
    setCurrentContact: (state, action) => {
      return {
        ...state,
        currentContact: action.payload
      }
    },
    setOrderBy: (state, action) => {
      return {
        orderBy: action.payload.orderBy,
      };
    },
  },
  extraReducers: {
    // GET CONTACTS
    [getContacts.pending]: (state, action) => {
      state.contactLoadingStatus = "PENDING";
    },
    [getContacts.rejected]: (state, action) => {
      state.contacts = [];
      state.contactLoadingStatus = "IDLE";
    },
    [getContacts.fulfilled]: (state, action) => {
      state.contacts = action.payload.contacts;
      state.contactLoadingStatus = "IDLE";
    },

    [createContact.pending]: (state, action) => {
      // CREATE CONTACT
    },
    [createContact.rejected]: (state, action) => {},
    [createContact.fulfilled]: (state, action) => {},

    // UPDATE CONTACT
    [updateContact.pending]: (state, action) => {},
    [updateContact.rejected]: (state, action) => {},
    [updateContact.fulfilled]: (state, action) => {},

    // DELETE CONTACT
    [deleteContact.pending]: (state, action) => {},
    [deleteContact.rejected]: (state, action) => {},
    [deleteContact.fulfilled]: (state, action) => {},
  },
});

export const { setContacts, setCurrentContact, setOrderBy } = ContactSlice.actions;

export default ContactSlice.reducer;
