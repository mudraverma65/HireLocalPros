import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
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
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";

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
    width: "80%", // Set the width of the form container to 80%
    maxWidth: "600px", // Set a maximum width for larger screens
  },
  formHeading: {
    marginBottom: theme.spacing(4),
    color: "#007bff", // Blue color for heading
    textAlign: "center",
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
    fontWeight: "bold",
    fontSize: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  formField: {
    marginBottom: theme.spacing(2),
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
    "& .MuiOutlinedInput-input": {
      padding: "10px 12px", // Reduce the height of the text fields
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

  PrimaryButton: {
    backgroundColor: "#27374d",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "12px 24px",
    fontSize: "16px",
    cursor: "pointer",
    display: "inline-block",
    position: "relative",
    "&:hover": {
      opacity: 0.9,
    },
    width: "100%",
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    setIsLoading(true);

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
      toast.success("Appointment Submitted successfully.");
      setIsLoading(false);
      const isServiceProvider =
        localStorage.getItem("serviceProvider") === "true";
      if (isServiceProvider) {
        const serviceProviderId = localStorage.getItem("userId");
        navigate(`/service-provider/${serviceProviderId}/appointments`);
      } else {
        const userId = localStorage.getItem("userId");
        navigate(`/appointments`);
      }
    } catch (error) {
      console.error(error.response.data);
      toast.error("Error scheduling appointment:", error.response.data);
      setIsLoading(false);
      // Add any logic for error handling (e.g., show error message, etc.)
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          width: "80%",
          backgroundColor: "#f5f5f5",
          color: "#27374d",
          marginTop: "100px",
        }}
      >
        <CardContent>
          <Typography variant="h4" className="mb-4 form-heading">
            <span role="img" aria-label="Calendar Icon">
              🗓️
            </span>{" "}
            Schedule an Appointment
          </Typography>
          <Typography variant="h6" className="mb-4 form-subheading">
            Choose a date and time for your appointment
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* <div style={{ marginBottom: '20px' }}>
          <Box mb={2}>
            <TextField
              label="Name"
              variant="standard"
              fullWidth
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Email"
              variant="standard"
              fullWidth
              required
              name="email" // Add a name attribute to retrieve the email in the handleSubmit function
              error={emailError}
              helperText={emailError ? "Invalid email format" : ""}
            />
          </Box>
          {/* Other text fields */}
            {/* </div> */}
            <div style={{ marginBottom: "20px", width: "100%" }}>
              <input
                type="text"
                placeholder="Name*"
                required
                className="form-control"
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "6px",
                  width: "100%",
                  paddingRight: "30px",
                  height: "50px", // Set the desired height for the input field
                  border: "1px solid #ccc", // Add a border to the input field
                  paddingLeft: "12px", // Add some left padding for better appearance
                }}
              />
            </div>
            <div style={{ marginBottom: "20px", width: "100%" }}>
              <input
                type="text"
                placeholder="Email*"
                required
                name="email"
                className="form-control"
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "6px",
                  width: "100%",
                  paddingRight: "30px",
                  height: "50px", // Set the desired height for the input field
                  border: "1px solid #ccc", // Add a border to the input field
                  paddingLeft: "12px", // Add some left padding for better appearance
                }}
              />
            </div>
            <Grid container spacing={2} style={{ marginBottom: "20px" }}>
              <Grid item xs={12} sm={6} md={6}>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="form-control form-field"
                  placeholderText="Select date"
                  dateFormat="MM/dd/yyyy"
                  customInput={<TextField fullWidth variant="outlined" />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  displayEmpty
                  fullWidth
                  variant="outlined"
                  error={timeError}
                  style={{ width: "40%" }}
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
            {isLoading ? (
              <div className={classes.spinnerContainer}>
                <Spinner />
              </div>
            ) : (
              <button className={classes.PrimaryButton}>
                Book Appointment
              </button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingRequest;

//   return (
//     <Card className={classes.bookingForm}>
//       <CardContent>
//         <Typography variant="h2" className={classes.formHeading}>
//           <span role="img" aria-label="Calendar Icon">
//             🗓️
//           </span>{" "}
//           Schedule an Appointment
//         </Typography>
//         <Typography variant="h4" className={classes.formSubHeading}>
//           Choose a date and time for your appointment
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <div className={classes.mobileFormContainer}>
//             <TextField
//               label="Name"
//               variant="outlined"
//               className={classes.formField}
//               required
//             />
//             <TextField
//               label="Email"
//               variant="outlined"
//               className={classes.formField}
//               required
//               name="email" // Add a name attribute to retrieve the email in the handleSubmit function
//               error={emailError}
//               helperText={emailError ? "Invalid email format" : ""}
//             />
//           </div>
//           <Grid container spacing={2} className={classes.dateAndTime}>
//             <Grid item xs={12} sm={6}>
//               <DatePicker
//                 selected={selectedDate}
//                 onChange={(date) => setSelectedDate(date)}
//                 className={classes.formField}
//                 placeholderText="Select date"
//                 dateFormat="MM/dd/yyyy"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Select
//                 value={selectedTime}
//                 onChange={(e) => setSelectedTime(e.target.value)}
//                 displayEmpty
//                 className={classes.timeSelect}
//                 error={timeError}
//               >
//                 <MenuItem value="" disabled>
//                   Select time
//                 </MenuItem>
//                 {availableTimes.map((time) => (
//                   <MenuItem key={time} value={time}>
//                     {time}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {timeError && (
//                 <Typography variant="caption" color="error">
//                   Invalid time format (HH:00)
//                 </Typography>
//               )}
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             variant="contained"
//             className={classes.submitButton}
//           >
//             Book Appointment
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default BookingRequest;
