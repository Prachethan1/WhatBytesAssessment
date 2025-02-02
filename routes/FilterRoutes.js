const express = require("express");
const authMiddleware = require("../middleware/auth");
const {filter} = require("../controller/FilterController");

const router = express.Router();

router.get("/tasks", authMiddleware, filter);

module.exports = router;