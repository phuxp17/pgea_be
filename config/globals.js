/**
 * Global Variable Configuration
 * (sails.config.globals)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on any of these options, check out:
 * https://sailsjs.com/config/globals
 */

module.exports.globals = {
  /****************************************************************************
   *                                                                           *
   * Whether to expose the locally-installed Lodash as a global variable       *
   * (`_`), making  it accessible throughout your app.                         *
   *                                                                           *
   ****************************************************************************/

  _: require("@sailshq/lodash"),

  /****************************************************************************
   *                                                                           *
   * Whether to expose the locally-installed `async` as a global variable      *
   * (`async`), making it accessible throughout your app.                      *
   * (See the link above for help.)                                            *
   *                                                                           *
   ****************************************************************************/

  async: require("async"),

  /****************************************************************************
   *                                                                           *
   * Whether to expose each of your app's models as global variables.          *
   * (See the link at the top of this file for more information.)              *
   *                                                                           *
   ****************************************************************************/

  models: true,

  /****************************************************************************
   *                                                                           *
   * Whether to expose the Sails app instance as a global variable (`sails`),  *
   * making it accessible throughout your app.                                 *
   *                                                                           *
   ****************************************************************************/

  sails: true,
  /**
   * Custome global variable
   */

  JWT_TOKEN_SECRET:
    process.env.NODE_ENV === "production"
      ? process.env.JWT_TOKEN_SECRET
      : "123456789",
  BASE_URL: process.env.BASE_URL || "http://localhost:1337",
  LOG_FILE: false,
  GOOGLE_CLIENT_ID:
    "956070166999-0miq3pv53vctlvtkbq6ou9g3g1vuo07q.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET: "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",
};
