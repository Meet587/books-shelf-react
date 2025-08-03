import type { Book } from "@/pages/home";
import {
  ADD_FAVORITE,
  CLEAR_FAVORITE,
  REMOVE_FAVORITE,
  type AddFavoriteActionType,
  type ClearFavoriteActionType,
  type RemoveFavoriteActionType,
} from "./actionType";

export const _setFavoriteList = (book: Book): AddFavoriteActionType => {
  return {
    type: ADD_FAVORITE,
    payload: book,
  };
};

export const _removeFavorite = (bookId: string): RemoveFavoriteActionType => {
  return {
    type: REMOVE_FAVORITE,
    payload: bookId,
  };
};

export const _clearFavorite = (): ClearFavoriteActionType => {
  return {
    type: CLEAR_FAVORITE,
  };
};
