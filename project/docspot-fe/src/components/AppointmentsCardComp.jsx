import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { updateAppointmentApi } from "../api/appointments";
import { toast } from "react-toastify";
import maleImg from "../assets/images/male.png";
import femaleImg from "../assets/images/female.png";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../utils/convert";

const AppointmentsCardComp = ({ appointments }) => {
  const navigate = useNavigate();

  const onCancel = async (id) => {
    const data = { status: "cancelled" };
    const response = await updateAppointmentApi(id, data);
    if (response.status === 200) {
      toast.success("Appointment Cancelled successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  const handleClick = (id) => {
    navigate(`/confirmation/${id}`);
  };
  return (
    <Card className="mb-4">
      <Card.Header
        as="h2"
        className="text-uppercase text-center"
        style={{ fontSize: "1.5rem", fontWeight: "bold" }}
      >
        Appointments
      </Card.Header>
      <Card.Body>
        <Container fluid>
          {appointments.map((appointment, index) => (
            <Card
              className="mb-3"
              style={{ cursor: "pointer" }}
              key={index}
              onClick={() => handleClick(appointment.id)}
            >
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs={1}>
                    <img
                      src={
                        appointment?.doctorUserInfo?.gender === "female"
                          ? femaleImg
                          : maleImg
                      }
                      alt="Doctor"
                      className="img-fluid rounded-circle"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </Col>

                  <Col xs={3}>
                    <h5>{appointment.doctorName}</h5>
                    <p className="mb-1">
                      Experience: {appointment.experience} years
                    </p>
                  </Col>

                  <Col xs={2}>
                    <p className="mb-0">
                      <strong>Status:</strong>
                    </p>
                    <p>{capitalize(appointment.status)}</p>
                  </Col>

                  <Col xs={2}>
                    <p className="mb-0">
                      <strong>Date:</strong>
                    </p>
                    <p>{appointment.appointmentDate}</p>
                  </Col>

                  <Col xs={2}>
                    <p className="mb-0">
                      <strong>Time:</strong>
                    </p>
                    <p>{appointment.appointmentTime}</p>
                  </Col>
                  <Col xs={2} className="text-end mt-3">
                    {appointment.status !== "completed" &&
                      appointment.status !== "cancelled" && (
                        <Button
                          variant="danger"
                          onClick={() => onCancel(appointment.id)}
                        >
                          Cancel Appointment
                        </Button>
                      )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
          ;
        </Container>
      </Card.Body>
    </Card>
  );
};

export default AppointmentsCardComp;
