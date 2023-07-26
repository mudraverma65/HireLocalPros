import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import ContactUs from "./Components/ContactUs";
import FAQs from "./Components/FAQs";
import Header from "./Components/Header";
import Login from "./Components/Login/Login";
import Signup from "./Components/SignUp/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoutes";
import Forgotpassword from "./Components/forgotpassword/Forgotpassword";
import DetailsPage from "./Components/DetailsPage/DetailsPage";
import Services from "./Components/Listings/Services"
import CategoryUserList from "./Components/Listings/CategoryUserList";
import BookingRequest from './Components/Appointment/BookingRequest'; // Import the BookingRequest component
import AppointmentsScreen from './Components/Appointment/AppointmentScreen';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Import the ServiceProviderAppointments component
import ServiceProviderAppointments from './Components/Appointment/ServiceProviderAppointments';

import UserProfile from './Components/UserProfile';

const theme = createTheme({});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Router>
        <div>
          <Header />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot" element={<Forgotpassword />} />
              <Route path="/login" element={<Login />} />
              <Route path="/services" element={<Services />} />
              <Route path="/category/:category" element={<CategoryUserList />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/details" element={<DetailsPage />} />
                <Route path="/booking" element={<BookingRequest />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/appointments/:userId" element={<AppointmentsScreen />} />
                <Route path="/service-provider/:serviceProviderId/appointments" element={<ServiceProviderAppointments />} />
              </Route>
            </Routes>
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
