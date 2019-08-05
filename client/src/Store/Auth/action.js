import axios from "axios";
import jwt_decode from "jwt-decode";
import FetchAction from "../UI/action";
const NS = "Auth";

export const actionTypes = {
  LOGIN_REQUEST: `${NS}/LOGIN_REQUEST`,
  LOGIN: `${NS}/LOGIN`,
  LOGIN_SUCCESS: `${NS}/LOGIN_SUCCESS`,
  LOGIN_FAILIURE: `${NS}/LOGIN_FALIURE`,
  LOGOUT: `${NS}/LOGOUT`,
  REGISTER_FAILURE: `${NS}/REGISTER_FAILURE`,
  REGISTER_SUCCESS: `${NS}/REGISTER_SUCCESS`,
  IS_AUTH: `${NS}/IS_AUTH`,
  IS_AUTH_FALSE: `${NS}/IS_AUTH_FALSE`
};

const actions = {
  login: user => {
    return dispatch => {
      axios.post("/user/login", user).then(response => {
        const { token } = response.data;
        localStorage.setItem("auth-token", token);
        const decodedToken = jwt_decode(token);
        if (token) {
          dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: { type: decodedToken.role, token: decodedToken.id }
          });
        } else
          dispatch({
            type: actionTypes.LOGIN_FAILIURE,
            payload: false
          });
      });
    };
  },
  register: user => {
    return dispatch => {
      console.log("store men", user);
      axios
        .post("/user/register", user)
        .then(res => {
          dispatch({
            type: actionTypes.REGISTER_SUCCESS
          });
        })
        .catch(err =>
          dispatch({
            type: actionTypes.REGISTER_FAILURE,
            payload: err.response.data
          })
        );
    };
  },
  isAuth: () => {
    return dispatch => {
      if (localStorage.getItem("auth-token")) {
        const token = localStorage.getItem("auth-token");
        const decodedToken = jwt_decode(token);

        dispatch({
          type: actionTypes.IS_AUTH,
          payload: { token: decodedToken.id, type: decodedToken.role }
        });
      } else {
        dispatch({
          type: actionTypes.IS_AUTH_FALSE
        });
        dispatch(FetchAction.fetchAll());
      }
    };
  },
  logout: () => {
    return dispatch => {
      localStorage.removeItem("auth-token");
      dispatch(actions.isAuth());
      dispatch(FetchAction.fetchAll());
    };
  }
};

export default actions;
