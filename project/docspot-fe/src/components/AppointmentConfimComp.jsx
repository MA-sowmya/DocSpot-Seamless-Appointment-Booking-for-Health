import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import {
  appointmentApi,
  updateAppointmentApi,
  uploadDocsApi,
} from "../api/appointments";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import BookAppointmentModal from "../modals/BookAppointmentModal";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

const AppointmentConfirmComp = ({}) => {
  const navigate = useNavigate();
  const { isPatient, isDoctor } = useContext(UserContext);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedPresciptionFiles, setSelectedPrescriptionFiles] = useState([]);
  const [appointment, setAppointment] = useState(null);
  const [slotReq, setSlotReq] = useState(null);
  const [show, setShow] = useState(false);

  const { id } = useParams();

  const handleClose = () => {
    getAppointmentById(id);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleFileChange = (e) => {
    setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    const response = await uploadDocsApi(appointment.id, formData);
    if (response.status === 200) {
      toast.success("Uploaded Successful");
      setSelectedFiles([]);
      getAppointmentById(id);
    }
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleViewFile = (fileName) => {
    window.open(`http://localhost:3001/uploads/${fileName}`, "_blank");
  };

  const handlePresciptionFileChange = (e) => {
    setSelectedPrescriptionFiles([
      ...selectedPresciptionFiles,
      ...Array.from(e.target.files),
    ]);
  };

  const handlePrescriptionFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < selectedPresciptionFiles.length; i++) {
      formData.append("files", selectedPresciptionFiles[i]);
    }

    formData.append("type", "prescription");
    const response = await uploadDocsApi(appointment.id, formData);
    if (response.status === 200) {
      toast.success("Uploaded Prescription Successful");
      setSelectedPrescriptionFiles([]);
      getAppointmentById(id);
    }
  };

  const handleRemovePrescriptionFile = (index) => {
    setSelectedPrescriptionFiles((prevFiles) =>
      prevFiles.filter((_, i) => i !== index)
    );
  };

  const handleReschedule = () => {
    setSlotReq({
      appointmentId: appointment.id,
      doctor: appointment.doctorInfo,
      date: appointment.appointmentDate,
      reasonForVisit: appointment.reasonForVisit,
    });
    setShow(true);
  };

  const handleCancel = async () => {
    const response = await updateAppointmentApi(appointment.id, {
      status: "cancelled",
    });
    if (response.status === 200) {
      getAppointmentById(id);
      toast.error("Appointment cancelled successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  useEffect(() => {
    getAppointmentById(id);
  }, []);

  const getAppointmentById = async (id) => {
    const response = await appointmentApi(id);
    if (response.status === 200) {
      const app = response.data.data;
      setAppointment(app);
    }
  };

  return (
    <>
      {appointment && (
        <Container fluid className="my-4">
          <Card>
            <Card.Header as="h2" className="d-flex justify-content-between">
              <div>
                <IconButton onClick={() => navigate(`/appointments/`)}>
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div
                className="text-uppercase"
                style={{ fontSize: "1.5rem", fontWeight: "bold" }}
              >
                Appointment Confirmation
              </div>
              <div></div>
            </Card.Header>
            <Card.Body>
              <h5 className="mb-4">Appointment Details</h5>
              <p>
                <strong>Doctor: </strong> Dr. {appointment?.doctorInfo?.name}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {moment(appointment.appointmentDate).format("DD-MM-YYYY")}
              </p>
              <p>
                <strong>Time:</strong> {appointment?.timeSlot}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {appointment?.status.charAt(0).toUpperCase() +
                  appointment?.status.slice(1)}
              </p>
              <p>
                <strong>Reason For Visit: </strong>
                {appointment?.reasonForVisit}
              </p>
              <hr />
              <Row>
                <Col xs={6}>
                  <h5>History Files</h5>
                  {appointment?.files?.length > 0 ? (
                    <ListGroup>
                      {appointment.files.map((file, index) => (
                        <ListGroup.Item
                          key={index}
                          className="d-flex justify-content-between align-items-center"
                        >
                          {file.fileName}
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleViewFile(file.fileName)}
                          >
                            View
                          </Button>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p>No files uploaded for this appointment.</p>
                  )}
                </Col>
                <Col xs={6}>
                  <h5>Prescriptions</h5>
                  {appointment?.prescriptionFiles?.length > 0 ? (
                    <ListGroup>
                      {appointment.prescriptionFiles.map((file, index) => (
                        <ListGroup.Item
                          key={index}
                          className="d-flex justify-content-between align-items-center"
                        >
                          {file.fileName}
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleViewFile(file.fileName)}
                          >
                            View
                          </Button>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p>No Prescriptions Found.</p>
                  )}
                </Col>
              </Row>
              <hr />
              {appointment.status !== "completed" && (
                <Button variant="primary" onClick={handleReschedule}>
                  Reschedule Appointment
                </Button>
              )}
              {appointment.status !== "completed" &&
                appointment.status !== "cancelled" && (
                  <Button
                    className="ms-4"
                    variant="danger"
                    onClick={handleCancel}
                  >
                    Cancel Appointment
                  </Button>
                )}
              {appointment.status === "completed" && (
                <Button
                  className="me-2"
                  variant="primary"
                  onClick={handleReschedule}
                >
                  Follow Up
                </Button>
              )}
            </Card.Body>
          </Card>

          {isPatient && (
            <Card className="mt-4">
              <Card.Header>Upload Medical History (if necessary)</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>
                      Select history images (multiple allowed):
                    </Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                  <ListGroup className="mb-3">
                    {selectedFiles.map((file, index) => (
                      <ListGroup.Item
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        {file.name}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemoveFile(index)}
                        >
                          Remove
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Button
                    variant="success"
                    onClick={handleFileUpload}
                    disabled={!selectedFiles.length}
                  >
                    Upload Files
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          {isDoctor && (
            <Card className="mt-4">
              <Card.Header>Upload Prescription (doctors only)</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>
                      Select prescription images (multiple allowed):
                    </Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      onChange={handlePresciptionFileChange}
                    />
                  </Form.Group>
                  <ListGroup className="mb-3">
                    {selectedPresciptionFiles.map((file, index) => (
                      <ListGroup.Item
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        {file.name}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemovePrescriptionFile(index)}
                        >
                          Remove
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Button
                    variant="success"
                    onClick={handlePrescriptionFileUpload}
                    disabled={!selectedPresciptionFiles.length}
                  >
                    Upload Files
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          {slotReq && (
            <BookAppointmentModal
              show={show}
              close={handleClose}
              rebook={true}
              slotReq={slotReq}
            />
          )}
        </Container>
      )}
    </>
  );
};

export default AppointmentConfirmComp;
