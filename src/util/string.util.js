const validEmailRegExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/;
const validHandleRegExp = /[a-zA-Z-\d]{1,60}/;
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
   * Validate the format of provided email parameter.
   * @param email the emailaddress to check
   * @returns {*|boolean} true, when email is valid.
   */
  isEmailAddressValid(email) {
    return email && validEmailRegExp.test(email);
  }

  /**
   * Validate the format of the provided handle.
   * @param handle the handle to check
   * @returns {*|boolean} true, when handle is valid.
   */
  isHandleValid(handle) {
    return handle && validHandleRegExp.test(handle);

  }

}