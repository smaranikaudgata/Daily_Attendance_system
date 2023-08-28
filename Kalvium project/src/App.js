import React, { useState } from 'react';
import './App.css';

function AttendanceApp() {
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const addStudent = () => {
    if (newStudentName.trim() !== '') {
      const newStudentId = students.length + 1;
      const newStudent = { id: newStudentId, name: newStudentName, attendance: false };
      setStudents([...students, newStudent]);
      setNewStudentName('');
    }
  };

  const markAttendance = (studentId) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId ? { ...student, attendance: true } : student
    );
    setStudents(updatedStudents);
  };

  const toggleSelectStudent = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const deleteSelectedStudents = () => {
    const updatedStudents = students.filter((student) => !selectedStudents.includes(student.id));
    setStudents(updatedStudents);
    setSelectedStudents([]);
    setEditingStudent(null);
  };

  const deleteStudent = (studentId) => {
    const updatedStudents = students.filter((student) => student.id !== studentId);
    setStudents(updatedStudents);
    setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    setEditingStudent(null);
  };

  const attendedCount = students.filter((student) => student.attendance).length;

  const editStudentName = (studentId) => {
    const studentToEdit = students.find((student) => student.id === studentId);
    if (studentToEdit) {
      setEditingStudent(studentToEdit);
    }
  };

  const saveEditedName = () => {
    if (editingStudent) {
      const updatedStudents = students.map((student) =>
        student.id === editingStudent.id ? { ...student, name: editingStudent.name } : student
      );
      setStudents(updatedStudents);
      setEditingStudent(null);
    }
  };

  return (
    <div className="attendance-app">
      <h1>Class Attendance System</h1>
      <div className="student-list">
        <h2>Student List</h2>
        <ul>
          {students.map((student) => (
            <li key={student.id} className={`student-item ${student.attendance ? 'attended' : ''}`}>
              <div className="student-name">
                {editingStudent?.id === student.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingStudent.name}
                      onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                    />
                    <button onClick={saveEditedName}>Save</button>
                  </div>
                ) : (
                  student.name
                )}
              </div>
              <div className="student-actions">
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => toggleSelectStudent(student.id)}
                />
                {!student.attendance && (
                  <div>
                    <button onClick={() => markAttendance(student.id)}>Present</button>
                    <button onClick={() => editStudentName(student.id)}>Edit</button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="new-student">
          <input
            type="text"
            placeholder="Enter student name"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
          />
          <button onClick={addStudent}>Add Student</button>
        </div>
        {selectedStudents.length > 0 && (
          <button onClick={deleteSelectedStudents}>Delete Selected</button>
        )}
      </div>
      <div className="attendance-record">
        <h2>Attendance Record</h2>
        <p>Total Students: {students.length}</p>
        <p>Attended: {attendedCount}</p>
      </div>
    </div>
  );
}

export default AttendanceApp;
