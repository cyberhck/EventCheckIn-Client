import {IUserDetail} from "../../sdk/nodes/CheckIn";
import {createAsyncActions} from "./baseModule";

// tslint:disable-next-line:export-name
export const loadUserDetail = createAsyncActions(
  "USER_DETAILS/LOAD",
  "USER_DETAILS/LOAD_PENDING",
  "USER_DETAILS/LOAD_FULFILLED",
  "USER_DETAILS/LOAD_REJECTED"
)<string, null, IUserDetail, null>();
