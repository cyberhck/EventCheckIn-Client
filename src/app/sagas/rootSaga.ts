import {all, AllEffect} from "redux-saga/effects";
import {Api} from "../sdk/Api";
import {CheckInSaga} from "./CheckInSaga";
import {SettingsSaga} from "./SettingsSaga";
import {StarsSaga} from "./StarsSaga";

export default function* rootSaga(): IterableIterator<AllEffect<any>> {
  // tslint:disable-next-line:no-http-string
  const api = Api.getInstance("http://localhost:5000");
  yield all([
    (new SettingsSaga()).watch(),
    (new StarsSaga()).watch(),
    (new CheckInSaga(api)).watch()
  ]);
}
