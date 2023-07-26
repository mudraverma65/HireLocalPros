import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
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
  Checkbox,
  Modal,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const UserProfile = () => {
  const classes = makeStyles();
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
  const [profileImage, setProfileImage] = useState('');

   // New state variables for email notifications
   const [isEmailNotificationEnabled, setIsEmailNotificationEnabled] = useState(false);

   // Existing code for fetching user data and handling user data changes...
 
   // New event handler for email notification changes
   const handleEmailNotificationChange = (event) => {
     setIsEmailNotificationEnabled(event.target.checked);
   };

  useEffect(() => {
    // Fetch user data including profileImage when the component mounts
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get('http://localhost:8000/getUser/64b9613db5af6374dbf41aae');
        const userDataFromApi = response.data;

        setUserData(userDataFromApi);
        setEditedUserData(userDataFromApi);
        setSmsNotification(userDataFromApi.notificationpref.includes('SMS'));
        setEmailNotification(userDataFromApi.notificationpref.includes('Email'));

        // Set the profileImage state if available in the API response
        if (userDataFromApi.profileImage) {
          setProfileImage(userDataFromApi.profileImage);
        }
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
      editedUserData.profileImage = profileImage;
      // Send the updated user data to the API
      await axios.post(`http://localhost:8000/updateUser/${userData?._id}`, editedUserData);
      handleProfileUpdateSuccess();
    } catch (error) {
      console.error('Error updating user data:', error);
      setSuccessMessage('Failed to update profile.');
    }
  };

  const handleProfileUpdateSuccess = () => {
    setSuccessMessage('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUserData(userData);
    setSmsNotification(userData?.notificationpref.includes('SMS') || false);
    setEmailNotification(userData?.notificationpref.includes('Email') || false);
    setErrors({});
  };

  const handleChangePasswordModalOpen = () => {
    setShowChangePasswordModal(true);
  };

  const handleChangePasswordModalClose = () => {
    setShowChangePasswordModal(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordChangeMessage('');
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

  // Function to handle file selection and convert it to base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: 10, backgroundColor: '#f8f8f8' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: 3,
        }}
      >
        {/* Profile Picture */}
        <img
          src={profileImage || '../images/avatar.png'} // Replace with the default avatar path
          alt="Profile"
          width="150"
          height="150"
          style={{ borderRadius: '50%' }}
        />
        {isEditing && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </Box>
        )}
        {/* Bio */}
        <Typography variant="body1" sx={{ fontStyle: 'italic', mt: 2 }}>
          {isEditing ? (
            <TextField
              multiline
              rows={4}
              value={editedUserData.bio || ''}
              onChange={(e) => handleUserDataChange('bio', e.target.value)}
              fullWidth
              placeholder="Tell something about yourself..."
              variant="outlined"
              InputProps={{ sx: { fontSize: '1rem' } }}
            />
          ) : (
            <Typography variant="body1" sx={{ fontSize: '1rem' }}>
              {userData?.bio || 'Tell something about yourself...'}
            </Typography>
          )}
        </Typography>
      </Box>

      {/* User Fields */}
      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
          {userData?.name || 'Your Name'}
        </Typography>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {/* Left Side */}
          <Grid item xs={12} sm={6}>
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
              sx={{ backgroundColor: '#fff' }}
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
              sx={{ backgroundColor: '#fff' }}
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
              sx={{ backgroundColor: '#fff' }}
            />
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              fullWidth
              value={isEditing ? editedUserData.city || '' : userData?.city || ''}
              onChange={(e) => handleUserDataChange('city', e.target.value)}
              disabled={!isEditing}
              error={!!errors.city}
              helperText={errors.city}
              margin="normal"
              variant="outlined"
              sx={{ backgroundColor: '#fff' }}
            />
            <TextField
              label="State / Province"
              fullWidth
              value={isEditing ? editedUserData.province || '' : userData?.province || ''}
              onChange={(e) => handleUserDataChange('province', e.target.value)}
              disabled={!isEditing}
              error={!!errors.province}
              helperText={errors.province}
              margin="normal"
              variant="outlined"
              sx={{ backgroundColor: '#fff' }}
            />
            <TextField
              label="ZIP / Postal Code"
              fullWidth
              value={isEditing ? editedUserData.zip || '' : userData?.zip || ''}
              onChange={(e) => handleUserDataChange('zip', e.target.value)}
              disabled={!isEditing}
              error={!!errors.zip}
              helperText={errors.zip}
              margin="normal"
              variant="outlined"
              sx={{ backgroundColor: '#fff' }}
            />
            {/* Additional fields */}
            {/* ... (your other fields) ... */}
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
          {isEditing ? (
            <>
              <Button
                variant="outlined"
                onClick={handleCancelEdit}
                sx={{ backgroundColor: '#e57373', color: '#fff' }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSaveChanges}
                sx={{ backgroundColor: '#81c784', color: '#fff' }}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={handleEditProfile}
              sx={{ backgroundColor: '#64b5f6', color: '#fff' }}
            >
              Edit Profile
            </Button>
          )}
          {successMessage && (
            <Typography variant="body1" sx={{ ml: 2, color: '#4caf50' }}>
              {successMessage}
            </Typography>
          )}
          
          <Button
            variant="contained"
            onClick={handleChangePasswordModalOpen}
            sx={{ backgroundColor: '#ffa726', color: '#fff' }}
          >
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
            sx={{ marginBottom: 2, backgroundColor: '#fff' }}
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
            sx={{ marginBottom: 2, backgroundColor: '#fff' }}
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
            sx={{ marginBottom: 2, backgroundColor: '#fff' }}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
            sx={{ backgroundColor: '#2196f3', color: '#fff' }}
          >
            Save Password
          </Button>
          {passwordChangeMessage && (
            <Typography variant="body1" sx={{ mt: 2, color: '#4caf50' }}>
              {passwordChangeMessage}
            </Typography>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default UserProfile;
