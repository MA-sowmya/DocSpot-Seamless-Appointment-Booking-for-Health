import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import femaleImg from "../assets/images/female.png";
import maleImg from "../assets/images/male.png";
import "../styles/SearchDoctorComp.css";
import BookAppointmentModal from "../modals/BookAppointmentModal";
import { appprovedDoctorsApi } from "../api/doctor";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const SearchDoctorComp = () => {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [show, setShow] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [slotReq, setSlotReq] = useState(null);

  const { isPatient } = useContext(UserContext);

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    const response = await appprovedDoctorsApi();
    if (response.status === 200) {
      const doctors = response.data.data;
      setDoctors(doctors);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSpecailization = (e) => {
    setSpecialization(e.target.value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onAppointment = async (data) => {
    if (isPatient) {
      setSlotReq(data);
      setShow(true);
    } else {
      toast.error("Only Patients Can Book Appointment!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  const filteredAvailable =
    doctors?.length > 0 &&
    doctors
      .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
      .filter((sp) =>
        sp.specialization.toLowerCase().includes(specialization.toLowerCase())
      );

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
      <Container fluid>
        <Row className="mt-4 mb-4">
          <Col xs={12} md={8}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by doctor name"
                value={search}
                onChange={handleSearch}
                className="py-3"
                style={{ borderRadius: "5px" }}
              />
              <InputGroup.Text>
                <SearchIcon />
              </InputGroup.Text>
            </InputGroup>
          </Col>
          <Col xs={12} md={4} className="mt-3 mt-md-0">
            <Form.Select
              value={specialization}
              onChange={handleSpecailization}
              className="py-3"
              style={{ borderRadius: "5px" }}
            >
              <option value="">All Specialties</option>
              {uniqueSpecialties.map((specialty, index) => (
                <option key={index} value={specialty}>
                  {specialty}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        {filteredAvailable.length ? (
          <>
            <Row className="g-4">
              {filteredAvailable.map((a, index) => (
                <Col xs={12} md={6} lg={4} key={index}>
                  <Card className="shadow-sm border">
                    <Card.Body>
                      <Row>
                        <Col xs={4} md={3}>
                          <img
                            src={a.gender === "female" ? femaleImg : maleImg}
                            alt={a.name}
                            className="img-fluid rounded-circle"
                          />
                        </Col>
                        <Col xs={8} md={9}>
                          <Card.Title>Dr. {a.name}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {a.specialization}
                          </Card.Subtitle>
                          <Card.Text>Experience: {a.experience} Yrs</Card.Text>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <h6>Available Slots</h6>
                          <div className="d-flex flex-wrap">
                            {a.slots.map((slot, i) => (
                              <div
                                className={`slot ${
                                  slot.slots ? "active" : "inactive"
                                }`}
                                key={i}
                                onClick={
                                  slot.slots
                                    ? () =>
                                        onAppointment({
                                          doctor: a,
                                          reasonForVisit: a.reasonForVisit,
                                          date: slot.fullDate,
                                        })
                                    : () => {}
                                }
                              >
                                <span className="day">{slot.day}</span>
                                <span className="date">{slot.date}</span>
                                {slot.slots ? (
                                  <span>{slot.slots}</span>
                                ) : (
                                  <span>No</span>
                                )}
                                <span>appts</span>
                              </div>
                            ))}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <p>No Doctors Available</p>
        )}
      </Container>

      {slotReq && (
        <BookAppointmentModal
          show={show}
          close={handleClose}
          slotReq={slotReq}
        />
      )}
    </>
  );
};

export default SearchDoctorComp;
