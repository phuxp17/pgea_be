/**
 * Local environment settings
 *
 * Use this file to specify configuration settings for use while developing
 * the app on your personal system.
 *
 * For more information, check out:
 * https://sailsjs.com/docs/concepts/configuration/the-local-js-file
 */

module.exports = {
  // Any configuration settings may be overridden below, whether it's built-in Sails
  // options or custom configuration specifically for your app (e.g. Stripe, Sendgrid, etc.)

  custom: {
    mailUsername: process.env.MAIL_USERNAME || "phuxp17@gmail.com",
    mailPassword: process.env.MAIL_PASSWORD || "gbwa wzsx paak uiet",
    ACTIVE_ACCOUNT_URL:
      "http://localhost:3000/#/form?page=32&expired=true&mode=activate&usingPublicSession=true&embed=%7B%22token%22%3A%22{{token}}%22%2C%22account%22%3A%22{{account}}%22%7D",
    RESET_FORGET_ACCOUNT_URL:
      "http://localhost:3000/#/form?page=31&expired=true&mode=reset_pass&usingPublicSession=true&embed=%7B%22token%22%3A%22{{token}}%22%2C%22account%22%3A%22{{account}}%22%7D",
  },
};
