import React, { useState } from 'react';
import '../styles/Login.css'; // Import the CSS for styling

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Log-In Form Data:', formData);
    // This is where backend integration will go in the future
    try{
      const response = await fetch('http://localhost:8081/user/log-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if(response.ok){
        const data = await response.json();
        console.log(data.message);
      }
      else{
        const errorData = await response.json();
        console.log(errorData.message)
      }
    }
  
    catch(error){
      console.log(error);
    }
  };

  return (
  <div className="login-container">
    <h1>Log In</h1>
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  </div>
);

}

export default Login;
