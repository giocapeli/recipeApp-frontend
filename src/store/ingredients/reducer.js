const initialState = {
  allIngredients: [],
};
export default function ingredients(state = initialState, action) {
  switch (action.type) {
    case "ingredients/GET": {
      return {
        ...state,
        allIngredients: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
