import {IFetchRequest, Service} from "@crazyfactory/tinka";
import autobind from "autobind-decorator";
export interface IUserDetail {
  id: number;
  email: string;
  name: string;
  adultsCount: number;
  adultsNames: string;
  kidsCount: number;
  kidsName: string;
  knownAllergies: string;
  checkedInAt: string;
}
interface IBadgeCheckInRequest {
  badge: string;
}

interface IEmailCheckInRequest {
  email: string;
}

export class CheckIn extends Service {
  @autobind
  public checkInWithBadge(badgeCheckInRequest: IBadgeCheckInRequest): IUserDetail {
    const request: IFetchRequest = {
      body: JSON.stringify(badgeCheckInRequest),
      method: "POST",
      url: "/api/checkIn/badge"
    };
    return this.client.process(request);
  }

  @autobind
  public checkInWithEmail(emailCheckInRequest: IEmailCheckInRequest): IUserDetail {
    const request: IFetchRequest = {
      body: JSON.stringify(emailCheckInRequest),
      method: "POST",
      url: "/api/checkIn/email"
    };
    return this.client.process(request);
  }
}
