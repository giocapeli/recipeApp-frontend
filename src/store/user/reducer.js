import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  ratings: null,
  owner: null,
  favorites: null,
  postRecipe: { ingredientList: [], recipe: null, imageUrl: null },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "changeFavorites/NEW": {
      return {
        ...state,
        favorites: action.payload,
      };
    }
    case "addIngredient/NEW": {
      return {
        ...state,
        postRecipe: {
          ...state.postRecipe,
          ingredientList: [...state.postRecipe.ingredientList, action.payload],
        },
      };
    }
    case "addImage/NEW": {
      return {
        ...state,
        postRecipe: {
          ...state.postRecipe,
          imageUrl: action.payload,
        },
      };
    }
    case "deleteIngredient/DELETE": {
      const newIngredientList = state.postRecipe.ingredientList.filter(
        (e) => e.id !== action.payload
      );
      return {
        ...state,
        postRecipe: {
          ...state.postRecipe,
          ingredientList: newIngredientList,
        },
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
