import {RouterState} from "redux-router5";
import {ICounterState} from "./modules/counterModule";
import {ISettingsState} from "./modules/settingsModule";
import {IStarsState} from "./modules/starsModule";
import {IUserDetailState} from "./modules/userDetail";

export interface IStore {
  counter: ICounterState;
  router: RouterState;
  settings: ISettingsState;
  stars: IStarsState;
  userDetail: IUserDetailState;
}
