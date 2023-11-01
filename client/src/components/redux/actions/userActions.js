import axios from "axios";
import {
  clearError,
  forgotPasswordFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  loadUserFailed,
  loadUserRequest,
  loadUserSuccess,
  loginFailed,
  loginRequest,
  loginSuccess,
  logoutFailed,
  logoutSuccess,
  registerFailed,
  registerRequest,
  registerSuccess,
  resetPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  updatePasswordFailed,
  updatePasswordRequest,
  updatePasswordSuccess,
  updateProfileFailed,
  updateProfileRequest,
  updateProfileSuccess,
} from "../slices/authSlice";
//Login action controller
export const login = (email, password) => async (dispatch) => {
  let uri = `${process.env.REACT_APP_API_URL}/api/v1/login`;
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(uri, { email, password });
    //console.log(data);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailed(error.response.data.message));
  }
};
//To hide unwanted error warning
export const clearAuthError = (dispatch) => {
  dispatch(clearError());
};
//Register new User controller
export const register = (userData) => async (dispatch) => {
  //console.log(userData);
  let uri = `${process.env.REACT_APP_API_URL}/api/v1/register`;
  try {
    dispatch(registerRequest());
    //To accept  avatar images
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(uri, userData, config);
    //console.log(data);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFailed(error.response.data.message));
  }
};

//Load Logged in user Data
export const loadUser = async (dispatch) => {
  let uri = `${process.env.REACT_APP_API_URL}/api/v1/myprofile`;
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(uri, {
      withCredntials: true,
      credentials: "include",
    });
    //console.log(data);
    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFailed(error.response.data.message));
  }
};

//log out Action Controller
export const logout = async (dispatch) => {
  let uri = `${process.env.REACT_APP_API_URL}/api/v1/logout`;
  try {
    await axios.get(uri);
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailed(error.response.data.message));
  }
};

//Update  User controller
export const updateProfile = (userData) => async (dispatch) => {
  //console.log(userData);
  let uri = `${process.env.REACT_APP_API_URL}/api/v1/myprofile/updateprofile`;
  try {
    dispatch(updateProfileRequest());
    //To accept  avatar images
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(uri, userData, config);
    //console.log(data);
    dispatch(updateProfileSuccess(data));
  } catch (error) {
    dispatch(updateProfileFailed(error.response.data.message));
  }
};

//Update  User password
export const updatePassword = (formData) => async (dispatch) => {
  //console.log(formData);
  let uri = `${process.env.REACT_APP_API_URL}/api/v1/myprofile/updatepassword`;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch(updatePasswordRequest());

    await axios.put(uri, formData, config);
    //console.log(data);
    dispatch(updatePasswordSuccess());
  } catch (error) {
    dispatch(updatePasswordFailed(error.response.data.message));
  }
};

//  Forgot Password Action
export const forgotPassword = (formData) => async (dispatch) => {
  //console.log(formData);
  let uri = `${process.env.REACT_APP_API_URL}/api/v1/forgot/password`;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    // dispatch(forgotPasswordRequest());
    dispatch(forgotPasswordRequest());
    const { data } = await axios.post(uri, formData, config);
    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFailed(error.response.data.message));
  }
};

//Reset  password
export const resetPassword = (formData, token) => async (dispatch) => {
  //console.log(formData);
  let uri = `${process.env.REACT_APP_API_URL}/api/v1/reset/password/${token}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch(resetPasswordRequest());

    const { data } = await axios.post(uri, formData, config);
    //console.log(data);
    dispatch(resetPasswordSuccess(data));
  } catch (error) {
    dispatch(resetPasswordFailed(error.response.data.message));
  }
};
