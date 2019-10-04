import {Client, Service} from "@crazyfactory/tinka";
import {ContentTypeMiddleware} from "./middleware/ContentTypeMiddleware";
import {ErrorMiddleware} from "./middleware/ErrorMiddleware";
import {WrapMiddleware} from "./middleware/WrapMiddleware";
import {CheckIn} from "./nodes/CheckIn";

export class Api extends Service {
  private static instance: Api;

  public static getInstance(baseUrl: string): Api {
    if (!Api.instance) {
      Api.instance = new Api(Api.getClient(baseUrl));
    }
    return Api.instance;
  }

  private static getClient(baseUrl: string): Client {
    const client = new Client({baseUrl});
    client.addMiddleware(new ErrorMiddleware());
    client.addMiddleware(new WrapMiddleware());
    client.addMiddleware(new ContentTypeMiddleware());
    return client;
  }

  public get checkIn(): CheckIn {
    return new CheckIn(this.client);
  }
}
