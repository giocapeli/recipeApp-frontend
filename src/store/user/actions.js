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

export function favoriteRecipe(recipeId) {
  return async function thunk(dispatch, getState) {
    const userId = getState().user.id;
    const favorites = getState().user.favorites;
    const body = { recipeId, userId };
    const token = getState().user.token;
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.post(`${apiUrl}/recipe/favorite/`, body, {
        headers,
      });
      console.log(response.data);
      if (response.data.message === "Favorited") {
        const newFavorites = [...favorites, response.data.favorite.recipe];
        console.log("fav", response);
        dispatch(sendFavoriteRecipe(newFavorites));
      } else if (response.data.message === "Unfavorited") {
        const newFavorites = favorites.filter((e) => e.id !== recipeId);
        dispatch(sendFavoriteRecipe(newFavorites));
      } else {
        dispatch(
          showMessageWithTimeout(
            "danger",
            true,
            "Something wrong happened.",
            3000
          )
        );
      }
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
}
export function sendFavoriteRecipe(newFavorites) {
  return {
    type: "changeFavorites/NEW",
    payload: newFavorites,
  };
}

export function sendIngredient(ingredientData) {
  console.log(ingredientData);
  return {
    type: "ingredient/NEW",
    payload: ingredientData,
  };
}
export function sendDeletedIngredient(ingredientData) {
  return {
    type: "ingredient/DELETE",
    payload: ingredientData,
  };
}

export function postImage(files) {
  return async function thunk(dispatch, getState) {
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "mz6yjao2");
    try {
      const response = await axios.post(`${cloudinaryUrl}`, data);
      console.log("Cloudinary Response:", response.data.url);
      dispatch(sendImageUrl(response.data.url));
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
}
export function sendImageUrl(url) {
  return {
    type: "addImage/NEW",
    payload: url,
  };
}

export function postRecipe(recipe, history) {
  return async function thunk(dispatch, getState) {
    const imageUrl = getState().user.postRecipe.imageUrl;
    const userId = getState().user.id;
    const ingredientList = getState().user.postRecipe.ingredientList;
    const token = getState().user.token;
    const headers = { Authorization: `Bearer ${token}` };
    const body = {
      ...recipe,
      userId,
      imageUrl,
      ingredientList,
    };
    try {
      const response = await axios.post(`${apiUrl}/recipe/createrecipe`, body, {
        headers,
      });
      //console.log(response.data);
      showMessageWithTimeout(
        "success",
        true,
        "Recipe posted with success!",
        3000
      );
      // dispatch(sendNewRecipeId(response.data.id));
      dispatch(clearPostRecipe());
      console.log(response.data);
      history.push(`/recipe/${response.data.id}`);
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
}

export function deleteRecipe(recipeId) {
  return async function thunk(dispatch, getState) {
    const userId = getState().user.id;
    const token = getState().user.token;
    const owner = getState().user.owner;
    const headers = { Authorization: `Bearer ${token}` };
    const body = {
      userId,
      recipeId,
    };
    try {
      const response = await axios.post(`${apiUrl}/recipe/delete`, body, {
        headers,
      });
      console.log(response.data);
      const newOwner = owner.filter(
        (e) => parseInt(e.id) !== parseInt(recipeId)
      );
      dispatch(sendDeleteRecipe(newOwner));
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
}
export function sendDeleteRecipe(newOwner) {
  console.log(newOwner);
  return {
    type: "recipe/DELETE",
    payload: newOwner,
  };
}
export function clearPostRecipe() {
  return {
    type: "postRecipe/CLEAR",
  };
}
//////////////////////LOGIN
export function loginSuccess(userWithToken) {
  return {
    type: "LOGIN_SUCCESS",
    payload: userWithToken,
  };
}
export function tokenStillValid(userWithoutToken) {
  return {
    type: "TOKEN_STILL_VALID",
    payload: userWithoutToken,
  };
}
export function logOut() {
  return {
    type: "LOG_OUT",
  };
}
export function signUp(name, email, password) {
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
}
export function login(email, password) {
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
}
export function getUserWithStoredToken() {
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
}
