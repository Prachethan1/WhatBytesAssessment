const prisma = require("../DB/db.config.js");

// Create Project
const createProject = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized: User ID is missing" });
    }

    const { name, description, status } = req.body;

    const project = await prisma.project.create({
      data: { 
        name, 
        description, 
        status, 
        userId: req.user.userId  
      },
    });

    res.json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// List All Projects
const getAllProjects = async (req, res) => {
  try {
    let { page = 1, limit = 4 } = req.query; 
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const projects = await prisma.project.findMany({
      where: { userId : req.user.userId },
      skip,
      take : limit,
    });

    const totalProjects = await prisma.project.count({
      where: { userId: req.user.userId },
    });

    // console.log("projects", projects);
    
    res.json({projects,
      totalProjects,
      totalPages: Math.ceil(totalProjects/limit),
      currentpage: page,
  });
  } catch (error) {
    res.status(400).json({error:"Projects not found"});
  }
}

// Update Project
const updateProject = async (req, res) => {
  const { name, description, status } = req.body;
  try {
    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: { name, description, status },
    });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: "Project not found" });
  }
}

// Delete Project
const deleteProject = async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Project not found" });
  }
}

module.exports = { createProject, getAllProjects, updateProject, deleteProject };
