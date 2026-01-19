const sails = require("sails");

sails.load({ log: { level: "silent" } }, async function (err) {
  if (err) {
    return;
  }
  try {
    let updated = await Auth.update({ key: ["admin", "admin1"] })
      .set({ activated: true })
      .fetch();
    console.log(
      "Force activated accounts:",
      updated.map((u) => u.key),
    );
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
});
