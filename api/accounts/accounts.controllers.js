const accounts = require("../../accounts");

exports.getAccounts = (req, res) => {
  return res.status(200).json(accounts);
};

exports.createAccount = (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Missing requirements" });
  }

  const newAccount = {
    id: accounts[accounts.length - 1].id + 1,
    username,
    funds: 0,
  };
  accounts.push(newAccount);
  return res.status(201).json(accounts);
};

exports.deleteAccount = (req, res) => {
  const accountId = req.params["accountId"];
  const findIndex = accounts.findIndex((a) => a.id == accountId);
  if (findIndex >= 0) {
    accounts.splice(findIndex, 1);
    return res.status(204).json(accounts);
  } else {
    return res.status(404).json({ error: ` Id: ${id} is not found` });
  }
};

exports.updateAccount = (req, res) => {
  const accountId = req.params["accountId"];
  const { username, funds } = req.body;
  const account = accounts.find((a) => a.id == accountId);

  if (!username || !funds) {
    return res.status(400).json({ error: "Missing requirements" });
  }

  if (!account) {
    return res.status(404).json({ error: ` Id: ${accountId} is not found` });
  } else {
    accounts[accountId - 1] = {
      id: parseInt(accountId),
      username,
      funds,
    };
    return res.status(204).json(accounts);
  }
};

exports.getUser = (req, res) => {
  const username = req.params["username"];
  const user = accounts.find(
    (a) => a.username.toLowerCase() == username.toLowerCase()
  );
  if (!user) {
    return res
      .status(404)
      .json({ error: `username: ${username} is not found` });
  }
  let queriedUser = { ...user };
  const currency = req.query["currency"];
  if (currency === "usd" || "USD") {
    queriedUser.funds = 3 * user.funds;
    return res.status(200).json(queriedUser);
  }
  return res.status(200).json(user);
};
