import { actionTypes } from "./action";

const getInitialState = () => ({
  isAuth: "",
  error: "",
  token: "",
  type: "",
  msg:""
});

const Authenticate = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case actionTypes.IS_AUTH:
      return {
        ...state,
        isAuth: true,
        token: payload.token,
        type:payload.type
      };
    case actionTypes.IS_AUTH_FALSE:
      return {
        ...state,
        isAuth: false,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        type: payload.type,
        token: payload.token
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        msg: "Registered Succesfully"
      };
    case actionTypes.REGISTER_FAILIURE:
      return {
        ...state,
        error: `Something went wrong ${payload}`
      };
    default:
      return state;
  }
};

export default Authenticate;


