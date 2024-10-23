import React, { useState } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";

const RegistrationForm = () => {
  // State to manage current step and form data
  const [step, setStep] = useState(1);
  const [isDoctor, setIsDoctor] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    fee: "",
    experience: "",
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to proceed to the next step
  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      // Validate Step 1 inputs here if needed
      setStep(2);
    } else {
      // Final submission logic here
      console.log(formData);
    }
  };

  // Function to go back to the previous step
  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Registration</h2>
      <Form onSubmit={handleNext}>
        {step === 1 && (
          <>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formUserType">
                <Form.Label>Are you a Doctor?</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Yes"
                  checked={isDoctor}
                  onChange={(e) => setIsDoctor(e.target.checked)}
                />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Next
            </Button>
          </>
        )}

        {step === 2 && isDoctor && (
          <>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formSpecialization">
                <Form.Label>Specialization</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFee">
                <Form.Label>Consultation Fee (USD)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your consultation fee"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formExperience">
                <Form.Label>Experience (years)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your years of experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Button variant="secondary" onClick={handleBack} className="me-2">
              Back
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </>
        )}
      </Form>
    </Container>
  );
};

export default RegistrationForm;
