export const addToFavorites = (movie) => ({
  type: 'ADD_TO_FAVORITES',
  payload: movie,
});

export const removeFromFavorites = (movieID) => ({
  type: 'REMOVE_FROM_FAVORITES',
  payload: movieID,
});