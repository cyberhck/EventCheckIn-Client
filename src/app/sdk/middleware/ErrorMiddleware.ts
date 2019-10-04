import {IFetchRequest, IFetchResponse, IMiddleware} from "@crazyfactory/tinka";

export class ErrorMiddleware implements IMiddleware<IFetchRequest, Promise<IFetchResponse<any>>> {
  public async process(options: IFetchRequest, next?: (nextOptions: IFetchRequest) => Promise<IFetchResponse<any>>):
  Promise<IFetchResponse<any>> {
    const res = await next(options);
    if (res.status >= 300) {
      throw await res.json();
    }
    return res;
  }
}
