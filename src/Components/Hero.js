import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import heroImage1 from '../images/hero-image.jpg';

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundColor: '#fff',
    padding: theme.spacing(15, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    overflowX: 'hidden',
  },
  content: {
    maxWidth: '50%',
    marginRight: '20px',
    paddingLeft: '20px',
    textAlign: 'justify',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: theme.spacing(3),
    color: '#333',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    letterSpacing: '1px', // Added letter spacing for a professional look
    lineHeight: '1.2', // Adjusted line height for better readability
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: theme.spacing(5),
    color: '#555',
    fontStyle: 'italic',
    letterSpacing: '0.5px', // Added letter spacing for a professional look
    lineHeight: '1.5', // Adjusted line height for better readability
  },
  button: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    padding: theme.spacing(1, 3),
    borderRadius: '4px',
    transition: 'background-color 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: '70%',
    height: 'auto',
    marginBottom: theme.spacing(3),
    marginTop: '40px',
    marginRight: '20px',
    marginLeft: '40px',
    cursor: 'pointer',
  },
}));

const Hero = () => {
  const classes = useStyles();

  const title = 'Find and Connect with Local Service Professionals';
  const description =
    'Welcome to our local service provider website, where trusted professionals await to simplify your life. Our user-friendly platform empowers you to effortlessly find and connect with reliable service providers in your area. Experience the convenience of hiring top-notch professionals for all your needs, from home repairs to personal services, and enjoy a stress-free and seamless hiring process.';

  return (
    <div className={classes.hero}>
      <div className={classes.content}>
        <h1 className={classes.title}>{title}</h1>
        <p className={classes.description}>{description}</p>
      </div>
      <div className={classes.imageContainer}>
        <img src={heroImage1} alt="Hero Image" className={classes.image} />
      </div>
    </div>
  );
};

export default Hero;
