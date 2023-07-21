import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import useStyles from "../../styles/styles.js";
import { useFormik } from "formik";
import { LoginValidationSchema } from "../../util/validationSchema";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../Spinner/Spinner";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const auth = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidationSchema,
    onSubmit: async (data) => {
      setIsLoading(true);
      try {
        const requestBody = {
          email: data.email,
          password: data.password,
        };
        const response = await auth.login(requestBody);
        console.log(response);
        if (response) {
          setIsLoading(false);
          navigate("/");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Something Went Wrong");
      }
    },
  });
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
            <h4 className="title">Login</h4>
            <p className="subtitle">Local Service Marketplace</p>
          </div>
          <form className="form" onSubmit={formik.handleSubmit}>
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
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control inputField"
              placeholder="Password *"
              required
            />
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
            <NavLink className="link forgot" to="/forgot">
              Forgot Password?
            </NavLink>
            {isLoading ? (
              <div className={classes.spinnerContainer}>
                <Spinner />
              </div>
            ) : (
              <button type="submit" className={classes.button}>
                Login
              </button>
            )}

            <div className="signup">
              <NavLink to="/signup" className="link">
                Do Not Have an Account?
              </NavLink>
            </div>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
