const prisma = require("../DB/db.config");


// Filter Tasks by Status and Assigned User
const filter = async (req, res) => {
  const { status, assignedUserId } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (assignedUserId) filter.assignedUserId = assignedUserId;

  const tasks = await prisma.task.findMany({ where: filter });
  res.json(tasks);
}

module.exports = { filter };
