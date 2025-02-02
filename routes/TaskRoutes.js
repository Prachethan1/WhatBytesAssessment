const express = require("express");
const authMiddleware = require("../middleware/auth");
const {createTask, getTasks, updateTask, deleteTask} = require("../controller/TaskController");
const router = express.Router();

router.post("/projects/:projectId/tasks", authMiddleware, createTask);
router.get("/projects/:projectId/tasks", authMiddleware, getTasks);
router.put("/tasks/:id", authMiddleware, updateTask);
router.delete("/tasks/:id", authMiddleware, deleteTask);

module.exports = router;