import React from 'react';
import logo from '../images/logo.png';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom'; // Import Link component

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'white',
  },
  logo: {
    width: 350,
    height: 90,
  },
  buttonContainer: {
    marginLeft: 'auto',
  },
  button: {
    color: 'black',
  },
  content: {
    marginTop: theme.spacing(8), // Add margin top to create space below the header
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <img src={logo} alt="Image description" className={classes.logo} />
        <div className={classes.buttonContainer}>
          <Button className={classes.button}>Sign Up</Button>
          <Button className={classes.button}>Log in</Button>

          <Button className={classes.button} component={Link} to="/faqs">FAQs</Button>
          <Button className={classes.button} component={Link} to="/contactus">Contact Us</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
