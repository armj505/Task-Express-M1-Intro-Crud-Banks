const express = require("express");
const app = express();
const mongoDB = require("./database");
require("dotenv").config();

const PORT = process.env.PORT;

const accountsRoute = require("./api/accounts/accounts.routes");

app.use(express.json());

app.use("/accounts", accountsRoute);

mongoDB();

app.listen(PORT, () => {
  console.log("Server is listening to port " + PORT);
});
