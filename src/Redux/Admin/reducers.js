// import acction types
import { ADD_ADMIN } from "./action";
import { LOGIN_STATUS, LOGOUT_STATUS } from "./action";

// store keys
const initState = {
  isLogged: JSON.parse(localStorage.getItem("isLogged")) || false,
  adminData: JSON.parse(localStorage.getItem("admin")) || {},
};
/*
[{"_id":"625beafadb4cc2680352d69d","user_name":"premkumar@gmail.com","password":"1225","__v":0}]
*/
// reducer function
export const adminReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case ADD_ADMIN:
      payload.map((e) => {
        e.password = "xxxxxx";
      })
      localStorage.setItem("admin", JSON.stringify([...payload]));
      return { ...store, adminData: JSON.parse(localStorage.getItem("admin")) };
      break;
    case LOGIN_STATUS:
      let status = JSON.parse(localStorage.getItem("isLogged"));
      status = true;
      localStorage.setItem("isLogged", JSON.stringify(status));
      return {
        ...store,
        isLogged: JSON.parse(localStorage.getItem("isLogged")),
      };
      break;
    case LOGOUT_STATUS:
      let status1 = JSON.parse(localStorage.getItem("isLogged"));
      status1 = false;
      localStorage.setItem("isLogged", JSON.stringify(status1));
      return {
        ...store,
        isLogged: JSON.parse(localStorage.getItem("isLogged")),
      };
      break;
    default:
      return store;
  }
};
