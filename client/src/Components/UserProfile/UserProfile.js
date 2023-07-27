// Author: Pallavi Marni
// Feature: User Profile Management

import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Modal,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GetUser, UpdateUser } from "../../services/user.service.js";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [smsNotification, setSmsNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [isEmailNotificationEnabled, setIsEmailNotificationEnabled] =
    useState(false);
  const [isSmsNotificationEnabled, setIsSmsNotificationEnabled] =
    useState(false);

  const handleEmailNotificationChange = (event) => {
    setIsEmailNotificationEnabled(event.target.checked);
  };

  const handleSmsNotificationChange = (event) => {
    setIsSmsNotificationEnabled(event.target.checked);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await GetUser(userId);
        const userDataFromApi = response.data;

        setUserData(userDataFromApi);
        setEditedUserData(userDataFromApi);
        setSmsNotification(userDataFromApi.notificationpref.includes("SMS"));
        setEmailNotification(
          userDataFromApi.notificationpref.includes("Email")
        );

        if (userDataFromApi.profileImage) {
          setProfileImage(userDataFromApi.profileImage);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUserDataChange = (field, value) => {
    setEditedUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    const validationErrors = {};
    if (!editedUserData.name || editedUserData.name.trim() === "") {
      validationErrors.name = "Name is required.";
    }
    if (!editedUserData.email || editedUserData.email.trim() === "") {
      validationErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(editedUserData.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }
    if (!editedUserData.contact || editedUserData.contact.trim() === "") {
      validationErrors.contact = "Contact number is required.";
    } else if (!/^\d{10}$/.test(editedUserData.contact)) {
      validationErrors.contact =
        "Please enter a valid 10-digit contact number.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      editedUserData.profileImage = profileImage;
      await UpdateUser(userData?._id, editedUserData);
      handleProfileUpdateSuccess();
    } catch (error) {
      console.error("Error updating user data:", error);
      setSuccessMessage("Failed to update profile.");
    }
  };

  const handleProfileUpdateSuccess = () => {
    setSuccessMessage("Profile updated successfully!");
    setIsEditing(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUserData(userData);
    setSmsNotification(userData?.notificationpref.includes("SMS") || false);
    setEmailNotification(userData?.notificationpref.includes("Email") || false);
    setErrors({});
  };

  const handleChangePasswordModalOpen = () => {
    setShowChangePasswordModal(true);
  };

  const handleChangePasswordModalClose = () => {
    setShowChangePasswordModal(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordChangeMessage("");
  };

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.trim() === "") {
      setPasswordChangeMessage("Please enter a new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordChangeMessage("New password and confirmation do not match.");
      return;
    }

    if (!oldPassword || oldPassword.trim() === "") {
      setPasswordChangeMessage("Please enter your old password.");
      return;
    }

    if (oldPassword !== userData?.password) {
      setPasswordChangeMessage("Old password is incorrect.");
      return;
    }

    try {
      const updateBody = {
        password: newPassword,
      };
      await UpdateUser(userData?._id, updateBody);
      setPasswordChangeMessage("Password changed successfully!");
      setShowChangePasswordModal(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      setPasswordChangeMessage("Failed to update password.");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prevIsVisible) => !prevIsVisible);
  };

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
    <div style={{ position: "relative", overflow: "auto", height: "100%" }}>
      <div style={{ marginTop: "104px" }}>
        <Container>
          <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} md={4}>
                <img
                  src={profileImage || require("../../images/avatar.png")}
                  alt="Profile"
                  width="230"
                  height="200"
                  style={{
                    border: "1px solid #C4C4C4",
                    display: "block",
                    borderRadius: "20px",
                    margin: "0 auto",
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography
                  variant="h4"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "3rem",
                    fontWeight: "bold",
                    color: "#27374D",
                    textAlign: "center",
                    margin: "20px auto",
                  }}
                >
                  {userData?.name || "Your Name"}
                </Typography>
              </Grid>
            </Grid>
            {isEditing && (
              <Box sx={{ display: "flex", mt: 2, ml: 10 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Box>
            )}

            <Typography variant="body1">
              <label>Bio</label>
              <TextField
                placeholder="Tell us something about yourself..."
                multiline
                rows={4}
                value={
                  isEditing ? editedUserData.bio || "" : userData?.bio || ""
                }
                onChange={(e) => handleUserDataChange("bio", e.target.value)}
                fullWidth
                disabled={!isEditing}
                variant="outlined"
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "10px",
                  width: "100%",
                  paddingRight: "30px",
                }}
              />
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <label>
                  Email <span className="required">*</span>
                </label>
                <TextField
                  placeholder="Email*"
                  value={
                    isEditing
                      ? editedUserData.email || ""
                      : userData?.email || ""
                  }
                  onChange={(e) =>
                    handleUserDataChange("email", e.target.value)
                  }
                  disabled={!isEditing}
                  error={!!errors.email}
                  helperText={errors.email}
                  variant="outlined"
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: "10px",
                    width: "100%",
                    paddingRight: "30px",
                  }}
                />
                <label>
                  Contact <span className="required">*</span>
                </label>
                <TextField
                  placeholder="Contact*"
                  value={
                    isEditing
                      ? editedUserData.contact || ""
                      : userData?.contact || ""
                  }
                  onChange={(e) =>
                    handleUserDataChange("contact", e.target.value)
                  }
                  disabled={!isEditing}
                  error={!!errors.contact}
                  helperText={errors.contact}
                  variant="outlined"
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: "10px",
                    width: "100%",
                    paddingRight: "30px",
                  }}
                />
                <label>Address</label>
                <TextField
                  placeholder="Address"
                  value={
                    isEditing
                      ? editedUserData.address || ""
                      : userData?.address || ""
                  }
                  onChange={(e) =>
                    handleUserDataChange("address", e.target.value)
                  }
                  disabled={!isEditing}
                  error={!!errors.address}
                  helperText={errors.address}
                  variant="outlined"
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: "10px",
                    width: "100%",
                    paddingRight: "30px",
                  }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={isEmailNotificationEnabled}
                      onChange={handleEmailNotificationChange}
                      disabled={!isEditing}
                    />
                  }
                  label="Enable Email Notifications"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>City</label>
                <TextField
                  placeholder="City"
                  value={
                    isEditing ? editedUserData.city || "" : userData?.city || ""
                  }
                  onChange={(e) => handleUserDataChange("city", e.target.value)}
                  disabled={!isEditing}
                  error={!!errors.city}
                  helperText={errors.city}
                  variant="outlined"
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: "10px",
                    width: "100%",
                    paddingRight: "30px",
                  }}
                />
                <label>State / Province</label>
                <TextField
                  placeholder="State / Province"
                  value={
                    isEditing
                      ? editedUserData.province || ""
                      : userData?.province || ""
                  }
                  onChange={(e) =>
                    handleUserDataChange("province", e.target.value)
                  }
                  disabled={!isEditing}
                  error={!!errors.province}
                  helperText={errors.province}
                  variant="outlined"
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: "10px",
                    width: "100%",
                    paddingRight: "30px",
                  }}
                />
                <label>ZIP / Postal Code</label>
                <TextField
                  placeholder="ZIP / Postal Code"
                  value={
                    isEditing ? editedUserData.zip || "" : userData?.zip || ""
                  }
                  onChange={(e) => handleUserDataChange("zip", e.target.value)}
                  disabled={!isEditing}
                  error={!!errors.zip}
                  helperText={errors.zip}
                  variant="outlined"
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: "10px",
                    width: "100%",
                    paddingRight: "30px",
                  }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={isSmsNotificationEnabled}
                      onChange={handleSmsNotificationChange}
                      disabled={!isEditing}
                    />
                  }
                  label="Enable SMS Notifications"
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 3,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {isEditing ? (
                  <>
                    <Button
                      variant="outlined"
                      onClick={handleCancelEdit}
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#fff",
                        backgroundColor: "#27374D",
                        padding: (theme) => theme.spacing(1, 3),
                        borderRadius: "4px",
                        marginTop: "20px",
                        border: "none",
                        marginRight: "220px",
                        transition: "background-color 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: "#526D82",
                          border: "none",
                        },
                        cursor: "pointer",
                        "@media (max-width: 768px)": {
                          fontSize: "1rem",
                          padding: (theme) => theme.spacing(0.5, 2),
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSaveChanges}
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#fff",
                        backgroundColor: "#27374D",
                        padding: (theme) => theme.spacing(1, 3),
                        borderRadius: "4px",
                        marginTop: "20px",
                        marginRight: "218px",
                        border: "none",
                        transition: "background-color 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: "#526D82",
                          border: "none",
                        },
                        cursor: "pointer",
                        "@media (max-width: 768px)": {
                          fontSize: "0.rem",
                          padding: (theme) => theme.spacing(0.5, 2),
                        },
                      }}
                    >
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleEditProfile}
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#fff",
                      backgroundColor: "#27374D",
                      padding: (theme) => theme.spacing(1, 3),
                      borderRadius: "4px",
                      marginTop: "20px",
                      marginRight: "590px",
                      border: "none",
                      transition: "background-color 0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#526D82",
                        border: "none",
                      },
                      cursor: "pointer",
                      cursor: "pointer",
                      "@media (max-width: 768px)": {
                        fontSize: "0.rem",
                        padding: (theme) => theme.spacing(0.5, 2),
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                )}
                {successMessage && (
                  <Typography variant="body1" sx={{ ml: 2, color: "#4caf50" }}>
                    {successMessage}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  onClick={handleChangePasswordModalOpen}
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#27374D",
                    padding: (theme) => theme.spacing(1, 3),
                    borderRadius: "4px",
                    marginTop: "20px",
                    border: "none",
                    transition: "background-color 0.3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#526D82",
                      border: "none",
                    },
                    cursor: "pointer",
                    cursor: "pointer",
                    "@media (max-width: 768px)": {
                      fontSize: "0.rem",
                      padding: (theme) => theme.spacing(0.5, 2),
                    },
                  }}
                >
                  Change Password
                </Button>
              </div>
            </Box>
          </Paper>

          <Modal
            open={showChangePasswordModal}
            onClose={handleChangePasswordModalClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90%",
                maxWidth: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6">Change Password</Typography>
              <label>Old Password</label>
              <TextField
                placeholder="Old Password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                error={!!errors.oldPassword}
                helperText={errors.oldPassword}
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "10px",
                  width: "100%",
                  paddingRight: "30px",
                }}
                variant="outlined"
              />
              <label>New Password</label>
              <TextField
                placeholder="New Password"
                type={isPasswordVisible ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={!!errors.newPassword}
                helperText={errors.newPassword}
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "10px",
                  width: "100%",
                  paddingRight: "30px",
                }}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <label>Confirm Password</label>
              <TextField
                placeholder="Confirm Password"
                type={isPasswordVisible ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                fullWidth
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "10px",
                  width: "100%",
                  paddingRight: "30px",
                }}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleChangePassword}
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#fff",
                  backgroundColor: "#27374D",
                  padding: (theme) => theme.spacing(1, 3),
                  borderRadius: "4px",
                  marginTop: "20px",
                  border: "none",
                  transition: "background-color 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#526D82",
                    border: "none",
                  },
                  cursor: "pointer",
                }}
              >
                Save Password
              </Button>
              {passwordChangeMessage && (
                <Typography variant="body1" sx={{ mt: 2, color: "red" }}>
                  {passwordChangeMessage}
                </Typography>
              )}
            </Box>
          </Modal>
        </Container>
      </div>
    </div>
  );
};

export default UserProfile;
