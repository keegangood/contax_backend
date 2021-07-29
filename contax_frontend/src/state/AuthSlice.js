import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null, // logged in user's current access token
  isAuthenticated: false, // boolean indicating if a user is logged in
  user: null, // object with auth user data
  authLoadingStatus: "PENDING", // status of async operation ['IDLE', 'PENDING', 'SUCCESS', 'FAIL']
};

const BASE_URL = "http://localhost:8000/users";
const headers = {
  "Content-Type": "application/json",
};

export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    const response = await fetch(BASE_URL + "/login/", {
      method: "POST",
      headers: headers,
      credentials: "include", // to set cookies
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    }
    return rejectWithValue(data);
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    const response = await fetch(BASE_URL + "/", {
      method: "POST",
      headers: headers,
      credentials: "include", // to set cookies
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    }
    return rejectWithValue(data);
  }
);

export const requestAccessToken = createAsyncThunk(
  "auth/requestAccessToken",
  async (_, { rejectWithValue }) => {
    const response = await fetch(BASE_URL + "/token/", {
      method: "GET",
      headers: headers,
      credentials: "include", // to set cookies
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    }
    return rejectWithValue(data);
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (user, { rejectWithValue }) => {
    const response = await fetch(BASE_URL + "/logout/", {
      method: "POST",
      headers: headers,
      credentials: "include", // to set cookies
      body: JSON.stringify({ user }),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    }
    return rejectWithValue(data);
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAccessToken(state, action) {
      return {
        accessToken: action.payload,
      };
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
        state.authLoadingStatus = "PENDING";
    },
    [login.fulfilled]: (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.authLoadingStatus = "IDLE";
    },
    [login.rejected]: (state, action) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.authLoadingStatus = "IDLE";
    },

    [requestAccessToken.pending]: (state, action) => {
        state.authLoadingStatus = "PENDING";
    },
    [requestAccessToken.fulfilled]: (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.authLoadingStatus = "IDLE";
    },
    [requestAccessToken.rejected]: (state, action) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.authLoadingStatus = "IDLE";
    },

    [logout.pending]: (state, action) => {
      state.authLoadingStatus = "PENDING";
    },
    [logout.fulfilled]: (state, action) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.authLoadingStatus = "IDLE";
    },
    [logout.rejected]: (state, action) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.authLoadingStatus = "IDLE";
    },
  },
});

export const { setAccessToken, setErrors } = AuthSlice.actions;

export default AuthSlice.reducer;