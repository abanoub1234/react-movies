const initialState = {
  favs: [],
};

export const favReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_FAV":
      if (state.favs.find((m) => m.id === action.payload.id)) {
        return state;
      }
      return { ...state, favs: [...state.favs, action.payload] };

    case "REMOVE_FROM_FAV":
      return { ...state, favs: state.favs.filter((m) => m.id !== action.payload) };

    default:
      return state;
  }
};