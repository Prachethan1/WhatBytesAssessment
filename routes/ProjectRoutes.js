const express = require("express");
const authMiddleware = require("../middleware/auth");
const {createProject, getAllProjects, updateProject, deleteProject} = require("../controller/ProjectController");

const router = express.Router();

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getAllProjects);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;