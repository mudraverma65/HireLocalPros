import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const ProfilePicture = ({ userId, isEditing }) => {
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    loadProfilePicture();
  }, []);

  const loadProfilePicture = async () => {
    try {
      const picture = await getProfilePictureFromIndexedDB(userId);
      setProfilePicture(picture);
    } catch (error) {
      console.error('Error loading profile picture:', error);
    }
  };

  const getProfilePictureFromIndexedDB = (userId) => {
    return new Promise((resolve, reject) => {
      // Implement the logic to retrieve the profile picture from IndexedDB based on the userId
      // Example:
      const request = window.indexedDB.open('ProfilePicturesDB', 1);
      request.onerror = (event) => {
        reject(event.target.error);
      };
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction('profilePictures', 'readonly');
        const store = transaction.objectStore('profilePictures');
        const getPictureRequest = store.get(userId);
        getPictureRequest.onsuccess = (event) => {
          const picture = event.target.result;
          resolve(picture);
        };
        getPictureRequest.onerror = (event) => {
          reject(event.target.error);
        };
      };
    });
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    storeProfilePictureInIndexedDB(userId, file);
    setProfilePicture(URL.createObjectURL(file));
  };

  const storeProfilePictureInIndexedDB = (userId, file) => {
    return new Promise((resolve, reject) => {
      // Implement the logic to store the profile picture in IndexedDB based on the userId
      // Example:
      const request = window.indexedDB.open('ProfilePicturesDB', 1);
      request.onerror = (event) => {
        reject(event.target.error);
      };
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('profilePictures')) {
          db.createObjectStore('profilePictures', { keyPath: 'userId' });
        }
      };
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction('profilePictures', 'readwrite');
        const store = transaction.objectStore('profilePictures');
        const addPictureRequest = store.put({ userId, picture: file });
        addPictureRequest.onsuccess = () => {
          resolve();
        };
        addPictureRequest.onerror = (event) => {
          reject(event.target.error);
        };
      };
    });
  };

  return (
    <Box textAlign="center">
      {profilePicture ? (
        <img
          src={profilePicture}
          alt="Profile"
          style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%' }}
        />
      ) : (
        <Box
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: '#ccc',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#fff',
          }}
        >
          {userId.slice(0, 2)}
        </Box>
      )}
      {isEditing && (
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            Change Profile Picture
          </Typography>
          <input type="file" onChange={handleProfilePictureChange} accept="image/*" />
        </Box>
      )}
    </Box>
  );
};

export default ProfilePicture;
