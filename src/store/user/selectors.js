export const selectToken = (state) => state.user.token;

export const selectUser = (state) => state.user;

export const selectUserFavorites = (state) => state.user.favorites;

export const selectUserOwner = (state) => state.user.owner;

export const selectPostRecipe = (state) => state.user.postRecipe;
export const selectIngredientList = (state) =>
  state.user.postRecipe.ingredientList;
