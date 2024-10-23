import { Button, Form, FormCheck, InputGroup } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterComp = () => {
  const { register } = useContext(AuthContext);
  const formikRef = useRef(null);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    firstname: yup.string().required("Firstname is required"),
    lastname: yup.string().required("Lastname is required"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("No password provided.")
      .min(4, "Password is too short - should be 4 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .required("password must match"),
    gender: yup.string().required("Gender is required"),
    phonenumber: yup.string().required("Phonenumber is required"),
    dob: yup.string().required("Date of Birth is required"),
    type: yup.string().oneOf(["doctor"]).required("Type is required"),
    specialization: yup.string().when("type", {
      is: (val) => val === "doctor",
      then: (schema) => schema.required("Specializatoin is required"),
      otherwise: (schema) => schema,
    }),
    experience: yup.number().when("type", {
      is: (val) => val === "doctor",
      then: (schema) => schema.required("Experience is required"),
      otherwise: (schema) => schema,
    }),
    fee: yup.number().when("type", {
      is: (val) => val === "doctor",
      then: (schema) => schema.required("Consultation Fee is required"),
      otherwise: (schema) => schema,
    }),
  });

  const handleChange = (e) => {};

  const handleSubmit = async (formData) => {
    formData.role =
      formData.type && formData.type[0] === "doctor" ? "doctor" : "patient";
    const response = await register(formData);

    navigate("/dashboard");
  };

  const uniqueSpecialties = [
    "Cardiology",
    "Dermatology",
    "Pediatrics",
    "Orthopedics",
    "Gynecology",
    "Psychiatry",
    "Neurology",
    "Ophthalmology",
    "Oncology",
    "Endocrinology",
    "Gastroenterology",
    "General Surgery",
    "Nephrology",
    "Urology",
    "Rheumatology",
    "ENT (Otolaryngology)",
    "Allergy and Immunology",
    "Plastic Surgery",
    "Anesthesiology",
    "Radiology",
    "Infectious Disease",
    "Sports Medicine",
  ];

  return (
    <>
      <Formik
        innerRef={formikRef}
        // validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          type: "",
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmpassword: "",
          gender: "male",
          phonenumber: "",
          dob: "",
          specialization: "",
          fee: "",
          experience: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <h1 className="title">Registration Form</h1>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                name="firstname"
                placeholder="First Name"
                value={values.firstname}
                onChange={handleChange}
                isValid={touched.firstname && !errors.firstname}
                isInvalid={touched.firstname && errors.firstname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstname}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={values.lastname}
                onChange={handleChange}
                isValid={touched.lastname && !errors.lastname}
                isInvalid={touched.lastname && errors.lastname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastname}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={touched.email && errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                value={values.confirmpassword}
                onChange={handleChange}
                isValid={touched.confirmpassword && !errors.confirmpassword}
                isInvalid={touched.confirmpassword && errors.confirmpassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmpassword}
              </Form.Control.Feedback>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="text" name="gender" placeholder="Gender" />
            </Form.Group> */}
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1"
            >
              <div>
                <Field
                  type="radio"
                  name="gender"
                  value="male"
                  as={FormCheck.Input}
                  id="male"
                ></Field>
                <Form.Label className="mx-2">Male</Form.Label>
              </div>
              <div>
                <Field
                  type="radio"
                  name="gender"
                  value="female"
                  as={FormCheck.Input}
                  id="female"
                ></Field>
                <Form.Label className="mx-2">Female</Form.Label>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="tel"
                name="phonenumber"
                placeholder="Phonenumber"
                value={values.phonenumber}
                onChange={handleChange}
                isValid={touched.phonenumber && !errors.phonenumber}
                isInvalid={touched.phonenumber && errors.phonenumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phonenumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="date"
                name="dob"
                placeholder="DOB"
                value={values.dob}
                onChange={handleChange}
                isValid={touched.dob && !errors.dob}
                isInvalid={touched.dob && errors.dob}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dob}
              </Form.Control.Feedback>
            </Form.Group>
            <InputGroup className="d-flex ">
              <Field
                type="checkbox"
                name="type"
                value="doctor"
                as={FormCheck}
                id="doctor"
              ></Field>
              <Form.Label className="mx-2">
                Are you registering as DOCTOR?
              </Form.Label>
            </InputGroup>

            {values.type == "doctor" && (
              <>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Select
                    aria-label="Specialization"
                    name="specialization"
                    onChange={handleChange}
                    value={values.specialization}
                    isValid={touched.specialization && !errors.specialization}
                    isInvalid={touched.specialization && errors.specialization}
                  >
                    <option>Select Specialization</option>
                    {uniqueSpecialties.map((specialty, index) => (
                      <option key={index} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.specialization}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="number"
                    placeholder="Experience"
                    name="experience"
                    value={values.experience}
                    onChange={handleChange}
                    isValid={touched.experience && !errors.experience}
                    isInvalid={touched.experience && errors.experience}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.experience}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="number"
                    placeholder="Consultation Fee"
                    name="fee"
                    value={values.fee}
                    onChange={handleChange}
                    isValid={touched.fee && !errors.fee}
                    isInvalid={touched.fee && errors.fee}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fee}
                  </Form.Control.Feedback>
                </Form.Group>
              </>
            )}

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                className="w-25"
                type="button"
                onClick={() => {
                  if (formikRef.current) {
                    formikRef.current.resetForm();
                  }
                }}
              >
                Reset
              </Button>
              <Button variant="primary" className="w-25" type="submit">
                Register
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterComp;
