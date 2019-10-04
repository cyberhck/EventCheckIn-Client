import {Alert} from "antd";
import * as React from "react";
import {style} from "typestyle";
import {TimeAgo} from "../helpers/TimeAgo";
import {IUserDetail} from "../sdk/nodes/CheckIn";
import {AdultsInformation} from "./AdultsInformation";
import {AgodaUserDetail} from "./AgodaUserDetail";
import {ChildrenInformation} from "./ChildrenInformation";
import {DietInfo} from "./DietInfo";

const classNames = {
  agoji: style({height: 128, width: 128}),
  container: style({
    display: "flex",
    flexDirection: "column"
  }),
  image: style({
    alignSelf: "center",
    border: "1px solid #ccc",
    borderRadius: "50%",
    height: 64,
    marginBottom: 20,
    marginTop: 20,
    width: 64
  }),
  info: style({
    $nest: {
      div: {
        flexGrow: 1
      }
    },
    display: "flex",
    flexDirection: "row",
    marginTop: 20
  }),
  ticketContainer: style({
    alignSelf: "center",
    display: "flex",
    flexDirection: "column"
  })
};

export class UserCard extends React.PureComponent<IUserDetail> {
  public render(): JSX.Element {
    const id = this.props.id;
    const profile = (id % 50) + 1;
    const url = `/public/images/agojis/${profile}.png`;
    const ticketCount = this.props.kidsCount + this.props.adultsCount - 1;
    const message = `${ticketCount} ${ticketCount === 1 ? "ticket" : "tickets"}`;
    const description = this.props.checkedInAt ?
      (
        <section>
          Already checked in <a title={this.props.checkedInAt}>{TimeAgo(new Date(this.props.checkedInAt))}</a>
        </section>
      )
      : "Not Checked In yet";
    return (
      <div className={classNames.container}>
        <AgodaUserDetail pictureUrl={url} name={this.props.name} email={this.props.email}/>
        <div className={classNames.container}>
          <div className={classNames.ticketContainer}>
            <img className={classNames.image} src={require("../images/tickets.svg")} alt={"ticket"}/>
            <Alert
              type={this.props.checkedInAt === null ? "success" : "error"}
              message={message}
              description={description}
            />
          </div>
        </div>
        <div className={classNames.info}>
          <AdultsInformation count={this.props.adultsCount} commaSeparatedNames={this.props.adultsNames}/>
          <DietInfo dietPreference={this.props.knownAllergies}/>
          <ChildrenInformation count={this.props.kidsCount} commaSeparatedNames={this.props.kidsName}/>
        </div>
      </div>
    );
  }
}
