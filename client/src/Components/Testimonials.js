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
        'I had an amazing experience with Hire Local Pros! I needed a reliable plumber to fix a leaking pipe in my kitchen, and they connected me with a skilled professional in no time. The plumber arrived promptly and did a fantastic job. The best part was the hassle-free process from start to finish. I highly recommend Hire Local Pros for anyone looking to find trusted service providers quickly and easily.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Marketing Manager',
      statement:
        "Finding a reliable electrician used to be a daunting task, but thanks to Hire Local Pros, it's now a breeze! I needed some electrical repairs in my home, and I was impressed with the variety of professionals available on the website. I selected an electrician based on their ratings and reviews, and they did not disappoint. The service was outstanding, and I'll definitely be using Hire Local Pros for all my future needs.",
    },
    {
      id: 3,
      name: 'Alice Johnson',
      position: 'Designer',
      statement:
        "Hire Local Pros made my life so much easier when I needed a house cleaning service. I was able to browse through different cleaning companies in my area and choose the one that suited my preferences and budget. The cleaning crew did a thorough job, and I'm thrilled with the results. I appreciate how user-friendly the website is, and I'll be recommending Hire Local Pros to all my friends and family.",
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
