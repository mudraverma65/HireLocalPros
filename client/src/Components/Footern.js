import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, Box } from '@material-ui/core';
import useStyles from '../styles/styles';
import logo from '../images/logo.png';

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} className={classes.column}>
            <img src={logo} alt="Logo" className={classes.logo} />
            <br />
            <Typography variant="body1">
              Connecting independent service providers with reliable work opportunities, HireLocalPros offers fair prices and eliminates commissions. Find skilled workers near you and experience satisfaction in choosing the best providers for your needs.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} className={classes.column}>
            <Typography variant="h6">Company</Typography>
            <Link to="/contact" className={classes.link}>
              Contact Us
            </Link>
            <Link to="/faqs" className={classes.link}>
              FAQ
            </Link>
            <Link to="/services" className={classes.link}>
              Services
            </Link>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} className={classes.column}>
            <Typography variant="h6">Profile</Typography>
            <Link to="/appointments" className={classes.link}>
              Appointments
            </Link>
            <Link to="/login" className={classes.link}>
              Login
            </Link>
            <Link to="/profile" className={classes.link}>
              Profile
            </Link>
          </Grid>
        </Grid>
        <br />
        <Typography variant="body1" align="center">
          HireLocalPros.
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} All rights reserved.
        </Typography>
        <Box m={2} /> {/* Add spacing of 2 units */}
      </Container>
    </footer>
  );
};

export default Footer;
