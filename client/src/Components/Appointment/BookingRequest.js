import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  bookingForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    margin: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(12),
    },
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9", // Light gray background color
  },
  formHeading: {
    marginBottom: theme.spacing(4),
    color: "#007bff", // Blue color for heading
    textAlign: "center",
    fontFamily: "Poppins, sans-serif", // New font family
    fontWeight: "bold",
    fontSize: "3rem",
    textTransform: "uppercase",
    letterSpacing: "2px", // Increase letter spacing for a stylish look
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5rem",
    },
  },
  formSubHeading: {
    marginBottom: theme.spacing(2),
    color: "#555",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif", // Same font family for subheading
    fontWeight: "bold",
    fontSize: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  formField: {
    marginBottom: theme.spacing(3),
    width: "100%",
    backgroundColor: "#fff", // White background for text fields
    borderRadius: "4px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ccc",
      },
      "&:hover fieldset": {
        borderColor: "#999",
      },
    },
  },
  timeSelect: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "4px",
    "& .MuiSelect-select": {
      "&:focus": {
        backgroundColor: "transparent",
      },
    },
  },
  submitButton: {
    width: "100%",
    marginTop: theme.spacing(2),
    backgroundColor: "#007bff", // Blue background for the submit button
    color: "#fff",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#0056b3", // Darker blue background on hover
    },
  },
  dateAndTime: {
    marginTop: theme.spacing(2),
  },
  mobileFormContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%", // Full-width for mobile
    padding: theme.spacing(2), // Add some padding for better spacing on mobile
  },
}));

const BookingRequest = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [timeError, setTimeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const location = useLocation();
  const serviceProviderId = location.state.userId;
  const userId = localStorage.getItem("userId");

  console.log("----------------, Service provider ID", serviceProviderId);

  const availableTimes = Array.from({ length: 10 }, (_, index) => {
    const hour = 8 + index;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the time is valid (HH:mm format)
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):00$/;
    if (!timeRegex.test(selectedTime)) {
      setTimeError(true);
    } else {
      setTimeError(false);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e.target.email.value)) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    // Prepare data for API call
    const userData = {
      userId: userId,
      serviceProviderUserId: serviceProviderId, // Replace with actual service provider user ID (hardcoded for now)
      appointmentTime: selectedTime,
      appointmentDate: formatDate(selectedDate),
      contactEmail: e.target.email.value,
      // Add other appointment details as needed (e.g., service description, service type, etc.)
    };

    // Call the API to schedule an appointment
    try {
      console.log(userData);
      const baseURL = process.env.REACT_APP_BACKEND_URL; // Or any other URL where your backend API is hosted
      const response = await axios.post(
        `${baseURL}/scheduleAppointment`,
        userData
      );
      console.log("Appointment scheduled successfully:", response.data);
      // Add any logic for success handling (e.g., show success message, redirect to confirmation page, etc.)
    } catch (error) {
      console.error("Error scheduling appointment:", error.response.data);
      // Add any logic for error handling (e.g., show error message, etc.)
    }
  };

  return (
    <Card className={classes.bookingForm}>
      <CardContent>
        <Typography variant="h2" className={classes.formHeading}>
          <span role="img" aria-label="Calendar Icon">
            🗓️
          </span>{" "}
          Schedule an Appointment
        </Typography>
        <Typography variant="h4" className={classes.formSubHeading}>
          Choose a date and time for your appointment
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className={classes.mobileFormContainer}>
            <TextField
              label="Name"
              variant="outlined"
              className={classes.formField}
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              className={classes.formField}
              required
              name="email" // Add a name attribute to retrieve the email in the handleSubmit function
              error={emailError}
              helperText={emailError ? "Invalid email format" : ""}
            />
          </div>
          <Grid container spacing={2} className={classes.dateAndTime}>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className={classes.formField}
                placeholderText="Select date"
                dateFormat="MM/dd/yyyy"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                displayEmpty
                className={classes.timeSelect}
                error={timeError}
              >
                <MenuItem value="" disabled>
                  Select time
                </MenuItem>
                {availableTimes.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
              {timeError && (
                <Typography variant="caption" color="error">
                  Invalid time format (HH:00)
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            className={classes.submitButton}
          >
            Book Appointment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingRequest;
