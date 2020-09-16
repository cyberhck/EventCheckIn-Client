import autobind from "autobind-decorator";
import {call, CallEffect, ForkEffect, put, PutEffect, takeLatest} from "redux-saga/effects";
import {getType} from "typesafe-actions";
import {IAction} from "../redux/modules/baseModule";
import {loadUserDetail} from "../redux/modules/userDetailActionCreators";
import {Api} from "../sdk/Api";
import {IUserDetail} from "../sdk/nodes/CheckIn";
import {BaseSaga} from "./BaseSaga";

export class CheckInSaga extends BaseSaga {
  constructor(private api: Api) {
    super();
  }

  @autobind
  public *fetchUser(action: IAction<string>):
  IterableIterator<CallEffect | PutEffect<IAction<IUserDetail>> | PutEffect<null>> {
    const expectedDomain = "example.com";
    try {
      yield put(loadUserDetail.setPending(null));
      const badgeOrEmail = action.payload;
      // for non employees, error immediately
      if (badgeOrEmail.includes("@") && badgeOrEmail.split("@")[1] !== expectedDomain) {
        yield put(loadUserDetail.setRejected("it must be an employee email", null));
        return;
      }
      if (badgeOrEmail.includes("@")) {
        console.info("includes @ sign, using checkInWithEmail");
        yield put(loadUserDetail.setFulfilled(yield call(this.api.checkIn.checkInWithEmail, {email: action.payload})));
        return;
      }
      console.info("doesn't include @ sign, using checkInWithBadge");
      yield put(loadUserDetail.setFulfilled(yield call(this.api.checkIn.checkInWithBadge, {badge: action.payload})));
    } catch (e) {
      yield put(loadUserDetail.setRejected(e.error, null));
    }
  }

  protected *registerListeners(): IterableIterator<ForkEffect> {
    yield takeLatest(getType(loadUserDetail.invoke), this.fetchUser);
  }
}
