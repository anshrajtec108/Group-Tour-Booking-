import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css'
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: 'male',
    aadharNumber: '',
    profilePhoto: null,
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:8081/api/v1/users/registerUser', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Registration successful', response.data);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div id='maindiv'>
      <h1>User Registration</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required /><br />

        <label htmlFor="firstName">First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required /><br />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required /><br />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required /><br />
    <div className='radio-container'>
        <label htmlFor="gender">Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleInputChange} required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select><br />
        </div>
        <label htmlFor="aadharNumber">Aadhar Number:</label>
        <input type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleInputChange} required /><br />

        <label htmlFor="profilePhoto">Profile Photo:</label>
        <input type="file" name="profilePhoto" accept="image/*" onChange={handleInputChange} required /><br />

        <label htmlFor="username">Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleInputChange} /><br />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required /><br />



        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default RegistrationForm;
