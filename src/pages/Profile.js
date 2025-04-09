import React, { useState, useEffect } from 'react';
import '../styles/Profile.css'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';

const MentalMateProfile = () => {
  const [userData, setUserData] = useState({
    firstName: 'MentalMate',
    nickName: 'MM',
    gender: 'Male',
    dateOfBirth: '1990-01-01',
    email: 'MentalMate@example.com',
    phone: '123-456-7890',
  });
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await fetch('http://localhost:8081/profile/get-info', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch entries');
        const data = await response.json();

        // Log the data from the API response
        console.log('Fetched user data:', data);

        const date = new Date(data.dateOfBirth);
        data.dateOfBirth = date.toISOString().split('T')[0];

        setUserData(data);  // Update user data
        if (!isEditing) {
          setFormData(data); // Only update formData if not editing
        }
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      }
    };

    fetchJournalEntries();
  }, [isEditing]); // The effect now only runs when `isEditing` is false

  const handleEdit = () => {
    setFormData(userData);  // Ensure formData gets the current userData
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8081/profile/update-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // include cookies if you're using sessions
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await response.json();
      setUserData(updatedData); // Update state with data from server
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (confirmDelete) {
      // Optionally, add your delete logic here:
      try {
        const response = await fetch('http://localhost:8081/profile/delete-user', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include' // include cookies if you're using sessions
        });
  
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        console.log('Account deleted');
        //navigate to home page:
        navigate('/'); 
        
        
      } catch (error) {
        console.error('Error deleting profile:', error);
      }

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
