import React from 'react';
import logo from '../images/logo.png';
import useStyles from '../styles/styles';
import {
  AppBar,
  Toolbar,
  Button,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Hidden,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

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
              {/* <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                Home
              </MenuItem> */}
              <MenuItem component={Link} to="/services" onClick={handleMenuClose}>
                Services
              </MenuItem>
              <MenuItem component={Link} to="/about" onClick={handleMenuClose}>
                About Us
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
              to="/services"
            >
              Services
            </Button>
            <Button
              className={classes.menuButton}
              component={Link}
              to="/about"
            >
              About Us
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
