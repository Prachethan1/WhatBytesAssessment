const express = require("express");
const authMiddleware = require("../middleware/auth");
const { createUser, getUsers, updateUser, deleteUser } = require("../controller/UserController")

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;