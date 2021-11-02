const initialState = {
  searchResult: [],
  selectedRecipe: {},
};
export default function recipes(state = initialState, action) {
  switch (action.type) {
    case "searchResult/NEW": {
      return {
        ...state,
        searchResult: [...action.payload],
      };
    }
    case "searchResult/CLEAR": {
      return {
        ...state,
        searchResult: [],
      };
    }
    case "selectedRecipe/NEW": {
      return {
        ...state,
        selectedRecipe: { ...action.payload },
      };
    }
    default: {
      return state;
    }
  }
}
