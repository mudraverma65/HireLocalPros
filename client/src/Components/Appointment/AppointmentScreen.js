import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios'; // Import Axios library
import { useParams } from 'react-router-dom';


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
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    fontSize: '3rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
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
    color: '#007bff',
    fontWeight: 'bold',
  },
  appointmentStatusCancelled: {
    color: '#f44336',
    fontWeight: 'bold',
  },
}));

const AppointmentsScreen = () => {
    const classes = useStyles();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    const { userId } = useParams();
  
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
  
    return (
      <Card className={classes.appointmentCard}>
        <CardContent>
          <Typography variant="h2" className={classes.appointmentHeading}>
            <span role="img" aria-label="Calendar Icon">🗓️</span> Your Appointments
          </Typography>
          {loading ? (
            <Typography variant="body1">Loading...</Typography>
          ) : error ? (
            <Typography variant="body1">{error}</Typography>
          ) : appointments.length === 0 ? (
            <Typography variant="body1">You have no appointments scheduled.</Typography>
          ) : (
            <List className={classes.appointmentList}>
              {appointments.map((appointment) => (
                <ListItem key={appointment._id} className={classes.appointmentItem}>
                  <ListItemText
                    primary={`Date: ${appointment.appointmentDate}, Time: ${appointment.appointmentTime}`}
                    secondary={
                      <span className={
                        appointment.appointmentStatus === 'confirmed'
                          ? classes.appointmentStatusConfirmed
                          : classes.appointmentStatusCancelled
                      }>
                        Status: {appointment.appointmentStatus}
                      </span>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    );
  };
  
  export default AppointmentsScreen;