import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class BaseService {
  public baseUrl = "https://staging.swtchenergy.com/api/v1/";
  public callbackUrl = "https://staging.swtchenergy.com/auth0/callback";
  public peopleUrl = this.baseUrl + "people/";
  public transactionURL = this.baseUrl + "transactions/";

  constructor(public http: Http) {
    console.log('Hello BaseService Provider');
  }
}
