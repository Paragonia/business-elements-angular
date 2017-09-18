const validEmailRegExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/;
const validHandleRegExp = /^[a-zA-Z-0-9]{1,60}$/;
const invalidHandleChars = /[^a-zA-Z-\d]/g;

export default class StringUtil {
  constructor() {
  }

  $get() {
    "ngInject";
    return new StringUtil();
  }

  /**
   * Convert provided handle into a correct format.
   * @param handle the handle to convert
   * @returns {*} a correctly formatted handle
   */
  toValidHandle(handle) {
    const maxLength = 60;
    let validHandle = null;
    if (handle) {
      validHandle = handle.replace(invalidHandleChars, "-");
      validHandle = validHandle.length > maxLength ? validHandle.substring(0, maxLength) : validHandle;
      validHandle = validHandle.toLowerCase();
    }
    return validHandle;
  }

  /**
   * Convert provided attributePath into a correct path.
   * @param attributePath the path of an attribute
   * @returns {*} a correctly formatted path
   */
  toValidAttributePath(attributePath) {
    const slash = "/";
    let validPath = null;
    if (attributePath) {
      validPath = !attributePath.startsWith(slash) ? slash + attributePath : attributePath;
      validPath = validPath.toLowerCase();
    }
    return validPath;
  }

  /**
   * Validate the format of provided email parameter.
   * @param email the emailaddress to check
   * @returns {*|boolean} true, when email is valid.
   */
  isEmailAddressValid(email) {
    return (typeof email !== undefined) && validEmailRegExp.test(email);
  }

  /**
   * Validate the format of the provided handle.
   * @param handle the handle to check
   * @returns {*|boolean} true, when handle is valid.
   */
  isHandleValid(handle) {
    return (typeof handle !== undefined) && validHandleRegExp.test(handle);

  }

  /**
   * Convert the provided path to an URL-friendly path
   * @param path the path to convert
   * @returns {string} an URL friendly path
   */
  toUrlPath(path) {
    return (path) ? path.replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s/g, "-").replace(/-{2,}/g, "-").toLowerCase() : "";
  }

}