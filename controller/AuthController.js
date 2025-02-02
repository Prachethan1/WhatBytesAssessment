const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../DB/db.config"); // Import Prisma client

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        // Check password (assuming passwords are hashed)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { loginUser };
