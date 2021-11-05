import { apiUrl } from "../../config/constants";
import { cloudinaryUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export function favoriteRecipe(recipeId) {
  return async function thunk(dispatch, getState) {
    const userId = getState().user.id;
    const favorites = getState().user.favorites;
    const body = { recipeId, userId };
    try {
      const response = await axios.post(`${apiUrl}/recipe/favorite/`, body);
      console.log(response.data);
      if (response.data.message === "created") {
        console.log(favorites);
      } else if (response.data.message === "deleted") {
        const newFavorites = favorites.filter((e) => e.id !== recipeId);
        dispatch(sendFavoriteRecipe(newFavorites));
      }
    } catch (e) {
      if (e.response) {
        console.log(e.response.data.message);
        //dispatch(setMessage("danger", true, e.response.data.message));
      } else {
        console.log(e.message);
        //dispatch(setMessage("danger", true, e.message));
      }
    }
  };
}
export function sendFavoriteRecipe(newFavorites) {
  return {
    type: "changeFavorites/NEW",
    payload: newFavorites,
  };
}

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};
export function postRecipe(recipe) {
  return async function thunk(dispatch, getState) {
    const userId = getState().user.id;
    const body = { ...recipe, userId };
    try {
      const response = await axios.post(`${apiUrl}/recipe/createrecipe`, body);
      console.log(response.data);
    } catch (e) {
      if (e.response) {
        console.log(e.response.data.message);
      } else {
        console.log(e.message);
      }
    }
  };
}
export function checkIngredient(ingredientData) {
  const body = { name: ingredientData.name };
  const { quantity, unitOfMeasure } = ingredientData;
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.post(
        `${apiUrl}/recipe/checkingredient`,
        body
      );
      const newIngredient = {
        name: response.data.ingredientData.name,
        quantity,
        unitOfMeasure,
        id: Math.random(),
      };
      dispatch(sendIngredient(newIngredient));
      console.log(response.data);
    } catch (e) {
      if (e.response) {
        console.log(e.response.data.message);
      } else {
        console.log(e.message);
      }
    }
  };
}
export function sendIngredient(ingredientData) {
  return {
    type: "addIngredient/NEW",
    payload: ingredientData,
  };
}
export function sendDeletedIngredient(id) {
  return {
    type: "deleteIngredient/DELETE",
    payload: id,
  };
}

//https://api.cloudinary.com/v1_1/<cloud name>/<resource_type>/upload

export function postImage(files) {
  return async function thunk(dispatch, getState) {
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "mz6yjao2");
    try {
      const response = await axios.post(`${cloudinaryUrl}`, data);
      console.log("Cloudinary Response:", response.data.url);
      dispatch(sendImageUrl(response.data.url));
    } catch (e) {
      if (e.response) {
        console.log(e.response.data.message);
      } else {
        console.log(e.message);
      }
    }
  };
}
export function sendImageUrl(url) {
  return {
    type: "addImage/NEW",
    payload: url,
  };
}
