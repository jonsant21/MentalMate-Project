// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import '../styles/Profile.css'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const MentalMateProfile = () => {
  const [userData, setUserData] = useState({
    firstName: 'MentalMate',
    nickName: 'MM',
    gender: 'Male',
    dateOfBirth: '1990-01-01',
    email: 'MentalMate@example.com',
    phone: '123-456-7890',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  // State for toggling password visibility for each field
  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:8081/profile/get-info', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch user info');
        const data = await response.json();

        // Log the data from the API response
        console.log('Fetched user data:', data);

        // Format the date to YYYY-MM-DD
        const date = new Date(data.dateOfBirth);
        data.dateOfBirth = date.toISOString().split('T')[0];

        setUserData(data); // Update user data
        if (!isEditing) {
          setFormData(data); // Only update formData if not editing
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [isEditing]);

  // Handle changes in profile fields (name, phone, etc.)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Save updated profile information
  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8081/profile/update-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update profile');
      const updatedData = await response.json();
      setUserData(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Cancel editing profile info
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Delete account functionality
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (confirmDelete) {
      try {
        const response = await fetch('http://localhost:8081/profile/delete-user', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to delete account');
        console.log('Account deleted');
        navigate('/');
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    }
  };

  // Handle input changes for the password form
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  // Toggle password visibility for a given field
  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({ ...prev, [field]: !prev[field] }));
  };

  // Save new password after validation
  const handleSavePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    try {
      const response = await fetch('http://localhost:8081/profile/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      if (!response.ok) throw new Error('Failed to change password');
      alert('Password updated successfully!');
      setIsChangingPassword(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password.');
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
                <label>First Name</label>
                <p>{userData.firstName}</p>
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
                <label>Date of Birth</label>
                <p>{userData.dateOfBirth}</p>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-field">
                <label>Phone Number</label>
                <p>{userData.phone}</p>
              </div>
              <div className="profile-field">
                <label>My Email Address</label>
                <p>{userData.email}</p>
              </div>
            </div>
            <div className="button-group">
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Edit Information
              </button>
              <button className="delete-button" onClick={handleDelete}>
                Delete Account
              </button>
              <button className="edit-button" onClick={() => setIsChangingPassword(true)}>
                Change Password
              </button>
            </div>

            {/* Render Change Password form if triggered */}
            {isChangingPassword && (
              <>
                <div className="profile-row">
                  <div className="profile-field full-width">
                    <label>Current Password</label>
                    <div className="password-input-wrapper">
                      <input
                        type={passwordVisibility.current ? "text" : "password"}
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                      />
                      <span
                        className="password-toggle"
                        onClick={() => togglePasswordVisibility("current")}
                      >
                        {passwordVisibility.current ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="profile-row">
                  <div className="profile-field">
                    <label>New Password</label>
                    <div className="password-input-wrapper">
                      <input
                        type={passwordVisibility.new ? "text" : "password"}
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                      />
                      <span
                        className="password-toggle"
                        onClick={() => togglePasswordVisibility("new")}
                      >
                        {passwordVisibility.new ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>
                  <div className="profile-field">
                    <label>Confirm New Password</label>
                    <div className="password-input-wrapper">
                      <input
                        type={passwordVisibility.confirm ? "text" : "password"}
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                      />
                      <span
                        className="password-toggle"
                        onClick={() => togglePasswordVisibility("confirm")}
                      >
                        {passwordVisibility.confirm ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="button-group">
                  <button className="edit-button" onClick={handleSavePassword}>
                    Save Password
                  </button>
                  <button className="delete-button" onClick={() => setIsChangingPassword(false)}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="profile-row">
              <div className="profile-field">
                <label>First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
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
                <label>Date of Birth</label>
                <input 
                  type="date" 
                  name="dateOfBirth" 
                  value={formData.dateOfBirth} 
                  onChange={handleChange} 
                />
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-field">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                />
              </div>
              <div className="profile-field">
                <label>My Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  disabled
                  style={{ backgroundColor: '#f0f0f0', color: '#777' }} 
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
