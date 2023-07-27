import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Grid,
  Button,
} from "@mui/material";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

const useStyles = makeStyles((theme) => ({
  appointmentCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    margin: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(12),
    },
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  appointmentHeading: {
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
  appointmentList: {
    width: "100%",
    maxWidth: 600,
    marginTop: theme.spacing(2),
    backgroundColor: "#fff",
    borderRadius: "4px",
    "& .MuiListItem-root": {
      borderBottom: "1px solid #ccc",
      "&:last-child": {
        borderBottom: "none",
      },
    },
  },
  appointmentItem: {
    padding: theme.spacing(2),
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  appointmentStatusConfirmed: {
    color: "#007bff", // Blue color for confirmed status
    fontWeight: "bold",
  },
  appointmentStatusCancelled: {
    color: "#f44336", // Red color for cancelled status
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  confirmButton: {
    backgroundColor: "#007bff", // Blue color for confirm button
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0056b3", // Darker blue background on hover
    },
  },
  cancelButton: {
    backgroundColor: "#f44336", // Red color for cancel button
    color: "#fff",
    "&:hover": {
      backgroundColor: "#b71c1c", // Darker red background on hover
    },
  },
  mobileAppointmentItem: {
    paddingBottom: theme.spacing(2),
    borderBottom: "1px solid #ccc",
    "&:last-child": {
      borderBottom: "none",
    },
  },
}));

const ServiceProviderAppointments = () => {
  const classes = useStyles();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Use the service provider ID from the URL parameter
  const serviceProviderId = localStorage.getItem("userId");

  useEffect(() => {
    console.log("Service Provider ID:", serviceProviderId);
    fetchAppointments();
  }, [serviceProviderId]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      // Use the correct base URL for your backend API
      const baseURL = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.get(
        `${baseURL}/getServiceProviderAppointments/${serviceProviderId}`
      );
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching appointments. Please try again later.");
      setLoading(false);
      console.error("Error fetching appointments:", error);
    }
  };

  const handleConfirmAppointment = async (appointmentId) => {
    try {
      const baseURL = process.env.REACT_APP_BACKEND_URL;
      await axios.post(`${baseURL}/updateAppointmentStatus/${appointmentId}`, {
        status: "confirm",
      }); // Change 'confirm' to 'approve'
      fetchAppointments(); // Refresh the appointments after updating status
    } catch (error) {
      setError("Error confirming appointment. Please try again later.");
      console.error("Error confirming appointment:", error);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const baseURL = process.env.REACT_APP_BACKEND_URL;
      await axios.post(`${baseURL}/updateAppointmentStatus/${appointmentId}`, {
        status: "cancel",
      });
      fetchAppointments(); // Refresh the appointments after updating status
    } catch (error) {
      setError("Error cancelling appointment. Please try again later.");
      console.error("Error cancelling appointment:", error);
    }
  };

  return (
    <Card className={classes.appointmentCard}>
      <CardContent>
        <Typography
          variant="h4"
          style={{ color: "#27374D", fontWeight: "bold" }}
        >
          YOUR APPOINTMENTS
        </Typography>
        {loading ? (
          <Typography variant="body1">
            <div className="spinnerContainer">
              <Spinner />
            </div>
          </Typography>
        ) : error ? (
          <Typography variant="body1">{error}</Typography>
        ) : appointments.length === 0 ? (
          <Typography variant="body1">
            You have no appointments scheduled.
          </Typography>
        ) : (
          <List className={classes.appointmentList}>
            {appointments?.map((appointment) => (
              <ListItem
                key={appointment._id}
                className={`${classes.appointmentItem} ${classes.mobileAppointmentItem}`}
              >
                <ListItemText
                  primary={`Date: ${appointment.appointmentDate}, Time: ${appointment.appointmentTime}`}
                  secondary={
                    <span
                      className={
                        appointment.appointmentStatus === "confirmed"
                          ? classes.appointmentStatusConfirmed
                          : classes.appointmentStatusCancelled
                      }
                    >
                      Status: {appointment.appointmentStatus}
                    </span>
                  }
                />
                {/* Show appointment details */}
                <ListItemText
                  primary={`Appointment ID: ${appointment._id}`}
                  secondary={`Client Email: ${appointment.contactEmail}`}
                />
                {appointment.appointmentStatus === "scheduled" && (
                  <div className={classes.buttonContainer}>
                    <Button
                      variant="contained"
                      className={classes.confirmButton}
                      onClick={() => handleConfirmAppointment(appointment._id)}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="contained"
                      className={classes.cancelButton}
                      onClick={() => handleCancelAppointment(appointment._id)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceProviderAppointments;
