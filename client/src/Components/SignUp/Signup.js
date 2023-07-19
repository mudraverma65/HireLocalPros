import React, { useState } from "react";
import { Card, Grid } from "@material-ui/core";
import "./Signup.css";
import useStyles from "../../styles/styles.js";
import { useFormik } from "formik";
import { SignUpValidationSchema } from "../../util/validationSchema";
import CancelIcon from "@mui/icons-material/Cancel";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateUser } from "../../services/user.service";

const Signup = () => {
  const classes = useStyles();
  const [isServiceProvider, setIsServiceProvider] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      contact: "",
    },
    validationSchema: SignUpValidationSchema,
    onSubmit: async (data) => {
      setIsLoading(false);
      const requestBody = {
        name: data.name,
        email: data.email,
        password: data.password,
        contact: data.contact,
        isServiceProvider: isServiceProvider,
      };

      try {
        const response = await CreateUser(requestBody);
        if (response?.data?.success) {
          setIsLoading(true);
          toast.success("Signup Success");
          navigate("/login");
        } else {
          setIsLoading(false);
          toast.error("Something Went Wrong.");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error);
      }
    },
  });
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card className={classes.loginForm}>
          <div className="formHeader">
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
            <button type="submit" className={classes.button}>
              Signup
            </button>
            <div className="signup">
              <NavLink to="/signup" className="link">
                Alreade Have an Account?
              </NavLink>
            </div>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Signup;
