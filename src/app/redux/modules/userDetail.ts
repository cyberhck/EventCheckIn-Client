import {ActionType, getType} from "typesafe-actions";
import {IUserDetail} from "../../sdk/nodes/CheckIn";
import {IBaseState} from "./baseModule";
import {loadUserDetail} from "./userDetailActionCreators";

export interface IUserDetailState extends IBaseState {
  userDetail: IUserDetail;
}
const initialState: IUserDetailState = {
  error: null,
  loaded: false,
  pending: false,
  userDetail: null
};

export function userDetailReducer(
  state: IUserDetailState = initialState,
  action: ActionType<typeof loadUserDetail>
): IUserDetailState {
  switch (action.type) {
    case getType(loadUserDetail.setPending):
      return {
        ...state,
        loaded: false,
        pending: true,
        userDetail: null
      };
    case getType(loadUserDetail.setFulfilled):
      return {
        ...state,
        error: "",
        loaded: true,
        pending: false,
        userDetail: action.payload
      };
    case getType(loadUserDetail.setRejected):
      return {
        ...state,
        error: action.payload,
        loaded: true,
        pending: false
      };
    default:
      return state;
  }
}
