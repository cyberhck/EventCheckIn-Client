import * as React from "react";
import {classes, keyframes, style} from "typestyle";

interface IProps {
  className?: string;
}
const loadingAnimation = keyframes({
  from: {
    left: "50%",
    opacity: 1,
    width: "0%"
  },
  to: {
    left: "65%",
    opacity: 0,
    width: "130%"
  }
});
const styles = {
  container: style({
    backgroundColor: "#ced6da",
    borderRadius: 2,
    height: 2,
    overflow: "hidden",
    width: 300
  }),
  loading: style({
    animationDuration: "2.5s",
    animationIterationCount: "infinite",
    animationName: loadingAnimation,
    animationTimingFunction: "linear",
    backgroundColor: "#68747b",
    borderRadius: 2,
    height: 2
  })
};
export class Loading extends React.PureComponent<IProps> {
  public render(): JSX.Element {
    return (
      <div className={classes(styles.container, this.props.className)}>
        <div className={styles.loading}/>
      </div>
    );
  }
}
