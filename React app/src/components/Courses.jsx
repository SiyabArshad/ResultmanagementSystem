import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:5000';

function CoursesPage() {
  const [courseName, setCourseName] = useState('');
  const [courses, setCourses] = useState([]);
  async function fetchCourses() {
    const response = await axios.get(`${API_URL}/courses`);
    setCourses(response.data);
  }
  useEffect(() => { 
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseName) {
      alert('Please enter a course name.');
      return;
    }
    const newCourse = {
      course_name: courseName,
    };
    try {
      const response = await axios.post(`${API_URL}/courses`, newCourse);
      fetchCourses()
      setCourseName('');
      alert('New course added successfully.');
    } catch (error) {
      alert('An error occurred while adding a new course.');
    }
  };

  const handleCourseNameChange = (e) => {
    setCourseName(e.target.value);
  };

  return (
    <div>
      <h2>Courses</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Course Name:
          <input type="text" value={courseName} onChange={handleCourseNameChange} />
        </label>
        <button type="submit">Add Course</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course,i) => (
            <tr key={i}>
              <td>{course.course_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoursesPage;
