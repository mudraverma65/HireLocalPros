import * as Yup from "yup";

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email Format is Invalid. Please try again.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email Format is Invalid. Please try again."
    )
    .required("Email Can Not be Empty."),
  password: Yup.string().required("Password Can Not be Empty."),
});

export const SignUpValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email Format is Invalid. Please try again.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email Format is Invalid. Please try again."
    )
    .required("Email Can Not be Empty."),
  password: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Accepting alpha-numeric and special characters. Minimum limit is 8 characters."
    )
    .required("Password Can Not be Empty."),
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Accepting only Letters.")
    .required("Name Can Not be Empty."),
  contact: Yup.string()
    .matches(/^\d{10}$/, "Invalid Phone Number. Should be of 10 Digits.")
    .required("Phone Number is Required."),
  confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords Must Match")
      .required("Required"),
});
