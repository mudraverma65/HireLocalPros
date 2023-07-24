import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, Grid, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  testimonials: {
    flexGrow: 1,
    padding: theme.spacing(8, 0),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
    backgroundColor: 'white',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  testimonialCard: {
    backgroundColor: 'rgba(173, 216, 230, 0.8)', // Slightly transparent lightblue color
    borderRadius: theme.spacing(2),
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: theme.spacing(4),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
  },
  testimonialStatement: {
    marginBottom: theme.spacing(2),
    color: 'rgba(51, 51, 51, 0.8)', // Transparent black color for the statement
    textAlign: 'center',
    fontSize: '1rem',
    fontStyle: 'italic',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
  },
  testimonialName: {
    fontWeight: 'bold',
    color: 'rgba(85, 85, 85, 0.8)', // Transparent gray color for the name
    fontSize: '1.2rem',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(0.5),
  },
  testimonialPosition: {
    color: 'rgba(136, 136, 136, 0.8)', // Transparent gray color for the position
    fontSize: '1rem',
  },
}));

const Testimonials = () => {
  const classes = useStyles();

  const reviews = [
    {
      id: 1,
      name: 'John Doe',
      position: 'CEO',
      statement:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Marketing Manager',
      statement:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      position: 'Designer',
      statement:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];

  return (
    <div className={classes.testimonials}>
      <Typography variant="h4" align="center" gutterBottom>
        Customer Testimonials
      </Typography>
      <Grid container spacing={2}>
        {reviews.map((review) => (
          <Grid item xs={12} sm={6} md={4} key={review.id}>
            <Card className={classes.testimonialCard}>
              <CardContent>
                <Typography variant="body1" className={classes.testimonialStatement}>
                  "{review.statement}"
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar className={classes.avatar} />
                  <div>
                    <Typography variant="body2" className={classes.testimonialName}>
                      {review.name}
                    </Typography>
                    <Typography variant="body2" className={classes.testimonialPosition}>
                      {review.position}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Testimonials;
