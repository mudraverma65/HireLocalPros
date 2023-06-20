import React from 'react';
import logo from '../images/logo.png';
import { AppBar, Toolbar, Button, makeStyles, InputBase, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff',
    height: '60px', // Adjust the height as desired
  },
  logo: {
    width: '150px', // Adjust the width as desired
    height: 'auto', // Adjust the height as desired
  },
  buttonContainer: {
    marginLeft: 'auto',
  },
  button: {
    color: '#333',
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
    '&:hover': {
      color: '#888',
    },
  },
  searchContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(0, 1),
    width: '400px', // Adjust the width as desired

  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchIcon: {
    padding: theme.spacing(1),
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img src={logo} alt="Logo" className={classes.logo} />
        </Link>
        <div className={classes.searchContainer}>
          <div className={classes.searchBox}>
            <InputBase
              placeholder="Search for services near you..."
              className={classes.searchInput}
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton color="primary" className={classes.searchIcon} aria-label="search">
              <SearchIcon />
            </IconButton>
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <Button component={Link} to="/" className={classes.button}>
            Home
          </Button>
          <Button component={Link} to="/faqs" className={classes.button}>
            FAQs
          </Button>
          <Button component={Link} to="/contactus" className={classes.button}>
            Contact Us
          </Button>
          <Button component={Link} to="/login" className={classes.button}>
            Login
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
