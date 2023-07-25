import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, TextField, Button, Card, CardContent, Grid, Select, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const useStyles = makeStyles((theme) => ({
  bookingForm: {
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
    backgroundColor: '#f9f9f9', // Light gray background color
  },
  formHeading: {
    marginBottom: theme.spacing(4),
    color: '#333',
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
  formSubHeading: {
    marginBottom: theme.spacing(2),
    color: '#555',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif', // Same font family for subheading
    fontWeight: 'bold',
    fontSize: '1.2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  formField: {
    marginBottom: theme.spacing(3),
    width: '100%',
    backgroundColor: '#fff', // White background for text fields
    borderRadius: '4px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc',
      },
      '&:hover fieldset': {
        borderColor: '#999',
      },
    },
  },
  timeSelect: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '4px',
    '& .MuiSelect-select': {
      '&:focus': {
        backgroundColor: 'transparent',
      },
    },
  },
  submitButton: {
    width: '100%',
    marginTop: theme.spacing(2),
    backgroundColor: '#007bff', // Blue background for the submit button
    color: '#fff',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#0056b3', // Darker blue background on hover
    },
  },
  dateAndTime: {
    marginTop: theme.spacing(2),
  },
}));

const BookingRequest = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [timeError, setTimeError] = useState(false);

  const availableTimes = Array.from({ length: 10 }, (_, index) => {
    const hour = 8 + index;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the time is valid (HH:mm format)
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):00$/;
    if (!timeRegex.test(selectedTime)) {
      setTimeError(true);
      return;
    } else {
      setTimeError(false);
    }

    // Add your logic here to handle form submission
    console.log('Booking request submitted');
  };

  return (
    <Card className={classes.bookingForm}>
      <CardContent>
        <Typography variant="h2" className={classes.formHeading}>
          <span role="img" aria-label="Calendar Icon">🗓️</span> Schedule an Appointment
        </Typography>
        <Typography variant="h4" className={classes.formSubHeading}>
          Choose a date and time for your appointment
        </Typography>
        <form onSubmit={handleSubmit}>
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
          />
          <TextField
            label="Service Description"
            variant="outlined"
            className={classes.formField}
            required
          />
          {/* Add more fields as needed */}
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
              {timeError && <Typography variant="caption" color="error">Invalid time format (HH:00)</Typography>}
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
