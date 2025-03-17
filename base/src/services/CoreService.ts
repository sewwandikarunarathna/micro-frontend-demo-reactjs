import { ApiInterceptor } from "../interceptors/api.interceptor";
import { AxiosInstance } from "axios";

export class CoreService {
  protected axios: AxiosInstance;

  constructor() {
      this.axios = ApiInterceptor.getInstance().axios;
  }
}
