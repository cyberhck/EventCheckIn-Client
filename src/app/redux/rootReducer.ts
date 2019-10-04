import {combineReducers, Reducer} from "redux";
import {router5Reducer} from "redux-router5";
import {IStore} from "./IStore";
import {counterReducer} from "./modules/counterModule";
import {settingsReducer} from "./modules/settingsModule";
import {starsReducer} from "./modules/starsModule";
import {userDetailReducer} from "./modules/userDetail";

const rootReducer: Reducer<IStore> = combineReducers<IStore>({
  counter: counterReducer,
  router: router5Reducer,
  settings: settingsReducer,
  stars: starsReducer,
  userDetail: userDetailReducer
});

export default rootReducer;
