import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import heroImage1 from '../images/hero-image.jpg';

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundColor: '#fff',
    padding: theme.spacing(8, 2), // Adjusted padding on the sides
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    overflowX: 'hidden',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column', // Change flex direction to column on mobile devices
      padding: theme.spacing(4, 2), // Adjusted padding on mobile devices
    },
  },
  content: {
    maxWidth: '50%',
    marginLeft: '20px', // Added left margin
    textAlign: 'justify',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%', // Adjusted maximum width for mobile devices
      marginLeft: 0, // Remove left margin on mobile devices
    },
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: theme.spacing(3),
    color: '#333',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    letterSpacing: '1px',
    lineHeight: '1.2',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem', // Decreased font size for mobile devices
      marginBottom: theme.spacing(2), // Adjusted margin bottom for mobile devices
    },
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: theme.spacing(5),
    color: '#555',
    fontStyle: 'italic',
    letterSpacing: '0.5px',
    lineHeight: '1.5',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem', // Decreased font size for mobile devices
      marginBottom: theme.spacing(3), // Adjusted margin bottom for mobile devices
    },
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
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4), // Adjusted margin top for mobile devices
    },
  },
  image: {
    width: '80%', // Decreased image size to 80% of the container
    height: 'auto',
    marginBottom: theme.spacing(3),
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '100%', // Make the image fill the container width on mobile devices
      margin: 0, // Remove margins on mobile devices
      marginTop: theme.spacing(2), // Adjusted margin top for mobile devices
    },
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
