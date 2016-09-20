"use strict";

export default class BusinessElementsApi {

  /**
   * @param client to use.
   * @param [tenantHandle] indicates which tenant to connect to.
   * @param [applicationHandle] indicates the application specific details stored on business elements.
   */
  constructor(client, tenantHandle, applicationHandle) {
    this.client = client;

    if (tenantHandle) {
      this.tenantHandle = tenantHandle;
      this.tenant = this.client.tenant(this.tenantHandle);
    }

    if (applicationHandle) {
      this.applicationHandle = applicationHandle;
      this.application = this.tenant.applications().application(this.applicationHandle);
    }
  }

  /**
   * Constructs the uri to download the resource.
   * @param resourceUri to get the url for.
   * @param qualifier indicating a specific version of the resource.
   * @returns {String} containing the url to the resource.
   */
  getDownloadUri(resourceUri, qualifier = null) {
    return this.tenant.getDownloadUri(resourceUri, qualifier);
  }
}
