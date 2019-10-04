import * as React from "react";
import {classes, style} from "typestyle";

const classNames = {
  container: style({
    textAlign: "center"
  }),
  disabled: style({
    filter: "grayscale(0.8)"
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
  dietPreference: string;
}

export class DietInfo extends React.PureComponent<IProps> {
  public render(): JSX.Element {
    return (
      <div className={classes(classNames.container, this.props.dietPreference === null ? classNames.disabled : null)}>
        <img className={classNames.image} src={require("../images/diet.svg")} alt="diet information"/>
        <div>{this.props.dietPreference}</div>
      </div>
    );
  }
}
