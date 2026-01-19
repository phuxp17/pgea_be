const sails = require("sails");
const moment = require("moment");
const uuidv1 = require("uuid/v1");
const md5 = require("md5");

sails.load({ log: { level: "info" } }, async function (err) {
  if (err) {
    console.error(err);
    return;
  }

  try {
    const accountName = "test_debug_" + Date.now();
    console.log(`\n--- STARTING DEBUG FLOW for ${accountName} ---`);

    // 1. Simulate Registration (User Creation)
    console.log("[1] Creating User & Auth...");
    let user = await User.create({
      name: accountName,
      email: `${accountName}@example.com`,
      userType: 3,
    }).fetch();

    let auth = await Auth.create({
      key: accountName,
      password: "password123",
      type: "up",
      activated: false,
      user: user.id,
    }).fetch();
    console.log("    Auth ID:", auth.id);

    // 2. Simulate Token Generation (from register.js)
    console.log("[2] Generating Token...");
    let token = md5(auth.key + auth.type + moment().valueOf() + uuidv1());
    console.log("    Token:", token);

    let authActivate = {
      auth: auth.id,
      key: auth.key,
      type: auth.type,
      token: token,
      expiredAt: moment().valueOf() + 24 * 60 * 60 * 1000,
      isUse: false,
    };
    await AuthPermission.create(authActivate);
    console.log("    AuthPermission created.");

    // 3. Simulate Activation (active-user.js logic)
    console.log("[3] Simulating Activation Request...");

    // Manual lookup like the controller does
    let current = moment().valueOf();
    let activeAccountInfo = await AuthPermission.findOne({
      token: token,
      isDelete: false,
      expiredAt: { ">": current },
      isUse: false,
    });

    console.log("    Lookup Result:", activeAccountInfo);

    if (!activeAccountInfo) {
      console.error("FAILED: Token not found or expired.");
    } else if (activeAccountInfo.key !== accountName) {
      console.error(
        `FAILED: Key mismatch. Expected ${accountName}, got ${activeAccountInfo.key}`,
      );
    } else {
      console.log("    Valid token found. Updating Auth...");
      await Auth.updateOne({ id: activeAccountInfo.auth }).set({
        activated: true,
      });
      await AuthPermission.destroy({ id: activeAccountInfo.id });
      console.log("SUCCESS: Account activated.");
    }

    // 4. Verify Final State
    let finalAuth = await Auth.findOne({ id: auth.id });
    console.log("[4] Final Auth State:", finalAuth);
  } catch (e) {
    console.error(e);
  }

  process.exit(0);
});
