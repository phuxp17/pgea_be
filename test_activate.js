const http = require("http");

const data = JSON.stringify({
  account: "admin",
  token: "9e90e530418f84090b400d36cd8f69ff",
});

const options = {
  hostname: "localhost",
  port: 1337,
  path: "/api/auth/active-user",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.write(data);
req.end();
