import { combineReducers } from "redux";
import { ContentReducer } from "./contentReducer";
export const rootReducer = combineReducers({
  content: ContentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
