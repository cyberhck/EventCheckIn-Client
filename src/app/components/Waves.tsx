import * as React from "react";
import {keyframes, media, style} from "typestyle";

const moveForeverAnimation = keyframes({
  "0%": {
    transform: "translate3d(-90px, 0, 0)"
  },
  "100%": {
    transform: "translate3d(85px, 0, 0)"
  }
});
const classes = {
  use: style({
    $nest: {
      "&:nth-child(1)": {
        animationDelay: "-2s",
        animationDuration: "7s"
      },
      "&:nth-child(2)": {
        animationDelay: "-3s",
        animationDuration: "10s"
      },
      "&:nth-child(3)": {
        animationDelay: "-4s",
        animationDuration: "13s"
      },
      "&:nth-child(4)": {
        animationDelay: "-5s",
        animationDuration: "20s"
      }
    },
    animationDuration: "25s",
    animationIterationCount: "infinite",
    animationName: moveForeverAnimation,
    animationTimingFunction: "cubic-bezier(.55,.5,.45,.5)"
  }),
  waves: style(
    {
      background: "linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%)",
      height: "15vh",
      position: "relative",
      transform: "rotate(180deg)",
      width: "100%"
    },
    media({maxWidth: 786, minWidth: 0}, {
      height: 40,
      minHeight: 40
    }))
};

export class Waves extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <svg className={classes.waves} viewBox={"0 24 150 28"} preserveAspectRatio={"none"} shapeRendering={"auto"}>
        <defs>
          <path id="gw" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
        </defs>
        <g>
          <use className={classes.use} xlinkHref={"#gw"} x={"48"} y={"0"} fill={"rgba(255,255,255,0.7)"}/>
          <use className={classes.use} xlinkHref={"#gw"} x={"48"} y={"3"} fill={"rgba(255,255,255,0.5)"}/>
          <use className={classes.use} xlinkHref={"#gw"} x={"48"} y={"5"} fill={"rgba(255,255,255,0.3)"}/>
          <use className={classes.use} xlinkHref={"#gw"} x={"48"} y={"7"} fill={"#fff"}/>
        </g>
      </svg>
    );
  }
}
