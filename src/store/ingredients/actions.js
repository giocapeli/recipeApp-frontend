import axios from "axios";
import { apiUrl } from "../../config/constants";

export function getAllIngredients() {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.get(`${apiUrl}/ingredient/all`);
      console.log(response.data);
      dispatch(sendAllIngredients(response.data));
    } catch (e) {
      if (e.response) {
        console.log(e.response.data.message);
      } else {
        console.log(e.message);
      }
    }
  };
}
export function sendAllIngredients(array) {
  return {
    type: "ingredients/GET",
    payload: array,
  };
}
