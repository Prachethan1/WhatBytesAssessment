require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const projectRoutes = require("./routes/ProjectRoutes.js");
const taskRoutes = require("./routes/TaskRoutes.js");
const filterRoutes = require("./routes/FilterRoutes.js");
const authRoutes = require("./routes/AuthRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); 
app.use("/api/projects", projectRoutes);
app.use("/api", taskRoutes);
app.use("/api", filterRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);    
});