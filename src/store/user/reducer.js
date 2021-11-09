const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  ratings: null,
  owner: null,
  favorites: null,
  postRecipe: {
    ingredientList: [],
    recipe: null,
    imageUrl: null,
  },
  newRecipeId: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case "changeFavorites/NEW": {
      return {
        ...state,
        favorites: action.payload,
      };
    }
    case "ingredient/NEW": {
      return {
        ...state,
        postRecipe: {
          ...state.postRecipe,
          ingredientList: [...state.postRecipe.ingredientList, action.payload],
        },
      };
    }
    case "ingredient/DELETE": {
      return {
        ...state,
        postRecipe: {
          ...state.postRecipe,
          ingredientList: state.postRecipe.ingredientList.filter(
            (e) => e.id !== action.payload.id
          ),
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
    case "postRecipe/CLEAR": {
      return {
        ...state,
        postRecipe: { ...initialState.postRecipe },
      };
    }
    case "LOGIN_SUCCESS": {
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };
    }

    case "LOG_OUT": {
      localStorage.removeItem("token");
      return { ...initialState, token: null };
    }

    case "TOKEN_STILL_VALID": {
      return { ...state, ...action.payload };
    }
    case "test/NEW": {
      return { ...state, favorites: action.payload };
    }
    // case "newRecipeId/NEW": {
    //   return { ...state, newRecipeId: action.payload };
    // }
    default: {
      return state;
    }
  }
}
