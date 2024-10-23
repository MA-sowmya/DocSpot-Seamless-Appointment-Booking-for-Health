import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import {
  People,
  LocalHospital,
  EventAvailable,
  EventNote,
  Assignment,
  MonetizationOn,
  Book,
} from "@mui/icons-material";
import { getStatusApi } from "../api/reports";

const Dashboard = ({}) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    const response = await getStatusApi();
    if (response.status === 200) {
      setStats(response.data.data);
    }
  };

  const currentDayAppointments = [
    {
      patientName: "Alice Smith",
      doctorName: "John Doe",
      reason: "Check-up",
      time: "10:00 AM",
    },
    {
      patientName: "Bob Johnson",
      doctorName: "Jane Doe",
      reason: "Consultation",
      time: "11:30 AM",
    },
  ];
  const upcomingAppointments = [
    {
      patientName: "Alice Smith",
      doctorName: "John Doe",
      reason: "Check-up",
      date: "2024-10-20",
      time: "10:00 AM",
    },
    {
      patientName: "Bob Johnson",
      doctorName: "Jane Doe",
      reason: "Dental",
      date: "2024-10-21",
      time: "2:00 PM",
    },
    {
      patientName: "Catherine Lee",
      doctorName: "Alice Williams",
      reason: "Consultation",
      date: "2024-10-22",
      time: "11:30 AM",
    },
  ];
  const topDoctors = [
    { name: "John Doe", appointments: 120 },
    { name: "Jane Smith", appointments: 100 },
    { name: "Alice Williams", appointments: 80 },
    { name: "David Johnson", appointments: 75 },
    { name: "Emma Brown", appointments: 60 },
  ];

  return (
    <>
      <Container fluid className="mt-4">
        <Row className="g-4">
          <Col xs={12} sm={6} md={4} lg={2}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <People style={{ fontSize: 40, color: "#007bff" }} />
                <Card.Title className="mt-2">Patients</Card.Title>
                <Card.Text className="h5">{stats?.patientsCount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} md={4} lg={2}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <LocalHospital style={{ fontSize: 40, color: "#28a745" }} />
                <Card.Title className="mt-2">Doctors</Card.Title>
                <Card.Text className="h5">{stats?.doctorsCount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} md={4} lg={2}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <EventAvailable style={{ fontSize: 40, color: "#ffc107" }} />
                <Card.Title className="mt-2">Today’s Appointments</Card.Title>
                <Card.Text className="h5">
                  {stats?.currentDayAppointments}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} md={4} lg={2}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <MonetizationOn style={{ fontSize: 40, color: "#ff5722" }} />
                <Card.Title className="mt-2">Total Revenue</Card.Title>
                <Card.Text className="h5">
                  ₹{stats?.totalRevenue.toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} md={4} lg={2}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <Book style={{ fontSize: 40, color: "#673ab7" }} />
                <Card.Title className="mt-2">All-Time Appointments</Card.Title>
                <Card.Text className="h5">
                  {stats?.allTimeAppointments.toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col xs={12}>
            <Card className="shadow-sm border-0 mb-4">
              <Card.Header className="bg-success text-white">
                Top 5 Doctors
              </Card.Header>
              <ListGroup variant="flush">
                {topDoctors.length > 0 ? (
                  topDoctors.map((doctor, index) => (
                    <ListGroup.Item key={index}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>Dr. {doctor.name}</strong> -{" "}
                          {doctor.appointments} Appointments
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>No data available</ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col xs={12} md={12} lg={6}>
            <Card className="shadow-sm border-0 mb-4">
              <Card.Header className="bg-warning text-dark">
                <Assignment style={{ marginRight: "8px" }} />
                Current Day Appointments
              </Card.Header>
              <ListGroup variant="flush">
                {currentDayAppointments.length > 0 ? (
                  currentDayAppointments.map((appointment, index) => (
                    <ListGroup.Item key={index}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{appointment.patientName}</strong> with Dr.{" "}
                          <strong>{appointment.doctorName}</strong> -{" "}
                          {appointment.reason}
                        </div>
                        <div>
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>No appointments for today</ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>

          <Col xs={12} md={12} lg={6}>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-primary text-white">
                <Assignment style={{ marginRight: "8px" }} />
                Upcoming Appointments
              </Card.Header>
              <ListGroup variant="flush">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((appointment, index) => (
                    <ListGroup.Item key={index}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{appointment.patientName}</strong> with Dr.{" "}
                          <strong>{appointment.doctorName}</strong> -{" "}
                          {appointment.reason}
                        </div>
                        <div>
                          <span>{appointment.date}</span> at{" "}
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>No upcoming appointments</ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
