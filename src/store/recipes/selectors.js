export const selectSearchResults = (reduxState) => {
  return reduxState.recipes.searchResult;
};
export const selectSelectedRecipe = (reduxState) => {
  return reduxState.recipes.selectedRecipe;
};
export const selectActiveSearch = (reduxState) => {
  return reduxState.recipes.activeSearch;
};
