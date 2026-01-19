const moment = require("moment");

module.exports = {
  friendlyName: "Active user",

  description: "",

  inputs: {
    account: {
      type: "string",
      required: true,
    },
    token: {
      type: "string",
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;

    try {
      sails.log.info(
        `[ActiveUser] Request received for account: ${inputs.account}, token: ${inputs.token}`,
      );
      let current = moment().valueOf();
      let activeAccountInfo = await AuthPermission.findOne({
        token: inputs.token,
        isDelete: false,
        expiredAt: { ">": current },
        isUse: false,
      });
      sails.log.info(
        `[ActiveUser] Database lookup result for token ${inputs.token}:`,
        activeAccountInfo ? "Found" : "Not Found",
      );

      if (!activeAccountInfo) {
        sails.log.error(`Active token not found or invalid: ${inputs.token}`);
        return res.notFound({
          message: sails.__(
            "The link to change your password is unavailable, expired, or already in use!",
          ),
        });
      }

      if (inputs.account !== activeAccountInfo.key) {
        sails.log.error(
          `Active account mismatch: input=${inputs.account}, db=${activeAccountInfo.key}`,
        );
        return res.notFound({
          message: sails.__(
            "The link to change your password is unavailable, expired, or already in use!",
          ),
        });
      }

      await Auth.updateOne({
        id: activeAccountInfo.auth,
      }).set({
        activated: true,
      });

      await AuthPermission.destroy({ id: activeAccountInfo.id });

      return res.ok({
        message: sails.__(`Account activation successful!`),
      });
    } catch (error) {
      return res.serverError(error);
    }
  },
};
