import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import ContactUs from './Components/ContactUs';
import FAQs from './Components/FAQs';
import Footer from './Components/Footern';
import Header from './Components/Header';
import BookingRequest from './Components/Appointment/BookingRequest'; // Import the BookingRequest component
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  // Your theme configuration here
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/booking" element={<BookingRequest />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
