import { combineReducers } from "redux";
import favoriteReducer from "./favorites/reducer";

// Combine Reducers
const rootReducer = combineReducers({
  favorite: favoriteReducer,
  // Add other reducers here if you have more
});

export default rootReducer;
