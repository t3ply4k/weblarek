import { Api } from "../base/Api";
import { IProductListResponse, IOrder, IOrderResult } from "../../types";

export class LarekApi {
  private api: Api

  constructor(baseUrl: string, options?: RequestInit) {
    this.api = new Api(baseUrl, options);
  }

getProductList(): Promise<IProductListResponse> {
        return this.api.get<IProductListResponse>('/product/');
    }

    createOrder(order: IOrder): Promise<IOrderResult> {
        return this.api.post<IOrderResult>('/order/', order);
    }
}