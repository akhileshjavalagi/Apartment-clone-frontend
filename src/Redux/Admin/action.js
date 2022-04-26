
// action type
export const ADD_ADMIN = "ADD_ADMIN";
export const LOGIN_STATUS = "LOGIN_STATUS";
export const LOGOUT_STATUS = "LOGOUT_STATUS";

// dispatcher objects
export const addAdmin = (value) => ({type: ADD_ADMIN, payload:value});
export const makeLogin = (value) => ({type: LOGIN_STATUS, payload: value});
export const makeLogout = (value) => ({type: LOGOUT_STATUS, payload: value});

