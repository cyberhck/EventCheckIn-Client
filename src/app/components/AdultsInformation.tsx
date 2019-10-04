import * as React from "react";
import {style} from "typestyle";

interface IProps {
  count: number;
  commaSeparatedNames: string;
}
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
export class AdultsInformation extends React.PureComponent<IProps> {
  public render(): JSX.Element {
    return (
      <div className={classNames.container}>
        <img className={classNames.image} src={require("../images/parents.svg")} alt="parents information"/>
        <h2>{this.props.count} Adults</h2>
        <ul>
          {this.props.commaSeparatedNames.split(",").map((x) => x.trim()).map((x) => <li key={x}>{x}</li>)}
        </ul>
      </div>
    );
  }
}
