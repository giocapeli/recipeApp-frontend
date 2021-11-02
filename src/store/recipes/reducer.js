const initialState = {
  searchResult: [],
  selectedRecipe: {},
  activeSearch: [],
};
export default function recipes(state = initialState, action) {
  switch (action.type) {
    case "recipe/CLEAR": {
      return { ...initialState };
    }
    case "searchResult/NEW": {
      return {
        ...state,
        searchResult: [...action.payload],
      };
    }
    case "selectedRecipe/NEW": {
      return {
        ...state,
        selectedRecipe: { ...action.payload },
      };
    }
    case "activeSearch/NEW": {
      return {
        ...state,
        activeSearch: [...action.payload.activeSearch],
      };
    }

    default: {
      return state;
    }
  }
}
