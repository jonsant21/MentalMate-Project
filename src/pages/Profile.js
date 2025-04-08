// src/pages/Profile.js

import React, { useState } from 'react';
import '../styles/Profile.css'; // Adjust path if needed

const MentalMateProfile = () => {
  const [userData, setUserData] = useState({
    fullName: 'MentalMate',
    nickName: 'MM',
    gender: 'Male',
    country: 'United States of America',
    language: 'English',
    timeZone: 'PST',
    dateOfBirth: '1990-01-01',
    email: 'MentalMate@example.com',
    phone: '123-456-7890',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  // Comprehensive list of countries
  const countryOptions = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
    "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
    "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
    "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
    "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus",
    "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti",
    "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. 'Swaziland')",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
    "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
    "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
    "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
    "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
    "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands",
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
    "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama",
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
    "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
    "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
    "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America",
    "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const timeZoneOptions = ['PST', 'MST', 'CST', 'EST', 'GMT', 'CET'];

  // Enter edit mode
  const handleEdit = () => {
    setFormData(userData);
    setIsEditing(true);
  };

  // Handle input changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Save changes and exit edit mode
  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
  };

  // Cancel editing and revert to view mode
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Delete account
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (confirmDelete) {
      console.log('Account deleted');
      // Optionally, add your delete logic here
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-header">MentalMate Profile</h1>
      
      <div className="profile-box">
        {!isEditing ? (
          <>
            <div className="profile-row">
              <div className="profile-field">
                <label>Full Name</label>
                <p>{userData.fullName}</p>
              </div>
              <div className="profile-field">
                <label>Nick Name</label>
                <p>{userData.nickName}</p>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-field">
                <label>Gender</label>
                <p>{userData.gender}</p>
              </div>
              <div className="profile-field">
                <label>Country</label>
                <p>{userData.country}</p>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-field">
                <label>Language</label>
                <p>{userData.language}</p>
              </div>
              <div className="profile-field">
                <label>Time Zone</label>
                <p>{userData.timeZone}</p>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-field">
                <label>Date of Birth</label>
                <p>{userData.dateOfBirth}</p>
              </div>
              <div className="profile-field">
                <label>Phone Number</label>
                <p>{userData.phone}</p>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-field full-width">
                <label>My Email Address</label>
                <p>{userData.email}</p>
              </div>
            </div>
            <div className="button-group">
              <button className="edit-button" onClick={handleEdit}>
                Edit Information
              </button>
              <button className="delete-button" onClick={handleDelete}>
                Delete Account
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="profile-row">
              <div className="profile-field">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                />
              </div>
              <div className="profile-field">
                <label>Nick Name</label>
                <input 
                  type="text" 
                  name="nickName" 
                  value={formData.nickName} 
                  onChange={handleChange} 
                />
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-field">
                <label>Gender</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="profile-field">
                <label>Country</label>
                <select 
                  name="country" 
                  value={formData.country} 
                  onChange={handleChange}
                >
                  {countryOptions.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-field">
                <label>Language</label>
                <input 
                  type="text" 
                  name="language" 
                  value={formData.language} 
                  onChange={handleChange} 
                />
              </div>
              <div className="profile-field">
                <label>Time Zone</label>
                <select 
                  name="timeZone" 
                  value={formData.timeZone} 
                  onChange={handleChange}
                >
                  {timeZoneOptions.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-field">
                <label>Date of Birth</label>
                <input 
                  type="date" 
                  name="dateOfBirth" 
                  value={formData.dateOfBirth} 
                  onChange={handleChange} 
                />
              </div>
              <div className="profile-field">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                />
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-field full-width">
                <label>My Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </div>
            </div>
            <div className="button-group">
              <button className="edit-button" onClick={handleSave}>
                Save
              </button>
              <button className="delete-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MentalMateProfile;
