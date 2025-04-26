import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/students";

const StudentForm = ({ fetchStudents, editingStudent, setEditingStudent }) => {
  const [form, setForm] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    department: "",
    enrollmentYear: "",
    isActive: true,
  });

  useEffect(() => {
    if (editingStudent) {
      setForm(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await axios.put(`${API_URL}/${editingStudent._id}`, form);
        setEditingStudent(null);
      } else {
        await axios.post(API_URL, form);
      }
      fetchStudents();
      setForm({
        studentId: "",
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        department: "",
        enrollmentYear: "",
        isActive: true,
      });
    } catch (err) {
      alert("Error: " + err?.response?.data?.error || "Unknown error");
    }
  };

  return (
    <form
      className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold mb-4">
        {editingStudent ? "Edit Student" : "Add Student"}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {editingStudent ? null : (
          <input
            type="text"
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            placeholder="Student ID"
            className="border p-2 rounded"
            required
          />
        )}
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="dob"
          value={form.dob.split("T")[0]}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Department"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="enrollmentYear"
          value={form.enrollmentYear}
          onChange={handleChange}
          placeholder="Enrollment Year"
          className="border p-2 rounded"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Active
        </label>
      </div>
      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {editingStudent ? "Update" : "Add"} Student
      </button>
    </form>
  );
};

export default StudentForm;
