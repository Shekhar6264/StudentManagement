// routes/studentRoutes.js
const express = require("express");
const {
  createStudent,
  getAllStudents,
  getStudentById,
  getStudentByStudentId,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const router = express.Router();

router.post("/students", createStudent);
router.get("/students", getAllStudents);
router.get("/students/:id", getStudentById);
router.get("/students/by-studentId/:studentId", getStudentByStudentId);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

module.exports = router;
