import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  faqs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(8, 2),
    margin: theme.spacing(4, 2),
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[2],
  },
  faqsHeading: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
    color: '#333',
    textAlign: 'center',
    background: 'transparent',
    fontWeight: 'bold',
    fontSize: '1.8rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  accordion: {
    width: '100%',
    marginBottom: theme.spacing(2),
    background: 'transparent',
    boxShadow: 'none',
  },
  accordionSummary: {
    backgroundColor: 'transparent',
    padding: 0,
    borderBottom: 'none',
    '&$accordionSummaryExpanded': {
      margin: 0,
    },
  },
  accordionSummaryContent: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '1.2rem',
  },
  accordionDetails: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    color: '#777',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  accordionSummaryExpanded: {}, // Empty style to override the default expanded style
}));

const FAQs = () => {
  const classes = useStyles();

  const faqData = [
    {
      id: 1,
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button and follow the prompts to provide the required information.',
    },
    {
      id: 2,
      question: 'How can I contact customer support?',
      answer: 'You can contact our customer support team by emailing support@example.com or calling our toll-free number at 1-800-123-4567.',
    },
    {
      id: 3,
      question: 'Can I change my service provider after booking?',
      answer: 'Yes, you can change your service provider by contacting our support team before the scheduled appointment.',
    },
    {
      id: 4,
      question: 'Is there a cancellation fee?',
      answer: 'Cancellation fees may apply depending on the service provider and the time of cancellation. Please refer to our cancellation policy for more details.',
    },
    {
      id: 5,
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on the "Forgot Password" link on the login page and follow the instructions sent to your registered email address.',
    },
    // Add more FAQs here
  ];

  return (
    <div className={classes.faqs}>
      <div className={classes.faqsHeading}>
        <Typography variant="h4" gutterBottom>
          Frequently Asked Questions
        </Typography>
      </div>

      {faqData.map((faq) => (
        <Accordion key={faq.id} className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.accordionSummary}
            classes={{
              expanded: classes.accordionSummaryExpanded,
            }}
            aria-controls={`faq-panel-${faq.id}-content`}
            id={`faq-panel-${faq.id}-header`}
          >
            <Typography variant="body1" className={classes.accordionSummaryContent}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            <Typography variant="body1" className={classes.accordionDetailsContent}>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FAQs;
