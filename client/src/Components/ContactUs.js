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
              <Typography>
                Name <span className="required">*</span>
              </Typography>
              <TextField
                type="name"
                name="name"
                placeholder="Name"
                variant="outlined"
                className={classes.textField}
                required
                fullWidth
                style={{ marginTop: "10px", marginBottom: "10px" }}
              />

              <Typography>
                Email <span className="required">*</span>
              </Typography>
              <TextField
                type="email"
                name="email"
                placeholder="Email"
                variant="outlined"
                className={classes.textField}
                required
                fullWidth
                style={{ marginTop: "10px", marginBottom: "10px" }}
              />

              <Typography>
                Message <span className="required">*</span>
              </Typography>
              <TextField
                multiline
                rows={3} // Set the number of rows to 3
                name="message"
                placeholder="Message"
                variant="outlined"
                className={classes.textField}
                required
                fullWidth
                style={{ marginTop: "10px", marginBottom: "10px" }}
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
              <strong>Terms and Conditions</strong>

              <p>Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern HireLocalPros's relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.</p>

              <p>The use of this website is subject to the following terms of use:</p>

              <ol>
                <li>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</li>
                <li>This website uses cookies to monitor browsing preferences. If you do allow cookies to be used, personal information may be stored by us for use by third parties.</li>
                <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors, and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
                <li>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through this website meet your specific requirements.</li>
                <li>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
                <li>All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website.</li>
                <li>Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offence.</li>
                <li>From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</li>
                <li>Your use of this website and any dispute arising out of such use of the website is subject to the laws.</li>
              </ol>
            </Typography>

            </div>
          </Modal>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ContactUs;
