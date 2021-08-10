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
    const response = await axios
      .get(url, {
        params: { order_by: orderBy },
        headers: { ...headers, Authorization: `token ${accessToken}` },
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));

    return response;
  }
);

// get a single contact
export const getContactDetail = createAsyncThunk(
  "contacts/getContactDetail",
  async ({ accessToken, contactId }, { rejectWithValue }) => {
    const url = BASE_URL + `/detail/${contactId}`;
    const response = await axios
      .get(url, {
        headers: { ...headers, Authorization: `token ${accessToken}` },
      })
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
  async ({ contactId, formData, accessToken }, { rejectWithValue }) => {
    const url = BASE_URL + `/detail/${contactId}`;

    const response = await axios
      .post(
        url,
        { formData },
        {
          headers: { ...headers, Authorization: `token ${accessToken}` },
        }
      )
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));

    return response;
  }
);

// delete a contact from the database
export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async ({contactId, accessToken}, { rejectWithValue }) => {
    const url = BASE_URL + `/delete/${contactId}`;

    const response = await axios
      .post(url, {}, {
        headers: {...headers, Authorization: `token ${accessToken}`},
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));

    return response;
  }
);

const initialState = {
  contacts: null, // logged in user's current access token
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
        currentContact: action.payload,
      };
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
      state.contacts = null;
      state.contactLoadingStatus = "IDLE";
    },
    [getContacts.fulfilled]: (state, action) => {
      state.contacts = action.payload.contacts;
      state.contactLoadingStatus = "IDLE";
    },

    // CREATE CONTACT
    [createContact.pending]: (state, action) => {
      state.contactLoadingStatus = "PENDING";
    },
    [createContact.rejected]: (state, action) => {
      state.contacts = null;
      state.contactLoadingStatus = "IDLE";
    },
    [createContact.fulfilled]: (state, action) => {},

    // UPDATE CONTACT
    [updateContact.pending]: (state, action) => {
      state.contactLoadingStatus = "PENDING";
    },
    [updateContact.rejected]: (state, action) => {
      state.contactLoadingStatus = "IDLE";
    },
    [updateContact.fulfilled]: (state, action) => {
      state.currentContact = null;
      state.contactLoadingStatus = "IDLE";
    },

    // DELETE CONTACT
    [deleteContact.pending]: (state, action) => {},
    [deleteContact.rejected]: (state, action) => {},
    [deleteContact.fulfilled]: (state, action) => {},

    // GET SINGLE CONTACT
    [getContactDetail.pending]: (state, action) => {
      state.contactLoadingStatus = "PENDING";
    },
    [getContactDetail.rejected]: (state, action) => {
      state.currentContact = null;
      state.contactLoadingStatus = "IDLE";
    },
    [getContactDetail.fulfilled]: (state, action) => {
      state.currentContact = action.payload.contact;
      state.contactLoadingStatus = "IDLE";
    },
  },
});

export const { setContacts, setCurrentContact, setOrderBy } =
  ContactSlice.actions;

export default ContactSlice.reducer;
