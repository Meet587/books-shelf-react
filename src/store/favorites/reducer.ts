import type { Book } from "@/pages/home";
import type { FavoriteActionType } from "./actionType";
import { ADD_FAVORITE, CLEAR_FAVORITE, REMOVE_FAVORITE } from "./actionType";

const initialState = {
  favorites: [] as Book[],
};

const favoriteReducer = (state = initialState, action: FavoriteActionType) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((book) => book.id !== action.payload),
      };
    case CLEAR_FAVORITE:
      return { ...state, favorites: [] };
    default:
      return state;
  }
};

export default favoriteReducer;
