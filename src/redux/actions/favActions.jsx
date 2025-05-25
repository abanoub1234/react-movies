export const addToFav = (movie) => ({
  type: "ADD_TO_FAV",
  payload: movie,
});

export const removeFromFav = (id) => ({
  type: "REMOVE_FROM_FAV",
  payload: id,
});