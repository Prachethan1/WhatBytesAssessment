const prisma = require("../DB/db.config");


// Create Task Under Project
const createTask = async (req, res) => {
  const { title, description, status, assignedUserId } = req.body;
  const { projectId } = req.params;
  try {
    const task = await prisma.task.create({
      data: { title, description, status, projectId, assignedUserId },
    });
    res.json(task);
  } catch (error) {
    res.status(400).json({error: "Error creating a task"});
  }
}

// List Tasks for a Specific Project
const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const tasks = await prisma.task.findMany({
      where: { projectId },
      skip,
      take: limit,
    });

    const totalTasks = await prisma.task.count({ where: { projectId } });

    res.json({
      tasks,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(400).json({ error: "Tasks not found" });
  }
}

// Update Task Details or Status
const updateTask = async (req, res) => {
  const { title, description, status, assignedUserId } = req.body;

  try {
    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: { title, description, status, assignedUserId },
    });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: "Task not found" });
  }
}

// Delete Task
const deleteTask = async (req, res) => {
  try {
    await prisma.task.delete({ where: { id: req.params.id } });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Task not found" });
  }
}

module.exports = {createTask, getTasks, updateTask, deleteTask};