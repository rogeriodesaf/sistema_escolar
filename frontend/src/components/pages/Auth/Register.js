import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    firstName: '',
    lastName: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await axios.post('/api/auth/register', formData);
      setRegistrationCompleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {registrationCompleted && <p>Registro efetuado com sucesso!</p>}

      <h1>Register</h1>
      <form>
        <div>
          <label>Email:</label>
          <input type="text" name="email" onChange={handleInputChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={handleInputChange} />
        </div>
        <div>
          <label>Role:</label>
          <input type="text" name="role" onChange={handleInputChange} />
        </div>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" onChange={handleInputChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" onChange={handleInputChange} />
        </div>
        <button type="button" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
}

export default Register;
