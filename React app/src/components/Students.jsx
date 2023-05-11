import React, { useState } from 'react';
import axios from 'axios';
import "../Styles/main.css";
const API_URL = 'http://localhost:5000';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Check if all controls are filled
    if (firstName === '' || familyName === '' || dateOfBirth === '') {
      setNotification('Please fill in all fields.');
      return;
    }

    // Check if date of birth is valid
    const dob = new Date(dateOfBirth);
    if (isNaN(dob.getTime())) {
      setNotification('Please enter a valid date of birth.');
      return;
    }

    // Check if student is at least 10 years old
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 10) {
      setNotification('Student must be at least 10 years old.');
      return;
    }

    // Add new student to the system
    const newStudent = {
      firstName,
      familyName,
      dateOfBirth: dob.toDateString()
    };
    await axios.post(`${API_URL}/students`,{
      first_name:newStudent.firstName,
      last_name:newStudent.familyName,
      date_of_birth:newStudent.dateOfBirth
    })
    setStudents([...students, newStudent]);

    // Show notification and clear controls
    setNotification('New student added.');
    setFirstName('');
    setFamilyName('');
    setDateOfBirth('');
  };

  return (
    <div>
      <h1>Students</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="familyName">Family Name:</label>
          <input
            type="text"
            id="familyName"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {notification && <p>{notification}</p>}

      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Family Name</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.firstName}</td>
              <td>{student.familyName}</td>
              <td>{student.dateOfBirth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsPage;
