import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentCard from "../components/StudentCard";
import StudentForm from "../components/StudentForm";

const API_URL = "https://studentmanagement-8-ivj5.onrender.com/api/students";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [searchedStudent, setSearchedStudent] = useState(null);

  const fetchStudents = async () => {
    const res = await axios.get(API_URL);
    setStudents(res.data);
  };

  const handleSearch = async () => {
    if (!searchId.trim()) {
      setSearchedStudent(null);
      return fetchStudents();
    }

    try {
      const res = await axios.get(`${API_URL}/by-studentId/${searchId}`);
      setSearchedStudent(res.data);
    } catch (err) {
      alert("Student not found with that ID");
      setSearchedStudent(null);
    }
  };

  const handleClearSearch = () => {
    setSearchId("");
    setSearchedStudent(null);
    fetchStudents();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchStudents();
    setSearchedStudent(null);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 py-10 px-4">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10 drop-shadow-lg">🎓 Student Dashboard</h1>

      <div className="max-w-5xl mx-auto">
        <StudentForm
          fetchStudents={fetchStudents}
          editingStudent={editingStudent}
          setEditingStudent={setEditingStudent}
        />

        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            placeholder="🔍 Search by Student ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full md:w-1/2 border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 shadow-sm transition duration-300"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition"
            >
              Search
            </button>
            {searchId && (
              <button
                onClick={handleClearSearch}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg shadow-md transition"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {searchedStudent ? (
            <StudentCard
              student={searchedStudent}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ) : (
            students.map((student) => (
              <StudentCard
                key={student._id}
                student={student}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
