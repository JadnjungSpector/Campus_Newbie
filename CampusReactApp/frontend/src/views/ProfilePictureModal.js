import React, { useState } from 'react';
import axios from 'axios';

const ProfilePictureModal = ({ onClose, userId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setError('');
    setSuccess('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', selectedFile);
    formData.append('userId', userId);

    try {
      const response = await axios.post('/update-profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Profile picture updated successfully!');
      setSelectedFile(null);
    } catch (err) {
      setError('Failed to update profile picture. Please try again.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Profile Picture</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProfilePictureModal;
