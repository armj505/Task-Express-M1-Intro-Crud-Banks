const express = require("express");
const {
  getAccounts,
  createAccount,
  deleteAccount,
  updateAccount,
  getUser,
} = require("./accounts.controllers");
const router = express.Router();

router.get("/", getAccounts);
router.post("/", createAccount);
router.delete("/:accountId", deleteAccount);
router.put("/:accountId", updateAccount);
router.get("/:username", getUser);

module.exports = router;
