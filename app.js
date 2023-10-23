const express = require("express");
const app = express();
let PORT = 8000;

const accountsRoute = require("./api/accounts/accounts.routes");

app.use(express.json());

app.use("/accounts", accountsRoute);

app.listen(PORT, () => {
  console.log("Server is listening to port " + PORT);
});
