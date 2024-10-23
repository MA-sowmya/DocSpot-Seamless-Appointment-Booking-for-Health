import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import * as formik from "formik";
import * as yup from "yup";

const LoginComp = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("No password provided.")
      .min(4, "Password is too short - should be 8 chars minimum.")
      .required("Minimum 4 characters.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  const handleChange = (e) => {
    // console.log(e);
    // setLoginForm({
    //   ...loginForm,
    //   [e.target.name]: e.target.value,
    // });
  };

  const handleSubmit = async (formData) => {
    await login(formData.email, formData.password);
    navigate("/dashboard");
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          email: "",
          password: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <h1 className="title">Login Form</h1>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        )}
      </Formik>

      <div className="my-3">
        New User?{" "}
        <NavLink as={Link} to={"/register"}>
          Register here
        </NavLink>
      </div>
    </>
  );
};

export default LoginComp;
