const bcrypt = require("bcryptjs");
const prisma = require("../DB/db.config.js");

//Create User
const createUser = async (req, res) => {

    const { name, email, password } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data:{ name, email, password: hashedpassword },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: "User already exists"});
    }
}

//All Users
const getUsers = async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
}

//Update User
const updateUser = async (req, res) => {

    const { name, email } = req.body;

    try {
      const user = await prisma.user.update({
        where: { id: req.params.id },
        data: { name, email },
      });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Error updating user" });
    }
}

//Delete User
const deleteUser = async (req, res) => {
    try {
      await prisma.user.delete({ where: { id: req.params.id } });
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: "User not found" });
    }
}

module.exports = { createUser, getUsers, updateUser, deleteUser };