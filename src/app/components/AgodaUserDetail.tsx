import * as React from "react";
import {style} from "typestyle";

interface IProps {
  pictureUrl: string;
  name: string;
  email: string;
}

const classNames = {
  agoji: style({height: 128, width: 128}),
  container: style({
    alignItems: "center",
    display: "flex",
    flexDirection: "column"
  })
};

export class AgodaUserDetail extends React.PureComponent<IProps> {
  public render(): JSX.Element {
    return (
      <div className={classNames.container}>
        <img className={classNames.agoji} alt={`${this.props.name}'s agoji`} src={this.props.pictureUrl}/>
        <h2>
          {this.props.email}
        </h2>
        <div>
          {this.props.name}
        </div>
      </div>
    );
  }
}
