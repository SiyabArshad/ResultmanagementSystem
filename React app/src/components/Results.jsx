import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:5000';

function AddResult() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [score, setScore] = useState('');
  const [results, setResults] = useState([]);

  // Fetch all courses and students on page load
  useEffect(() => {
    axios.get(`${API_URL}/courses`).then((response) => {
      setCourses(response.data);
    });
    axios.get(`${API_URL}/students`).then((response) => {
      setStudents(response.data);
    });
  }, []);

  // Submit the result
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newResult = {
      course_name: selectedCourse,
      student_name: selectedStudent,
      score: score,
    };
    try {
      await axios.post(`${API_URL}/results`, newResult);
      setResults([...results, newResult]);
      setSelectedCourse('');
      setSelectedStudent('');
      setScore('');
      alert('New result added successfully.');
    } catch (error) {
      alert('An error occurred while adding a new result.');
    }
  };

  // Render the form
  return (
    <div>
      <h1>Add New Result</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="course">Course:</label>
        <select id="course" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">-- Select a course --</option>
          {courses.map((course,i) => (
            <option key={i} value={i}>
              {course.course_name}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="student">Student:</label>
        <select id="student" value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
          <option value="">-- Select a student --</option>
          {students.map((student,i) => (
            <option key={i} value={i}>
              {student.first_name} {student.last_name}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="score">Score:</label>
        <select id="score" value={score} onChange={(e) => setScore(e.target.value)}>
          <option value="">-- Select a score --</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
        </select>
        <br />
        <button type="submit">Submit</button>
      </form>
      <h2>Results</h2>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Student</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.course_name}</td>
              <td>{result.student_name}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddResult;
