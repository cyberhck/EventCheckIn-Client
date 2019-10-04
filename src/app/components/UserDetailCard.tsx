import * as React from "react";
import {style} from "typestyle";
import {IUserDetailState} from "../redux/modules/userDetail";
import {Loading} from "./Loading";
import {UserCard} from "./UserCard";

const classNames = {
  loadingFullContainer: style({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center"
  })
};
export class UserDetailCard extends React.PureComponent<IUserDetailState> {
  public render(): JSX.Element {
    if (this.props.pending) {
      return (
        <div className={classNames.loadingFullContainer}>
          <div>
            Loading...
          </div>
          <Loading/>
        </div>
      );
      // return pending component
    }
    if (this.props.error) {
      return (
        <div className={classNames.loadingFullContainer}>
          <div>{this.props.error}</div>
        </div>
      );
      // return error component
    }
    if (!this.props.loaded) {
      return (
        <div>Start scanning badge</div>
      );
    }
    // here, most probably the data is loaded, data is not pending, and it's not errorred, so it must be loaded.
    return (
      <div>
        <UserCard {...this.props.userDetail}/>
      </div>
    );
  }
}
