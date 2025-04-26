const StudentCard = ({ student, onDelete, onEdit }) => {
    return (
      <div className="bg-white p-4 shadow-md rounded-xl border border-gray-200">
        <h3 className="text-xl font-bold">
          {student.firstName} {student.lastName}
        </h3>
        <p className="text-sm text-gray-600">ID: {student.studentId}</p>
        <p>{student.email}</p>
        <p>DOB: {new Date(student.dob).toLocaleDateString()}</p>
        <p>Department: {student.department}</p>
        <p>Enrolled: {student.enrollmentYear}</p>
        <p>Status: {student.isActive ? "Active" : "Inactive"}</p>
        <div className="flex gap-2 mt-4">
          <button
            className="px-3 py-1 bg-yellow-500 text-white rounded"
            onClick={() => onEdit(student)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded"
            onClick={() => onDelete(student._id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
  
  export default StudentCard;
  