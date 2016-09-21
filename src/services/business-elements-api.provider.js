"use strict";

import BusinessElementsClient from "business-elements";
import BusinessElementsApi from "./business-elements-api";

export default class BusinessElementsApiProvider {

  constructor() {
    this.client = undefined;
    this.baseUrl = undefined;
    this.tenantHandle = undefined;
    this.applicationHandle = undefined;
  }

  $get() {
    let client = undefined ;

    if (this.client) {
      client = this.client;
    } else if (this.baseUrl) {
      client = new BusinessElementsClient(this.baseUrl);
    } else {
      throw new Error("Setting a client or base url is required.");
    }

    return new BusinessElementsApi(client, this.tenantHandle, this.applicationHandle);
  }
}
