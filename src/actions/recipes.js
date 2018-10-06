
/**
  * Get this User's Favourite Recipes
  */
export function getFavourites(dispatch) {
  return dispatch({
    type: 'FAVOURITES_REPLACE',
    data: [],
  });

}

/**
  * Reset a User's Favourite Recipes in Redux (eg for logou)
  */
export function resetFavourites(dispatch) {
  return dispatch({
    type: 'FAVOURITES_REPLACE',
    data: [],
  });
}

/**
  * Update My Favourites Recipes
  */
export function replaceFavourites(newFavourites) {
 return () => new Promise(resolve => resolve());

}

/**
  * Get Meals
  */
export function getMeals() {
  return () => new Promise(resolve => resolve());

}

/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'RECIPES_ERROR',
    data: message,
  })));
}

/**
  * Get Recipes
  */
export function getRecipes() {
  return () => new Promise(resolve => resolve());
}
