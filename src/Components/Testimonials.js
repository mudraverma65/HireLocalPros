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
    backgroundColor: 'lightblue',
    borderRadius: theme.spacing(2),
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: theme.spacing(4),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  testimonialStatement: {
    marginBottom: theme.spacing(2),
    color: '#333',
    textAlign: 'center',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
  },
  testimonialName: {
    fontWeight: 'bold',
    color: '#555',
  },
  testimonialPosition: {
    color: '#888',
  },
}));

const Testimonials = () => {
  const classes = useStyles();

  const reviews = [
    {
      id: 1,
      name: 'John Doe',
      statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolo. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      statement: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      statement: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur commodo . Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
                  <Avatar src={review.image_url} className={classes.avatar} />
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
