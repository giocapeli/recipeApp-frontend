import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  ratings: null,
  owner: null,
  favorites: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "changeFavorites/NEW": {
      return {
        ...state,
        favorites: [...action.payload],
      };
    }

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
