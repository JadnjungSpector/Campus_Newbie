const handlePasswordChange = async () => {
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5001/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user,
          currentPassword,
          newPassword,
        }),
      });
  
      if (response.ok) {
        alert('Password changed successfully!');
        setShowPasswordModal(false);
        setCurrentPassword('');
        setNewPassword('');
      } else {
        alert('Failed to change password. Please check your current password.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error changing password. Please try again.');
    }
  };
  