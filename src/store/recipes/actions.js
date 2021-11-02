import axios from "axios";
import { apiUrl } from "../../config/constants";

export function searchRecipes(array) {
  return async function thunk(dispatch, getState) {
    const body = { ingredients: array };
    try {
      const response = await axios.post(`${apiUrl}/recipe`, body);
      dispatch(sendSearchResults(response.data));
    } catch (e) {
      //   if (e.response) {
      //     console.log(e.response.data.message);
      //     dispatch(setMessage("danger", true, e.response.data.message));
      //   } else {
      //     console.log(e.message);
      //     dispatch(setMessage("danger", true, e.message));
      //   }
    }
  };
}
export function sendSearchResults(array) {
  return {
    type: "searchResult/NEW",
    payload: array,
  };
}
export function clearSearchResults() {
  return {
    type: "searchResult/CLEAR",
  };
}
