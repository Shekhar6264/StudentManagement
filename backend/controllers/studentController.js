// controllers/studentController.js
const asyncHandler = require("express-async-handler");
const Student = require("../models/Student");

// Create a student
const createStudent = asyncHandler(async (req, res) => {
  const student = new Student(req.body);
  const saved = await student.save();
  res.status(201).json(saved);
});

// Get all students
const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
});

// Get one student by Mongo _id
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }
  res.status(200).json(student);
});

// Get one student by your custom studentId
const getStudentByStudentId = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ studentId: req.params.studentId });
  if (!student) {
    res.status(404);
    throw new Error("Student not found with given studentId");
  }
  res.status(200).json(student);
});

// Update a student
const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }
  res.status(200).json(student);
});

// Delete a student
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }
  res.status(200).json({ message: "Student deleted" });
});

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  getStudentByStudentId,
  updateStudent,
  deleteStudent,
};
