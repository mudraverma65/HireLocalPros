import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import "./Signup.css";
import useStyles from "../../styles/styles.js";
import { useFormik } from "formik";
import { SignUpValidationSchema } from "../../util/validationSchema";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateUser } from "../../services/user.service";
import Spinner from "../Spinner/Spinner";

const Signup = () => {
  const classes = useStyles();
  const [isServiceProvider, setIsServiceProvider] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      contact: "",
      category: "",
      experience: "",
      bio: "",
      location: "",
      price: "",
      confirmPassword: "",
    },
    validationSchema: SignUpValidationSchema,
    onSubmit: async (data) => {
      let requestBody;
      if (isServiceProvider) {
        requestBody = {
          name: data.name,
          email: data.email,
          password: data.password,
          contact: data.contact,
          isServiceProvider: isServiceProvider,
          category: data.category,
          experience: data.experience,
          bio: data.bio,
          location: data.location,
          price: data.price,
        };
      } else {
        requestBody = {
          name: data.name,
          email: data.email,
          password: data.password,
          contact: data.contact,
          isServiceProvider: isServiceProvider,
        };
      }
      setIsLoading(true);
      try {
        const response = await CreateUser(requestBody);
        if (!response?.data?.response?.errors) {
          setIsLoading(false);
          toast.success("Signup Success.");
          navigate("/login");
        } else {
          setIsLoading(false);
          toast.error(response?.data?.response?.message);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6}>
        <Box className={classes.loginForm}>
          <div className="formHeader">
            <img
              src={require("../../images/logo.png")}
              className={classes.logo}
              alt="logo"
            />
            <h4 className="title">SignUp</h4>
            <p className="subtitle">Local Service Marketplace</p>
          </div>
          <form className="form" onSubmit={formik.handleSubmit}>
            <label>
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control inputField"
              placeholder="Name *"
              required
            />
            <label>
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control inputField"
              placeholder="Email *"
              required
            />
            <label>
              Password <span className="required">*</span>
            </label>
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control inputField"
                placeholder="Password *"
                required
              />
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <RemoveRedEyeIcon style={{fontSize: "20px"}} /> : <VisibilityOffIcon style={{fontSize: "20px"}} />}
              </span>
            </div>
            <label>
              Confirm Password <span className="required">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control inputField"
              placeholder="Confirm Password *"
              required
            />
            <label>
              Contact <span className="required">*</span>
            </label>
            <input
              type="text"
              name="contact"
              value={formik.values.contact}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control inputField"
              placeholder="Contact *"
              required
            />
            <div>
              <label>
                <input
                  type="checkbox"
                  name="isServiceProvider"
                  checked={isServiceProvider}
                  style={{ marginRight: "10px" }}
                  onChange={(e) => setIsServiceProvider(e.target.checked)}
                />
                You want to signup as service provider?
              </label>
            </div>
            {isServiceProvider ? (
              <>
                <label>
                  Category <span className="required">*</span>
                </label>
                <select
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-control inputField"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="plumber">Plumber</option>
                  <option value="electrician">Electrician</option>
                  <option value="Carpenter">Carpenter</option>
                </select>
                <label>
                  How many Years of Experience do you have in above mentioned
                  field? <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formik.values.experience}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-control inputField"
                  placeholder="Experience *"
                  required
                />
                <label>
                  Tell Something about yourself{" "}
                  <span className="required">*</span>
                </label>
                <textarea
                  type="text"
                  name="bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-control inputField"
                  placeholder="Write Here... *"
                  required
                />
                <label>
                  Location <span className="required">*</span>
                </label>
                <select
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-control inputField"
                  required
                >
                  <option value="">Select location</option>
                  <option value="plumber">Halifax</option>
                  <option value="electrician">Toronto</option>
                  <option value="Carpenter">Calgary</option>
                </select>
                <label>
                  What is your Hourly Rate ?<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-control inputField"
                  placeholder="17.5$ *"
                  required
                />
              </>
            ) : (
              ""
            )}
            {formik.touched.email && formik.errors.email && (
              <div className="error">
                <CancelIcon />
                <p>{formik.errors.email}</p>
              </div>
            )}
            {formik.touched.password && formik.errors.password && (
              <div className="error">
                <CancelIcon />
                <p>{formik.errors.password}</p>
              </div>
            )}
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="error">
                  <CancelIcon />
                  <p>{formik.errors.confirmPassword}</p>
                </div>
              )}
            {formik.touched.name && formik.errors.name && (
              <div className="error">
                <CancelIcon />
                <p>{formik.errors.name}</p>
              </div>
            )}
            {formik.touched.contact && formik.errors.contact && (
              <div className="error">
                <CancelIcon />
                <p>{formik.errors.contact}</p>
              </div>
            )}
            {isLoading ? (
              <div className={classes.spinnerContainer}>
                <Spinner />
              </div>
            ) : (
              <button type="submit" className={classes.button}>
                Signup
              </button>
            )}

            <div className="signup">
              <NavLink to="/login" className="link">
                Already Have an Account?
              </NavLink>
            </div>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
