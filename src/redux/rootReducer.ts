import { combineReducers } from "@reduxjs/toolkit";

import { utilsReducers } from "./utils/slices";

const rootReducer = combineReducers({
  utils: utilsReducers,
});

export { rootReducer };
