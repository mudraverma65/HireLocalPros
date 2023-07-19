import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import ContactUs from "./Components/ContactUs";
import FAQs from "./Components/FAQs";
import Footer from "./Components/Footern";
import Header from "./Components/Header";
import Login from "./Components/Login/Login";
import Signup from "./Components/SignUp/Signup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoutes";
import Forgotpassword from "./Components/forgotpassword/Forgotpassword";
const theme = createTheme({
  // Your theme configuration here
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Router>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot" element={<Forgotpassword />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/faqs" element={<FAQs />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
