import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button, Card, CardContent, FormControlLabel, Checkbox, Modal, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  contactForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    margin: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(12), // Adjust the top margin to give space for the navbar
    },
  },
  formHeading: {
    marginBottom: theme.spacing(4),
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    fontSize: '2.5rem',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem',
    },
  },
  formField: {
    marginBottom: theme.spacing(4),
    width: '100%',
  },
  submitButton: {
    width: '100%',
    marginTop: theme.spacing(2),
    backgroundColor: '#000',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#222',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: theme.spacing(4),
    outline: 'none',
    borderRadius: theme.spacing(2),
  },
  termsLink: {
    fontWeight: 'bold',
    textDecoration: 'underline',
    cursor: 'pointer',
    color: '#000',
    '&:hover': {
      color: '#222',
    },
  },
  termsText: {
    fontFamily: 'Arial, sans-serif',
    marginBottom: theme.spacing(2),
    color: '#333',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  termsLabel: {
    marginLeft: theme.spacing(1),
  },
}));

const ContactUs = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (termsChecked) {
      // Add your logic here to handle form submission
      console.log('Form submitted');
    } else {
      // Display an error or prompt the user to accept the terms and conditions
      console.log('Please accept the terms and conditions');
    }
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card className={classes.contactForm}>
          <CardContent>
            <Typography variant="h2" className={classes.formHeading}>
              Contact Us
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
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                className={classes.formField}
                required
              />
              <Grid container alignItems="center" className={classes.checkboxContainer}>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={termsChecked}
                        onChange={(e) => setTermsChecked(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Typography className={classes.termsLabel}>
                        I have read and agree to the{' '}
                        <span
                          className={classes.termsLink}
                          onClick={handleModalOpen}
                        >
                          Terms and Conditions
                        </span>
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={!termsChecked}
              >
                Submit
              </Button>
            </form>
          </CardContent>
          <Modal
            open={openModal}
            onClose={handleModalClose}
            className={classes.modal}
          >
            <div className={classes.modalContent}>
              <Typography variant="h6" gutterBottom>
                Terms and Conditions
              </Typography>
              <Typography variant="body1" className={classes.termsText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at urna vitae dolor fringilla fringilla. Quisque auctor risus nec nisi rutrum, vel sagittis nisl volutpat. Nulla facilisi. Suspendisse ut nisi dapibus, gravida elit a, rutrum turpis. Phasellus tempus mi sit amet dui rhoncus, sed auctor tellus tincidunt. Morbi vestibulum consectetur enim id faucibus. Sed at urna sagittis, vestibulum nisl sed, interdum purus. Donec ut ipsum sed sem porta euismod. Nulla facilisi. Vivamus pretium viverra semper. Morbi commodo lorem justo, ac ullamcorper lectus ultrices et. Vestibulum sodales ultricies purus, at faucibus nisi molestie a. Sed interdum semper purus, at vestibulum felis bibendum id.
              </Typography>
              <Typography variant="body1" className={classes.termsText}>
                Fusce a massa leo. Cras elementum gravida dapibus. In hac habitasse platea dictumst. Donec non mauris vitae enim vestibulum pharetra vel sed lorem. Aenean id ante nibh. Curabitur feugiat, nulla ac tincidunt lobortis, lacus libero scelerisque mauris, a lacinia elit tellus nec massa. Proin finibus, arcu nec malesuada bibendum, tellus est ultrices est, id efficitur metus nunc sit amet nisl.
              </Typography>
            </div>
          </Modal>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ContactUs;
