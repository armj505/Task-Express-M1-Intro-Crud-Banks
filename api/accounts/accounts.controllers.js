// const accounts = require("../../accounts");
const Account = require("../../models/Account");

exports.getAccounts = async (req, res) => {
  const allAccounts = await Account.find();
  console.log(allAccounts);
  if (req.query.vip) {
    Account.where("funds").gte(req.query.vip);
  }

  return res.status(200).json(allAccounts);
};

exports.createAccount = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: "Missing requirements" });
    }
    const newAccount = await Account.create({
      username: username,
      funds: 0,
    });
    return res.status(201).json(newAccount);
  } catch (error) {
    return res.status(500).json("Error");
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const accountId = req.params["accountId"];
    const foundAccount = Account.findById(accountId);

    if (foundAccount) {
      await Account.deleteOne(accountId);
      return res.status(204).json({ msg: `Account ID ${accountId} ` });
    }
    return res.status(404).json("This account does not exist");
  } catch (error) {
    return res.status(500).json("Error");
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const accountId = req.params["accountId"];
    const foundAccount = Account.findById(accountId);
    const { username, funds } = req.body;

    if (foundAccount) {
      await Account.updateOne({
        username: username,
        funds: funds,
      });
      return res.status(204).json();
    }
    return res.status(404).json("This account does not exist");

    // const account = accounts.find((a) => a.id == accountId);

    // if (!username || !funds) {
    //   return res.status(400).json({ error: "Missing requirements" });
    // }

    // if (!account) {
    //   return res.status(404).json({ error: ` Id: ${accountId} is not found` });
    // } else {
    //   accounts[accountId - 1] = {
    //     id: parseInt(accountId),
    //     username,
    //     funds,
    //   };
  } catch (error) {
    return res.status(500).json("Error");
  }
};

exports.getUser = async (req, res) => {
  try {
    const username = req.params["username"];
    const user = await Account.findOne({ username: username });
    // console.log(user);

    if (!user) {
      return res
        .status(404)
        .json({ error: `username: ${username} is not found` });
    }
    let queriedUser = user;
    // const { currency } = req.query;
    console.log(req.query);
    if (req.query.currency === ("usd" || "USD")) {
      console.log("first");
      queriedUser.funds = 3 * user.funds;
      return res.status(200).json(queriedUser);
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("Error");
  }
  // const username = req.params["username"];
  // const user = accounts.find(
  //   (a) => a.username.toLowerCase() == username.toLowerCase()
  // );
  // if (!user) {
  //   return res
  //     .status(404)
  //     .json({ error: `username: ${username} is not found` });
  // }
  // let queriedUser = { ...user };
  // const currency = req.query["currency"];
  // if (currency === "usd" || "USD") {
  //   queriedUser.funds = 3 * user.funds;
  //   return res.status(200).json(queriedUser);
  // }
  // return res.status(200).json(user);
};
