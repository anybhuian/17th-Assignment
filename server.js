const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/student_db")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Error:", error);
    });


// Student Routes
const studentRoutes = require("./routes/studentRoutes");

app.use("/api/students", studentRoutes);


// Home Route
app.get("/", (req, res) => {
    res.send("Student Management System is Running");
});


// Start Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});