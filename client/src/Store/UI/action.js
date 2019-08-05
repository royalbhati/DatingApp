import axios from "axios";
const NS = "UI_ACTIONS";

export const actionTypes = {
  LIKED: `${NS}/LIKED`,
  BLOCK: `${NS}/BLOCK`,
  FETCH_ALL: `${NS}/FETCH_ALL`,
  SUPERLIKED: `${NS}/SUPERLIKED`,
  MATCHED: `${NS}/MATCHED`
};

const actions = {
  fetchAll: id => {
    console.log("fetch llllll");
    return dispatch => {
      axios.get(`/api/users/all/${id}`).then(response => {
        dispatch({
          type: actionTypes.FETCH_ALL,
          payload: response.data
        });
      });
    };
  },
  like: (currentuser, tolike) => {
    return dispatch => {
      axios.put(`/api/users/like/`, { currentuser, tolike }).then(response => {
        dispatch({
          type: actionTypes.LIKED,
          payload: { response, currentuser }
        });
        dispatch(actions.fetchAll(currentuser));
      });
    };
  },
  block: (currentuser, toblock) => {
    return dispatch => {
      axios
        .put(`/api/users/block/`, { currentuser, toblock })
        .then(response => {
          dispatch({
            type: actionTypes.BLOCK,
            payload: response
          });
          dispatch(actions.fetchAll(currentuser));
        });
    };
  },
  superlike: (currentuser, tosuperlike) => {
    return dispatch => {
      axios
        .put(`/api/users/superlike/`, { currentuser, tosuperlike })
        .then(response => {
          dispatch({
            type: actionTypes.SUPERLIKED,
            payload: response
          });
          dispatch(actions.fetchAll(currentuser));
        });
    };
  },
  match: (currentuser, matchedUser, matchArr) => {
    return dispatch => {
      console.log(
        "_____________________MATCH FROM ACTION___________",
        matchArr
      );

      axios
        .put(`/api/users/match/`, { currentuser, matchedUser, matchArr })
        .then(response => {
          dispatch({
            type: actionTypes.MATCHED,
            payload: response
          });
          dispatch(actions.fetchAll(currentuser));
        });
    };
  }
};

export default actions;
