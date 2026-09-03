const express = require("express");
const router = express.Router();

const Student = require("../models/Student");


// 1. Create Student
router.post("/", async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.status(201).json({
            message: "Student created successfully",
            student: student
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// 2. Get All Students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// 3. Update Student
router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student updated successfully",
            student: student
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// 4. Delete Student
router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;