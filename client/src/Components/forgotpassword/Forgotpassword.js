import React from "react";
import { Card, Grid } from "@material-ui/core";
import "./Forgotpassword.css";
import { useNavigate } from "react-router-dom";
import useStyles from "../../styles/styles.js";
import { useFormik } from "formik";
import { LoginValidationSchema } from "../../util/validationSchema";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";
import { ResetPassword } from "../../services/user.service";

const Forgotpassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidationSchema,
    onSubmit: async (data) => {
      try {
        const requestBody = {
          email: data.email,
          newPassword: data.password,
        };
        const response = await ResetPassword(requestBody);
        console.log(response);
        if (response?.data?.success) {
          toast.success(response?.data?.message);
          navigate("/login");
        } else {
          toast.success(response?.data?.message);
        }
      } catch (error) {
        toast.error("Something Went Wrong");
      }
    },
  });
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card className={classes.loginForm}>
          <div className="formHeader">
            <h4 className="title">Reset Password</h4>
            <p className="subtitle">Change your password to login again</p>
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
              New Password <span className="required">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control inputField"
              placeholder="New Password *"
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
            <button type="submit" className={classes.button}>
              Reset Password
            </button>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Forgotpassword;
