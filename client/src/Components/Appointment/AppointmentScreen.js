import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import axios from 'axios'; // Import Axios library
import { useParams } from 'react-router-dom';
import { Button, Modal, Box, TextField } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  appointmentCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    margin: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(12),
    },
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  appointmentHeading: {
    marginBottom: theme.spacing(4),
    color: '#007bff', // Blue color for heading
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif', // New font family
    fontWeight: 'bold',
    fontSize: '3rem',
    textTransform: 'uppercase',
    letterSpacing: '2px', // Increase letter spacing for a stylish look
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
    },
  },
  appointmentList: {
    width: '100%',
    maxWidth: 600,
    marginTop: theme.spacing(2),
    backgroundColor: '#fff',
    borderRadius: '4px',
    '& .MuiListItem-root': {
      borderBottom: '1px solid #ccc',
      '&:last-child': {
        borderBottom: 'none',
      },
    },
  },
  appointmentItem: {
    padding: theme.spacing(2),
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  appointmentStatusConfirmed: {
    color: '#007bff', // Blue color for confirmed status
    fontWeight: 'bold',
  },
  appointmentStatusCancelled: {
    color: '#f44336', // Red color for cancelled status
    fontWeight: 'bold',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: theme.spacing(3),
    width: '80%',
    maxWidth: 400,
    borderRadius: '4px',
  },
  modalTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  modalFormField: {
    marginBottom: theme.spacing(2),
  },
  modalSubmitButton: {
    marginTop: theme.spacing(2),
    backgroundColor: '#007bff', // Blue background for the submit button
    color: '#fff',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#0056b3', // Darker blue background on hover
    },
  },

  formHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  form: {
    marginTop: theme.spacing(2),
    width: '50%',
  },
  title: {
    color: '#27374D',
    fontSize: '30px',
    fontWeight: 'bold',
    marginTop: '25px',
  },
  subtitle: {
    color: '#27374D',
    fontSize: '16px',
    fontWeight: 400,
    marginTop: '10px',
  },
  label: {
    marginTop: '20px',
    color: '#27374D',
    fontSize: '16px',
    fontWeight: 400,
  },
  required: {
    color: 'red',
  },
  inputField: {
    backgroundColor: 'transparent',
    borderRadius: '10px',
    border: '1px solid #27374D',
    width: '100%',
    paddingRight: '30px',
  },
  inputFieldFocused: {
    backgroundColor: 'transparent',
    border: '1px solid #27374D',
  },
  link: {
    textDecoration: 'none',
    color: '#27374D',
    fontSize: '14px',
    marginTop: '20px',
  },
  linkHover: {
    textDecoration: 'none',
    color: '#526D82',
  },
  forgot: {
    float: 'right',
  },
  signup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  error: {
    backgroundColor: '#FFDADA',
    color: '#DD4343',
    fontWeight: 400,
    fontSize: '16px',
    borderRadius: '10px',
    padding: '10px',
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  errorText: {
    marginLeft: '10px',
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordContainer: {
    position: 'relative',
  },
  togglePassword: {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
  },
}));

const AppointmentsScreen = () => {
  const classes = useStyles();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // State to store the selected appointment
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    console.log('User ID:', userId);
    fetchAppointments();
  }, [userId]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError('');

      // Use the correct base URL for your backend API
      const baseURL = 'http://localhost:8000';
      const response = await axios.get(`${baseURL}/getUserAppointments/${userId}`);
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching appointments. Please try again later.');
      setLoading(false);
      console.error('Error fetching appointments:', error);
    }
  };

  // Function to handle the "Reschedule" button click and open the modal
  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  // Function to handle the modal close
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Function to handle the reschedule form submission
  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();

    // Prepare updated appointment data
    const updatedAppointmentData = {
      ...selectedAppointment,
      appointmentStatus: 'scheduled',
      appointmentTime: e.target.appointmentTime.value,
      appointmentDate: e.target.appointmentDate.value,
    };

    try {
      const baseURL = 'http://localhost:8000';
      const response = await axios.put(
        `${baseURL}/update/${selectedAppointment._id}`,
        updatedAppointmentData
      );

      console.log('Appointment rescheduled successfully:', response.data);
      setModalOpen(false);
      fetchAppointments(); // Fetch updated appointment list
    } catch (error) {
      console.error('Error rescheduling appointment:', error.response.data);
      // Handle error (e.g., show error message)
    }
  };

  // Render the "Reschedule" button for confirmed appointments
  const renderRescheduleButton = (appointment) => {
    if (appointment.appointmentStatus === 'confirmed') {
      return (
        <Button
          variant="outlined"
          onClick={() => handleReschedule(appointment)}
        >
          Reschedule
        </Button>
      );
    }
    return null;
  };

  // Render the modal
  const renderModal = () => {
    if (!selectedAppointment) {
      return null;
    }

    return (
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        className={classes.modal}
      >
        <Box className={classes.modalContent}>
          <Typography variant="h4" className={classes.modalTitle}>
            Reschedule Appointment
          </Typography>
          <form onSubmit={handleRescheduleSubmit} className={classes.modalForm}>
            <TextField
              label="Date"
              type="date"
              name="appointmentDate"
              defaultValue={selectedAppointment.appointmentDate}
              variant="outlined"
              className={classes.modalFormField}
              required
            />
            <TextField
              label="Time"
              type="time"
              name="appointmentTime"
              defaultValue={selectedAppointment.appointmentTime}
              variant="outlined"
              className={classes.modalFormField}
              required
            />
            <Button
              type="submit"
              variant="contained"
              className={classes.modalSubmitButton}
            >
              Reschedule Appointment
            </Button>
          </form>
        </Box>
      </Modal>
    );
  };

  return (
    <Card className={classes.appointmentCard}>
      <CardContent>
        <Typography variant="h2" className={classes.appointmentHeading}>
          <span role="img" aria-label="Calendar Icon">
            🗓️
          </span>{' '}
          Your Appointments
        </Typography>
        {loading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : error ? (
          <Typography variant="body1">{error}</Typography>
        ) : appointments.length === 0 ? (
          <Typography variant="body1">
            You have no appointments scheduled.
          </Typography>
        ) : (
          <List className={classes.appointmentList}>
            {appointments.map((appointment) => (
              <ListItem key={appointment._id} className={classes.appointmentItem}>
                <ListItemText
                  primary={`Date: ${appointment.appointmentDate}, Time: ${appointment.appointmentTime}`}
                  secondary={
                    <span
                      className={
                        appointment.appointmentStatus === 'confirmed'
                          ? classes.appointmentStatusConfirmed
                          : classes.appointmentStatusCancelled
                      }
                    >
                      Status: {appointment.appointmentStatus}
                    </span>
                  }
                />
                {renderRescheduleButton(appointment)}
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
      {renderModal()}
    </Card>
  );
};

export default AppointmentsScreen;