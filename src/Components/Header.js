import React from 'react';
import logo from '../images/logo.png';
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Hidden,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff',
    height: '60px',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      marginBottom: theme.spacing(2),
    },
  },
  logo: {
    width: '150px',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '120px',
    },
  },
  searchContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(0, 1),
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '300px',
    },
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchIcon: {
    padding: theme.spacing(1),
  },
  menuButton: {
    color: '#333',
    fontWeight: 'bold',
    '&:hover': {
      color: '#888',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

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
        <Hidden smUp>
          <div>
            <Button
              className={classes.menuButton}
              onClick={handleMenuOpen}
            >
              Menu
            </Button>
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                Home
              </MenuItem>
              <MenuItem component={Link} to="/faqs" onClick={handleMenuClose}>
                FAQs
              </MenuItem>
              <MenuItem component={Link} to="/contactus" onClick={handleMenuClose}>
                Contact Us
              </MenuItem>
              <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                Login
              </MenuItem>
            </Menu>
          </div>
        </Hidden>
        <Hidden xsDown>
          <div>
            <Button
              className={classes.menuButton}
              component={Link}
              to="/"
            >
              Home
            </Button>
            <Button
              className={classes.menuButton}
              component={Link}
              to="/faqs"
            >
              FAQs
            </Button>
            <Button
              className={classes.menuButton}
              component={Link}
              to="/contactus"
            >
              Contact Us
            </Button>
            <Button
              className={classes.menuButton}
              component={Link}
              to="/login"
            >
              Login
            </Button>
          </div>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
