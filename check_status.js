const sails = require("sails");

sails.lift({}, async function (err) {
  if (err) {
    console.error("Error lifting sails:", err);
    return;
  }

  try {
    const auth = await Auth.findOne({ key: "admin" });
    console.log("Admin Auth Record:", auth);

    if (auth) {
      const token = "9e90e530418f84090b400d36cd8f69ff";
      const permission = await AuthPermission.findOne({ token: token });
      console.log("AuthPermission Record for token:", permission);
    }
  } catch (e) {
    console.error(e);
  }

  process.exit(0);
});
