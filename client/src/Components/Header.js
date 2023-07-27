import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import useStyles from "../styles/styles";
import {
  AppBar,
  Toolbar,
  Button,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Hidden,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

const Header = () => {
  const classes = useStyles();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userId");
    if (isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearchChange = (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue.toLowerCase());
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/category/${searchTerm}`);
    }
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt="Logo" className={classes.logo} />
        </Link>
        <div className={classes.searchContainer}>
          <div className={classes.searchBox}>
            <InputBase
              placeholder="Search for services near you..."
              className={classes.searchInput}
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <IconButton
              color="primary"
              className={classes.searchIcon}
              aria-label="search"
              onClick={handleSearchSubmit}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </div>
        <Hidden smUp>
          <div>
            <Button className={classes.menuButton} onClick={handleMenuOpen}>
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
              <MenuItem
                component={Link}
                to="/services"
                onClick={handleMenuClose}
              >
                Services
              </MenuItem>
              <MenuItem component={Link} to="/about" onClick={handleMenuClose}>
                About Us
              </MenuItem>
              <MenuItem
                component={Link}
                to="/contactus"
                onClick={handleMenuClose}
              >
                Contact Us
              </MenuItem>
              {!isLoggedIn ? (
                <MenuItem
                  component={Link}
                  to="/login"
                  onClick={handleMenuClose}
                >
                  Login
                </MenuItem>
              ) : (
                <MenuItem
                  component={Link}
                  to="/login"
                  onClick={handleMenuClose}
                >
                  Logout
                </MenuItem>
              )}
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
            <Button className={classes.menuButton} component={Link} to="/about">
              About Us
            </Button>
            <Button
              className={classes.menuButton}
              component={Link}
              to="/contactus"
            >
              Contact Us
            </Button>
            {!isLoggedIn ? (
              <Button
                className={classes.menuButton}
                component={Link}
                to="/login"
              >
                Login
              </Button>
            ) : (
              <Button
                className={classes.menuButton}
                component={Link}
                to="/login"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
