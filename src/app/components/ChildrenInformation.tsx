import * as React from "react";
import {style} from "typestyle";

const classNames = {
  container: style({
    textAlign: "center"
  }),
  image: style({
    border: "3px solid #ccc",
    borderRadius: "50%",
    height: 128,
    marginBottom: 20,
    width: 128
  })
};

interface IProps {
  count: number;
  commaSeparatedNames: string;
}

export class ChildrenInformation extends React.PureComponent<IProps> {
  public render(): JSX.Element {
    return (
      <div className={classNames.container}>
        <img className={classNames.image} src={require("../images/children.svg")} alt="kids information"/>
        <h2>{this.props.count} Kids</h2>
        <ul>
          {this.props.commaSeparatedNames.split(",").map((x) => x.trim()).map((x) => <li key={x}>{x}</li>)}
        </ul>
      </div>
    );
  }
}
