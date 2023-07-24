import React from 'react';
import { Typography } from '@material-ui/core';
import heroImage1 from '../images/hero-image.jpg';
import useStyles from '../styles/styles';


const Hero = () => {
  const classes = useStyles();

  const title = 'Find and Connect with Local Service Professionals';
  const description =
    'Welcome to our local service provider website, where trusted professionals await to simplify your life. Our user-friendly platform empowers you to effortlessly find and connect with reliable service providers in your area. Experience the convenience of hiring top-notch professionals for all your needs, from home repairs to personal services, and enjoy a stress-free and seamless hiring process.';

    return (
      <div className={classes.hero}>
        <div className={classes.content}>
          <Typography variant="h3" className={classes.h1}>
            {title}
          </Typography><br/>
          <Typography variant="h5" className={classes.h5}>
            {description}
          </Typography>
        </div>
        <div className={classes.imageContainer}>
          <img src={heroImage1} alt="Hero Image" className={classes.image} />
        </div>
      </div>
    );
  };

export default Hero;
