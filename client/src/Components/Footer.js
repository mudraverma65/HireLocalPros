import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white', // Set the background color to white
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          HireLocalPros.
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} All rights reserved. {/* Add the current year dynamically */}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
