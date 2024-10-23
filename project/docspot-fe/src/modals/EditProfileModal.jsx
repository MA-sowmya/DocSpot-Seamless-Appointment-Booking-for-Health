import {
  Button,
  Card,
  Col,
  Form,
  FormCheck,
  Modal,
  Row,
} from "react-bootstrap";
import { Formik, Field } from "formik";

import * as yup from "yup";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { updateUserByIdApi } from "../api/user";
import moment from "moment";
import DatePicker from "react-datepicker";

const EditProfileModal = ({ show, close }) => {
  const [showDoctorsColumn, setShowDoctorsColumn] = useState(false);
  const { profile, isDoctor } = useContext(UserContext);

  useEffect(() => {
    isDoctor ? setShowDoctorsColumn(true) : setShowDoctorsColumn(false);
  }, [isDoctor]);

  const schema = yup.object().shape({
    firstname: yup.string().required("Firstname is required"),
    lastname: yup.string().required("Lastname is required"),
    email: yup.string().email().required("Email is required"),
    gender: yup.string().required("Gender is required"),
    phonenumber: yup.string().required("Phonenumber is required"),
    dob: yup.string().required("Date of Birth is required"),
    specialization: yup.string().when("type", {
      is: (val) => profile.role === "doctor",
      then: (schema) => schema.required("Specializatoin is required"),
      otherwise: (schema) => schema,
    }),
    experience: yup.number().when("type", {
      is: (val) => profile.role === "doctor",
      then: (schema) => schema.required("Experience is required"),
      otherwise: (schema) => schema,
    }),
    fee: yup.number().when("type", {
      is: (val) => profile.role === "doctor",
      then: (schema) => schema.required("Consultation Fee is required"),
      otherwise: (schema) => schema,
    }),
  });

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

  const handleChange = (e) => {};

  const handleSubmit = async (updateData) => {
    const response = await updateUserByIdApi(profile.id, updateData);
    if (response.status === 200) {
      toast.success("Profile Updated successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      close();
    }
  };

  const onDateChange = (dob, setFieldValue) => {
    dob = moment.utc(dob).format("DD-MM-YYYY");
    setFieldValue("dob", dob);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        firstname: profile.firstname,
        lastname: profile.lastname,
        email: profile.email,
        gender: profile.gender,
        phonenumber: profile.phonenumber,
        dob: moment.utc(profile.dob.toLocaleString()).format("MM/DD/YYYY"),
        specialization: profile?.doctorInfo?.specialization,
        fee: profile?.doctorInfo?.fee,
        experience: profile?.doctorInfo?.experience,
      }}
      enableReinitialize
    >
      {({
        handleSubmit,
        handleChange,
        setFieldValue,
        values,
        touched,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Modal show={show} onHide={close}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col xs={showDoctorsColumn ? 6 : 12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ fontWeight: "bold" }}>
                      Firstname
                    </Form.Label>
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
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ fontWeight: "bold" }}>
                      Lastname
                    </Form.Label>
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
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Email
                      </Form.Label>
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
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ fontWeight: "bold" }}>
                      Gender
                    </Form.Label>
                    <div>
                      <Field
                        type="radio"
                        name="gender"
                        value="male"
                        as={FormCheck.Input}
                        id="male"
                      ></Field>
                      <Form.Label
                        style={{ fontWeight: "bold" }}
                        className="mx-2"
                      >
                        Male
                      </Form.Label>
                    </div>
                    <div>
                      <Field
                        type="radio"
                        name="gender"
                        value="female"
                        as={FormCheck.Input}
                        id="female"
                      ></Field>
                      <Form.Label
                        style={{ fontWeight: "bold" }}
                        className="mx-2"
                      >
                        Female
                      </Form.Label>
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ fontWeight: "bold" }}>
                      Phonenumber
                    </Form.Label>
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
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ fontWeight: "bold" }}>
                      Date of Birth
                    </Form.Label>
                    <DatePicker
                      type="date"
                      selected={values?.dob}
                      onChange={(date) => onDateChange(date, setFieldValue)}
                      className="form-control"
                      placeholderText="Select a date"
                      dateFormat="d-MM-YYYY"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dob}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {isDoctor && (
                  <Col xs={6}>
                    <>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label style={{ fontWeight: "bold" }}>
                          Specailization
                        </Form.Label>
                        <Form.Select
                          aria-label="Specialization"
                          name="specialization"
                          onChange={handleChange}
                          value={values?.specialization}
                          isValid={
                            touched?.specialization && !errors?.specialization
                          }
                          isInvalid={
                            touched?.specialization && errors?.specialization
                          }
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
                        <Form.Label style={{ fontWeight: "bold" }}>
                          Experience
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Experience"
                          name="experience"
                          value={values?.experience}
                          onChange={handleChange}
                          isValid={touched?.experience && !errors?.experience}
                          isInvalid={touched?.experience && errors?.experience}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.experience}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label style={{ fontWeight: "bold" }}>
                          Consultation Fee
                        </Form.Label>

                        <Form.Control
                          type="number"
                          placeholder="Consultation Fee"
                          name="fee"
                          value={values?.fee}
                          onChange={handleChange}
                          isValid={touched?.fee && !errors?.fee}
                          isInvalid={touched?.fee && errors?.fee}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.fee}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </>
                  </Col>
                )}
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={close}>
                CLOSE
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                SAVE
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default EditProfileModal;
