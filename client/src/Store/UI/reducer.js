import { actionTypes } from "./action";

const getInitialState = () => ({
  data: "",
  msg: "",
  loaded: false,
  jobDetails: "",
  job: "",
  liked:false,
  likedUser:""
});

const Job = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH:
      return {
        ...state,
        data: payload,
        msg: "Fetched Successfully",
        loaded: true
      };
    case actionTypes.FETCH_ALL:
      return {
        ...state,
        data: payload,
        msg: "Fetched Successfully",
        loaded: true
      };
    case actionTypes.LIKED:
      return {
        ...state,
        msg: payload.response.data.msg,
        liked: "liked",
        likedUser: payload.currentuser
      };
    case actionTypes.BLOCK:
      return {
        ...state,
        msg: payload.data.msg
      };
    case actionTypes.SUPERLIKED:
      return {
        ...state,
        msg: "Superliked",
      };
    case actionTypes.MATCHED:
      return {
        ...state,
        msg: "Its a Match!",
      };
    case actionTypes.JOB_DETAILS:
      return {
        ...state,
        jobDetails: payload
      };
    case actionTypes.GET_JOB_OF_POSTER:
      return {
        ...state,
        job: payload
      };
    default:
      return state;
  }
};

export default Job;
