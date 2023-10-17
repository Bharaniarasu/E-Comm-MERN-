import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "authentication",
  initialState: { loading: true, isAuthenticated: false },
  reducers: {
    loginRequest: (state, action) => {
      return { ...state, loading: true };
    },
    loginSuccess: (state, action) => {
      //console.log(action.payload.user);
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loginFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError: (state, action) => {
      return {
        ...state,
        error: null,
      };
    },
    registerRequest: (state, action) => {
      return { ...state, loading: true };
    },
    registerSuccess: (state, action) => {
      //console.log(action.payload);
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    registerFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    loadUserRequest: (state, action) => {
      return { ...state, isAuthenticated: false, loading: true };
    },
    loadUserSuccess: (state, action) => {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loadUserFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        // error: action.payload,
      };
    },
    logoutSuccess: (state, action) => {
      return {
        loading: false,
        isAuthenticated: false,
      };
    },
    logoutFailed: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    updateProfileRequest: (state, action) => {
      return { ...state, loading: true, isUpdate: false };
    },
    updateProfileSuccess: (state, action) => {
      //console.log(action.payload);
      return {
        loading: false,
        isAuthenticated: true,
        isUpdate: true,
        user: action.payload.user,
      };
    },
    updateProfileFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearUpdateProfile: (state, action) => {
      return {
        ...state,
        isUpdate: false,
      };
    },
    updatePasswordRequest: (state, action) => {
      return { ...state, loading: true, isUpdate: false };
    },
    updatePasswordSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        isUpdate: true,
      };
    },
    updatePasswordFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    forgotPasswordRequest: (state, action) => {
      return { ...state, loading: true, message: null };
    },
    forgotPasswordSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    },
    forgotPasswordFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    resetPasswordRequest: (state, action) => {
      return { ...state, loading: true };
    },
    resetPasswordSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        isUpdate: true,
        user: action.payload.user,
      };
    },
    resetPasswordFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

const { actions, reducer } = AuthSlice;
export const {
  loginRequest,
  loginSuccess,
  loginFailed,
  clearError,
  registerRequest,
  registerSuccess,
  registerFailed,
  loadUserFailed,
  loadUserRequest,
  loadUserSuccess,
  logoutSuccess,
  logoutFailed,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailed,
  clearUpdateProfile,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
} = actions;
export default reducer;
