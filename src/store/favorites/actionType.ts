import type { Book } from "@/pages/home";

export const ADD_FAVORITE = "ADD";
export const REMOVE_FAVORITE = "REMOVE";
export const CLEAR_FAVORITE = "CLEAR";

export type AddFavoriteActionType = {
  type: typeof ADD_FAVORITE;
  payload: Book;
};

export type RemoveFavoriteActionType = {
  type: typeof REMOVE_FAVORITE;
  payload: string;
};
export type ClearFavoriteActionType = {
  type: typeof CLEAR_FAVORITE;
};

export type FavoriteActionType =
  | AddFavoriteActionType
  | RemoveFavoriteActionType
  | ClearFavoriteActionType;
