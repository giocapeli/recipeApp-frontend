import axios from "axios";
import { apiUrl } from "../../config/constants";

export function clearState(bool) {
  return {
    type: "recipe/CLEAR",
    payload: bool,
  };
}

export function searchRecipes(array) {
  return async function thunk(dispatch, getState) {
    const body = { ingredients: array };
    try {
      const response = await axios.post(`${apiUrl}/recipe`, body);
      console.log(response.data);
      dispatch(sendSearchResults(response.data.recipes));
      dispatch(sendActiveSearch(response.data));
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
export function sendSearchResults(object) {
  return {
    type: "searchResult/NEW",
    payload: object,
  };
}
export function sendActiveSearch(object) {
  return {
    type: "activeSearch/NEW",
    payload: object,
  };
}
export function getRecipeById(id) {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.get(`${apiUrl}/recipe/${id}`);
      dispatch(sendSelectedRecipe(response.data));
      //console.log(response.data);
    } catch (e) {}
  };
}
export function sendSelectedRecipe(object) {
  return {
    type: "selectedRecipe/NEW",
    payload: object,
  };
}