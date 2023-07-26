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
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    padding: theme.spacing(4),
  },
  profilePaper: {
    padding: theme.spacing(4),
  },
  sectionHeading: {
    marginBottom: theme.spacing(2),
  },
  profileAvatarContainer: {
    textAlign: 'center',
  },
  profileAvatar: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  editButton: {
    marginTop: theme.spacing(2),
  },
  saveButton: {
    marginRight: theme.spacing(2),
  },
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: theme.spacing(4),
    borderRadius: '8px',
    outline: 'none',
    boxShadow: theme.shadows[5],
    minWidth: '300px',
  },
}));

const UserProfile = () => {
  const classes = useStyles();

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [smsNotification, setSmsNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get('http://localhost:8000/getUser/64b9613db5af6374dbf41aae');
        const userDataFromApi = response.data;
        
        setUserData(userDataFromApi);
        setEditedUserData(userDataFromApi);
        setSmsNotification(userDataFromApi.notificationpref.includes('SMS'));
        setEmailNotification(userDataFromApi.notificationpref.includes('Email'));
        
        // Fetch the user image from IndexedDB using the user ID
        const request = indexedDB.open('userImagesDatabase', 1);

        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction('userImages', 'readonly');
          const userImagesStore = transaction.objectStore('userImages');

          // Assuming you have the user ID available in a variable named 'userId'
          const userId = userDataFromApi._id;

          const getRequest = userImagesStore.get(userId);

          getRequest.onsuccess = (event) => {
            const imageBlob = event.target.result;

            // Convert the Blob to a URL for displaying the image
            const imageUrl = URL.createObjectURL(imageBlob);

            // Update the profileImage state with the image URL
            setProfileImage(imageUrl);
          };

          getRequest.onerror = (error) => {
            console.error('Error fetching image from IndexedDB:', error);
          };
        };

        request.onerror = (error) => {
          console.error('Error opening database:', error);
        };
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
    setIsEditing(false); // Disable editing mode
  
    try {
      // Update the userData state with the editedUserData
      setUserData((prevUserData) => ({
        ...prevUserData,
        ...editedUserData,
      }));
  
      // Fetch the user image from IndexedDB using the user ID
      const request = indexedDB.open('userImagesDatabase', 1);
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction('userImages', 'readonly');
        const userImagesStore = transaction.objectStore('userImages');
  
        // Assuming you have the user ID available in a variable named 'userId'
        const userId = userData?._id;
  
        const getRequest = userImagesStore.get(userId);
  
        getRequest.onsuccess = (event) => {
          const imageBlob = event.target.result;
  
          // Convert the Blob to a URL for displaying the image
          const imageUrl = URL.createObjectURL(imageBlob);
  
          // Update the userData state with the image URL
          setUserData((prevUserData) => ({
            ...prevUserData,
            profileImage: imageUrl,
          }));
        };
  
        getRequest.onerror = (error) => {
          console.error('Error fetching image from IndexedDB:', error);
        };
      };
  
      request.onerror = (error) => {
        console.error('Error opening database:', error);
      };
  
      setSuccessMessage('Profile updated successfully!');
  
      // Send the updated user data to the API
      await axios.post(`http://localhost:8000/updateUser/${userData?._id}`, editedUserData);
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
      setSuccessMessage('Failed to update profile.');
    }
  };
  

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = () => {
    // Save the image in the public folder with the filename as "profile.jpg"
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Create a Blob from the image data
        const imageBlob = new Blob([reader.result], { type: selectedImage.type });

        // Use IndexedDB to store the image
        const request = indexedDB.open('userImagesDatabase', 1);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('userImages')) {
            db.createObjectStore('userImages', { keyPath: '_id', autoIncrement: true });
          }
        };

        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction('userImages', 'readwrite');
          const userImagesStore = transaction.objectStore('userImages');

          // Assuming you have the user ID available in a variable named 'userId'
          const userId = userData?._id;

          // Add the userImage to IndexedDB with the user ID as the key
          const addRequest = userImagesStore.put(imageBlob, userId);

          addRequest.onsuccess = () => {
            setSuccessMessage('Profile picture uploaded successfully!');
          };

          addRequest.onerror = (error) => {
            console.error('Error uploading image:', error);
          };
        };

        request.onerror = (error) => {
          console.error('Error opening database:', error);
        };
      };

      // Read the selected image as an ArrayBuffer
      reader.readAsArrayBuffer(selectedImage);
    }
  };

  return (
    <Container maxWidth="md" className={classes.profileContainer}>
      <Paper className={classes.profilePaper}>
        <Typography variant="h4" className={classes.sectionHeading}>
          User Profile
        </Typography>
        <br />
        <br />
        <Grid container spacing={2}>
          {/* Left Side */}
          <Grid item xs={12} sm={6} className={classes.profileAvatarContainer}>
            <img
              src={profileImage || '/default-profile-image.jpg'}
              alt="Profile"
              className={classes.profileAvatar}
            />
            {isEditing && (
              <div>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <Button variant="contained" color="primary" onClick={handleImageUpload}>
                  Upload Image
                </Button>
              </div>
            )}
          </Grid>
          {/* Right Side */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              fullWidth
              value={isEditing ? editedUserData.name || '' : userData?.name || ''}
              onChange={(e) => handleUserDataChange('name', e.target.value)}
              disabled={!isEditing}
              margin="normal"
            />
            <TextField
              label="Email"
              fullWidth
              value={isEditing ? editedUserData.email || '' : userData?.email || ''}
              onChange={(e) => handleUserDataChange('email', e.target.value)}
              disabled={!isEditing}
              margin="normal"
            />
            <TextField
              label="Contact"
              fullWidth
              value={isEditing ? editedUserData.contact || '' : userData?.contact || ''}
              onChange={(e) => handleUserDataChange('contact', e.target.value)}
              disabled={!isEditing}
              margin="normal"
            />
            <TextField
              label="Bio"
              fullWidth
              multiline
              rows={4}
              value={isEditing ? editedUserData.bio || '' : userData?.bio || ''}
              onChange={(e) => handleUserDataChange('bio', e.target.value)}
              disabled={!isEditing}
              margin="normal"
            />
            <TextField
              label="Address"
              fullWidth
              value={isEditing ? editedUserData.address || '' : userData?.address || ''}
              onChange={(e) => handleUserDataChange('address', e.target.value)}
              disabled={!isEditing}
              margin="normal"
            />
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
            {isEditing ? (
              <Button
                variant="contained"
                color="primary"
                className={classes.saveButton}
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                className={classes.editButton}
                onClick={handleEditProfile}
              >
                Edit Profile
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserProfile;
