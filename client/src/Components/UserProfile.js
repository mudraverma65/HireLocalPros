import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  MenuItem,
  Modal,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [smsNotification, setSmsNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getUser/64b9613db5af6374dbf41aae');
        const userDataFromApi = response.data;

        setUserData(userDataFromApi);
        setEditedUserData(userDataFromApi);
        setSmsNotification(userDataFromApi.notificationpref.includes('SMS'));
        setEmailNotification(userDataFromApi.notificationpref.includes('Email'));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUserDataChange = (field, value) => {
    // Set the editedUserData state with the updated field and value
    setEditedUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    // Frontend validation before saving changes
    const validationErrors = {};
    if (!editedUserData.name || editedUserData.name.trim() === '') {
      validationErrors.name = 'Name is required.';
    }
    if (!editedUserData.email || editedUserData.email.trim() === '') {
      validationErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(editedUserData.email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }
    if (!editedUserData.contact || editedUserData.contact.trim() === '') {
      validationErrors.contact = 'Contact number is required.';
    } else if (!/^\d{10}$/.test(editedUserData.contact)) {
      validationErrors.contact = 'Please enter a valid 10-digit contact number.';
    }
    if (!editedUserData.address || editedUserData.address.trim() === '') {
      validationErrors.address = 'Address is required.';
    }
    if (!editedUserData.city || editedUserData.city.trim() === '') {
      validationErrors.city = 'City is required.';
    }
    if (!editedUserData.province || editedUserData.province.trim() === '') {
      validationErrors.province = 'Province is required.';
    }
    if (!editedUserData.zip || editedUserData.zip.trim() === '') {
      validationErrors.zip = 'ZIP is required.';
    }

    setErrors(validationErrors);

    // If there are validation errors, do not save changes
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      // Send the updated user data to the API
      console.log(editedUserData);
      await axios.post(`http://localhost:8000/updateUser/${userData?._id}`, editedUserData);
      handleProfileUpdateSuccess();
    } catch (error) {
      console.error('Error updating user data:', error);
      setSuccessMessage('Failed to update profile.');
    }
  };

  // Function to handle successful profile update
  const handleProfileUpdateSuccess = () => {
    setSuccessMessage('Profile updated successfully!');
    setIsEditing(false); // Set isEditing to false to go back to displaying user profile
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUserData(userData); // Reset the editedUserData to the original user data
    setSmsNotification(userData?.notificationpref.includes('SMS') || false);
    setEmailNotification(userData?.notificationpref.includes('Email') || false);
    setErrors({}); // Clear any previous errors
  };

  const handleChangePasswordModalOpen = () => {
    setShowChangePasswordModal(true);
  };

  const handleChangePasswordModalClose = () => {
    setShowChangePasswordModal(false);
    setOldPassword(''); // Clear old password input
    setNewPassword('');
    setConfirmPassword('');
    setPasswordChangeMessage('');
    setErrors({}); // Clear any previous errors
  };

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.trim() === '') {
      setPasswordChangeMessage('Please enter a new password.');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setPasswordChangeMessage('New password and confirmation do not match.');
      return;
    }
  
    // Perform the old password check here
    if (!oldPassword || oldPassword.trim() === '') {
      setPasswordChangeMessage('Please enter your old password.');
      return;
    }
  
    // Assuming you have a property "password" in the userData object which holds the existing password
    if (oldPassword !== userData?.password) {
      setPasswordChangeMessage('Old password is incorrect.');
      return;
    }
  
    try {
      // Send the updated password to the API
      await axios.post(`http://localhost:8000/updateUser/${userData?._id}`, {
        password: newPassword,
      });
      setPasswordChangeMessage('Password changed successfully!');
      setShowChangePasswordModal(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      setPasswordChangeMessage('Failed to update password.');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prevIsVisible) => !prevIsVisible);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 10 }}>
      <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#f0f0f0' }}>
        <Typography variant="h4" sx={{ marginBottom: 3, color: '#333' }}>
          User Profile
        </Typography>
        <Grid container spacing={2}>
          {/* Left Side */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              fullWidth
              value={isEditing ? editedUserData.name || '' : userData?.name || ''}
              onChange={(e) => handleUserDataChange('name', e.target.value)}
              disabled={!isEditing}
              error={!!errors.name}
              helperText={errors.name}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Email"
              fullWidth
              value={isEditing ? editedUserData.email || '' : userData?.email || ''}
              onChange={(e) => handleUserDataChange('email', e.target.value)}
              disabled={!isEditing}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Contact"
              fullWidth
              value={isEditing ? editedUserData.contact || '' : userData?.contact || ''}
              onChange={(e) => handleUserDataChange('contact', e.target.value)}
              disabled={!isEditing}
              error={!!errors.contact}
              helperText={errors.contact}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Address"
              fullWidth
              value={isEditing ? editedUserData.address || '' : userData?.address || ''}
              onChange={(e) => handleUserDataChange('address', e.target.value)}
              disabled={!isEditing}
              error={!!errors.address}
              helperText={errors.address}
              margin="normal"
              variant="outlined"
            />
            {/* ... Additional fields for user profile details (unchanged) ... */}
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Language Preference"
              fullWidth
              select
              value={isEditing ? editedUserData.languagepref || '' : userData?.languagepref || ''}
              onChange={(e) => handleUserDataChange('languagepref', e.target.value)}
              disabled={!isEditing}
              margin="normal"
              variant="outlined"
            >
              <MenuItem value="english">English</MenuItem>
              <MenuItem value="french">French</MenuItem>
              <MenuItem value="spanish">Spanish</MenuItem>
            </TextField>
            <Typography variant="subtitle1">Notification Preferences</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={smsNotification}
                  onChange={(e) => setSmsNotification(e.target.checked)}
                  disabled={!isEditing}
                />
              }
              label="SMS Notification"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={emailNotification}
                  onChange={(e) => setEmailNotification(e.target.checked)}
                  disabled={!isEditing}
                />
              }
              label="Email Notification"
            />
            <TextField
              label="Bio"
              fullWidth
              multiline
              rows={4}
              value={isEditing ? editedUserData.bio || '' : userData?.bio || ''}
              onChange={(e) => handleUserDataChange('bio', e.target.value)}
              disabled={!isEditing}
              error={!!errors.bio}
              helperText={errors.bio}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
          {isEditing ? (
            <Box>
              <Button variant="contained" onClick={handleCancelEdit} sx={{ mr: 2, color: 'white', bgcolor: '#ff7043' }}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSaveChanges} sx={{ color: 'white', bgcolor: '#4caf50' }}>
                Save Changes
              </Button>
            </Box>
          ) : (
            <Button variant="contained" onClick={handleEditProfile} sx={{ color: 'white', bgcolor: '#2196f3' }}>
              Edit Profile
            </Button>
          )}
          {successMessage && (
            <Typography variant="body1" sx={{ ml: 2, color: '#4caf50' }}>
              {successMessage}
            </Typography>
          )}
          <Button variant="contained" onClick={handleChangePasswordModalOpen} sx={{ color: 'white', bgcolor: '#9c27b0' }}>
            Change Password
          </Button>
        </Box>
      </Paper>

      {/* Modal for changing password */}
      <Modal open={showChangePasswordModal} onClose={handleChangePasswordModalClose}>
        <Box sx={{ width: 400, bgcolor: 'background.paper', borderRadius: 4, p: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Change Password
          </Typography>
          <TextField
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            error={!!errors.oldPassword}
            helperText={errors.oldPassword}
            fullWidth
            sx={{ mb: 2 }}
            variant="outlined"
          />
          <TextField
            label="New Password"
            type={isPasswordVisible ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
            fullWidth
            sx={{ mb: 2 }}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            type={isPasswordVisible ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            fullWidth
            sx={{ mb: 2 }}
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={handleChangePassword}>
            Save Password
          </Button>
          {passwordChangeMessage && (
            <Typography variant="body1" sx={{ mt: 2, color: 'green' }}>
              {passwordChangeMessage}
            </Typography>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default UserProfile;
